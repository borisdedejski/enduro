using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core
{
    public class ResetTicket
    {
        public string UserEmail { get; set; }  // [Identity]
        public string TokenHash { get; set; }
        public DateTime ExpirationDate { get; private set; }
        public bool TokenUsed { get; set; }

        public ResetTicket(string userEmail, string tokenHash, DateTime expirationDate)
        {
            UserEmail = userEmail;
            TokenHash = tokenHash;
            ExpirationDate = expirationDate;
            TokenUsed = false;
        }
    }
}
