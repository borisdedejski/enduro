using System.Threading.Tasks;
using Enduro.Services;
using Enduro.Core.Users;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Enduro.Web.Infrastructure
{
    public class EmailService : IEmailService
    {
        private readonly IBootstrapperConfig _config;
        public EmailService(IBootstrapperConfig config)
        {
            _config = config;
        }

        /// <summary>
        /// Sends a verification email to the user
        /// </summary>
        /// <param name="user">user to whom we want to send the email</param>
        public async Task SendVerificationEmail(User user)
        {
            var verificationLink = $"https://localhost:44319/api/registration/verification/{user.VerificationCode}";

            // var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(_config.SENDGRID_API_KEY);
            var from = new EmailAddress("noreply@endro.com", "Team Endruo");
            var subject = "Enduro Account Activation";
            var to = new EmailAddress(user.Email, user.FullName);
            var plainTextContent = $"Please click the following link to register your account: ({verificationLink}), expires in 24h";
            var htmlContent = $@"Please <a href=""{verificationLink}"">click here</a> to activate your account.<br/> Activation link expires in 24h.";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task SendPasswordResetEmail(User user, string token, string userAgent, string ipAddress)
        {
            var passwordResetLink = $"https://localhost:44319/reset-password?email={user.Email}&token={token}";

            var plainTextMessage = $"Hi {user.FullName}," +
                $"You recently requested a password reset for your Enduro account. Click the following link to reset it." +
                $"{passwordResetLink} If you did not request a password reset, please ignore this email. This password reset is only valid" +
                $"for the next 30 minutes" +
                $"Password reset requested from: {userAgent}";

            const string buttonStyle = "font-size: 1.5rem; background-color: #2dc997; color: white; margin-top: 4px";
            var htmlMessage = $@"Hi {user.FullName}, <br/>
                You recently requested a password reset for your Enduro account. Click the button below to reset it. <br/>
                <a href=""{passwordResetLink}""><button style=""{buttonStyle}"">Reset Password</button></a> <br/>
                If you did not request a password reset, please ignore this email. This password reset is only valid for the next 30 minutes <br/>
                Password reset requested from: {userAgent}";

            // var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(_config.SENDGRID_API_KEY);
            var from = new EmailAddress("noreply@enduro.com", "Team Enduro");
            var subject = "Enduro Password Reset";
            var to = new EmailAddress(user.Email, user.FullName);
            var plainTextContent = plainTextMessage;
            var htmlContent = htmlMessage;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
