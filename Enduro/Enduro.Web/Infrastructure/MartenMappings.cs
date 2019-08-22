using Enduro.Core;
using Enduro.Core.Cars;
using Enduro.Core.PayedCars;
using Enduro.Core.Users;
using Marten;

namespace Enduro.Web.Insfrastructure
{
    public class MartenMappings : MartenRegistry
    {
        public MartenMappings()
        {
            For<User>()
                .Duplicate(x => x.Email, configure: idx => idx.IsUnique = true);

            For<Car>()
                .ForeignKey<User>(x => x.UserId);

            For<PayedCar>()
                .ForeignKey<User>(x => x.UserPaysId)
                .ForeignKey<User>(x => x.UserRentsId)
                .ForeignKey<Car>(x => x.PayedCarId);

            //For<ResetTicket>()
            //    .Identity(x => x.UserEmail);

            For<RefreshTokenTicket>()
                .Identity(x => x.UserId);

        }
    }
}