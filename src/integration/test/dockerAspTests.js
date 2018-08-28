const docker = require('./_docker');

describe(`Docker Host using Default queue`, function () {
   "use strict";

   docker.runTests({
      botType: `asp`,
      botName: `aspDockerTest`,
      target: `docker`,
      queue: `Default`,
      title: `Home Page - My .NET Core Application`
   });
});