const path = require('path');
const args = require(`../app/args`);
const util = require(`../app/utility`);
const prompts = require(`../app/prompt`);
const generators = require('yeoman-generator');

function construct() {
   // Calling the super constructor is important so our generator is correctly set up
   generators.Base.apply(this, arguments);

   // Order is important 
   args.botName(this);
   args.installDep(this);
   //args.dockerPorts(this);
   args.tfs(this);
}

function input() {
   // Collect any missing data from the user.
   // This gives me access to the generator in the
   // when callbacks of prompt
   let cmdLnInput = this;

   return this.prompt([
      prompts.botName(this),
      prompts.installDep(this),
      prompts.tfs(this)
      // prompts.dockerPorts(this)
   ]).then(function (a) {
      // Transfer answers to local object for use in the rest of the generator
      this.installDep = util.reconcileValue(a.installDep, cmdLnInput.installDep);
      //this.dockerPorts = util.reconcileValue(a.dockerPorts, cmdLnInput.dockerPorts, ``);
      this.botName = util.reconcileValue(a.botName, cmdLnInput.botName);
      this.tfs = util.reconcileValue(a.tfs, cmdLnInput.tfs);
   }.bind(this));
}

function writeFiles() {
   var tokens = {
      name: this.botName,
      //port: this.dockerPorts.split(':')[0],
      name_lowercase: this.botName.toLowerCase(),
      projectUrl: `${util.getFullURL(this.tfs)}/${this.botName}`
   };

   var src = this.sourceRoot();
   var root = this.botName;

   // Root files
   this.fs.copyTpl(`${src}/README.md`, `${root}/README.md`, tokens);
   this.copy(`${src}/gitignore`, `${root}/.gitignore`);

   // Bot Web App project
   src = `${this.sourceRoot()}/src`;
   root = `${this.botName}/src`;

   this.copy(`${src}/app.ts`, `${root}/app.ts`);
   this.copy(`${src}/bot.ts`, `${root}/bot.ts`);
   this.copy(`${src}/web.config`, `${root}/web.config`);
   this.copy(`${src}/parameters.xml`, `${root}/parameters.xml`);
   this.fs.copyTpl(`${src}/package.json`, `${root}/package.json`, tokens);
   this.copy(`${src}/tslint.json`, `${root}/tslint.json`);
   this.copy(`${src}/tsconfig.json`, `${root}/tsconfig.json`);
   this.copy(`${src}/.env`, `${root}/.env`);
   
   this.directory(`${src}/dialogs`, `${root}/dialogs`);
   this.directory(`${src}/models`, `${root}/models`);
   this.directory(`${src}/test`, `${root}/test`);
   this.directory(`${src}/util`, `${root}/util`);

   // ARM Templates
   src = `${this.sourceRoot()}/templates`;
   root = `${this.botName}/templates`;

   this.copy(`${src}/botts.json`, `${root}/botapp.json`);
   this.copy(`${src}/botts.parameters.json`, `${root}/botapp.parameters.json`);
}

function install() {
   if (this.installDep === 'true') {
      process.chdir(this.botName);

      this.log(`+ Running npm install`);
      this.spawnCommandSync('npm', ['install'], {
         stdio: ['pipe', 'pipe', process.stderr]
      });
   }
}

module.exports = generators.Base.extend({
   // The name `constructor` is important here
   constructor: construct,

   // 2. Where you prompt users for options (where you'd call this.prompt())
   prompting: input,

   // 5. Where you write the generator specific files (routes, controllers, etc)
   writing: writeFiles,

   // 7. Where installation are run (npm, bower)
   install: install
});