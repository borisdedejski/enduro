//using Enduro.Core.Cars;
//using Enduro.Core.Users;
//using Marten;
//using MediatR;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading;
//using System.Threading.Tasks;

//namespace Enduro.Services.Features.Cars
//{
//    public class CalculateTrip
//    {
//        public class Request : IRequest<Response>
//        {
//            //post on the calendar
//            [JsonIgnore]
//            public Guid UserId { get; set; }
//            public Guid CarId { get; set; }
//            public DateTime RentedFrom { get; set; }
//            public DateTime RentedTo { get; set; }
//        }

//        public class Response
//        {
//            public float TotalPrice { get; set; }

//        }
//        public class Handler : IRequestHandler<Request, Response>
//        {
//            private readonly IDocumentSession _session;

//            public Handler(IDocumentSession session)
//            {
//                _session = session;
//            }

//            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
//            {

//                var user = _session.Query<User>()
//                    .Where(x => x.Id == request.UserId)
//                    .Single();

//                var car = await _session.Query<Car>()
//                    .Where(x => x.Id == request.CarId)
//                    .SingleAsync();


//                var totalPrice = car.CalculateTripPrice(request.RentedFrom,request.RentedTo,car.Price);

//                return new Response
//                {
//                    TotalPrice = totalPrice
//                };
//            }
//        }
//    }
//}
