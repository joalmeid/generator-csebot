const util = require(`./utility`);

function addRelease(obj) {

   var queue = obj.queue;

   if (util.isPaaS(obj) && queue.indexOf(`Linux`) !== -1) {
      queue = `Hosted VS2017`;

      // Inform user that if they selected Hosted Linux agent Hosted VS2017
      // will be used for release. The release requires AZPowerShell which is
      // not on the Linux build machine
      obj.log(`* Hosted Linux will be used for build and Hosted VS2017 for release. *`);
   }

   obj.composeWith(`bot:release`, {
      args: [obj.type, obj.botName, obj.tfs,
         queue, obj.target,
         obj.azureSub,
         obj.pat
      ]
   });
}

function addBuild(obj) {
   obj.composeWith(`bot:build`, {
      args: [obj.type, obj.botName, obj.tfs,
         obj.queue, obj.target,
         obj.pat
      ]
   });
}

function addAzure(obj) {
   if (util.isPaaS(obj)) {
      obj.composeWith(`bot:azure`, {
         args: [obj.botName, obj.tfs,
            obj.azureSub, obj.azureSubId, obj.tenantId, obj.servicePrincipalId, obj.servicePrincipalKey,
            obj.pat
         ]
      });
   }
}

function addProject(obj) {
   obj.composeWith(`bot:project`, {
      args: [obj.botName, obj.tfs,
         obj.pat
      ]
   });
}

function addRegistry(obj) {
   if (util.needsRegistry(obj)) {
      obj.composeWith(`bot:registry`, {
         args: [obj.botName, obj.tfs,
            obj.pat
         ]
      });
   }
}

function addLanguage(obj) {
   if (obj.type === `csharp`) {
      obj.composeWith(`bot:bbv3-csharp`, {
         args: [obj.botName, obj.installDep]
      });
   } else if (obj.type === `node`) {
      obj.composeWith(`bot:bbv3-node`, {
         args: [obj.botName, obj.installDep]
      });
   } else {
      obj.composeWith(`bot:bbv3-typescript`, {
         args: [obj.botName, obj.installDep]
      });
   }
   
}

function addGit(obj) {
   obj.composeWith(`bot:git`, {
      args: [obj.botName, obj.tfs,
         `all`,
         obj.pat
      ]
   });
}

module.exports = {
   addGit: addGit,
   addAzure: addAzure,
   addBuild: addBuild,
   addProject: addProject,
   addRelease: addRelease,
   addRegistry: addRegistry,
   addLanguage: addLanguage,
};