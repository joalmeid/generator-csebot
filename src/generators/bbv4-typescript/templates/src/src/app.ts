// This loads the environment variables from the .env file
import * as envConfig from 'dotenv-extended';
const botConfig: envConfig.IEnvironmentMap = envConfig.load();
import * as restify from 'restify';
import { BotFrameworkAdapter, ConversationState, UserState, BotStateSet, MemoryStorage } from 'botbuilder';
import { TableStorage } from 'botbuilder-azure';
import { Bot } from './bot';
import { storageName } from './models';

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    }
);

//Botbuilder-Azure
//https://github.com/Microsoft/botbuilder-js/blob/e8dbdda632a1568f1e00aca899611acab56baa77/samples/echobot-es6-botframework-webchat/src/app.js

// Add state middleware
const storage = process.env.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING ? new TableStorage({
        tableName: storageName,
        storageAccountOrConnectionString: process.env.CUSTOMCONNSTR_STATE_STORAGE_CONNECTION_STRING
    }) : new MemoryStorage();
const conversationState = new ConversationState(storage);
const userState = new UserState(storage);
adapter.use(new BotStateSet(conversationState, userState));

// Create bot object containing logic
const bot = new Bot(conversationState, userState);

// Listen for incoming requests
server.post('/api/messages', (req, res) => {
    // Route received request to adapter for processing
    adapter.processActivity(req, res, async (context) => {
        // Dispatch to bot
        await bot.dispatchActivity(context);
    });
});
