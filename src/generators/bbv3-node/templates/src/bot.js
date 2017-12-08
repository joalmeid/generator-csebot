var builder = require('botbuilder');
var telemetryModule = require('./util/telemetry-module.js');

telemetryModule.Initialize();

function create(connector) {

    var bot = new builder.UniversalBot((connector));

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



