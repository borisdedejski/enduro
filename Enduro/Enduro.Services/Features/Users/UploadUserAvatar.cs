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
    public class UploadUserAvatar
    {
        public class Request : IRequest<Response>
        {
            public List<byte[]> Files { get; set; }
        }

        public class Response
        {
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
            private readonly IFileClient _fileClient;
            private readonly ICoreAuthenticationService _authenticationService;

            public Handler(IDocumentSession session, IFileClient fileClient, ICoreAuthenticationService authenticationService)
            {
                _session = session;
                _fileClient = fileClient;
                _authenticationService = authenticationService;

            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var path = new FilePath();
                path.Container = FileContainers.UserProfiles;
                //path.File = $"bc267bfd-09ce-4dfa-95b2-c01be7b56a02.png";
                path.File = $"{_authenticationService.GetCurrentUser().Id}.png";

                foreach (var file in request.Files)
                {
                    if (file.Length > 0)
                    {
                        _fileClient.SaveFile(path, file);
                    }
                }

                return new Response();
            }

            
        }
    }
}
