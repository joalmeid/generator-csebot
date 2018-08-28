const path = require(`path`);
const sinon = require(`sinon`);
const helpers = require(`yeoman-test`);
const assert = require(`yeoman-assert`);

describe(`csebot:csharp paas`, function () {
   var bowerStub;

   before(function () {
      return helpers.run(path.join(__dirname, `../../generators/csharp`))
         .withArguments([`csharpUnitTest`])
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
         `./csharpUnitTest/csharpUnitTest.sln`,
         `./csharpUnitTest/.gitattributes`,
         `./csharpUnitTest/.gitignore`,
         `./csharpUnitTest/csharpUnitTest.IaC/WebSite.json`,
         `./csharpUnitTest/csharpUnitTest.IaC/WebSite.parameters.json`,
      ]);
   });
});