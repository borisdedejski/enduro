using Enduro.Core;
using Enduro.Core.Users;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Users
{
    public class QueryUsers
    {
        public class Request : IRequest<Response>
        {
            public string SearchParam { get; set; } = "";
        }

        public class Response
        {
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();

            public class Item
            {
                public Guid Id { get; set; }
                public string FullName { get; set; }
                public bool IsVerified { get; set; }
                public DateTime SignedUpDate { get; set; }
                public FilePath AvatarUri { get; set; }

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
                var users = await _session.Query<User>()
                    //.Where(x => x.FullName.Contains(request.SearchParam, StringComparison.OrdinalIgnoreCase))
                    .ToListAsync();

                return new Response
                {

                    Items = users.Select(x => new Response.Item
                    {
                        Id = x.Id,
                        FullName = x.FullName,
                        //IsVerified = x.IsVerified,
                        SignedUpDate = x.CreatedOnUtc,
                        AvatarUri = x.AvatarUri
                    })
                };
            }
        }
    }
}
