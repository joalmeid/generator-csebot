const docker = require('./_docker');

describe(`Azure Container Instances (Linux) using Default queue`, function () {
   "use strict";

   docker.runTests({
      botType: `node`,
      botName: `nodeACITest`,
      target: `acilinux`,
      queue: `Default`,
      title: `Home Page - My Express Application`
   });
});