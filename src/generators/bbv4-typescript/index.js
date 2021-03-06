const path = require('path');
const util = require(`../app/utility`);
const argUtils = require(`../app/args`);
const prompts = require(`../app/prompt`);
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
   // The name `constructor` is important here
   constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);

      // Order is important 
      argUtils.botName(this);
      argUtils.installDep(this);
      argUtils.dockerPorts(this);
      argUtils.tfs(this); //JDA
   }

   // 2. Where you prompt users for options (where you'd call this.prompt())
   prompting() {
      // Collect any missing data from the user.
      // This gives me access to the generator in the
      // when callbacks of prompt
      let cmdLnInput = this;

      return this.prompt([
         prompts.botName(this),
         prompts.installDep(this),
         prompts.dockerPorts(this),
         prompts.tfs(this)
      ]).then(function (answers) {
         // Transfer answers to local object for use in the rest of the generator
         this.installDep = util.reconcileValue(cmdLnInput.options.installDep, answers.installDep);
         this.dockerPorts = util.reconcileValue(cmdLnInput.options.dockerPorts, answers.dockerPorts, ``);
         this.botName = util.reconcileValue(cmdLnInput.options.botName, answers.botName);
         this.tfs = util.reconcileValue(cmdLnInput.options.tfs, answers.tfs);
      }.bind(this));
   }

   // 5. Where you write the generator specific files (routes, controllers, etc)
   writing() {
      var tokens = {
         name: this.botName,
         port: this.dockerPorts.split(':')[0],
         name_lowercase: this.botName.toLowerCase(),
         projectUrl: `${util.getFullURL(this.tfs)}/${this.botName}`
      };

      var src = this.sourceRoot();
      var root = this.botName;

      // Root files
      this.fs.copyTpl(`${src}/README.md`, `${root}/README.md`, tokens);
      this.fs.copy(`${src}/gitignore`, `${root}/.gitignore`);

      src = `${this.sourceRoot()}/src`;
      root = `${this.botName}/src`;

      // Bot source code files
      this.fs.copy(`${src}/app.ts`, `${root}/app.ts`);
      this.fs.copy(`${src}/bot.ts`, `${root}/bot.ts`);
      this.fs.copyTpl(`${src}/package.json`, `${root}/package.json`, tokens);
      this.fs.copy(`${src}/tslint.json`, `${root}/tslint.json`);
      this.fs.copy(`${src}/tsconfig.json`, `${root}/tsconfig.json`);
      this.fs.copy(`${src}/.env`, `${root}/.env`);
      this.fs.copyTpl(`${src}/botconfig.bot`, `${root}/${this.botName}.bot`, tokens);

      this.fs.copy(`${src}/dialogs/**`, `${root}/dialogs`);
      this.fs.copy(`${src}/models/**`, `${root}/models`);
      this.fs.copy(`${src}/util/**`, `${root}/util`);
      this.fs.copy(`${src}/test/**`, `${root}/test`);
      this.fs.copy(`${src}/.vscode/**`, `${root}/.vscode`);

      src = `${this.sourceRoot()}/templates`;
      root = `${this.botName}/templates`;

      // ARM Templates
      this.fs.copy(`${src}/botts.json`, `${root}/botapp.json`);
      this.fs.copy(`${src}/botts.parameters.json`, `${root}/botapp.parameters.json`);
      this.fs.copy(`${src}/bot-registration.json`, `${root}/bot-registration.json`);
      this.fs.copy(`${src}/bot-registration.parameters.json`, `${root}/bot-registration.parameters.json`);
      this.fs.copy(`${src}/appInsigthsApiAccess.ps1`, `${root}/appInsigthsApiAccess.ps1`);

      // this.fs.copy(`${src}/acilinux_arm.json`, `${root}/acilinux.json`);
      // this.fs.copyTpl(`${src}/acilinux_arm.parameters.json`, `${root}/acilinux.parameters.json`, tokens);

      // this.fs.copy(`${src}/docker_arm.json`, `${root}/docker.json`);
      // this.fs.copy(`${src}/docker_arm.parameters.json`, `${root}/docker.parameters.json`);
   }

   // 7. Where installation are run (npm, bower)
   install() {
      if (this.installDep === 'true') {
         process.chdir(this.botName);

         this.log(`+ Running npm install`);
         this.spawnCommandSync('npm', ['install'], {
            stdio: ['pipe', 'pipe', process.stderr]
         });
      }
   }
};