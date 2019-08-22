using Enduro.Core;
using FluentValidation;
using FluentValidation.Results;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using Enduro.Services;
namespace Enduro.Web
{
    public class WebApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is ValidationException validationException)
            {
                var response = new ApiErrorResponse
                {
                    Errors = validationException.Errors.Select(x => new ApiErrorResponse.Error(x))
                };
                context.Result = new BadRequestObjectResult(response);
                context.ExceptionHandled = true;
            }
            else if (context.Exception is NotFoundCoreException notFoundCoreException)
            {
                var response = new ApiErrorResponse
                {
                    Errors = new List<ApiErrorResponse.Error> { new ApiErrorResponse.Error { ErrorMessage = notFoundCoreException.Message } }
                };
                context.Result = new NotFoundObjectResult(response);
                context.ExceptionHandled = true;
            }

            else if (context.Exception is CoreException coreException)
            {
                var response = new ApiErrorResponse
                {
                    Errors = new List<ApiErrorResponse.Error> { new ApiErrorResponse.Error { ErrorMessage = coreException.Message } }
                };
                context.Result = new BadRequestObjectResult(response);
                context.ExceptionHandled = true;
            }
            else if (context.Exception is UnauthorizedAccessException unauthException)
            {
                var response = new ApiErrorResponse
                {
                    Errors = new List<ApiErrorResponse.Error>
                    {
                        new ApiErrorResponse.Error { ErrorMessage = "Unauthorized access." }
                    }
                };
                context.Result = new UnauthorizedResult();
                context.ExceptionHandled = true;
            }
            else if (context.Exception is InvalidCredentialException credentialException)
            {
                var response = new ApiErrorResponse
                {
                    Errors = new List<ApiErrorResponse.Error> { new ApiErrorResponse.Error { ErrorMessage = "Invalid credentials." } }
                };
                context.Result = new BadRequestObjectResult(response);
                context.ExceptionHandled = true;
            }
        }
    }
    public class ApiErrorResponse
    {
        public IEnumerable<Error> Errors { get; set; } = Enumerable.Empty<Error>();

        public class Error
        {
            public Error()
            {
            }

            public Error(ValidationFailure failure)
            {
                ErrorMessage = failure.ErrorMessage;
                PropertyName = failure.PropertyName;
                AttemptedValue = failure.AttemptedValue;
            }

            public string ErrorMessage { get; set; }
            public string PropertyName { get; set; }
            public object AttemptedValue { get; set; }
        }
    }
}
