const path = require(`path`);
const sinon = require(`sinon`);
const helpers = require(`yeoman-test`);
const assert = require(`yeoman-assert`);

describe(`csebot:bbv3-typescript paas`, function () {
   var bowerStub;

   before(function () {
      return helpers.run(path.join(__dirname, `../../generators/bbv3-typescript`))
         .withArguments([`bbv3TypescriptUnitTest`, `true`, `80`, `vsts`])
         .on(`error`, function (e) {
            assert.fail(e);
         })
         .on(`ready`, function (generator) {
            // This is called right before `generator.run()` is called
            // Stub the calls to spawnCommandSync
            spawnStub = sinon.stub(generator, `spawnCommandSync`);
         });
   });

   it(`npm install should be called`, function () {
      // Make sure the calls to install were made
      assert(spawnStub.withArgs(`npm`, [`install`], {
         stdio: ['pipe', 'pipe', process.stderr]
      }).calledOnce, `npm install not called once`);
   });

   it(`files should be generated`, function () {
      assert.file([
         `./.gitignore`,
         `./README.md`,
         `./src/.env`,
         `./src/.vscode`,
         `./src/app.ts`,
         `./src/bot.ts`,
         `./src/package.json`,
         `./src/tsconfig.json`,
         `./src/tslint.json`,
         `./src/.vscode/launch.json`,
         `./src/.vscode/settings.json`,
         `./src/.vscode/tasks.json`,
         `./src/dialogs/reset.ts`,
         `./src/dialogs/root.ts`,
         `./src/models/Consts.ts`,
         `./src/models/IDialog.ts`,
         `./src/models/IDialogTest.ts`,
         `./src/test/common.ts`,
         `./src/test/dialog-flows`,
         `./src/test/index.ts`,
         `./src/test/dialog-flows/greeting.ts`,
         `./src/util/instrumentation.ts`,
         `./templates/appInsigthsApiAccess.ps1`,
         `./templates/bot-registration.json`,
         `./templates/bot-registration.parameters.json`,
         `./templates/botapp.json`,
         `./templates/botapp.parameters.json`
      ]);

      assert.fileContent(`./src/package.json`, `"name": "bbv3typescriptunittest"`);
      assert.fileContent(`./templates/botapp.json`, `"WEBSITE_NODE_DEFAULT_VERSION": "8.5.0"`);
      assert.fileContent(`./templates/botapp.json`, `"STATE_STORAGE_CONNECTION_STRING":`);
      assert.noFileContent(`./templates/botapp.json`, `"StorageConnectionString"`);
   });
});

// describe(`csebot:bbv3-typescript docker`, function () {
//    var spawnStub;

//    before(function () {
//       return helpers.run(path.join(__dirname, `../../generators/bbv3-typescript`))
//          .withArguments([`aspUnitTest`, `false`, `docker`, `tcp://23.1.1.1:2376`])
//          .on(`error`, function (e) {
//             assert.fail(e);
//          })
//          .on(`ready`, function (generator) {
//             // This is called right before `generator.run()` is called
//             // Stub the calls to spawnCommandSync
//             spawnStub = sinon.stub(generator, `spawnCommandSync`);
//          });
//    });

//    it(`bower install should not be called`, function () {
//       assert.equal(0, spawnStub.withArgs(`bower`, [`install`], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `bower install was called`);
//    });

//    it(`dotnet restore should not be called`, function () {
//       assert.equal(0, spawnStub.withArgs(`dotnet`, [`install`], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `dotnet restore was called`);
//    });

//    it(`files should be generated`, function () {
//       assert.file([
//          `aspUnitTest/README.md`,
//          `aspUnitTest/.gitignore`,
//          `aspUnitTest/aspUnitTest.sln`,
//          `aspUnitTest/src/aspUnitTest/aspUnitTest.csproj`,
//          `aspUnitTest/src/aspUnitTest/.bowerrc`,
//          `aspUnitTest/src/aspUnitTest/bower.json`,
//          `aspUnitTest/src/aspUnitTest/web.config`,
//          `aspUnitTest/src/aspUnitTest/Dockerfile`,
//          `aspUnitTest/src/aspUnitTest/appsettings.json`,
//          `aspUnitTest/src/aspUnitTest.Tests/aspUnitTest.Tests.csproj`
//       ]);

//       assert.fileContent(`aspUnitTest/src/aspUnitTest/bower.json`, `"name": "aspunittest"`);
//       assert.fileContent(`aspUnitTest/src/aspUnitTest/Dockerfile`, `ENTRYPOINT dotnet aspUnitTest.dll`);
//       assert.fileContent(`aspUnitTest/src/aspUnitTest/aspUnitTest.csproj`, `<TargetFramework>netcoreapp2.0</TargetFramework>`);
//    });
// });

