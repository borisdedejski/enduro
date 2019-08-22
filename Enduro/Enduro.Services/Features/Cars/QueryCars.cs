using Enduro.Core;
using Enduro.Core.Cars;
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
    public class QueryCars
    {
        public static int STATIC_CARS_SHOW = 2;
        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public string SearchParam { get; set; } = "";
            [JsonIgnore]
            //public int Page { get; set; }
            public DateTime RentFrom { get; set; }
            public DateTime RentTo { get; set; }
            public string PriceOrder { get; set; }
            public string CarMake { get; set; }
            public int NumberOfDoors { get; set; }
        }

        public class Response
        {
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();

            public class Item
            {
                public Guid CarId { get; set; }
                public string Make { get; set; }
                public string Model { get; set; }
                public int Year { get; set; }
                public string CarClass { get; set; }
                public float Price { get; set; }
                public float Review { get; set; }
                public string LocationCity { get; set; }
                public Guid CarImage { get; set; } // in search car we only need the Car FIRST image

            }
            public double TotalPages { get; set; }

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
                var allCars = await _session.Query<Car>()
                    .Where(x => x.LocationCity.Contains(request.SearchParam, StringComparison.OrdinalIgnoreCase))
                    .Where(x => x.RentedFrom <= request.RentFrom /*&& x.RentedTo <= request.RentTo*/)
                    .ToListAsync();


                if (request.PriceOrder == "ascending")
                {
                    var cars = (from x in allCars
                                where (request.CarMake != null) ? (x.Make == request.CarMake) : (true)
                                where (request.NumberOfDoors != 0) ? x.NumberOfDoors == request.NumberOfDoors : (true)
                                select x)
                                .OrderBy(x => x.Price)
                                .ToList();


                    double totalCars = allCars.Count;
                    double totalPages = totalCars / STATIC_CARS_SHOW;
                    if (cars != null)
                    {
                        return new Response
                        {

                            Items = cars.Select(x => new Response.Item
                            {
                                CarId = x.Id,
                                Make = x.Make,
                                Model = x.Model,
                                Year = x.Year,
                                CarClass = x.CarClass,
                                Price = x.Price,
                                LocationCity = x.LocationCity,
                                CarImage = x.CarImages[0]   //here we only need the first image 
                            }),
                            TotalPages = Math.Round(totalPages)
                        };
                        
                    }
                    else
                    {
                        return new Response();
                    }
                }
                else
                {
                    var cars = (from x in allCars
                                where (request.CarMake != null) ? (x.Make == request.CarMake) : (true)
                                where (request.NumberOfDoors != 0) ? x.NumberOfDoors == request.NumberOfDoors : (true)
                                select x)
                                .OrderByDescending(x => x.Price)
                                .ToList();

                    double totalCars = allCars.Count;
                    double totalPages = totalCars / STATIC_CARS_SHOW;
                    if (cars != null)
                    {
                        return new Response
                        {

                            Items = cars.Select(x => new Response.Item
                            {
                                CarId = x.Id,
                                Make = x.Make,
                                Model = x.Model,
                                Year = x.Year,
                                CarClass = x.CarClass,
                                Price = x.Price,
                                LocationCity = x.LocationCity,
                                CarImage = x.CarImages[0]   //here we only need the first image 
                            }),
                            TotalPages = Math.Round(totalPages)
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
}
