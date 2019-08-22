using Enduro.Core.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core.PayedCars
{
    public class PayedCar : RootEntity
    {
        public Guid UserPaysId { get; set; }    //The id of user who payed the car
        public Guid UserRentsId { get; set; }
        public Guid PayedCarId { get; set; }
        public DateTime RentedFrom { get; set; }
        public DateTime RentedTo { get; set; }

        public int TripTotalPrice { get; set; }
        public string UserPaysMobile { get; set; }
        public string UserPaysCountry { get; set; }
        public string UserPaysLicenseCountry { get; set; }
        public string UserPaysState { get; set; }
        public string UserPaysLicenseNumber { get; set; }
        public int ValidUntilDay { get; set; }
        public int ValidUntilYear { get; set; }
        public string UserPaysFullName { get; set; }
        public DateTime UserPaysDateOfBirth { get; set; }
        
        public bool IsAccepted { get; set; }
        public void PayYourCar(
            Guid userPaysId,
            Guid userRentsId,
            Guid payedCarId,
            DateTime rentedFrom,
            DateTime rentedTo,
            int tripTotalPrice,
            string userPaysMobile,
            string userPaysCountry,
            string userPaysLicenseCountry,
            string userPaysState,
            string userPaysLicenseNumber,
            int validUntilDay,
            int validUntilYear,
            string userPaysFullName,
            DateTime userPaysDateOfBirth
            )
        {
            UserPaysId = userPaysId;
            UserRentsId = userRentsId;
            PayedCarId = payedCarId;
            RentedFrom = rentedFrom;
            RentedTo = rentedTo;
            TripTotalPrice = tripTotalPrice;
            UserPaysMobile = userPaysMobile;
            UserPaysCountry = userPaysCountry;
            UserPaysLicenseCountry = userPaysLicenseCountry;
            UserPaysState = userPaysState;
            UserPaysLicenseNumber = userPaysLicenseNumber;
            ValidUntilDay = validUntilDay;
            ValidUntilYear = validUntilYear;
            UserPaysFullName = userPaysFullName;
            UserPaysDateOfBirth = userPaysDateOfBirth;
            IsAccepted = false;
        }
    }
}
