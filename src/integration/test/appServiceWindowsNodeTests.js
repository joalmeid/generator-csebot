const appService = require('./_appService');

describe(`Azure App Service (Windows) using Default queue`, function () {
   "use strict";

   appService.runTests({
      botType: `node`,
      botName: `nodePaaSTest`,
      target: `paas`,
      context: `Azure App Service (Windows)`,
      suffix: ``,
      queue: `Default`,
      title: `Home Page - My Express Application`
   });
});