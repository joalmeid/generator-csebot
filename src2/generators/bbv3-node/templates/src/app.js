// This loads the environment variables from the .env file
const botConfig = require('dotenv-extended').load();
const restify = require('restify');
const builder = require('botbuilder');
const bot = require('./bot');

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

bot.create(connector, botConfig);

// Listen for messages
server.post('/api/messages', connector.listen());

