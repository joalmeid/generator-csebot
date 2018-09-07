const fs = require(`fs`);
const sinon = require(`sinon`);
const assert = require(`assert`);
const proxyquire = require(`proxyquire`);
const package = require('../../package.json');
const sinonTestFactory = require(`sinon-test`);
const compose = require(`../../generators/app/compose`);

const sinonTest = sinonTestFactory(sinon);

describe(`compose`, function () {
   context(`addLanguage`, function () {
      it(`node`, sinonTest(function () {
         let called = false;
         let target = {
            type: `node`,
            botName: `nodeTest`,
            installDep: `false`,
            dockerPorts: `3000:3000`,
            composeWith: function () {
               called = true;
               assert.equal(arguments.length, 2, `call to composeWith has wrong number of arguments`);
               assert.equal(arguments[0], `csebot:node`, `wrong generator`);
               assert.equal(arguments[1].arguments.length, 3, `object has wrong number of properties`);
               assert.equal(arguments[1].arguments[0], `nodeTest`, `object has wrong botName`);
               assert.equal(arguments[1].arguments[1], `false`, `object has wrong installDep`);
               assert.equal(arguments[1].arguments[2], `3000:3000`, `object has wrong dockerPorts`);
            }
         };

         compose.addLanguage(target);

         assert.equal(called, true);
      }));

      it(`typescript`, sinonTest(function () {
         let called = false;
         let target = {
            type: `typescript`,
            botName: `typescriptTest`,
            installDep: `true`,
            dockerPorts: `80:80`,
            composeWith: function () {
               called = true;
               assert.equal(arguments.length, 2, `call to composeWith has wrong number of arguments`);
               assert.equal(arguments[0], `csebot:typescript`, `wrong generator`);
               assert.equal(arguments[1].arguments.length, 3, `object has wrong number of properties`);
               assert.equal(arguments[1].arguments[0], `tscTest`, `object has wrong botName`);
               assert.equal(arguments[1].arguments[1], `true`, `object has wrong installDep`);
               assert.equal(arguments[1].arguments[2], `80:80`, `object has wrong dockerPorts`);
            }
         };

         compose.addLanguage(target);

         assert.equal(called, true);
      }));

      it(`csharp`, sinonTest(function () {
         let called = false;
         let target = {
            type: `csharp`,
            botName: `csharpTest`,
            installDep: `true`,
            dockerPorts: `80:80`,
            composeWith: function () {
               called = true;
               assert.equal(arguments.length, 2, `call to composeWith has wrong number of arguments`);
               assert.equal(arguments[0], `csebot:csharp`, `wrong generator`);
               assert.equal(arguments[1].arguments.length, 1, `object has wrong number of properties`);
               assert.equal(arguments[1].arguments[0], `csharpTest`, `object has wrong botName`);
            }
         };

         compose.addLanguage(target);

         assert.equal(called, true);
      }));

   });
});