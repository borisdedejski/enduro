using Enduro.Core.Cars;
using Enduro.Core.Users;
using Marten;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Cars
{
    public class AddComment
    {
        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public Guid Id { get; set; }
            public string Message { get; set; }
            public Guid UserId { get; set; }
        }

        public class Response { }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var car = await _session.Query<Car>()
                    .Where(x => x.Id == request.Id)
                    .SingleAsync();

                var user = await _session.Query<User>()
                    .Where(x => x.Id == request.UserId)
                    .SingleAsync();

                car.AddComment(user.Id, user.FullName,request.Message);
                _session.Store(car);

                return new Response();
            }
        }
    }
}
