using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Enduro.Core;
using Enduro.Services.Features.Cars;
using Enduro.Services.Features.Images;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Enduro.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IDocumentSession _session;

        public ImagesController(IMediator mediator, IDocumentSession session)
        {
            _mediator = mediator;
            _session = session;
        }

        [HttpGet]
        public Task<QueryImages.Response> QueryImages([FromQuery]QueryImages.Request request)
        {
            request = request ?? new QueryImages.Request();
            return _mediator.Send(request);
        }

        [HttpPost]
        public Task<PostImage.Response> PostImage([FromForm]PostImage.Request request)
        {
            request.Files = Request.Form.Files.ToArray();
            return _mediator.Send(request);
        }

        [HttpGet]
        [Route("~/api/images/{id}")]
        public FileStreamResult ViewImage(Guid id)
        {
            Core.Image image = _session.Query<Image>().FirstOrDefault(x => x.Id == id);
            if(image!=null)
            {
                MemoryStream ms = new MemoryStream(image.Data);
                return new FileStreamResult(ms, image.ContentType);
            }
            return null;
        }

        [HttpDelete("{imageId}")]
        public Task<DeleteImage.Response> DeleteImage([FromRoute]DeleteImage.Request request) =>
            _mediator.Send(request ?? new DeleteImage.Request());

        [HttpDelete]
        public Task<DeleteImagesAll.Response> DeleteImagesAll([FromQuery]DeleteImagesAll.Request request) =>
            _mediator.Send(request ?? new DeleteImagesAll.Request());
    }
}