const appService = require('./_appService');

describe(`Default Core AS Docker`, function () {
   describe(`Azure App Service Docker (Linux) using Default queue`, function () {
      "use strict";

      appService.runTests({
         botType: `asp`,
         botName: `aspDockerPaaSTest`,
         target: `dockerpaas`,
         context: `Azure App Service Docker (Linux)`,
         suffix: `-Docker`,
         queue: `Default`,
         title: `Home Page - My .NET Core Application`
      });
   });
});