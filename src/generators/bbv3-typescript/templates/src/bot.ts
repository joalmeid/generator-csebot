import * as builder from 'botbuilder';
import * as telemetryModule from './util/telemetry-module';
import * as rootDialog from './dialogs/root';
import * as resetDialog from './dialogs/reset';
import * as botAzure from 'botbuilder-azure';
import * as botConsts from './models/Consts';

telemetryModule.Initialize();

export function create(connector : builder.IConnector) {

    const azureTableClient = new botAzure.AzureTableClient(botConsts.tableName, process.env.STATE_STORAGE_CONNECTION_STRING);
    const tableStorage = new botAzure.AzureBotStorage({ gzipData: false }, azureTableClient);

    const bot = new builder.UniversalBot(connector).set(botConsts.storage, tableStorage);

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