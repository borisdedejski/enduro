using System;
using System.Threading.Tasks;
using Enduro.Services.Features.Users;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]  
        public Task<QueryUsers.Response> QueryUsers([FromQuery]QueryUsers.Request request) =>
            _mediator.Send(request ?? new QueryUsers.Request());

        [HttpGet("{userId}")]
        public Task<QueryUser.Response> QueryCar([FromRoute]QueryUser.Request request)
        {
            request = request ?? new QueryUser.Request();
            return _mediator.Send(request);
        }

        [HttpGet]
        [Route("~/api/users/{id}/listedcars")]
        public Task<QueryListedCars.Response> QueryListedCars([FromRoute]Guid id, [FromQuery]QueryListedCars.Request request)
        {
            //request = request ?? new QueryPayedCars.Request();
            request.Id = id;
            return _mediator.Send(request);
        }

        [HttpGet]
        [Route("~/api/users/{id}/rentedcars")]
        public Task<QueryRentedCars.Response> QueryRentedCars([FromRoute]Guid id, [FromQuery]QueryRentedCars.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }

        [HttpGet]
        [Route("~/api/users/{id}/profit")]
        public Task<QueryRentedCars.Response> QueryProfit([FromRoute]Guid id, [FromQuery]QueryRentedCars.Request request)
        {
            request.Id = id;
            return _mediator.Send(request);
        }

        //user sign up
        [Authorize]
        [HttpGet("me")]
        public Task<GetCurrentUser.Response> GetCurrentUserDetails() =>
            _mediator.Send(new GetCurrentUser.Request());



        [AllowAnonymous]
        [HttpPost("forgotPassword")]
        public Task<ForgotPassword.Response> SendPasswordResetEmail([FromBody] ForgotPassword.Request request)
        {
            var userAgent = HttpContext.Request.Headers["User-Agent"];
            request = request ?? new ForgotPassword.Request();
            request.UserAgent = userAgent;
            return _mediator.Send(request);
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public Task<ResetPassword.Response> ResetUserPassword(
            [FromBody]ResetPassword.Request request,
            [FromQuery]string email,
            [FromQuery]string token)
        {
            request = request ?? new ResetPassword.Request();
            request.Email = email;
            request.Token = token;
            return _mediator.Send(request);
        }
    }
}
