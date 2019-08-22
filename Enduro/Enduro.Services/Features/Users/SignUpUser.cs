using Enduro.Core.Users;
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
    public class SignUpUser
    {
        public class Request : IRequest<Response>
        {
            public string FullName { get; set; }
            public string Email { get; set; }
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
                RuleFor(x => x.FullName).NotEmpty();
                RuleFor(x => x.Email).EmailAddress();
                RuleFor(x => x.Password).MinimumLength(6).MaximumLength(1000);
                RuleFor(x => x.ConfirmPassword).Equal(x => x.Password);
            }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            private readonly IEmailService _emailService;

            public Handler(IDocumentSession session ,IEmailService emailService)
            {
                _session = session;
                _emailService = emailService;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = User.SignUp(request.FullName, request.Email, request.Password);
                 _session.Store(user);

                await _emailService.SendVerificationEmail(user);
                return new Response();
            }
        }
    }
}
