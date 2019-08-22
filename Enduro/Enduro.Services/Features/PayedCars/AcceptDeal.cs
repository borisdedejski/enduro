using Enduro.Core.PayedCars;
using Marten;
using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.PayedCars
{
    public class AcceptDeal
    {
        public class Request : IRequest<Response>
        {
            [JsonIgnore]
            public Guid Id { get; set; }    //PayedCarId
            public bool IsAccepted { get; set; }

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
                var payedCar = await _session.Query<PayedCar>()
                    .Where(x => x.Id == request.Id)
                    .SingleAsync();

                payedCar.IsAccepted = request.IsAccepted;

                _session.Store(payedCar);

                return new Response();
            }
        }
    }
}
