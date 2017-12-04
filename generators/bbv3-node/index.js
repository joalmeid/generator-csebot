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
}

function input() {
   // Collect any missing data from the user.
   // This gives me access to the generator in the
   // when callbacks of prompt
   let cmdLnInput = this;

   return this.prompt([
      prompts.botName(this),
      prompts.installDep(this)
      // prompts.dockerPorts(this)
   ]).then(function (a) {
      // Transfer answers to local object for use in the rest of the generator
      this.installDep = util.reconcileValue(a.installDep, cmdLnInput.installDep);
      //this.dockerPorts = util.reconcileValue(a.dockerPorts, cmdLnInput.dockerPorts, ``);
      this.botName = util.reconcileValue(a.botName, cmdLnInput.botName);
   }.bind(this));
}

function writeFiles() {
   var tokens = {
      name: this.botName,
      //port: this.dockerPorts.split(':')[0],
      name_lowercase: this.botName.toLowerCase(),
   };

   var src = this.sourceRoot();
   var root = this.botName;

   // Root files
   // this.copy(`${src}/.bowerrc`, `${root}/.bowerrc`);
   this.copy(`${src}/README.md`, `${root}/README.md`);
   this.copy(`${src}/gitignore`, `${root}/.gitignore`);
   // this.fs.copyTpl(`${src}/bower.json`, `${root}/bower.json`, tokens);
   // this.fs.copyTpl(`${src}/package.json`, `${root}/package.json`, tokens);

   // Bot Web App project
   src = `${this.sourceRoot()}/src`;
   root = `${this.botName}/src`;

   this.copy(`${src}/app.js`, `${root}/app.js`);
   this.copy(`${src}/bot.js`, `${root}/bot.js`);
   this.copy(`${src}/web.config`, `${root}/web.config`);
   this.copy(`${src}/parameters.xml`, `${root}/parameters.xml`);
   this.fs.copyTpl(`${src}/package.json`, `${root}/package.json`, tokens);
   this.copy(`${src}/.env`, `${root}/.env`);
   
   this.directory(`${src}/dialogs`, `${root}/dialogs`);
   this.directory(`${src}/util`, `${root}/util`);
   this.directory(`${src}/test`, `${root}/test`);
   
   // this.copy(`${src}/app.js`, `${root}/app.js`);
   // this.copy(`${src}/web.config`, `${root}/web.config`);
   // this.copy(`${src}/Dockerfile`, `${root}/Dockerfile`);
   // this.copy(`${src}/parameters.xml`, `${root}/parameters.xml`);
   // this.fs.copyTpl(`${src}/package.json`, `${root}/package.json`, tokens);

   // this.directory(`${src}/public`, `${root}/public`);
   // this.directory(`${src}/routes`, `${root}/routes`);
   // this.fs.copyTpl(`${src}/server.js`, `${root}/server.js`, tokens);

   // this.copy(`${src}/views/about.pug`, `${root}/views/about.pug`);
   // this.copy(`${src}/views/error.pug`, `${root}/views/error.pug`);
   // this.copy(`${src}/views/index.pug`, `${root}/views/index.pug`);
   // this.copy(`${src}/views/contact.pug`, `${root}/views/contact.pug`);
   // this.fs.copyTpl(`${src}/views/layout.pug`, `${root}/views/layout.pug`, tokens);

   // ARM Templates
   src = `${this.sourceRoot()}/templates`;
   root = `${this.botName}/templates`;

   this.copy(`${src}/node_arm.json`, `${root}/website.json`);
   this.copy(`${src}/arm.parameters.json`, `${root}/website.parameters.json`);

   // this.copy(`${src}/acilinux_arm.json`, `${root}/acilinux.json`);
   // this.fs.copyTpl(`${src}/acilinux_arm.parameters.json`, `${root}/acilinux.parameters.json`, tokens);

   // this.copy(`${src}/docker_arm.json`, `${root}/docker.json`);
   // this.copy(`${src}/docker_arm.parameters.json`, `${root}/docker.parameters.json`);
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