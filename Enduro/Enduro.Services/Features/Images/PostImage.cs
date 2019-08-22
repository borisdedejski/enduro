using FluentValidation;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
namespace Enduro.Services.Features.Cars
{
    public class PostImage
    {
        public static Guid imageId;
        public class Request : IRequest<Response>
        {
            public IList<IFormFile> Files { get; set; }
        }

        public class Response
        {
            public Guid ImageId { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }
            public static void setId(Guid id)
            {
                Guid saveId = id;
                imageId = id;
            }
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var uploadedImage = request.Files.FirstOrDefault();
                if (uploadedImage == null || uploadedImage.ContentType.ToLower().StartsWith("image/"))
                {
                    MemoryStream memoryStream = new MemoryStream();
                    uploadedImage.OpenReadStream().CopyTo(memoryStream);
                    System.Drawing.Image image = System.Drawing.Image.FromStream(memoryStream);

                    Core.Image imageEntity = new Core.Image()
                    {
                        Id = Guid.NewGuid(),
                        Name = uploadedImage.Name,
                        Data = memoryStream.ToArray(),
                        Width = image.Width,
                        Height = image.Height,
                        ContentType = uploadedImage.ContentType
                    };
                    _session.Store(imageEntity);
                    _session.SaveChanges();
                    setId(imageEntity.Id);
                }

                return new Response
                {
                    ImageId = imageId
                };
            }


        }
    }
}
