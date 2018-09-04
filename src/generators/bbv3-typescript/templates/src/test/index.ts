// This loads the environment variables from the .env file
import * as botConfig from 'dotenv-extended';
botConfig.load();
import * as instrumentation from '../util/instrumentation';
import * as builder from 'botbuilder';
import * as common from './common';
import * as testBot from '../bot';
import { greetingMessages } from './dialog-flows/greeting';

// Setting up advanced instrumentation
let logger = instrumentation.getInstance();

//Our parent block
describe('Bot Tests', () => {

    it('greeting', function (done: () => void) {
        const connector = new builder.ConsoleConnector();

        const bot = testBot.create(connector);
        common.testBot(bot, greetingMessages, done);
    });
});