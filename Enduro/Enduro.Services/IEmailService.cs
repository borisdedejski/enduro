using Enduro.Core.Users;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Services
{
    public interface IEmailService
    {
        Task SendVerificationEmail(User user);
        Task SendPasswordResetEmail(User user, string tokenHash, string userAgent, string ipAddress);
    }
}
