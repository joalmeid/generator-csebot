const url = require(`url`);
const path = require(`path`);
const app = require(`./app.js`);
const util = require(`../app/utility`);
const argUtils = require(`../app/args`);
const prompts = require(`../app/prompt`);
const Generator = require(`yeoman-generator`);

module.exports = class extends Generator {
   // The name `constructor` is important here
   constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);

      // Order is important 
      argUtils.botName(this);
      argUtils.tfs(this);
      argUtils.dockerHost(this);
      argUtils.dockerCertPath(this);
      argUtils.pat(this);
   }

   // 2. Where you prompt users for options (where you`d call this.prompt())
   prompting() {
      // Collect any missing data from the user.
      // This gives me access to the generator in the
      // when callbacks of prompt
      let cmdLnInput = this;

      return this.prompt([
         prompts.tfs(this),
         prompts.pat(this),
         prompts.botName(this),
         prompts.dockerHost(this),
         prompts.dockerCertPath(this)
      ]).then(function (answers) {
         // Transfer answers to local object for use in the rest of the generator
         this.pat = util.reconcileValue(cmdLnInput.options.pat, answers.pat);
         this.tfs = util.reconcileValue(cmdLnInput.options.tfs, answers.tfs);
         this.dockerHost = util.reconcileValue(cmdLnInput.options.dockerHost, answers.dockerHost);
         this.dockerCertPath = util.reconcileValue(cmdLnInput.options.dockerCertPath, answers.dockerCertPath);
         this.botName = util.reconcileValue(cmdLnInput.options.botName, answers.botName);
      }.bind(this));
   }

   // 5. Where you write the generator specific files (routes, controllers, etc)
   writing() {
      var done = this.async();

      var args = {
         pat: this.pat,
         tfs: this.tfs,
         dockerHost: this.dockerHost,
         botName: this.botName,
         project: this.botName,
         dockerCertPath: this.dockerCertPath
      };

      app.run(args, this, done);
   }
};