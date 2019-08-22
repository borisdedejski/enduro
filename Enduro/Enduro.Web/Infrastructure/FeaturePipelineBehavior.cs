using FluentValidation;
using FluentValidation.Results;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Enduro.Web.Insfrastructure
{
    public class FeaturePipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
         where TRequest : IRequest<TResponse>
         where TResponse : class
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;
        private readonly IDocumentSession _session;

        public FeaturePipelineBehavior(IEnumerable<IValidator<TRequest>> validators, IDocumentSession session)
        {
            _validators = validators;
            _session = session;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            TResponse response;
            var errors = Validate(request);
            if (errors.Any())
                throw new ValidationException(errors);

            response = await next();

            await _session.SaveChangesAsync();


            return response;
        }

        private IEnumerable<ValidationFailure> Validate(TRequest request)
        {
            var context = new ValidationContext(request);
            return _validators
                .Select(validator => validator.Validate(context))
                .SelectMany(result => result.Errors);
        }
    }
}
