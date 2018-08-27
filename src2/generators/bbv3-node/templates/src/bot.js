const builder = require('botbuilder');
const botAzure = require('botbuilder-azure');
const instrumentation = require('./util/instrumentation');

function create(connector, botConfig) {

    var azureTableClient = new botAzure.AzureTableClient('botstate', process.env.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING);
    var tableStorage = new botAzure.AzureBotStorage({ gzipData: false }, azureTableClient);

    // Setting up advanced instrumentation
    // var logger = new instrumentation.BotFrameworkInstrumentation(botConfig);
    const logger = instrumentation.logger.getInstance(botConfig);

    var bot = new builder.UniversalBot(connector).set('storage', tableStorage);
    // bot.use(builder.Middleware.sendTyping());

    logger.monitor(bot);

    logger.trackCustomEvent("Starting bot...", 
    {
        'Name': bot.name,
        'Instrumentation': botConfig.APPINSIGHTS_INSTRUMENTATIONKEY,
        'State': botConfig.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING,
        'Port': botConfig.PORT,
        'MSAppId': botConfig.MICROSOFT_APP_ID,
        'LUIS': botConfig.LUIS_MODEL_URL
    });

    bot.dialog('/', require('./dialogs/root'));
    bot.dialog('reset', require('./dialogs/reset'))
        .triggerAction({ 
            matches: [/reset/i, /cancel/i, /return/i, /start again/i, /nevermind/i]
        });

    // log any bot errors into the console
    bot.on('error', function (e) {
        logger.logException(e);
        console.error('An error ocurred', e);
    });

    return bot;
}

module.exports = { create };



