using Enduro.Core;
using Enduro.Core.Cars;
using Enduro.Core.Users;
using Marten;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Enduro.Services.Features.Users
{
    public class QueryUser
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
        }

        public class Response
        {
            public Guid Id { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
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
            public List<Guid> ListOfListedCars { get; set; }
            public List<Guid> ListOfRequestCars { get; set; }
            public float ProfitMade { get; set; }
            public bool IsAdmin { get; set; }
            public bool IsVerified { get; set; }
            public FilePath AvatarUri { get; set; }

        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = _session.Query<User>()
                    .Where(x => x.Id == request.UserId)
                    .Single();
                
                if (user == null) throw new NotFoundCoreException();

                return new Response
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    DriverLicenseNo = user.DriverLicenseNo,
                    MobileNumber = user.MobileNumber,
                    Address = user.Address,
                    AddressNo = user.AddressNo,
                    IDNumber = user.IDNumber,
                    EMBG = user.EMBG,
                    City = user.City,
                    Country = user.Country,
                    Gender = user.Gender,
                    Review = user.Review,
                    ListOfRentedCars = user.ListOfRentedCars,
                    ListOfListedCars = user.ListOfListedCars,
                    ListOfRequestCars = user.ListOfRequestCars,
                    ProfitMade = user.ProfitMade,
                    IsAdmin = user.IsAdmin,
                    IsVerified = user.IsVerified,
                    AvatarUri = user.AvatarUri
                    
                };
            }
        }
    }
}
