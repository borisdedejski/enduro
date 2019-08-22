using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Enduro.Core.Auth;
using Enduro.Services.Features.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICoreAuthenticationService _authenticationService;

        public AuthController(IMediator mediator, ICoreAuthenticationService authenticationService)
        {
            _mediator = mediator;
            _authenticationService = authenticationService;
        }


        [AllowAnonymous]
        [HttpPost("token")]
        public async Task<IActionResult> CreateToken([FromBody]TryCreateToken.Request request)
        {
            var response = await _mediator.Send(request);

            try
            {

            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Error = ex.Errors.FirstOrDefault().ErrorMessage });
            }
            if (response.HasErrors)
                return BadRequest(new { Error = "invalid_request" });

            return Ok(response);
        }

        [HttpDelete("token")]
        public Task<DeleteRefreshToken.Response> DeleteRefreshToken() =>
            _mediator.Send(new DeleteRefreshToken.Request());

        [Authorize]
        [HttpGet("test/me")]
        public IActionResult TestMe()
        {
            var currentUser = _authenticationService.GetCurrentUser();
            // do stuff with the currently loggedin user.
            return Ok(currentUser); // for example, return the whole object to UI
        }
    }
}