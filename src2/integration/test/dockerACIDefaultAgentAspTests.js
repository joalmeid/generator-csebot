const docker = require('./_docker');

describe(`Azure Container Instances (Linux) using Default queue`, function () {
   "use strict";

   docker.runTests({
      botType: `asp`,
      botName: `aspACITest`,
      target: `acilinux`,
      queue: `Default`,
      title: `Home Page - My .NET Core Application`
   });
});