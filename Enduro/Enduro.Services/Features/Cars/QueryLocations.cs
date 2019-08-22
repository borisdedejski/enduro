using Enduro.Core.Cars;
using Marten;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using GoogleMaps.LocationServices;
using System.Linq;
using System;

namespace Enduro.Services.Features.Cars
{
    public class QueryLocations
    {
        public class Request : IRequest<Response>
        {

        }

        public class Response
        {
            public List<CarLocation> CarLocations { get; set; }
            //public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();

            //public class Item
            //{
            //    public Guid CarId { get; set; }
            //    public Coordinate Coordinate { get; set; }
            //}
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            //private readonly IGeoLocationService _geolocator;

            public Handler(IDocumentSession session/*, IGeoLocationService geolocator*/)
            {
                _session = session;
                //_geolocator = geolocator;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {

                var locationService = new GoogleLocationService("AIzaSyCNSEn1UjPshpFTg55dn8IsJimWQbDbdao");

                List<CarLocation> carLocations = new List<CarLocation>();

                var cars = await _session.Query<Car>()
                    .ToListAsync();

                foreach (var car in cars)
                {
                    var address = car.LocationPickUp;
                    var point = locationService.GetLatLongFromAddress(address);
                    if (point != null)
                    {
                        var lat = point.Latitude;
                        var lon = point.Longitude;

                        var coordinate = new Coordinate(lat, lon);
                        //coordinates.Add(coordinate);
                        var carLocation = new CarLocation(car.Id, coordinate);
                        carLocations.Add(carLocation);
                    }

                }

                //TODO 
                // return the car with her coordinates

                return new Response
                {
                    //Coordinates = coordinates
                    CarLocations = carLocations
                };

            }
        }
    }
}
