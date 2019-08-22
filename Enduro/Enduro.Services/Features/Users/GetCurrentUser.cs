using Enduro.Core;
using Enduro.Core.Auth;
using FluentValidation;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Users
{
    public class GetCurrentUser
    {
        public class Request : IRequest<Response>
        {

        }

        public class Response
        {
            public Guid Id { get; set; }
            public string Email { get; set; }
            public string FullName { get; set; }
            public FilePath AvatarUri { get; set; }
            //public bool IsAdmin { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {

            }
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
                var user =  _authenticationService.GetCurrentUser();

                return new Response
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUri = user.AvatarUri,
                    //IsAdmin = user.IsAdmin
                };
            }
        }
    }
}
