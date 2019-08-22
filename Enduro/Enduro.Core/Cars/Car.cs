using Enduro.Core.Users;
using System;
using System.Collections.Generic;
using System.Text;
using static Enduro.Core.Cars.Exception;

namespace Enduro.Core.Cars
{
   
    public enum CarClassEnum
    {
       Bussiness, 
       Casual,
       Luxury
    }

    public class Car : RootEntity
    {

        public List<Comments> ListComments = new List<Comments>();
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string CarClass { get; set; }
        public int NumberOfTrips { get; set; }
        public string Gas { get; set; }
        public int NumberOfDoors { get; set; }
        public int HorsePower { get; set; }
        public int LitersPerKm { get; set; } // liters per 100 km
        public string Description { get; set; }
        public string GuideLines { get; set; }
        public float Reviews { get; set; }
        public float Price { get; set; }
        public float TripPrice { get; set; }
        public string LocationCity { get; set; }
        public string LocationCountry { get; set; }
        public string LocationPickUp { get; set; }
        public List<string> Features { get; set; }
        public string Insurance { get; set; } //or string but need to upload so filepath
        public List<Guid> CarImages { get; set; }
        public DateTime RentedFrom { get; set; }
        public DateTime RentedTo { get; set; }
        public Coordinate Coordinate { get; set; }
        public QRBarcode Barcode { get; set; }
        public Guid UserId { get; set; }
        public string Transmission { get; set; }

        public Car() { }

    

        public static Car ListYourCar(
            Guid userId,
            string make,
            string model,
            int year,
            string gas,
            int numberOfDoors,
            int horsePower,
            int litersPerKm,
            string description,
            string guideLines,
            float price,
            string locationCity,
            string locationCountry,
            string locationPickUp,
            List<string> features,
            string insurance,
            List<Guid> carImages,
            DateTime rentedFrom,
            DateTime rentedTo,
            string carClass,
            string transmission,
            Coordinate coordinate)
        {

            var car = new Car
            {
                UserId = userId,
                //Make = make,
                Make = make[0].ToString().ToUpper()+make.Substring(1).ToLower(), //first letter capital 
                Model = model,
                Year = year,
                Gas = gas,
                NumberOfDoors = numberOfDoors,
                HorsePower = horsePower,
                LitersPerKm = litersPerKm,
                Description = description,
                GuideLines = guideLines,
                Price = price,
                LocationCity = locationCity[0].ToString().ToUpper()+locationCity.Substring(1).ToLower(),
                LocationCountry = locationCountry,
                LocationPickUp = locationPickUp,
                Features = features,
                Insurance = insurance,
                CarImages = carImages,
                RentedFrom = rentedFrom,
                RentedTo = rentedTo,
                CreatedOnUtc = DateTime.UtcNow,
                CarClass = carClass,
                Transmission = transmission,
                Coordinate = coordinate
            };

            return car;
        }
        public void AddComment(Guid userId, string fullName, string message)
        {
            var commentId = Guid.NewGuid();
            Comments comment = new Comments(commentId, userId, fullName, message);

            ListComments.Add(comment);
        }
        //public static DateTime CheckForValidDate(DateTime RentedFrom, DateTime RentedTo)
        //{
        //    if (RentedFrom.Date.AddHours(23).AddMinutes(59) < DateTime.UtcNow)
        //    {
        //        throw new InvalidDateTimeException();
        //    }
        //    else if (RentedFrom.Date.AddHours(23).AddMinutes(59) > RentedTo.Date)
        //    {
        //        throw new InvalidDateTimeException();

        //    }
        //    else
        //        return DateTime.UtcNow;
        //}

        public void AddCoordinate(Coordinate coordinate)
        {
            Coordinate.Latitude = coordinate.Latitude;
            Coordinate.Longitude = coordinate.Longitude;

        }

        public void RemoveComment(Guid commentId, Guid userId, Car car)
        {
            
            foreach (var comment in car.ListComments)
            {
                if ((comment.CommentId==commentId) && (comment.UserId == userId))
                {
                    int index = ListComments.IndexOf(comment);
                    ListComments.Remove(ListComments[index]);
                    break;
                }

            }
        }
        /// <summary>
        /// This formula also needs to be implemented to the front end in case to bind the data
        /// </summary>
        /// <param name="rentFrom"></param>
        /// <param name="rentTo"></param>
        /// <param name="price"></param>
        /// <returns></returns>
        public float CalculateTripPrice(DateTime rentFrom, DateTime rentTo, float price)
        {
            int totalDays = rentTo.Day - rentFrom.Day;

            TripPrice = price * totalDays;
            return TripPrice;
        }

    }

}
