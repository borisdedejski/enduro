using Enduro.Core;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Images
{
    public class DeleteImage
    {
        public class Request : IRequest<Response>
        {
            public Guid ImageId { get; set; }
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
                var image = _session.Query<Image>()
                   .Where(x => x.Id == request.ImageId)
                   .Single();

                _session.Delete(image);

                return new Response
                {
                };
            }

        }

    }
}
