using Enduro.Core.Cars;
using Enduro.Core.PayedCars;
using Enduro.Core.Users;
using Marten;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Users
{
    public class QueryListedCars
    {

        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public Guid Id { get; set; }            //userId
        }

        public class Response
        {
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();

            public class Item
            {
                public string CarMake { get; set; }
                public string CarModel { get; set; }
                //public float TotalProfit { get; set; }
                //public float ProfitPerCar { get; set; }
            }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _session.Query<User>()
                    .Where(x => x.Id == request.Id)
                    .SingleAsync();


                var listCarIds = user.ListOfListedCars;
                if (listCarIds != null)
                {
                    var listedcars = await _session.Query<Car>()
                    .Where(x => x.Id.IsOneOf(listCarIds.ToArray()))
                    .ToListAsync();

                    return new Response
                    {

                        Items = listedcars.Select(x => new Response.Item
                        {
                            CarMake = listedcars.FirstOrDefault(car => car.Id == x.Id).Make,
                            CarModel = listedcars.FirstOrDefault(car => car.Id == x.Id).Model,
                        })
                    };
                }
                else
                {
                    return new Response();
                }



                //var userRentedCars = await _session.Query<PayedCar>()
                //    .Where(x => x.UserRentsId == request.Id && x.IsAccepted == true)
                //    .ToListAsync();
                //var rentedCarIds = userRentedCars.Select(x => x.PayedCarId).ToList();

                //float totalProfit = 0;
                //foreach (var tripprice in userRentedCars)
                //{
                //    totalProfit += tripprice.TripTotalPrice;
                //}


            }
        }
    }
}
