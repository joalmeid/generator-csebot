const instrumentation = require('../util/instrumentation');

module.exports = 
     function (session) {

        instrumentation.logger.getInstance().trackCustomEvent("Reset on current dialog", { }, session);

        // reset data
        session.conversationData = {}; 
        session.dialogData = {};
        session.privateConversationData = {};
        session.userData = {};
        session.send('Alright! Let\'s try it again.');
        session.replaceDialog('/');
    };