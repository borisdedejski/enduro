using Enduro.Core.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core.Auth
{
    public class AuthenticatedUser
    {
        public AuthenticatedUser()
        {
        }

        public AuthenticatedUser(User user)
        {
            Id = user.Id;
            Username = user.Email;
            Email = user.Email;
            FullName = user.FullName;
            AvatarUri = user.AvatarUri;
        }

        /// <summary>
        /// User's Id
        /// </summary>
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public FilePath AvatarUri { get; set; }
        //public bool IsAdmin { get; set; }
    }
}
