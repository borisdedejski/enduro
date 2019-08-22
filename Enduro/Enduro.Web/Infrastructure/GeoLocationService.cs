using Enduro.Services;
using Geocoding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Geocoding;
namespace Enduro.Web.Infrastructure
{
    public class GeoLocationService : IGeoLocationService
    {
        
        public class Response
        {

        }

        private readonly IBootstrapperConfig _config;
        public GeoLocationService(IBootstrapperConfig config, IGeocoder geocoder)
        {
            _config = config;
        }

        public async Task GeocodeAsync(string address)
        {
            
        }
    }
}
