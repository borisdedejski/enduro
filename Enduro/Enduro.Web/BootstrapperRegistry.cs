using Lamar;
using MediatR;
using FluentValidation;
using Marten;
using Microsoft.AspNetCore.Http;
using Enduro.Services.Features.Users;
using Enduro.Web.Insfrastructure;
using Enduro.Services;
using Enduro.Web.Infrastructure;
using Enduro.Web.Infrastructure.Authentication;
using Enduro.Core.Auth;
using Geocoding;
using Enduro.Services.Features.Cars;

namespace Enduro.Web
{
    public class BootstrapperRegistry : ServiceRegistry
    {
        public BootstrapperRegistry(IBootstrapperConfig config)
        {
            ForSingletonOf<IBootstrapperConfig>().Use(config);

            Scan(scan =>
            {
                // Find handlers and validators in the calling assembly.
                scan.TheCallingAssembly();
                scan.AssemblyContainingType(typeof(IRequestHandler<,>));
                scan.AssemblyContainingType(typeof(IValidator<>));
                scan.AssemblyContainingType(typeof(SignUpUser));

                // Connect handlers.
                scan.ConnectImplementationsToTypesClosing(typeof(IRequestHandler<,>));

                // Connect validators.
                scan.ConnectImplementationsToTypesClosing(typeof(IValidator<>));
            });

            // Connect the feature pipeline behavior.
            For(typeof(IPipelineBehavior<,>))
                .Use(typeof(FeaturePipelineBehavior<,>))
                .Scoped();

            // Configure DI for MediatR
            For<ServiceFactory>().Use(ctx => ctx.GetInstance);
            For<IMediator>()
                .Use<Mediator>()
                .Scoped();

            // Configure DI for Marten
            ForSingletonOf<IDocumentStore>()
                .Use(ctx => CreateMartenStore(config.ConnectionString));

            For<IDocumentSession>()
                .Use(ctx => ctx.GetInstance<IDocumentStore>().OpenSession())
                .Scoped();

            For<IFileClient>()
              .Use<FileClient>()
              .Scoped();
            // Configure DI for custom interfaces
            For<ICoreAuthenticationService>()
                .Use<CoreAuthenticationService>()
                .Scoped();

            For<IEmailService>()
               .Use<EmailService>()
               .Scoped();

            //For<I>()
            //    .Use<GeoLocationService>()
            //    .Scoped();

            


        }

        private static IDocumentStore CreateMartenStore(string connectionString)
        {
            return DocumentStore.For(x =>
            {
                x.Connection(connectionString);
                x.DdlRules.TableCreation = CreationStyle.CreateIfNotExists;
                x.AutoCreateSchemaObjects = AutoCreate.CreateOrUpdate;  // TODO: For production change to None and introduce migrations.
                x.Serializer<MartenJsonSerializer>();
                x.Schema.Include<MartenMappings>();
            });
        }
    }
}
