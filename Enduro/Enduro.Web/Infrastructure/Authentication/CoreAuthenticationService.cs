using Enduro.Core;
using Enduro.Core.Auth;
using Enduro.Core.Users;
using Marten;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Web.Infrastructure.Authentication
{
    public class CoreAuthenticationService : ICoreAuthenticationService
    {
        private readonly IBootstrapperConfig _config;
        private readonly IDocumentSession _session;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CoreAuthenticationService(
            IBootstrapperConfig config,
            IDocumentSession session,
            IHttpContextAccessor httpContextAccessor)
        {
            _config = config;
            _session = session;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<AccessTokenResponse> TryCreateAccessToken(string username, string password)
        {
            var user = await _session.Query<User>().FirstOrDefaultAsync(x => x.Email == username);
            if (user == null || !user.CanSignIn(password))
                return null;

            return BuildAccessToken(user);
        }

        public async Task<AccessTokenResponse> TryRefreshAccessToken(string refreshToken)
        {
            var refreshTokenTicket = await _session.Query<RefreshTokenTicket>()
                .FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);

            if (refreshTokenTicket == null)
                return null;
            if (refreshTokenTicket.ExpirationDate < DateTime.UtcNow)
                return null;

            var user = await _session.Query<User>().FirstOrDefaultAsync(x => x.Id == refreshTokenTicket.UserId);
            if (user == null)
                return null;

            _session.Eject(refreshTokenTicket);
            return BuildAccessToken(user);
        }

        private AccessTokenResponse BuildAccessToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.Jwt_Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.FullName),
                new Claim("username", user.Email),
                new Claim("email", user.Email),
                new Claim("avatarUri", user.AvatarUri.ToString()),
                //new Claim("isAdmin", user.IsAdmin.ToString())
            };

            // create access token
            var expiresInSeconds = (int)TimeSpan.FromMinutes(30).TotalSeconds;
            var token = new JwtSecurityToken(
                issuer: _config.Jwt_Issuer,
                audience: _config.Jwt_Issuer,
                expires: DateTime.Now.AddSeconds(expiresInSeconds),
                signingCredentials: creds,
                claims: claims);

            // create refresh token
            var refreshExpiresInSeconds = (int)TimeSpan.FromDays(15).TotalSeconds;
            var jwtRefreshToken = new JwtSecurityToken(
                issuer: _config.Jwt_Issuer,
                audience: _config.Jwt_Issuer,
                expires: DateTime.Now.AddSeconds(refreshExpiresInSeconds),
                signingCredentials: creds,
                claims: claims);

            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            var refreshToken = new JwtSecurityTokenHandler().WriteToken(jwtRefreshToken);

            var refreshTokenTicket = new RefreshTokenTicket(refreshToken, user.Id, refreshExpiresInSeconds);
            _session.Store(refreshTokenTicket);

            return new AccessTokenResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                TokenType = "bearer",
                ExpiresIn = expiresInSeconds.ToString()
            };
        }

        public AuthenticatedUser GetCurrentUser()
        {
            var claimsPrincipal = _httpContextAccessor.HttpContext.User;
            if (claimsPrincipal == null)
                throw new ArgumentNullException(nameof(claimsPrincipal));

            return new AuthenticatedUser
            {

                Id = new Guid(claimsPrincipal.FindFirstValue("id")),
                Username = claimsPrincipal.FindFirstValue("username"),
                Email = claimsPrincipal.FindFirstValue(ClaimTypes.Email),
                FullName = claimsPrincipal.FindFirstValue("name"),
                AvatarUri = new FilePath(FileContainers.UserProfiles, $"{claimsPrincipal.FindFirstValue("id")}.png"),
                //IsAdmin = Convert.ToBoolean(claimsPrincipal.FindFirstValue("isAdmin"))
            };
        }
    }
}
