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
      arguments: [obj.type, 
         obj.botName, 
         obj.tfs,
         queue,
         obj.target,
         obj.azureSub,
         obj.botLocation,
         obj.dockerHost,
         obj.dockerRegistry,
         obj.dockerRegistryId,
         obj.dockerPorts,
         obj.dockerRegistryPassword,
         obj.pat
         // obj.customFolder,
      ]
   });
}

function addBuild(obj) {
   obj.composeWith(`csebot:build`, {
      arguments: [obj.type,
         obj.botName,
         obj.tfs,
         obj.queue,
         obj.target,
         obj.dockerHost,
         obj.dockerRegistry,
         obj.dockerRegistryId,
         obj.pat
         // obj.customFolder
      ]
   });
}

function addAzure(obj) {
   if (util.isPaaS(obj)) {
      obj.composeWith(`csebot:azure`, {
         arguments: [obj.botName,
            obj.tfs,
            obj.azureSub,
            obj.azureSubId,
            obj.tenantId,
            obj.servicePrincipalId,
            obj.servicePrincipalKey,
            obj.pat
         ]
      });
   }
}

function addProject(obj) {
   obj.composeWith(`csebot:project`, {
      arguments: [obj.botName,
         obj.tfs,
         obj.pat
      ]
   });
}

function addRegistry(obj) {
   if (util.needsRegistry(obj)) {
      obj.composeWith(`csebot:registry`, {
         arguments: [obj.botName,
            obj.tfs,
            obj.dockerRegistry,
            obj.dockerRegistryId,
            obj.dockerRegistryPassword,
            obj.pat
         ]
      });
   }
}

function addDockerHost(obj) {
   if (util.needsDockerHost({}, obj)) {
      obj.composeWith(`csebot:docker`, {
         arguments: [obj.botName,
            obj.tfs,
            obj.dockerHost,
            obj.dockerCertPath,
            obj.pat
         ]
      });
   }
}

function addLanguage(obj) {
   // let generator = `csebot:${obj.type}`;

   switch (obj.type) {
      case `csharp`:
         obj.composeWith(`csebot:bbv3-csharp`, {
            arguments: [obj.botName,
               obj.botLocation,
               obj.tfs
            ]
         });
         break;

      case `tsc`:
         obj.composeWith(`csebot:bbv3-typescript`, {
            arguments: [obj.botName,
               obj.installDep,
               obj.dockerPorts,
               obj.tfs
            ]
         });
         break;

      //node
      default:
         obj.composeWith(`csebot:bbv3-node`, {
            arguments: [obj.botName,
               obj.installDep,
               obj.dockerPorts,
               obj.tfs
            ]
         });
         break;

      // case `node`:
      //    obj.composeWith(generator, {
      //       arguments: [obj.botName, obj.installDep, obj.dockerPorts]
      //    });
      //    break;

      // default:
      //    obj.composeWith(generator, {
      //       arguments: [obj.botName, obj.dockerPorts]
      //    });
      //    break;
   }
}

function addGit(obj) {
   obj.composeWith(`csebot:git`, {
      arguments: [obj.botName,
         obj.tfs,
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
   addDockerHost: addDockerHost
};