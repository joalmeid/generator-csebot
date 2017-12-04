const util = require(`./utility`);

function botType(obj) {
   obj.argument(`type`, {
      required: false,
      desc: `project type to create (csharp, node, typescript)`
   });
}

function botName(obj) {
   obj.argument(`botName`, {
      required: false,
      desc: `name of the Bot`
   });
}

function tfs(obj) {
   obj.argument(`tfs`, {
      required: false,
      desc: `full tfs URL including collection or Team Services account name`
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
      desc: `agent queue name to use`
   });
}

function target(obj) {
   obj.argument(`target`, {
      required: false,
      desc: `docker or Azure app service`
   });
}

function installDep(obj) {
   obj.argument(`installDep`, {
      required: false,
      desc: `if true dependencies are installed`
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
      desc: `Personal Access Token to TFS/VSTS`
   });
}

function gitAction(obj) {
   obj.argument(`action`, {
      required: false,
      desc: `the Git action to take`
   });
}

module.exports = {
   tfs: tfs,
   pat: pat,
   queue: queue,
   target: target,
   // groupId: groupId,
   azureSub: azureSub,
   tenantId: tenantId,
   gitAction: gitAction,
   azureSubId: azureSubId,
   installDep: installDep,
   botType: botType,
   botName: botName,
   servicePrincipalId: servicePrincipalId,
   servicePrincipalKey: servicePrincipalKey,
};