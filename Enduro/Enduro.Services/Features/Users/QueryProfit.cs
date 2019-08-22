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
using Enduro.Core.Cars;

namespace Enduro.Services.Features.Users
{
    public class QueryProfit
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
                public float Profit { get; set; }
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


                var userRentedCars = await _session.Query<PayedCar>()
                    .Where(x => x.UserRentsId == request.Id && x.IsAccepted == true)
                    .ToListAsync();

                if (userRentedCars != null)
                {
                    var rentedCarIds = userRentedCars.Select(x => x.PayedCarId).ToList();

                    //var cars = await _session.Query<Car>()
                    //    .Where(x => x.Id.IsOneOf(rentedCarIds.ToArray()))
                    //    .ToListAsync();

                    var profitPerCar = await _session.Query<PayedCar>()
                    .Where(x => x.UserRentsId == request.Id && x.IsAccepted == true)
                    .GroupBy(x => x.PayedCarId)
                    .Select(x => new { Suma = x.Sum(y => y.TripTotalPrice), CarId = x.Select(y=>y.PayedCarId) }).ToListAsync();
                    


                    return new Response
                    {

                        //Items = cars.Select(x => new Response.Item
                        //{
                        //    CarMake = cars.FirstOrDefault(car => car.Id == x.Id).Make,
                        //    CarModel = cars.FirstOrDefault(car => car.Id == x.Id).Model,
                        //})
                    };
                }
                else
                {
                    return new Response();
                }

            }
        }
    }
}
