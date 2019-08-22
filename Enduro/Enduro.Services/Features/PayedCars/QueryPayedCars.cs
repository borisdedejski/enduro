using Enduro.Core;
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
using static Enduro.Services.Features.PayedCars.QueryPayedCars.Response;

namespace Enduro.Services.Features.PayedCars
{
    public class QueryPayedCars
    {
        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public Guid Id { get; set; }    //UserId, requests for userId

        }

        public class Response
        {
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();

            public class Item
            {
                public Guid RequestId { get; set; }
                public Guid PayedCarId { get; set; }
                public string FullName { get; set; }    //user that pays (requests)
                public string CarMake { get; set; }
                public DateTime RentedFrom { get; set; }
                public DateTime RentedTo { get; set; }
                public FilePath AvatarUri { get; set; }
                public Guid UserPaysId { get; set; }
                public bool IsAccepted { get; set; }
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

                var userRequests = await _session.Query<PayedCar>()
                    .Where(x => x.UserRentsId == request.Id)
                    .Where(x=>x.IsAccepted == false)
                    .OrderByDescending(x=>x.CreatedOnUtc)
                    .ToListAsync();
                    

                var carIds = userRequests.Select(x => x.PayedCarId).ToList();
                var cars = await _session.Query<Car>()
                    .Where(x => x.Id.IsOneOf(carIds.ToArray()))
                    .ToListAsync();

                var userPayIds = userRequests.Select(x => x.UserPaysId).ToList();
                var userPays = await _session.Query<User>()
                    .Where(x => x.Id.IsOneOf(userPayIds.ToArray()))
                    .ToListAsync();
                

                return new Response
                {
                    
                    Items = userRequests.Select(x => new Response.Item
                    {
                        //PayedCarId = x.Id,
                        RequestId = x.Id,
                        PayedCarId = x.PayedCarId,
                        FullName = userPays.FirstOrDefault(user => user.Id == x.UserPaysId).FullName,
                        //FullName = userPays.FirstOrDefault(user=> user.Id == x.Id).FullName,
                        CarMake = cars.FirstOrDefault(car => car.Id == x.PayedCarId).Make,
                        RentedFrom = x.RentedFrom,
                        RentedTo = x.RentedTo,
                        AvatarUri = userPays.FirstOrDefault(user => user.Id == x.UserPaysId).AvatarUri,
                        UserPaysId = x.UserPaysId,
                        IsAccepted = x.IsAccepted
                    })
                };
            }
        }
    }
}
