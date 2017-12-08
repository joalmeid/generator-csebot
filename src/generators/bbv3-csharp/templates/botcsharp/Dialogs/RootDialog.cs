using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using <%= name %>.Util;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace <%= name %>.Dialogs
{
    [Serializable]
    public class RootDialog : IDialog<object>
    {
        public Task StartAsync(IDialogContext context)
        {
            var telemetry = context.CreateTraceTelemetry(nameof(StartAsync), new Dictionary<string, string> { { @"SetDefault", bool.FalseString } });

            context.Wait(MessageReceivedAsync);

            WebApiApplication.Telemetry.TrackTrace(telemetry);

            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
        {
            try
            {
                var activity = await result as Activity;

                // calculate something for us to return
                int length = (activity.Text ?? string.Empty).Length;

                // Example1: Serialize an entire object to an App Insights event
                WebApiApplication.Telemetry.TrackTrace(context.CreateTraceTelemetry(
                    nameof(MessageReceivedAsync),
                    new Dictionary<string, string> { { "message", JsonConvert.SerializeObject(activity) } }));

                //Example2: Event Telemetry
                var botEvent = context.CreateEventTelemetry(@"new ping");
                botEvent.Properties.Add("length", length.ToString()); // You can add properties after-the-fact as well
                WebApiApplication.Telemetry.TrackEvent(botEvent);

                // return our reply to the user
                await context.PostAsync($"You sent {activity.Text} which was {length} characters");
            }
            catch (TooManyAttemptsException ex)
            {
                WebApiApplication.Telemetry.TrackException(context.CreateExceptionTelemetry(ex));
            }
            finally
            {
                // It's a good idea to log telemetry in finally {} blocks so you don't end up with gaps of execution
                // as you follow a conversation
                WebApiApplication.Telemetry.TrackTrace(context.CreateTraceTelemetry(nameof(MessageReceivedAsync)));
            }

            context.Wait(MessageReceivedAsync);
        }
    }
}