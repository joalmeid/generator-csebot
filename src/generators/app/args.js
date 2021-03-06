// Many of the generators use the same arguments in their constructors so 
// these functions make it easy to reuse in other generators.
// This removed a lot of duplicate code and makes sure argument names match
// in each generator.

const util = require(`./utility`);

function profileCmd(obj) {
   obj.argument(`profileCmd`, {
      required: false,
      desc: `Add, Delete or List`
   });
}

function profileName(obj) {
   obj.argument(`profileName`, {
      required: false,
      desc: `Name of the profile to store or load`
   });
}

function botType(obj) {
   obj.argument(`type`, {
      required: false,
      desc: `Project type to create (csharp, node, typescript)`
   });
}

function bbVersion(obj) {
   obj.argument(`bbVersion`, {
      required: false,
      desc: `Bot Framework SDK version - (v3, v4)`
   });
}

function botName(obj) {
   obj.argument(`botName`, {
      required: false,
      desc: `Name of the Bot`
   });
}

function botLocation(obj) {
   obj.argument(`botLocation`, {
      required: false,
      desc: `Location of the Bot`
   });
}

function botAppId(obj) {
   obj.argument(`botAppId`, {
      required: false,
      desc: `Microsoft App ID of the Bot`
   });
}

function botAppPasswd(obj) {
   obj.argument(`botAppPasswd`, {
      required: false,
      desc: `Microsoft App Password for the Bot`
   });
}

// function customFolder(obj) {
//    obj.argument(`customFolder`, {
//       required: false,
//       desc: `Path to folder of build & release templates`
//    });
// }

function tfs(obj) {
   obj.argument(`tfs`, {
      required: false,
      desc: `Full TFS URL with collection, VSTS account or Profile`
   });
}

function azureSub(obj) {
   obj.argument(`azureSub`, {
      required: false,
      desc: `Azure Subscription name`
   });
}

function azureSubId(obj) {
   obj.argument(`azureSubId`, {
      required: false,
      desc: `Azure Subscription ID`
   });
}

function tenantId(obj) {
   obj.argument(`tenantId`, {
      required: false,
      desc: `Azure Tenant ID`
   });
}

function servicePrincipalId(obj) {
   obj.argument(`servicePrincipalId`, {
      required: false,
      desc: `Azure Service Principal Id`
   });
}

function queue(obj) {
   obj.argument(`queue`, {
      required: false,
      desc: `Agent queue to use`
   });
}

function target(obj) {
   obj.argument(`target`, {
      required: false,
      desc: `Docker or Azure app service`
   });
}

function installDep(obj) {
   obj.argument(`installDep`, {
      required: false,
      desc: `If true dependencies are installed`
   });
}

function dockerHost(obj) {
   obj.argument(`dockerHost`, {
      required: false,
      desc: `Docker host url including port`
   });
}

function dockerCertPath(obj) {
   obj.argument(`dockerCertPath`, {
      required: false,
      desc: `Path to Docker certs folder`
   });
}

function dockerRegistry(obj) {
   obj.argument(`dockerRegistry`, {
      required: false,
      desc: `Server of your Docker registry`
   });
}

function dockerRegistryId(obj) {
   obj.argument(`dockerRegistryId`, {
      required: false,
      desc: `Username for Docker registry`
   });
}

function dockerPorts(obj) {
   obj.argument(`dockerPorts`, {
      required: false,
      desc: `Port mapping for container and host`
   });
}

function dockerRegistryPassword(obj) {
   obj.argument(`dockerRegistryPassword`, {
      required: false,
      desc: `Password for your Docker registry`
   });
}

function servicePrincipalKey(obj) {
   obj.argument(`servicePrincipalKey`, {
      required: false,
      desc: `Azure Service Principal Key`
   });
}

function pat(obj) {
   obj.argument(`pat`, {
      required: false,
      desc: `Personal Access Token to VSTS`
   });
}

function gitAction(obj) {
   obj.argument(`action`, {
      required: false,
      desc: `Git action to take`
   });
}

module.exports = {
   tfs: tfs,
   pat: pat,
   queue: queue,
   target: target,
   azureSub: azureSub,
   tenantId: tenantId,
   gitAction: gitAction,
   profileCmd: profileCmd,
   profileName: profileName,
   azureSubId: azureSubId,
   installDep: installDep,
   dockerHost: dockerHost,
   dockerPorts: dockerPorts,
   // customFolder: customFolder,
   dockerCertPath: dockerCertPath,
   dockerRegistry: dockerRegistry,
   botType: botType,
   bbVersion: bbVersion,
   botName: botName,
   botAppId: botAppId,
   botAppPasswd: botAppPasswd,
   botLocation: botLocation,
   dockerRegistryId: dockerRegistryId,
   servicePrincipalId: servicePrincipalId,
   servicePrincipalKey: servicePrincipalKey,
   dockerRegistryPassword: dockerRegistryPassword,
};