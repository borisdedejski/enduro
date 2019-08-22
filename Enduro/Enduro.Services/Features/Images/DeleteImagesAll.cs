using Enduro.Core;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Images
{
    public class DeleteImagesAll
    {
        public class Request : IRequest<Response>
        {
        }

        public class Response
        {
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var images = await _session.Query<Image>()
                    .ToListAsync();

                foreach (var image in images)
                {
                    _session.Delete(image);
                }

                return new Response
                {
                };
            }

        }

    }
}
