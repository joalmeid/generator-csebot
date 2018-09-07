import { BotFrameworkInstrumentation } from 'botbuilder-instrumentation';
import { BotFrameworkAdapter  } from 'botbuilder';

let logger: BotFrameworkInstrumentation = undefined;

export function getInstance(): BotFrameworkInstrumentation {
    logger = logger || new BotFrameworkInstrumentation({
        instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
        sentiments: {
            key: process.env.CG_SENTIMENT_KEY
        },

        // Will omit the user name from the logs for anonimization
        omitUserName: true,

        // Application insights options, all set to false by default
        autoLogOptions: {
            autoCollectConsole: true,
            autoCollectExceptions: true,
            autoCollectRequests: true,
            autoCollectPerf: true // (auto collect performance)
        }
    });
    return logger;
}

export function Initialize(bot?: BotFrameworkAdapter) {
    logger.monitor(bot);
}
