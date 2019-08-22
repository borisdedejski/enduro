using System;
using System.Collections.Generic;
using System.Text;
using Marten;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using GoogleMaps.LocationServices;
using System.Linq;
using Enduro.Core.Cars;

namespace Enduro.Services.Features.Cars
{
    // when you give LAT AND LONG return which car is this
    public class QueryLocationCar
    {
        public class Request : IRequest<Response>
        {
            public double Latitude { get; set; }
            public double Longitude { get; set; }

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
                var requestedCoordinate = new Coordinate(request.Latitude, request.Longitude);

                var car = await _session.Query<Car>()
                    .Where(x => requestedCoordinate.Latitude == x.Coordinate.Latitude && requestedCoordinate.Longitude == x.Coordinate.Longitude)
                    .SingleAsync();

                return new Response
                {
                    CarId = car.Id                    
                };

            }
        }
    }
}
