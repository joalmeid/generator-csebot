var telemetryModule = require('../util/telemetry-module.js');
var builder = require('botbuilder');

module.exports = [
    function (session) {
        var telemetry = telemetryModule.createTelemetry(session, { setDefault: false });

        //Welcome Message
        var welcomeMessage = "Hi! I'm a Node.js Bot Framework created with cse-bot Yeoman Generator.";
        session.send(welcomeMessage);

        telemetryModule.getClient().trackTrace('start', telemetry);
        
    },
    function (session, result) {
        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });
    }
];