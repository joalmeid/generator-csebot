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

   obj.composeWith(`csebot:release`, {
      args: [obj.type, obj.botName, obj.tfs,
         queue, obj.target,
         obj.azureSub, obj.botLocation,
         obj.pat
      ]
   });
}

function addBuild(obj) {
   obj.composeWith(`csebot:build`, {
      args: [obj.type, obj.botName, obj.tfs,
         obj.queue, obj.target,
         obj.pat
      ]
   });
}

function addAzure(obj) {
   if (util.isPaaS(obj)) {
      obj.composeWith(`csebot:azure`, {
         args: [obj.botName, obj.tfs,
            obj.azureSub, obj.azureSubId, obj.tenantId, obj.servicePrincipalId, obj.servicePrincipalKey,
            obj.pat
         ]
      });
   }
}

function addProject(obj) {
   obj.composeWith(`csebot:project`, {
      args: [obj.botName, obj.tfs,
         obj.pat
      ]
   });
}

function addRegistry(obj) {
   if (util.needsRegistry(obj)) {
      obj.composeWith(`csebot:registry`, {
         args: [obj.botName, obj.tfs,
            obj.pat
         ]
      });
   }
}

function addLanguage(obj) {
   if (obj.type === `csharp`) {
      obj.composeWith(`csebot:bbv3-csharp`, {
         args: [obj.botName, obj.botLocation, obj.tfs]
      });
   } else if (obj.type === `node`) {
      obj.composeWith(`csebot:bbv3-node`, {
         args: [obj.botName, obj.installDep, obj.tfs]
      });
   } else {
      obj.composeWith(`csebot:bbv3-typescript`, {
         args: [obj.botName, obj.installDep, obj.tfs]
      });
   }
   
}

function addGit(obj) {
   obj.composeWith(`csebot:git`, {
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