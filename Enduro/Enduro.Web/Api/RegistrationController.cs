using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Enduro.Services.Features.Users;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        /// <summary>
        /// this controller is for validation later //TODO
        /// </summary>
        private readonly IMediator _mediator;

        public RegistrationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public Task<SignUpUser.Response> SignUpUser([FromBody]SignUpUser.Request request) =>
            _mediator.Send(request ?? new SignUpUser.Request());


        [HttpGet("verification/{VerificationCode}")]
        public async Task<RedirectResult> VerifyUser([FromRoute]VerifyUser.Request request)
        {
            await _mediator.Send(request ?? new VerifyUser.Request());
            return Redirect("http://localhost:5000/#/login");
        }
    }
}