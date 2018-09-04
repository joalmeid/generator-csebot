import * as builder from 'botbuilder';
import * as botAzure from 'botbuilder-azure';
import * as instrumentation from './util/instrumentation';

import * as rootDialog from './dialogs/root';
import * as resetDialog from './dialogs/reset';
import * as botConsts from './models/Consts';

let logger = instrumentation.getInstance();

export function create(connector : builder.IConnector): builder.UniversalBot {

    const azureTableClient = new botAzure.AzureTableClient(botConsts.tableName, process.env.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING);
    const tableStorage = new botAzure.AzureBotStorage({ gzipData: false }, azureTableClient);

    // Disable storage state for test execution (ConsoleConnector)
    const bot = new builder.UniversalBot(connector);
    if ( ! (connector instanceof builder.ConsoleConnector)) {
        bot.set(botConsts.storage, tableStorage);
    }

    instrumentation.Initialize(bot);

    logger.trackCustomEvent(botConsts.CseBotLogging.StartBot,
    {
        Description: 'Starting bot...',
        Name: bot.name,
        Instrumentation: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
        State: process.env.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING,
        Port: process.env.PORT,
        MSAppId: process.env.MICROSOFT_APP_ID,
        LUIS: process.env.LUIS_MODEL_URL
    });

    bot.dialog('/', rootDialog.waterfall);
    bot.dialog('reset', resetDialog.waterfall)
        .triggerAction({
            matches: [/reset/i, /cancel/i, /return/i, /start again/i, /nevermind/i]
        });

    // log any bot errors into the console
    bot.on('error', function (e: builder.IEvent) {
        logger.logException(e);
        console.error('An error ocurred', e);
    });

    return bot;
}