using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Bot.Builder.Azure;
using Microsoft.Bot.Builder.Dialogs.Internals;
using System.Reflection;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using Microsoft.Azure;

namespace botcsharptest
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        public static Microsoft.ApplicationInsights.TelemetryClient Telemetry { get; } = new Microsoft.ApplicationInsights.TelemetryClient();

        protected void Application_Start()
        {
            {
                var config = GlobalConfiguration.Configuration;
                Conversation.UpdateContainer(
                    builder =>
                    {
                        builder.RegisterModule(new AzureModule(Assembly.GetExecutingAssembly()));

                        var store = new TableBotDataStore(ConfigurationManager.ConnectionStrings["StorageConnectionString"].ConnectionString);
                        builder.Register(c => store)
                            .Keyed<IBotDataStore<BotData>>(AzureModule.Key_DataStore)
                            .AsSelf()
                            .SingleInstance();

                        // Register your Web API controllers.
                        builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
                        builder.RegisterWebApiFilterProvider(config);

                    });

                config.DependencyResolver = new AutofacWebApiDependencyResolver(Conversation.Container);
            }

            GlobalConfiguration.Configure(WebApiConfig.Register);

            //Application Insights Intrumentation Key
            Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration.Active.InstrumentationKey = ConfigurationManager.AppSettings["ApplicationInsightsIntrumentationKey"];

        }
        public static ILifetimeScope FindContainer()
        {
            var config = GlobalConfiguration.Configuration;
            var resolver = (AutofacWebApiDependencyResolver)config.DependencyResolver;
            return resolver.Container;
        }

    }
}
