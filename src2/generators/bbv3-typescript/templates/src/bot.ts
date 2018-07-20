import * as builder from 'botbuilder';
import * as telemetryModule from './util/telemetry-module';
import * as rootDialog from './dialogs/root';
import * as resetDialog from './dialogs/reset';
import * as botAzure from 'botbuilder-azure';
import * as botConsts from './models/Consts';

telemetryModule.Initialize();

export function create(connector : builder.IConnector): builder.UniversalBot {

    const azureTableClient = new botAzure.AzureTableClient(botConsts.tableName, process.env.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING);
    const tableStorage = new botAzure.AzureBotStorage({ gzipData: false }, azureTableClient);

    // Disbale storage state for test execution (ConsoleConnector)
    const bot = new builder.UniversalBot(connector);
    if ( ! (connector instanceof builder.ConsoleConnector)) {
        bot.set(botConsts.storage, tableStorage);
    }

    bot.dialog('/', rootDialog.waterfall);
    bot.dialog('reset', resetDialog.waterfall)
        .triggerAction({
            matches: [/reset/i, /cancel/i, /return/i, /start again/i, /nevermind/i]
        });

    // log any bot errors into the console
    bot.on('error', function (e: builder.IEvent) {
        telemetryModule.getClient().trackException(new Error(JSON.stringify(e)));

        console.error('An error ocurred', e);
    });

    return bot;
}