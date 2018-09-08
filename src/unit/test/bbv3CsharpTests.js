const path = require(`path`);
const sinon = require(`sinon`);
const helpers = require(`yeoman-test`);
const assert = require(`yeoman-assert`);

describe(`csebot:bbv3 csharp paas`, function () {
   var bowerStub;

   before(function () {
      return helpers.run(path.join(__dirname, `../../generators/bbv3-csharp`))
         .withArguments([`bbv3CsharpUnitTest`, `location`, `vsts`])
         .on(`error`, function (e) {
            assert.fail(e);
         })
         .on(`ready`, function (generator) {
            // This is called right before `generator.run()` is called
            // Stub the calls to spawnCommandSync
         });
   });

   it(`files should be generated`, function () {
      assert.file([
         `./bbv3CsharpUnitTest/bbv3CsharpUnitTest.sln`,
         `./bbv3CsharpUnitTest/.gitattributes`,
         `./bbv3CsharpUnitTest/.gitignore`,
         `./bbv3CsharpUnitTest/bbv3CsharpUnitTest.IaC/botapp.json`,
         `./bbv3CsharpUnitTest/bbv3CsharpUnitTest.IaC/botapp.parameters.json`,
         `./bbv3CsharpUnitTest/bbv3CsharpUnitTest.IaC/bot-registration.json`,
         `./bbv3CsharpUnitTest/bbv3CsharpUnitTest.IaC/bot-registration.parameters.json`,
         `./bbv3CsharpUnitTest/bbv3CsharpUnitTest.IaC/appInsigthsApiAccess.ps1`
      ]);
   });
});