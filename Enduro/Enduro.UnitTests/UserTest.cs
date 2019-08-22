using Enduro.Core.Cars;
using Enduro.Core.Users;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Enduro.UnitTests
{
    public class UserTest
    {
        private readonly Car _car;
        private readonly User _user;
        private readonly User _secondUser;
        private readonly User _signedUpUser;
        private readonly Coordinate _coordinate;

        public UserTest()
        {
            _user = User.SignUp("Boris Dedejski", "boris@gmail.com", "superuser");
            _secondUser = User.SignUp("Trajce ", "trajce@gmail.com", "superuser");
            _car = new Car();
            _coordinate = new Coordinate(42.0033464, 21.4168083);
            _signedUpUser = User.SignUp("pece", "pece@haselt.com", "tester");

        }

        [Fact]
        public void when_user_signups_but_does_not_verify_should_not_be_able_to_signin()
        {
            var canSignIn = _signedUpUser.CanSignIn("tester");
            canSignIn.ShouldBeFalse();
        }

        [Fact]
        public void when_user_signups_and_verifies_with_valid_code_can_signin()
        {
            var verificationCode = _signedUpUser.VerificationCode;
            _signedUpUser.Verify(verificationCode);

            _signedUpUser.CanSignIn("tester").ShouldBeTrue();
        }

        [Fact]
        public void when_user_signups_and_provides_incorrect_verification_code_should_result_in_error()
        {
            var incorrectCode = "asddasdasasdaddsaasdasdasd";

            Should.Throw<InvalidVerificationCodeException>(() =>
            {
                _signedUpUser.Verify(incorrectCode);
            });
        }

        [Fact]
        public void when_user_signups_and_provides_expired_verification_code_should_result_in_error()
        {
            var code = _signedUpUser.VerificationCode;

            Should.Throw<ExpiredVerificationCodeException>(() =>
            {
                _signedUpUser.Verify(code, DateTime.UtcNow.AddHours(25));
            });
        }

        [Fact]
        public void when_user_lists_a_car_the_listed_car_should_be_in_his_listed_car_array()
        {
            _user.AddCarToList(_car.Id, _user);
            _user.ListOfListedCars.Count.ShouldBe(1);
        }
    }
}
