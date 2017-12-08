var builder = require('botbuilder');
var botAzure = require('botbuilder-azure');
var telemetryModule = require('./util/telemetry-module.js');

telemetryModule.Initialize();

function create(connector) {

   var azureTableClient = new botAzure.AzureTableClient('storage', process.env.STATE_STORAGE_CONNECTION_STRING);
   var tableStorage = new botAzure.AzureBotStorage({ gzipData: false }, azureTableClient);

    var bot = new builder.UniversalBot(connector).set('storage', tableStorage);;

    bot.dialog('/', require('./dialogs/root'));
    //location.create(bot);
    bot.dialog('reset', require('./dialogs/reset'))
        .triggerAction({ 
            matches: [/reset/i, /cancel/i, /return/i, /start again/i, /nevermind/i]
        });

    // log any bot errors into the console
    bot.on('error', function (e) {
        telemetryModule.getClient().trackException(new Error(e));

        console.error('An error ocurred', e);
    });

    return bot;
}

module.exports = { create }



