import * as assert from 'assert';

function testBot(bot: any, messages: any, done: any) {
  let step = 1;
  const connector = bot.connector();
  bot.on('send', function (message: any) {

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

  function checkInMessage(message: any, check: any, assert: any, callback: any) {

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
      return callback();
    }
  }

  function proceedNextStep(check: any, done: any) {
    if (check.out) {
      connector.processMessage(check.out);
    }

    if (step - 1 === messages.length) {
      setTimeout(done, 10); // Enable message from connector to appear in current test suite
    }
  }
}

export { testBot };