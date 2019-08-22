using Enduro.Core;
using Enduro.Core.Users;
using FluentValidation;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Users
{
    public class ResetPassword
    {
        public class Request : IRequest<Response>
        {
            public string Email { get; set; }
            public string Token { get; set; }
            public string Password { get; set; }
            public string ConfirmPassword { get; set; }
        }

        public class Response
        {

        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(x => x.Email).EmailAddress();
                RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
                RuleFor(x => x.ConfirmPassword).Equal(x => x.Password);
            }
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
                var resetTicket = _session.Query<ResetTicket>()
                    .FirstOrDefault(x => x.UserEmail == request.Email);

                if (resetTicket == null)
                    throw new NotFoundCoreException();

                if (SecurePasswordHasher.Verify(request.Token, resetTicket.TokenHash) == false)
                    throw new Exception(); //TODO new exception for this error.

                if (resetTicket.TokenUsed)
                    throw new Exception(); //TODO new exception for this error.

                if (resetTicket.ExpirationDate < DateTime.UtcNow)
                    throw new Exception(); //TODO new exception for this error.

                var user = _session.Query<User>()
                    .FirstOrDefault(x => x.Email == resetTicket.UserEmail);

                user?.ResetPassword(request.Password);
                resetTicket.TokenUsed = true;

                _session.Store(resetTicket);
                _session.Store(user);

                return new Response();
            }
        }
    }
}
