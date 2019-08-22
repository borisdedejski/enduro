using Enduro.Core;
using FluentValidation;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Cars
{
    public class QueryImages
    {
        public class Request : IRequest<Response>
        {
        }

        public class Response
        {
            public List<Guid> ImageIds { get; set; }
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
                List<Guid> imageIds = _session.Query<Image>()
                    .Select(x => x.Id).ToList();

                return new Response
                {
                    ImageIds = imageIds
                };

            }


        }
    }
}
