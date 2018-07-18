const builder = require('botbuilder');
const instrumentation = require('../util/instrumentation');

module.exports = [
    function (session) {
 
        //Welcome Message
        var welcomeMessage = "Hi! I'm a Node.js Bot Framework created with cse-bot Yeoman Generator.";
        session.send(welcomeMessage);

        instrumentation.logger.getInstance().trackCustomEvent("Starting root dialog", { setDefault: false }, session);

    },
    function (session, result) {
        // on error, start over
        session.on('error', function (err) {
            logger.trackCustomEvent("Error in root dialog", { error: err }, session);
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });
    }
];