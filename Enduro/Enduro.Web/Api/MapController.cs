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
    public class MapController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MapController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public Task<QueryLocations.Response> QueryLocations([FromQuery]QueryLocations.Request request) =>
            _mediator.Send(request ?? new QueryLocations.Request());


        [HttpPost]
        public Task<QueryLocationCar.Response> QueryLocationCar([FromBody]QueryLocationCar.Request request)
        {
            request = request ?? new QueryLocationCar.Request();
            return _mediator.Send(request);
        }

    }
}