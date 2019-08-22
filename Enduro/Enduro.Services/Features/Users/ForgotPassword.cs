using Enduro.Core;
using Enduro.Core.Users;
using FluentValidation;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Users
{
    public class ForgotPassword
    {
        public class Request : IRequest<Response>
        {
            public string Email { get; set; }
            public string UserAgent { get; set; }
        }

        public class Response
        {

        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator() => RuleFor(x => x.Email).EmailAddress();
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            private readonly IEmailService _emailService;

            public Handler(IDocumentSession session, IEmailService emailService)
            {
                _session = session;
                _emailService = emailService;
            }


            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                //TODO: Track user-agent and possibly location/ip
                var user = _session.Query<User>()
                    .FirstOrDefault(x => x.Email == request.Email);

                if (user == null)
                    throw new NotFoundCoreException();

                var tokenAsString = GenerateToken(20);
                var tokenHash = SecurePasswordHasher.Hash(tokenAsString);

                var resetTicket = new ResetTicket(user.Email, tokenHash, DateTime.UtcNow.AddMinutes(30));

                _session.Store(resetTicket);
                await _emailService.SendPasswordResetEmail(user, tokenAsString, request.UserAgent, "127.0.0.1");
                return new Response();
            }

            private static string GenerateToken(int tokenLength)
            {
                var rngCsp = new RNGCryptoServiceProvider();
                var token = new byte[tokenLength];
                rngCsp.GetBytes(token);
                return Encoding.Unicode.GetString(token);

            }
        }
    }
}
