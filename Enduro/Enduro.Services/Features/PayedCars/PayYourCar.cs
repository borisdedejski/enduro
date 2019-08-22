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

namespace Enduro.Services.Features.PayedCars
{
    public class PayYourCar
    {
        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public Guid Id { get; set; }    //CarId
            public Guid UserPaysId { get; set; }    //The id of user who payed the car
            public Guid UserRentsId { get; set; }
            public DateTime RentedFrom { get; set; }
            public DateTime RentedTo { get; set; }

            public int TripTotalPrice { get; set; }
            public string UserPaysMobile { get; set; }
            public string UserPaysCountry { get; set; }
            public string UserPaysLicenseCountry { get; set; }
            public string UserPaysState { get; set; }
            public string UserPaysLicenseNumber { get; set; }
            public int ValidUntilMonth { get; set; }
            public int ValidUntilYear { get; set; }
            public string UserPaysFullName { get; set; }
            public DateTime UserPaysDateOfBirth { get; set; }
        }

        public class Response { }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var car = await _session.Query<Car>()
                    .Where(x => x.Id == request.Id)
                    .SingleAsync();


                var userPays = await _session.Query<User>()
                    .Where(x => x.Id == request.UserPaysId)
                    .SingleAsync();


                var userRents = await _session.Query<User>()
                    .Where(x => x.Id == request.UserRentsId)
                    .SingleAsync();

                var payedCar = new PayedCar();

                payedCar.PayYourCar(userPays.Id, userRents.Id, car.Id, request.RentedFrom, request.RentedTo,
                    request.TripTotalPrice, request.UserPaysMobile, request.UserPaysCountry, request.UserPaysLicenseCountry,
                    request.UserPaysState, request.UserPaysLicenseNumber, request.ValidUntilMonth, request.ValidUntilYear,
                    request.UserPaysFullName, request.UserPaysDateOfBirth
                    );
                _session.Store(payedCar);
                
                return new Response();
            }
        }
    }
}
