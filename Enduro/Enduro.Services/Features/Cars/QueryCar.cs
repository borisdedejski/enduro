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

namespace Enduro.Services.Features.Cars
{
    public class QueryCar
    {
        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public Guid Id { get; set; }    //carId
        }

        public class Response
        {
            public string Make { get; set; }
            public string Model { get; set; }
            public int Year { get; set; }
            public int NumberOfTrips { get; set; }
            public string Gas { get; set; }
            public int NumberOfDoors { get; set; }
            public int HorsePower { get; set; }
            public int LitersPerKm { get; set; } // liters per 100 km
            public string Description { get; set; }
            public string GuideLines { get; set; }
            public float Reviews { get; set; }
            public float Price { get; set; }
            public string LocationPickUp { get; set; }
            public List<string> Features { get; set; }
            public string Insurance { get; set; } //or string but need to upload so filepath
            public List<Guid> CarImages { get; set; }
            public DateTime RentedFrom { get; set; }
            public DateTime RentedTo { get; set; }
            public Coordinate Coordinate { get; set; }
            public string OwnerFullName { get; set; }
            public List<Comments> ListComments { get; set; }
            public string Transmission { get; set;  }
            public Guid UserId { get; set; }
            public int TotalTrips { get; set; }
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
                var car = await _session.Query<Car>()
                    .Where(x => x.Id == request.Id)
                    .SingleAsync();

                var user = await _session.Query<User>()
                    .Where(x => x.Id == car.UserId)
                    .SingleAsync();

                var totalTrips = await _session.Query<PayedCar>()
                    .Where(x => x.PayedCarId == request.Id && x.IsAccepted == true)
                    .ToListAsync();

                var totalCount = totalTrips.Count;

                return new Response
                {
                    Make = car.Make,
                    Model = car.Model,
                    Year = car.Year,
                    NumberOfTrips = car.NumberOfTrips,
                    Gas = car.Gas,
                    NumberOfDoors = car.NumberOfDoors,
                    HorsePower = car.HorsePower,
                    LitersPerKm = car.LitersPerKm,
                    Description = car.Description,
                    GuideLines = car.GuideLines,
                    Reviews = car.Reviews,
                    Price = car.Price,
                    LocationPickUp = car.LocationPickUp,
                    Features = car.Features,
                    Insurance = car.Insurance,
                    CarImages = car.CarImages,
                    RentedFrom = car.RentedFrom,
                    RentedTo = car.RentedTo,
                    Coordinate = car.Coordinate,
                    OwnerFullName = user.FullName,
                    ListComments = car.ListComments,
                    Transmission = car.Transmission,
                    UserId = user.Id,
                    TotalTrips = totalCount
                };
            }
        }
    }
}
