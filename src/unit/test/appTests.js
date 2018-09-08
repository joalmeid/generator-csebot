const path = require(`path`);
const sinon = require(`sinon`);
const helpers = require(`yeoman-test`);
const assert = require(`yeoman-assert`);
const util = require(`../../generators/app/utility`);

describe(`app:index`, function () {
   it(`arguments using fake dependencies paas linux`, function () {
      // Arrange
      let deps = [
         [helpers.createDummyGenerator(), `csebot:bbv3-node`],
         [helpers.createDummyGenerator(), `csebot:git`],
         [helpers.createDummyGenerator(), `csebot:azure`],
         [helpers.createDummyGenerator(), `csebot:build`],
         [helpers.createDummyGenerator(), `csebot:project`],
         [helpers.createDummyGenerator(), `csebot:release`],
         [helpers.createDummyGenerator(), `csebot:registry`]
      ];

      let type = `node`;
      let bbversion = `v3`;
      let name = `testbbv3node`;
      let msAppId = `MsAppId`;
      let msAppPasswd = `MsAppPasswd`;
      let tfs = `vsts`;
      let azureSub = `AzureSub`;
      let location = `location`;
      let azureSubId = `AzureSubId`;
      let tenantId = `TenantId`;
      let servicePrincipalId = `servicePrincipalId`;
      let queue = `Hosted Linux Preview`;
      let target = `paas`;//`dockerpaas`;
      let installDep = `false`;
      let dockerHost = ``;
      let dockerCertPath = ``;
      let dockerRegistry = `dockerRegistry`;
      let dockerRegistryId = `dockerRegistryId`;
      let dockerPorts = `dockerPorts`;
      let dockerRegistryPassword = `dockerRegistryPassword`;
      let servicePrincipalKey = `servicePrincipalKey`;
      let pat = `token`;

      // Act
      return helpers.run(path.join(__dirname, `../../generators/app`))
         .withGenerators(deps)
         .withArguments([type, bbversion, name, msAppId, msAppPasswd, tfs,
            azureSub, location, azureSubId, tenantId, servicePrincipalId,
            queue, target, installDep,
            dockerHost, dockerCertPath,
            dockerRegistry, dockerRegistryId, dockerPorts, dockerRegistryPassword,
            servicePrincipalKey, pat
         ])
         .on(`error`, function (e) {
            assert.fail(e);
         });
   });

   it(`arguments using fake dependencies paas`, function () {
      // Arrange
      let deps = [
         [helpers.createDummyGenerator(), `csebot:bbv3-node`],
         [helpers.createDummyGenerator(), `csebot:git`],
         [helpers.createDummyGenerator(), `csebot:azure`],
         [helpers.createDummyGenerator(), `csebot:build`],
         [helpers.createDummyGenerator(), `csebot:project`],
         [helpers.createDummyGenerator(), `csebot:release`]
      ];

      let type = `node`;
      let bbversion = `v3`;
      let name = `testbbv3node`;
      let msAppId = `MsAppId`;
      let msAppPasswd = `MsAppPasswd`;
      let tfs = `vsts`;
      let azureSub = `AzureSub`;
      let location = `location`;
      let azureSubId = `AzureSubId`;
      let tenantId = `TenantId`;
      let servicePrincipalId = `servicePrincipalId`;
      let queue = `default`;
      let target = `paas`;
      let installDep = `false`;
      let dockerHost = ``;
      let dockerCertPath = ``;
      let dockerRegistry = ``;
      let dockerRegistryId = ``;
      let dockerPorts = ``;
      let dockerRegistryPassword = ``;
      let servicePrincipalKey = `servicePrincipalKey`;
      let pat = `token`;

      // Act
      return helpers.run(path.join(__dirname, `../../generators/app`))
         .withGenerators(deps)
         .withArguments([type, bbversion, name, msAppId, msAppPasswd, tfs,
            azureSub, location, azureSubId, tenantId, servicePrincipalId,
            queue, target, installDep,
            dockerHost, dockerCertPath,
            dockerRegistry, dockerRegistryId, dockerPorts, dockerRegistryPassword,
            servicePrincipalKey, pat
         ])
         .on(`error`, function (e) {
            assert.fail(e);
         });
   });

   
   it(`arguments using fake dependencies csharp paas`, function () {
      // Arrange
      let deps = [
         [helpers.createDummyGenerator(), `csebot:bbv3-csharp`],
         [helpers.createDummyGenerator(), `csebot:git`],
         [helpers.createDummyGenerator(), `csebot:azure`],
         [helpers.createDummyGenerator(), `csebot:build`],
         [helpers.createDummyGenerator(), `csebot:project`],
         [helpers.createDummyGenerator(), `csebot:release`]
      ];

      let type = `csharp`;
      let bbversion = `v3`;
      let name = `testbbv3charp`;
      let msAppId = `MsAppId`;
      let msAppPasswd = `MsAppPasswd`;
      let tfs = `vsts`;
      let azureSub = `AzureSub`;
      let location = `location`;
      let azureSubId = `AzureSubId`;
      let tenantId = `TenantId`;
      let servicePrincipalId = `servicePrincipalId`;
      let queue = `default`;
      let target = `paas`;
      let installDep = `false`;
      let dockerHost = ``;
      let dockerCertPath = ``;
      let dockerRegistry = ``;
      let dockerRegistryId = ``;
      let dockerPorts = ``;
      let dockerRegistryPassword = ``;
      let servicePrincipalKey = `servicePrincipalKey`;
      let pat = `token`;

      // Act
      return helpers.run(path.join(__dirname, `../../generators/app`))
         .withGenerators(deps)
         .withArguments([type, bbversion, name, msAppId, msAppPasswd, tfs,
            azureSub, location, azureSubId, tenantId, servicePrincipalId,
            queue, target, installDep,
            dockerHost, dockerCertPath,
            dockerRegistry, dockerRegistryId, dockerPorts, dockerRegistryPassword,
            servicePrincipalKey, pat
         ])
         .on(`error`, function (e) {
            assert.fail(e);
         });
   });

   it(`prompts using fake dependencies paas`, function () {
      let deps = [
         [helpers.createDummyGenerator(), `csebot:bbv3-node`],
         [helpers.createDummyGenerator(), `csebot:git`],
         [helpers.createDummyGenerator(), `csebot:azure`],
         [helpers.createDummyGenerator(), `csebot:build`],
         [helpers.createDummyGenerator(), `csebot:project`],
         [helpers.createDummyGenerator(), `csebot:release`]
      ];

      var cleanUp = function () {
         util.getPools.restore();
         util.getAzureSubs.restore();
      };

      return helpers.run(path.join(__dirname, `../../generators/app`))
         .withGenerators(deps)
         .withPrompts({
            tfs: `vsts`,
            pat: `token`,
            queue: `Default`,
            type: `node`,
            bbVersion: 'v3',
            msAppId: `MsAppId`, 
            msAppPasswd: `MsAppPasswd`,
            location: `location`, 
            botName: `testbbv3node`,
            target: `paas`,
            azureSub: `azureSub`,
            installDep: `false`
         })
         .on(`error`, function (e) {
            cleanUp();
            assert.fail(e);
         })
         .on(`ready`, function (generator) {
            // This is called right before `generator.run()` is called.
            sinon.stub(util, `getPools`);
            sinon.stub(util, `getAzureSubs`);
         })
         .on(`end`, function (e) {
            cleanUp();
         });
   });

   it(`arguments using fake dependencies docker`, function () {
      // Arrange
      let deps = [
         [helpers.createDummyGenerator(), `csebot:git`],
         [helpers.createDummyGenerator(), `csebot:bbv3-node`],
         [helpers.createDummyGenerator(), `csebot:build`],
         [helpers.createDummyGenerator(), `csebot:docker`],
         [helpers.createDummyGenerator(), `csebot:project`],
         [helpers.createDummyGenerator(), `csebot:release`],
         [helpers.createDummyGenerator(), `csebot:registry`]
      ];

      let type = `node`;
      let bbversion = `v3`;
      let name = `testbbv3node`;
      let msAppId = `MsAppId`;
      let msAppPasswd = `MsAppPasswd`;
      let tfs = `vsts`;
      let azureSub = ``;
      let location = ``;
      let azureSubId = ``;
      let tenantId = ``;
      let servicePrincipalId = ``;
      let queue = `default`;
      let target = `docker`;
      let installDep = `false`;
      let dockerHost = `dockerHost`;
      let dockerCertPath = `dockerCertPath`;
      let dockerRegistry = `dockerRegistry`;
      let dockerRegistryId = `dockerRegistryId`;
      let dockerPorts = `dockerPorts`;
      let dockerRegistryPassword = `dockerRegistryPassword`;
      let servicePrincipalKey = `servicePrincipalKey`;
      let pat = `token`;

      return helpers.run(path.join(__dirname, `../../generators/app`))
         .withGenerators(deps)
         .withArguments([type, bbversion, name, msAppId, msAppPasswd, tfs,
            azureSub, location, azureSubId, tenantId, servicePrincipalId,
            queue, target, installDep,
            dockerHost, dockerCertPath,
            dockerRegistry, dockerRegistryId, dockerPorts, dockerRegistryPassword,
            servicePrincipalKey, pat
         ])
         .on(`error`, function (e) {
            assert.fail(e);
         });
   });

   it(`prompts using fake dependencies docker`, function () {
      let deps = [
         [helpers.createDummyGenerator(), `csebot:bbv3-typescript`],
         [helpers.createDummyGenerator(), `csebot:git`],
         [helpers.createDummyGenerator(), `csebot:build`],
         [helpers.createDummyGenerator(), `csebot:docker`],
         [helpers.createDummyGenerator(), `csebot:project`],
         [helpers.createDummyGenerator(), `csebot:release`],
         [helpers.createDummyGenerator(), `csebot:registry`]
      ];

      var cleanUp = function () {
         util.getPools.restore();
         util.getAzureSubs.restore();
      };

      return helpers.run(path.join(__dirname, `../../generators/app`))
         .withGenerators(deps)
         .withPrompts({
            tfs: `vsts`,
            type: `typescript`,
            pat: `token`,
            queue: `Default`,
            target: `docker`,
            installDep: `false`,
            dockerHost: `dockerHost`,
            dockerPorts: `dockerPorts`,
            msAppId: `MsAppId`, 
            msAppPasswd: `MsAppPasswd`,
            location: `location`, 
            bbVersion: 'v3',
            botName: `testbbv3ts`,
            dockerCertPath: `dockerCertPath`,
            dockerRegistry: `dockerRegistry`,
            dockerRegistryId: `dockerRegistryId`,
            dockerRegistryPassword: `dockerRegistryPassword`
         })
         .on(`error`, function (e) {
            cleanUp();
            assert.fail(e);
         })
         .on(`ready`, function (generator) {
            // This is called right before `generator.run()` is called.
            sinon.stub(util, `getPools`);
            sinon.stub(util, `getAzureSubs`);
         })
         .on(`end`, function (e) {
            cleanUp();
         });
   });
});