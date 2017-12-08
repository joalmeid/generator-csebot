// This loads the environment variables from the .env file
var myConfig = require('dotenv-extended').load();
var builder = require('botbuilder');
var common = require('./common');
var testBot = require('../bot');
var greetingMessages = require('./dialog-flows/greeting');

//Our parent block
describe('Bot Tests', () => {

    it('greeting', function (done) {
        var connector = new builder.ConsoleConnector();

        var bot = testBot.create(connector);
        common.testBot(bot, greetingMessages, done);
    });
});