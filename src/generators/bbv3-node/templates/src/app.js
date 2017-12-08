// This loads the environment variables from the .env file
var myConfig = require('dotenv-extended').load();
var restify = require('restify');
var builder = require('botbuilder');
var bot = require('./bot');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

bot.create(connector);

// Listen for messages
server.post('/api/messages', connector.listen());

