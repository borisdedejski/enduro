﻿using Enduro.Core.Users;
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
    public class VerifyUser
    {
        public class Request : IRequest<Response>
        {
            public string VerificationCode { get; set; }
        }

        public class Response
        {
        }

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(x => x.VerificationCode).NotEmpty();
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
                var user = await _session.Query<User>()
                     .Where(x => x.VerificationCode == request.VerificationCode)
                     .FirstOrDefaultAsync(cancellationToken);

                if (user == null)
                    throw new InvalidVerificationCodeException();

                user.Verify(request.VerificationCode);

                _session.Store(user);


                var users = await _session.Query<User>()
                    .Where(x => x.Id != user.Id)
                    .ToListAsync();

                //foreach (User owner in users)
                //{
                //    var notification = Notification.CreateNotification(user.Id, owner.Id);
                //    notification.Type = Notification.NotificationType.NewFriend;
                //    _session.Store(notification);
                //    await _session.SaveChangesAsync();

                //    await _notificationsService.SendNotification(notification.OwnerId);
                //}

                return new Response();
            }
        }
    }
}
