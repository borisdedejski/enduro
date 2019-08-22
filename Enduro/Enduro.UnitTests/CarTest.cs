using Enduro.Core;
using Enduro.Core.Cars;
using Enduro.Core.Users;
using QRCoder;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Drawing;
using Xunit;
using static Enduro.Core.Cars.Exception;
using Image = Enduro.Core.Image;

namespace Enduro.UnitTests
{
    public class CarTest
    {
        private readonly Car _car;
        private readonly User _user;
        private readonly User _secondUser;
        private readonly Coordinate _coordinate;

        public CarTest()
        {
            _user = User.SignUp("Boris Dedejski", "boris@gmail.com", "superuser");
            _secondUser = User.SignUp("Trajce ", "trajce@gmail.com", "superuser");
            _car = new Car();
            _coordinate = new Coordinate(42.0033464, 21.4168083);
        }
        //Tests for Date Checking 
        //[Fact]
        //public void if_rentFrom_time_is_greater_than_rentTo_time_should_throw_exception()
        //{
        //    DateTime RentFrom = DateTime.Now.AddHours(30);
        //    DateTime RentTo = DateTime.UtcNow;
        //    List<string> Features = new List<string>();
        //    Features.Add("usb");
        //    string carInsurance = "vardar";
        //    List<Guid> CarImages = new List<Guid>();

        //    Should.Throw<InvalidDateTimeException>(() =>
        //    {
        //        Car.ListYourCar(_user.Id, "bmw", "m6", 2014, "diesel", 4, 124, 124, "descript", "guideline", 124, "strumica", "macedonia",
        //             "partizanska 125", Features, carInsurance, CarImages, RentFrom, RentTo, "business", "automatic",_coordinate);
        //    });
        //}

        //[Fact]
        //public void if_rentFrom_time_is_smaller_than_time_now_should_throw_exception()
        //{
        //    DateTime TimeNow = DateTime.UtcNow.AddHours(30);
        //    DateTime RentFrom = DateTime.Now;
        //    DateTime RentTo = DateTime.UtcNow.AddHours(50);

        //    List<string> Features = new List<string>();
        //    Features.Add("usb");
        //    string carInsurance = "vardar";
        //    List<Guid> CarImages = new List<Guid>();
        //    Should.Throw<InvalidDateTimeException>(() =>
        //    {
        //        Car.ListYourCar(_user.Id, "bmw", "m6", 2014, "diesel", 4, 124, 124, "descript", "guideline", 124, "strumica", "macedonia",
        //             "partizanska 125", Features, carInsurance, CarImages, RentFrom, RentTo, "business", "automatic", _coordinate);
        //    });
        //}

        //[Fact]
        //public void if_rentTo_time_is_smaller_than_time_now_should_throw_exception()
        //{
        //    DateTime TimeNow = DateTime.UtcNow.AddHours(30);
        //    DateTime RentFrom = DateTime.Now.AddHours(40);
        //    DateTime RentTo = DateTime.Now;

        //    List<string> Features = new List<string>();
        //    Features.Add("usb");
        //    string carInsurance = "vardar";
        //    List<Guid> CarImages = new List<Guid>();

        //    Should.Throw<InvalidDateTimeException>(() =>
        //    {
        //        Car.ListYourCar(_user.Id, "bmw", "m6", 2014, "diesel", 4, 124, 124, "descript", "guideline", 124, "strumica", "macedonia",
        //             "partizanska 125", Features, carInsurance, CarImages, RentFrom, RentTo, "business", "automatic", _coordinate);
        //    });
        //}
        //Test for adding comments & removing comments
        [Fact]
        public void if_user_comments_it_should_be_added_in_car_list_comments()
        {
            _car.AddComment(_user.Id, _user.FullName, "This is users comment");
            _car.AddComment(_user.Id, _user.FullName, "This is second comment");

            _car.ListComments.Count.ShouldBe(2);

        }
        [Fact]
        public void when_user_comments_needs_to_be_shown_his_name_and_comment()
        {
            _car.AddComment(_user.Id, _user.FullName, "mymessage");
            _car.ListComments[0].FullName.ToString().ShouldContain("boris");
        }
        [Fact]
        public void if_user_wants_to_remove_his_comment_he_can_do_it()
        {
            _car.AddComment(_user.Id, _user.FullName, "mycomment");
            _car.RemoveComment(_car.ListComments[0].CommentId, _user.Id, _car);

            _car.ListComments.Count.ShouldBe(0);
        }
        [Fact]
        public void if_user_wants_to_delete_another_user_comment_he_should_not_be_allowed()
        {
            _car.AddComment(_user.Id, _user.FullName, "mycomment1");
            _car.AddComment(_user.Id, _secondUser.FullName, "mycomment");

            _car.RemoveComment(_user.Id, _secondUser.Id, _car);
            _car.ListComments.Count.ShouldBe(2);
        }

        //When user lists car the if location city first letter needs to be transformed to capital
        [Fact]
        public void if_user_adds_locationcity_with_lower_case_first_letter_should_be_converted_to_capital()
        {
            DateTime RentFrom = DateTime.Now.AddHours(40);
            DateTime RentTo = DateTime.Now.AddHours(50);
            List<string> Features = new List<string>();
            Features.Add("usb");
            string carInsurance = "vardar";
            List<Guid> CarImages = new List<Guid>();
            var listedCar = Car.ListYourCar(_user.Id, "bmw", "m6", 2014, "diesel", 4, 124, 124, "descript", "guideline", 124, "strumica", "macedonia",
                    "partizanska 125", Features, carInsurance, CarImages, RentFrom, RentTo, "business", "automatic", _coordinate);

            listedCar.LocationCity.ShouldBe("Strumica");
        }

        [Fact]
        public void when_user_lists_the_car_the_car_id_should_be_stored_in_his_listed_cars_array()
        {
            DateTime RentFrom = DateTime.Now.AddHours(40);
            DateTime RentTo = DateTime.Now.AddHours(50);
            List<string> Features = new List<string>();
            Features.Add("usb");
            string carInsurance = "vardar";
            List<Guid> CarImages = new List<Guid>();

            var listedCar = Car.ListYourCar(_user.Id, "bmw", "m6", 2014, "diesel", 4,
                124, 124, "descript", "guideline", 124, "strumica", "macedonia",
                  "partizanska 125", Features, carInsurance, CarImages, RentFrom, RentTo, "business",
                  "automatic", _coordinate);

            _user.AddCarToList(listedCar.Id, _user);
            _user.ListOfListedCars.Count.ShouldBe(1);

        }
        [Fact]
        public void when_car_is_added_in_the_coordinates_field_coordinates_need_to_be_written()
        {
            DateTime RentFrom = DateTime.Now.AddHours(40);
            DateTime RentTo = DateTime.Now.AddHours(50);
            List<string> Features = new List<string>();
            Features.Add("usb");
            string carInsurance = "vardar";
            List<Guid> CarImages = new List<Guid>();

            var listedCar = Car.ListYourCar(_user.Id, "bmw", "m6", 2014, "diesel", 4,
                124, 124, "descript", "guideline", 124, "strumica", "macedonia",
                  "partizanska 125", Features, carInsurance, CarImages, RentFrom, RentTo, "business",
                  "automatic", _coordinate);

            listedCar.AddCoordinate(_coordinate);
            listedCar.Coordinate.Latitude.ShouldBe(_coordinate.Latitude);
        }
        [Fact]
        public void when_trip_is_accepted_should_calculate_the_total_trip_price()
        {
            DateTime RentFrom = DateTime.Now;
            DateTime RentTo = DateTime.Now.AddHours(48);
            var pricePerDay = 200;

            var result = _car.CalculateTripPrice(RentFrom, RentTo, pricePerDay);
            result.ShouldBe(400);
        }
    }
}
