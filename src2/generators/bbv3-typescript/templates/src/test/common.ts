import * as assert from 'assert';
import * as builder from 'botbuilder';
import * as dialogTest from '../models/IDialogTest';

function testBot(bot: builder.UniversalBot, messages: dialogTest.IDialogTest[], done: () => void) {
  let step = 1;
  const connector: builder.ConsoleConnector = bot.connector(null, null) as builder.ConsoleConnector;
  bot.on('send', function (message: dialogTest.IDialogTest) {

    if (step <= messages.length && step++ >= 1) {
      const check = messages[step - 2];

      checkInMessage(message, check, assert, (err) => {

        if (err) {
          assert(false);
          done();
        }

        proceedNextStep(check, done);
      });
    }
  });

  if (messages.length && messages[0].out) {
    step = 2;
    connector.processMessage(messages[0].out);
  }

  function checkInMessage(message: any, check: any, assert: any, callback: (err: any) => void) {

    if (check.type) {
      assert(message.type === check.type);
    }

    if (typeof check.in === 'function') {
      return check.in(message, assert, callback);
    } else {
      if (check.in) {
        if (check.in.test ? check.in.test(message.text) : message.text === check.in) {
          assert(true);
        } else {
          console.error(`"${message.text}" does not match "${check.in}"`);
          assert(false);
        }
      }
      return callback(null);
    }
  }

  function proceedNextStep(check: any, done: () => void) {
    if (check.out) {
      connector.processMessage(check.out);
    }

    if (step - 1 === messages.length) {
      setTimeout(done, 10); // Enable message from connector to appear in current test suite
    }
  }
}

export { testBot };