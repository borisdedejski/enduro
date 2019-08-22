using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Web
{
    public interface IBootstrapperConfig
    {
        string ConnectionString { get; }
        string SENDGRID_API_KEY { get; }
        string GOOGLE_API_KEY { get; }
        string Jwt_Issuer { get; }
        string Jwt_Key { get; }
        string BaseUrl { get; }
        string BasePath { get; }
    }

    public class BootstrapperConfig : IBootstrapperConfig
    {
        private readonly IConfiguration _config;

        public BootstrapperConfig(IConfiguration config)
        {
            _config = config;
        }

        public string ConnectionString => _config["ConnectionString"];
        public string SENDGRID_API_KEY => _config["SENDGRID_API_KEY"];
        public string GOOGLE_API_KEY => _config["GOOGLE_API_KEY"];
        public string Jwt_Issuer => _config["Jwt:Issuer"];
        public string Jwt_Key => _config["Jwt:Key"];
        public string BaseUrl => _config["BaseUrl"];
        public string BasePath => _config["BasePath"];
    }
}
