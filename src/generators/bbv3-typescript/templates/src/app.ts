// This loads the environment variables from the .env file
import * as myConfig from 'dotenv-extended';
myConfig.load();
import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as bot from './bot';

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

const settings: builder.IChatConnectorSettings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};

// Create chat bot and listen to messages
const connector = new builder.ChatConnector(settings);

bot.create(connector);

// Listen for messages
server.post('/api/messages', connector.listen());
