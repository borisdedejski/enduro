using Enduro.Core.Cars;
using System;
using System.Collections.Generic;
using System.Security.Authentication;

namespace Enduro.Core.Users
{
    public enum GenderEnum
    {
        Male,
        Female,
        Other
    }

    public class User : RootEntity
    {

        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string DriverLicenseNo { get; set; }
        public int MobileNumber { get; set; }
        public string Address { get; set; }
        public int AddressNo { get; set; }
        public string IDNumber { get; set; }
        public int EMBG { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public GenderEnum Gender { get; set; }
        public float Review { get; set; }
        public List<Guid> ListOfRentedCars { get; set; }
        public List<Guid> ListCars = new List<Guid>();
        public List<Guid> ListOfListedCars { get; set; }
        public List<Guid> ListOfRequestCars { get; set; } //When car is payed it will go in request, when accept is pressed it will go in rented
        public float ProfitMade { get; set; }
        public float ProfitPerCar { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsVerified { get; set; }
        public string VerificationCode { get; private set; } // The code got from the email

        public FilePath AvatarUri => new FilePath
        {
            Container = FileContainers.UserProfiles,
            File = $"{Id}.png"
        };

        private User()
        {
        }

        public static User SignUp(string fullName, string email, string passwordPlain)
        {
            var user = new User
            {
                FullName = fullName,
                Email = email,
                Password = SecurePasswordHasher.Hash(passwordPlain),
                VerificationCode = GenerateVerificationCode(),
                IsAdmin = false
            };
            return user;
        }

        public bool CanSignIn(string passwordPlain)
        {
            return IsVerified && SecurePasswordHasher.Verify(passwordPlain, Password);
        }

        public void ResetPassword(string newPassword)
        {
            Password = SecurePasswordHasher.Hash(newPassword);
        }

        public void Verify(string code, DateTime? checkTimeUtc = null)
        {
            checkTimeUtc = checkTimeUtc ?? DateTime.UtcNow;

            bool isCodeExpired = checkTimeUtc - CreatedOnUtc > TimeSpan.FromHours(24);
            if (isCodeExpired)
                throw new ExpiredVerificationCodeException();

            if (code != VerificationCode)
                throw new InvalidVerificationCodeException();

            IsVerified = true;
        }

        public void AddCarToList(Guid carId, User user)
        {
            if(user.ListOfListedCars==null)
            {
                ListOfListedCars = new List<Guid>();
                ListOfListedCars.Add(carId);
            }
            else
            {
                ListOfListedCars.Add(carId);
            }
            //if (ListOfListedCars.Equals(null))
            //{
            //    ListOfListedCars = new List<Guid>();
            //    ListOfListedCars.Add(carId);
            //}
            //else
            //{
            //    ListOfListedCars.Add(carId);
            //}

        }


        private static string GenerateVerificationCode() => Guid.NewGuid().ToString().Replace("-", "").ToLowerInvariant();


    }
}


//public static User CreateVerifiedUser(string fullName, string email, string passwordPlain)
//{
//    var user = new User
//    {
//        FullName = fullName,
//        Email = email,
//        IsVerified = true,
//        IsAdmin = false
//    };
//    return user;
//}