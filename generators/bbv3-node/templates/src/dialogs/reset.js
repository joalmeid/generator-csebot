var telemetryModule = require('../util/telemetry-module.js');

module.exports = 
     function (session) {

        var telemetry = telemetryModule.createTelemetry(session);
        telemetryModule.getClient().trackEvent('Reset', telemetry);

        // reset data
        session.conversationData = {}; 
        session.dialogData = {};
        session.privateConversationData = {};
        session.userData = {};
        session.send('Alright! Let\'s try it again.');
        session.replaceDialog('/');
    };