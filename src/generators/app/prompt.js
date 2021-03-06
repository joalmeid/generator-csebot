// Many of the generators use the same prompts in their prompting stage so 
// these functions make it easy to reuse in other generators.
// This removed a lot of duplicate code and makes sure the prompts are all
// handled in the same way in each generator.

const util = require(`./utility`);

function profileCmd(obj) {
   return {
      store: true,
      type: `list`,
      name: `profileCmd`,
      default: `Add`,
      choices: util.getProfileCommands,
      message: `Select a command.`,
      when: answers => {
         // If the value was passed on the command line it will
         // not be set in answers which other prompts expect.
         // So, place it in answers now.
         // If you are reading from prompts don't overwrite
         // what the user entered.
         if (obj.options.profileCmd !== undefined) {
            answers.profileCmd = obj.options.profileCmd;
         }

         return answers.profileCmd === undefined;
      }
   };
}

function profileName(obj) {
   return {
      name: `profileName`,
      type: `input`,
      store: true,
      message: `Enter a name of the profile.`,
      validate: util.validateProfileName,
      when: answers => {
         // If the value was passed on the command line it will
         // not be set in answers which other prompts expect.
         // So, place it in answers now.
         // If you are reading from prompts don't overwrite
         // what the user entered.
         if (obj.options.profileName !== undefined) {
            answers.profileName = obj.options.profileName;
         }

         return answers.profileCmd !== `list` && answers.profileName === undefined;
      }
   };
}

function tfs(obj) {
   return {
      name: `tfs`,
      type: `input`,
      store: true,
      message: util.getInstancePrompt,
      validate: util.validateTFS,
      filter: util.extractInstance,
      when: answers => {
         // If the value was passed on the command line it will
         // not be set in answers which other prompts expect.
         // So, place it in answers now.
         // If you are reading from prompts don't overwrite
         // what the user entered.
         if (obj.options.tfs !== undefined) {
            answers.tfs = obj.options.tfs;
         }

         // You don't need this if you are just listing or deleting a 
         // prof
         if (answers.profileCmd === `list` || answers.profileCmd === `delete`) {
            return false;
         }

         return answers.tfs === undefined;
      }
   };
}

function pat(obj) {
   return {
      name: `pat`,
      type: `password`,
      store: false,
      message: util.getPATPrompt,
      validate: util.validatePersonalAccessToken,
      when: answers => {
         // You don't need this if you are just listing or deleting a 
         // profile
         if (answers.profileCmd === `list` || answers.profileCmd === `delete`) {
            return false;
         }

         if (answers.profileCmd === `add`) {
            return true;
         }

         return util.readPatFromProfile(answers, obj);
      }
   };
}

function queue(obj) {
   return {
      store: true,
      type: `list`,
      name: `queue`,
      default: `Default`,
      choices: util.getPools,
      message: `What agent queue would you like to use?`,
      when: answers => {
         var result = obj.options.queue === undefined;

         if (result) {
            obj.log(`  Getting Agent Queues...`);
         }

         return result;
      }
   };
}

function botType(obj) {
   return {
      name: `type`,
      type: `list`,
      store: true,
      message: `What type of Bot do you want to create?`,
      default: obj.options.type,
      choices: util.getBotTypes,
      when: answers => {
         // If the value was passed on the command line it will
         // not be set in answers which other prompts expect.
         // So, place it in answers now.
         // If you are reading from prompts don't overwrite
         // what the user entered.
         if (obj.options.type !== undefined) {
            answers.type = obj.options.type;
         }

         return answers.type === undefined;
      }
   };
}

//Bot Builder Version
function bbVersion(obj) {
   return {
      name: `bbVersion`,
      type: `list`,
      store: true,
      message: `What Bot Framework (botbuilder) version do you want to use?`,
      default: obj.options.bbVersion,
      choices: util.getBotBuilderVersions,
      when: answers => {
         // If the value was passed on the command line it will
         // not be set in answers which other prompts expect.
         // So, place it in answers now.
         // If you are reading from prompts don't overwrite
         // what the user entered.
         if (obj.options.bbVersion !== undefined) {
            answers.bbVersion = obj.options.bbVersion;
         }

         return answers.bbVersion === undefined;
      }
   };
}

// function customFolder(obj) {
//    return {
//       name: `customFolder`,
//       type: `input`,
//       store: true,
//       message: `What is your custom template path?`,
//       validate: util.validateCustomFolder,
//       when: answers => {
//          return answers.type === `custom` && obj.options.customFolder === undefined;
//       }
//    };
// }

function botName(obj) {
   return {
      name: `botName`,
      type: `input`,
      store: true,
      message: `What is the name of your application?`,
      validate: util.validateBotName,
      when: () => {
         return obj.options.botName === undefined;
      }
   };
}

// function botLocation(obj) {
//    return {
//       name: `botLocation`,
//       type: `input`,
//       store: true,
//       message: `What is the azure location of your Bot?`,
//       validate: util.validateBotLocation,
//       when: () => {
//          return obj.options.botLocation === undefined;
//       }
//    };
// }

function botLocation(obj) {
   return {
      name: `botLocation`,
      type: `list`,
      store: true,
      message: `What is the azure location of your Bot?`,
      choices: util.getAzureLocations,
      validate: util.validateBotLocation,
      when: () => {
         return obj.options.botLocation === undefined;
      }
   };
}

function botAppId(obj) {
   return {
      name: `botAppId`,
      type: `input`,
      store: true,
      message: `What is Microsoft App ID? (Head to https://apps.dev.microsoft.com to register your Microsoft App)`,
      validate: util.validateAppId,
      when: () => {
         return obj.options.botAppId === undefined;
      }
   };
}

function botAppPasswd(obj) {
   return {
      name: `botAppPasswd`,
      type: `password`,
      store: false,
      message: `What is Microsoft App Password? (Generate a New Password in the app's Application Secrets)`,
      validate: util.validateAppPasswd,
      when: () => {
         return obj.options.botAppPasswd === undefined;
      }
   };
}

function target(obj) {
   return {
      name: `target`,
      type: `list`,
      store: true,
      message: `Where would you like to deploy?`,
      choices: util.getTargets,
      when: answers => {
         return obj.options.target === undefined;
      }
   };
}

// Azure
function azureSubInput(obj) {
   return {
      name: `azureSub`,
      type: `input`,
      store: true,
      message: `What is your Azure subscription name?`,
      validate: util.validateAzureSub,
      when: answers => {
         return util.isPaaS(answers, obj) && obj.options.azureSub === undefined && !util.isVSTS(answers.tfs);
      }
   };
}

function azureSubList(obj) {
   return {
      name: `azureSub`,
      type: `list`,
      store: true,
      message: `Which Azure subscription would you like to use?`,
      choices: util.getAzureSubs,
      validate: util.validateAzureSub,
      when: answers => {
         var result = util.isPaaS(answers, obj) && obj.options.azureSub === undefined && util.isVSTS(answers.tfs);

         if (result) {
            obj.log(`  Getting Azure subscriptions...`);
         }

         return result;
      }
   };
}

function azureSubId(obj) {
   return {
      name: `azureSubId`,
      type: `input`,
      store: true,
      message: `What is your Azure subscription ID?`,
      validate: util.validateAzureSubID,
      when: answers => {
         return util.isPaaS(answers, obj) && obj.options.azureSubId === undefined && !util.isVSTS(answers.tfs);
      }
   };
}

function servicePrincipalId(obj) {
   return {
      name: `servicePrincipalId`,
      type: `input`,
      store: true,
      message: `What is your Service Principal ID?`,
      validate: util.validateServicePrincipalID,
      when: answers => {
         return (util.isPaaS(answers, obj) && obj.options.servicePrincipalId === undefined && !util.isVSTS(answers.tfs)) || (util.isVSTS(answers.tfs) && answers.creationMode === `Manual`);
      }
   };
}

function tenantId(obj) {
   return {
      name: `tenantId`,
      type: `input`,
      store: true,
      message: `What is your Azure Tenant ID?`,
      validate: util.validateAzureTenantID,
      when: answers => {
         return util.isPaaS(answers, obj) && obj.options.tenantId === undefined && !util.isVSTS(answers.tfs);
      }
   };
}

function servicePrincipalKey(obj) {
   return {
      type: `password`,
      name: `servicePrincipalKey`,
      store: false,
      message: `What is your Service Principal Key?`,
      validate: util.validateServicePrincipalKey,
      when: answers => {
         return (util.isPaaS(answers, obj) && obj.options.servicePrincipalKey === undefined && !util.isVSTS(answers.tfs)) || (util.isVSTS(answers.tfs) && answers.creationMode === `Manual`);
      }
   };
}

// Docker
function dockerHost(obj) {
   return {
      name: `dockerHost`,
      type: `input`,
      store: true,
      message: `What is your Docker host url and port (tcp://host:2376)?`,
      validate: util.validateDockerHost,
      when: answers => {
         return util.needsDockerHost(answers, obj.options) && obj.options.dockerHost === undefined;
      }
   };
}

function dockerCertPath(obj) {
   return {
      name: `dockerCertPath`,
      type: `input`,
      store: true,
      message: `What is your Docker Certificate path?`,
      validate: util.validateDockerCertificatePath,
      when: answers => {
         return util.needsDockerHost(answers, obj.options) && obj.options.dockerCertPath === undefined;
      }
   };
}

function dockerRegistry(obj) {
   return {
      name: `dockerRegistry`,
      type: `input`,
      default: `https://index.docker.io/v1/`,
      store: true,
      message: `What is your Docker Registry URL?`,
      validate: util.validateDockerRegistry,
      when: answers => {
         return util.needsRegistry(answers, obj.options) && obj.options.dockerRegistry === undefined;
      }
   };
}

function dockerRegistryUsername(obj) {
   return {
      name: `dockerRegistryId`,
      type: `input`,
      store: true,
      message: `What is your Docker Registry username (case sensitive)?`,
      validate: util.validateDockerHubID,
      when: answers => {
         return util.needsRegistry(answers, obj.options) && obj.options.dockerRegistryId === undefined;
      }
   };
}

function dockerRegistryPassword(obj) {
   return {
      name: `dockerRegistryPassword`,
      type: `password`,
      store: false,
      message: `What is your Docker Registry password?`,
      validate: util.validateDockerHubPassword,
      when: answers => {
         return util.needsRegistry(answers, obj.options) && obj.options.dockerRegistryPassword === undefined;
      }
   };
}

function dockerPorts(obj) {
   return {
      name: `dockerPorts`,
      type: `input`,
      default: util.getDefaultPortMapping,
      message: `What port should be exposed?`,
      validate: util.validatePortMapping,
      when: answers => {
         return util.needsRegistry(answers, obj.options) && obj.options.dockerPorts === undefined;
      }
   };
}

function creationMode(obj) {
   return {
      name: `creationMode`,
      type: `list`,
      store: true,
      message: "Select a Service Principal Creation Mode",
      default: `Automatic`,
      choices: [{
            name: `Automatic`,
            value: `Automatic`
         },
         {
            name: `Manual`,
            value: `Manual`
         }
      ],
      when: answers => {
         return util.isPaaS(answers, obj) && obj.options.azureSub === undefined && util.isVSTS(answers.tfs);
      }
   };
}

function installDep(obj) {
   return {
      name: `installDep`,
      type: `list`,
      store: true,
      message: "Install dependencies?",
      default: `false`,
      choices: [{
            name: `Yes`,
            value: `true`
         },
         {
            name: `No`,
            value: `false`
         }
      ],
      when: answers => {
         return answers.type && answers.type.includes(`csharp`) && obj.options.installDep === undefined;
      }
   };
}

function gitAction(obj) {
   return {
      type: `list`,
      name: `action`,
      store: false,
      message: `What Git actions would you like to take?`,
      choices: [{
         name: `Clone`,
         value: `clone`
      }, {
         name: `Add & Commit`,
         value: `commit`
      }],
      when: function () {
         return obj.options.action === undefined;
      }
   };
}

module.exports = {
   tfs: tfs,
   pat: pat,
   queue: queue,
   target: target,
   tenantId: tenantId,
   gitAction: gitAction,
   installDep: installDep,
   azureSubId: azureSubId,
   profileCmd: profileCmd,
   dockerHost: dockerHost,
   profileName: profileName,
   dockerPorts: dockerPorts,
   azureSubList: azureSubList,
   // customFolder: customFolder,
   creationMode: creationMode,
   azureSubInput: azureSubInput,
   dockerRegistry: dockerRegistry,
   dockerCertPath: dockerCertPath,
   bbVersion: bbVersion,
   botType: botType,
   botName: botName,
   botAppId: botAppId,
   botAppPasswd: botAppPasswd,
   botLocation: botLocation,
   servicePrincipalId: servicePrincipalId,
   servicePrincipalKey: servicePrincipalKey,
   dockerRegistryPassword: dockerRegistryPassword,
   dockerRegistryUsername: dockerRegistryUsername
};