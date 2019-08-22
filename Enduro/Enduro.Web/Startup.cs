using Enduro.Web;
using Lamar.Microsoft.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Swashbuckle.AspNetCore.Swagger;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IBootstrapperConfig BootstrapperConfig { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            BootstrapperConfig = new BootstrapperConfig(Configuration);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLamar(new BootstrapperRegistry(BootstrapperConfig));
            services.AddHttpContextAccessor();

            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();
            corsBuilder.AllowCredentials();
            services.AddCors(options =>
            {
                options.AddPolicy("Enduro", corsBuilder.Build());
            });

            services
                .AddMvc(options =>
                {
                    options.Filters.Add(new WebApiExceptionFilterAttribute());
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(x =>
                {
                    x.SerializerSettings.Formatting = Formatting.Indented;
                    x.SerializerSettings.Converters.Add(new StringEnumConverter());
                    x.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });
            services.AddRouting(x => x.LowercaseUrls = true);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                    // Configure JWT Bearer Auth to expect our security key
                    options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateIssuerSigningKey = true,

                       ValidIssuer = BootstrapperConfig.Jwt_Issuer,
                       ValidAudience = BootstrapperConfig.Jwt_Issuer,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(BootstrapperConfig.Jwt_Key)),

                       ValidateLifetime = true
                   };
                   options.Events = new JwtBearerEvents
                   {
                       OnMessageReceived = context =>
                       {
                           var accessToken = context.Request.Query["access_token"];
                           if (!string.IsNullOrEmpty(accessToken))
                           {
                               context.Token = accessToken;
                           }
                           return Task.CompletedTask;
                       }
                   };
               });

            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info { Title = "Enduro", Version = "v1" });
                x.CustomSchemaIds((type) => type.FullName);
                x.DescribeAllEnumsAsStrings();
                x.DescribeAllParametersInCamelCase();
                x.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    In = "header",
                    Description = "Please enter JWT with Bearer into field",
                    Name = "Authorization",
                    Type = "access_token"
                });
                x.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
                    { "Bearer", Enumerable.Empty<string>() },
                });

            });
            //services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseSwagger(x =>
            {
                // Support e.g. [controller] to be as lowercase. (see more: https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/74)
                x.PreSerializeFilters.Add((document, request) =>
                {
                    document.Paths = document.Paths.ToDictionary(p => p.Key.ToLowerInvariant(), p => p.Value);
                });
            });
            app.UseSwaggerUI(x =>
            {
                x.SwaggerEndpoint("/swagger/v1/swagger.json", "Enduro v1");
            });

            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("/wwwroot/index.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles("/wwwroot");
            app.UseStaticFiles("/storage");
            
            app.UseCors("Enduro");
            app.UseAuthentication();

            app.UseMvc();

        }
    }
}