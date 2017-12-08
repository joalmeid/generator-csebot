// This loads the environment variables from the .env file
import * as myConfig from 'dotenv-extended';
myConfig.load();
import * as builder from 'botbuilder';
import * as common from './common';
import * as testBot from '../bot';
import * as greetingMessages from './dialog-flows/greeting';

//Our parent block
describe('Bot Tests', () => {

    it('greeting', function (done: any) {
        const connector = new builder.ConsoleConnector();

        const bot = testBot.create(connector);
        common.testBot(bot, greetingMessages, done);
    });
});