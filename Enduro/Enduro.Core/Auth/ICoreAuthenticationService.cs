using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Core.Auth
{
    public interface ICoreAuthenticationService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns>Object on success; null on failure.</returns>
        Task<AccessTokenResponse> TryCreateAccessToken(string username, string password);
        Task<AccessTokenResponse> TryRefreshAccessToken(string refreshToken);

        /// <summary>
        /// Get currently already authentication user.
        /// </summary>
        /// <returns></returns>
        AuthenticatedUser GetCurrentUser();

    }

    public class AccessTokenResponse
    {
        public string AccessToken { get; set; }

        public string TokenType { get; set; }

        public string ExpiresIn { get; set; }
        public string RefreshToken { get; set; }
    }
}
