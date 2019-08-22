using Enduro.Core.Cars;
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
    public class UniqueCities
    {
        public class Request : IRequest<Response>
        {
        }

        public class Response
        {
            public List<string> UniqueLocationCities = new List<string>(); //needed for search
            //public List<CityCountry> UniqueLocations = new List<CityCountry>(); //needed for search
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

                var cars = await _session.Query<Car>()
                    .Select(x=>x.LocationCity)
                    .ToListAsync();

                var uniqueCities = cars
                    .Distinct()
                    .ToList();

                return new Response
                {
                    UniqueLocationCities = uniqueCities.ToList()
                };
            }
        }
    }
}
