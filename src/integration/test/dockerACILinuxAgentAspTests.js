// This only makes sense when run on VSTS. The hosted linux
// is not on TFS.
const docker = require('./_docker');

describe(`Azure Container Instances (Linux) using Hosted Linux Preview queue`, function () {
   "use strict";

   docker.runTests({
      botType: `asp`,
      botName: `aspACITest`,
      target: `acilinux`,
      queue: `Hosted Linux Preview`,
      title: `Home Page - My .NET Core Application`
   });
});