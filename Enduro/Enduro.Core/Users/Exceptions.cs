using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core.Users
{
    public class InvalidVerificationCodeException : CoreException
    {
    }

    public class ExpiredVerificationCodeException : CoreException
    {
    }

    public class UserDoesNotExistException : CoreException
    {
    }
}
