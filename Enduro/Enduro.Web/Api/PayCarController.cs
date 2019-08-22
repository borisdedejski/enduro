using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Enduro.Services.Features.PayedCars;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayCarController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PayCarController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("~/api/paycar/{id}")]
        public Task<PayYourCar.Response> PayYourCar([FromRoute]Guid id, [FromBody]PayYourCar.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }

        [HttpGet]
        [Route("~/api/paycar/{id}")]
        public Task<QueryPayedCars.Response> QueryPayedCars([FromRoute]Guid id, [FromQuery]QueryPayedCars.Request request)
        {
            //request = request ?? new QueryPayedCars.Request();
            request.Id = id;
            return _mediator.Send(request);
        }
        
        //this is for accepted deals in payyourcar
        [HttpPatch]
        [Route("~/api/paycar/{id}")]
        public Task<AcceptDeal.Response> AcceptDeal([FromRoute]Guid id, [FromBody]AcceptDeal.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }

        [HttpDelete]
        [Route("~/api/paycar/{id}")]
        public Task<DeclineDeal.Response> DeclineDeal([FromRoute]Guid id, [FromQuery]DeclineDeal.Request request)
        {
            //request = request ?? new QueryPayedCars.Request();
            request.Id = id;
            return _mediator.Send(request);
        }
    }
}