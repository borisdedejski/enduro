using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Enduro.Services.Features.Cars;
using Enduro.Services.Features.Users;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UploadsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("~/api/upload/user")]
        public async Task<IActionResult> UploadUserAvatar()
        {
            var filesAsByteArrays = new List<byte[]>();

            var form = await Request.ReadFormAsync();
            var file = form.Files.First();

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                filesAsByteArrays.Add(memoryStream.ToArray());
            }

            UploadUserAvatar.Request request = new UploadUserAvatar.Request
            {
                Files = filesAsByteArrays
            };
            await _mediator.Send(request);

            return Ok();
        }

    }
}