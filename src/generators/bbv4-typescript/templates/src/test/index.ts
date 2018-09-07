// This loads the environment variables from the .env file
// import * as botConfig from 'dotenv-extended';
// botConfig.load();
// import * as instrumentation from '../util/instrumentation';
import { TestAdapter, MemoryStorage, ConversationState, UserState, BotStateSet } from 'botbuilder';
// tslint:disable-next-line:no-require-imports
// import transcriptUtilities = require('botbuilder-core/tests/transcriptUtilities');
// import { transcriptUtilities } from 'botbuilder';
import { Bot } from '../bot';
// import * as common from './common';
// import { greetingMessages } from './dialog-flows/greeting';

// Setting up advanced instrumentation
// let logger = instrumentation.getInstance();

//Our parent block
describe('Bot Tests', () => {
   //  this.timeout(5000);

    function getAdapter(): TestAdapter {

        // Add state middleware
        const storage = new MemoryStorage();
        const conversationState = new ConversationState(storage);
        const userState = new UserState(storage);

        const bot = new Bot(conversationState, userState);
        const adapter = new TestAdapter(async (context) => {
            // Dispatch to bot
            await bot.dispatchActivity(context);
        });
        adapter.use(conversationState);
        return adapter;
    }

    it('greeting', function (done: () => void) {
        // const bot = Bot.create(connector);
        // common.testBot(bot, greetingMessages, done);

        // transcriptUtilities.getActivitiesFromChat('./dialog-flows/botdialog-transcript.chat').then(activities => {
        //     const adapter = getAdapter();
        //     return adapter.test(activities, 'botdialog-transcript.chat')
        //         .then(done)
        //         .catch(done);
        // });
    });
});