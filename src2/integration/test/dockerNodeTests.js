const docker = require('./_docker');

describe(`Docker Host using Default queue`, function () {
   "use strict";

   docker.runTests({
      botType: `node`,
      botName: `nodeDockerTest`,
      target: `docker`,
      queue: `Default`,
      title: `Home Page - My Express Application`
   });
});