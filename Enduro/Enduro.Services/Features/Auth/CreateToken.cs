using Enduro.Core.Auth;
using FluentValidation;
using Marten;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Auth
{
    public class TryCreateToken
    {
        public class Request : IRequest<Response>
        {
            [JsonProperty(PropertyName = "grant_type")]
            public string GrantType { get; set; }

            [JsonProperty(PropertyName = "username")]
            public string Username { get; set; }

            [JsonProperty(PropertyName = "password")]
            public string Password { get; set; }

            [JsonProperty(PropertyName = "refresh_token")]
            public string RefreshToken { get; set; }
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(x => x.GrantType).Must(x => x == "password" || x == "refresh_token")
                    .WithMessage("Not supported grant type");
                RuleFor(x => x.Username)
                    .Must((request, s) => request.GrantType != "password"
                                          || string.IsNullOrEmpty(s) == false).WithMessage("username error");
                RuleFor(x => x.Password)
                    .Must((request, s) => request.GrantType != "password"
                                          || string.IsNullOrEmpty(s) == false).WithMessage("password error");
                RuleFor(x => x.RefreshToken)
                    .Must((request, s) => request.GrantType != "refresh_token"
                                          || string.IsNullOrEmpty(s) == false).WithMessage("refresh_token error");
            }
        }

        public class Response
        {
            [JsonProperty(PropertyName = "access_token")]
            public string AccessToken { get; set; }

            [JsonProperty(PropertyName = "token_type")]
            public string TokenType { get; set; }

            [JsonProperty(PropertyName = "expires_in")]
            public string ExpiresIn { get; set; }
            [JsonProperty(PropertyName = "refresh_token")]
            public string RefreshToken { get; set; }
            [JsonIgnore]
            public bool HasErrors { get; set; }

        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            private readonly ICoreAuthenticationService _authenticationService;

            public Handler(IDocumentSession session, ICoreAuthenticationService coreAuthenticationService)
            {
                _session = session;
                _authenticationService = coreAuthenticationService;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var tokenResponse = new AccessTokenResponse();

                if (request.GrantType == "password")
                {
                    tokenResponse = await _authenticationService.TryCreateAccessToken(request.Username, request.Password);
                    if (tokenResponse == null)
                        return new Response { HasErrors = true };
                }
                else if (request.GrantType == "refresh_token")
                {
                    tokenResponse = await _authenticationService.TryRefreshAccessToken(request.RefreshToken);
                    if (tokenResponse == null)
                        return new Response { HasErrors = true };
                }


                return new Response
                {
                    AccessToken = tokenResponse.AccessToken,
                    RefreshToken = tokenResponse.RefreshToken,
                    TokenType = tokenResponse.TokenType,
                    ExpiresIn = tokenResponse.ExpiresIn,
                };
            }
        }
    }
}
