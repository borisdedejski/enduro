using Enduro.Core;
using Enduro.Core.Auth;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Auth
{
    public class DeleteRefreshToken
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
            private readonly ICoreAuthenticationService _authenticationService;

            public Handler(IDocumentSession session, ICoreAuthenticationService authenticationService)
            {
                _session = session;
                _authenticationService = authenticationService;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var userId = _authenticationService.GetCurrentUser().Id;
                _session.Delete<RefreshTokenTicket>(userId);

                return new Response();
            }
        }
    }
}
