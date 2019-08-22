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
    public class SearchCarController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SearchCarController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("~/api/searchcar")]
        public Task<SearchCars.Response> SearchCars([FromQuery] string searchParam,[FromQuery]int page,[FromBody]SearchCars.Request request)
        {
            request = request ?? new SearchCars.Request();
            request.SearchParam = searchParam;
            request.Page = page;
            return _mediator.Send(request);
        }
    }
}