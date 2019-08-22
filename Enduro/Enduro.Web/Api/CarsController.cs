using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Enduro.Services.Features.Cars;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CarsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("~/api/uniquecities")]
        public Task<UniqueCities.Response> QueryCars([FromQuery]UniqueCities.Request request)
        {
            request = request ?? new UniqueCities.Request();
            return _mediator.Send(request);
        }

        [HttpGet]
        [Route("~/api/cars/{id}")]
        public Task<QueryCar.Response> QueryCar([FromRoute]Guid id, [FromQuery]QueryCar.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }

        [HttpPost]
        public Task<ListYourCar.Response> ListYourCar([FromBody]ListYourCar.Request request)
        {
            request = request ?? new ListYourCar.Request();
            return _mediator.Send(request);
        }

        [HttpPost]
        [Route("~/api/cars/{id}/comments")]
        public Task<AddComment.Response> AddComment([FromRoute]Guid id, [FromBody]AddComment.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }
        
        [HttpPost]
        [Route("~/api/cars/comments/{id}")]
        public Task<RemoveComment.Response> RemoveComment([FromRoute]Guid id, [FromBody]RemoveComment.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }
        //Cars search
        [HttpGet]
        [Route("~/api/querycars")]
        public Task<QueryCars.Response> QueryCars([FromQuery] string searchParam, [FromQuery]DateTime rentFrom, [FromQuery]DateTime rentTo,[FromQuery]string priceOrder,[FromQuery] string carMake,[FromQuery]int numberOfDoors, [FromQuery]QueryCars.Request request)
        {
            request = request ?? new QueryCars.Request();
            request.SearchParam = searchParam;
            //request.Page = page;
            request.RentFrom = rentFrom;
            request.RentTo = rentTo;
            request.PriceOrder = priceOrder;
            request.CarMake = carMake;
            request.NumberOfDoors = numberOfDoors;

            return _mediator.Send(request);
        }
    }
}