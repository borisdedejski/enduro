using Enduro.Core;
using Enduro.Core.Cars;
using Enduro.Core.Users;
using GoogleMaps.LocationServices;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Cars
{
    public class ListYourCar
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
            public string Make { get; set; }
            public string Model { get; set; }
            public int Year { get; set; }
            public string Gas { get; set; }
            public int NumberOfDoors { get; set; }
            public int HorsePower { get; set; }
            public int LitersPerKm { get; set; } // liters per 100 km
            public string Description { get; set; }
            public string GuideLines { get; set; }
            public float Price { get; set; }
            public string LocationCity { get; set; }
            public string LocationCountry { get; set; }
            public string LocationPickUp { get; set; }
            public List<string> Features { get; set; }
            public string Insurance { get; set; } //or string but need to upload so filepath
            public List<Guid> CarImages { get; set; }
            public DateTime RentedFrom { get; set; }
            public DateTime RentedTo { get; set; }
            public string CarClass { get; set; }
            public string Transmission { get; set; }
            
        }

        public class Response
        {
            public Guid CarId { get; set; }

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
                    .Where(x => x.Id == request.UserId)
                    .SingleAsync();

                var locationService = new GoogleLocationService("AIzaSyCNSEn1UjPshpFTg55dn8IsJimWQbDbdao");
                var address = request.LocationPickUp;
                var point = locationService.GetLatLongFromAddress(address);
                var lat = point.Latitude;
                var lon = point.Longitude;
                var coordinate = new Coordinate(lat, lon);

                var car = Car.ListYourCar(
                    request.UserId,
                    request.Make,
                    request.Model,
                    request.Year,
                    request.Gas,
                    request.NumberOfDoors,
                    request.HorsePower,
                    request.LitersPerKm,
                    request.Description,
                    request.GuideLines,
                    request.Price,
                    request.LocationCity,
                    request.LocationCountry,
                    request.LocationPickUp,
                    request.Features,
                    request.Insurance,
                    request.CarImages,
                    request.RentedFrom,
                    request.RentedTo,
                    request.CarClass,
                    request.Transmission,
                    coordinate
                    );

                 user.AddCarToList(car.Id,user);

                _session.Store(car);
                _session.Store(user);
                await _session.SaveChangesAsync();

                return new Response
                {
                    CarId = car.Id
                };
            }
        }
    }
}
