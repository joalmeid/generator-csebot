const path = require('path');
const mkdirp = require('mkdirp');
const uuidV4 = require('uuid/v4');
const args = require(`../app/args`);
const util = require(`../app/utility`);
const prompts = require(`../app/prompt`);
const generators = require('yeoman-generator');

function construct() {
   // Calling the super constructor is important so our generator is correctly set up
   generators.Base.apply(this, arguments);

   // Order is important 
   args.botName(this);
   args.botLocation(this);
   args.tfs(this);
}

function input() {
   // Collect any missing data from the user.
   // This gives me access to the generator in the
   // when callbacks of prompt
   let cmdLnInput = this;

   return this.prompt([
      prompts.botName(this),
      prompts.botLocation(this),
      prompts.tfs(this)
   ]).then(function (a) {
      // Transfer answers to local object for use in the rest of the generator
      this.botName = util.reconcileValue(a.botName, cmdLnInput.botName);
      this.botLocation = util.reconcileValue(a.botLocation, cmdLnInput.botLocation);
      this.tfs = util.reconcileValue(a.tfs, cmdLnInput.tfs);
   }.bind(this));
}

function writeFiles() {

   var tokens = {
      name: this.botName,
      uuid1: uuidV4(),
      uuid2: uuidV4(),
      uuid3: uuidV4(),
      name_lowercase: this.botName.toLowerCase(),
      location: this.botLocation,
      location_lowercase: this.botLocation.toLowerCase().replace(/\s+/g, ''),
      projectUrl: `${util.getFullURL(this.tfs)}/${this.botName}`,
      BotId: this.botName,
      MicrosoftAppId: "",
      MicrosoftAppPassword: ""
   };

   var src = this.sourceRoot();
   var root = this.botName;

   // Root files
   this.copy(`${src}/gitignore`, `${root}/.gitignore`);
   this.copy(`${src}/gitattributes`, `${root}/.gitattributes`);
   this.fs.copyTpl(`${src}/botcsharp.sln`, `${root}/${this.botName}.sln`, tokens);

   // Bot App project
   src = `${this.sourceRoot()}/botcsharp`;
   root = `${this.botName}/${this.botName}`;

   // App_Start
   this.fs.copyTpl(`${src}/App_Start/WebApiConfig.cs`, `${root}/App_Start/WebApiConfig.cs`, tokens);

   //Connected Services
   this.copy(`${src}/Connected Services/Application Insights/ConnectedService.json`, `${root}/Connected Services/Application Insights/ConnectedService.json`);

   //Controllers
   this.fs.copyTpl(`${src}/Controllers/MessagesController.cs`, `${root}/Controllers/MessagesController.cs`, tokens);

   //Dialogs
   this.fs.copyTpl(`${src}/Dialogs/RootDialog.cs`, `${root}/Dialogs/RootDialog.cs`, tokens);
   
   //Properties
   this.fs.copyTpl(`${src}/Properties/AssemblyInfo.cs`, `${root}/Properties/AssemblyInfo.cs`, tokens);

   //Util
   this.fs.copyTpl(`${src}/Util/TelemetryExtensions.cs`, `${root}/Util/TelemetryExtensions.cs`, tokens);
     
   //Root Folder
   this.copy(`${src}/ApplicationInsights.config`, `${root}/ApplicationInsights.config`);
   this.fs.copyTpl(`${src}/Global.asax`, `${root}/Global.asax`, tokens);
   this.fs.copyTpl(`${src}/Global.asax.cs`, `${root}/Global.asax.cs`, tokens);
   this.fs.copyTpl(`${src}/botcsharp.csproj`, `${root}/${this.botName}.csproj`, tokens);
   this.fs.copyTpl(`${src}/default.htm`, `${root}/default.htm`, tokens);
   this.copy(`${src}/packages.config`, `${root}/packages.config`);
   this.fs.copyTpl(`${src}/web.config`, `${root}/web.config`, tokens);
   this.copy(`${src}/web.Debug.config`, `${root}/web.Debug.config`);
   this.copy(`${src}/web.Release.config`, `${root}/web.Release.config`);
   
   // IaC project
   src = `${this.sourceRoot()}/botcsharp.IaC`;
   root = `${this.botName}/${this.botName}.IaC`;

   this.fs.copyTpl(`${src}/Deploy-AzureResourceGroup.ps1`, `${root}/Deploy-AzureResourceGroup.ps1`, tokens);
   this.copy(`${src}/botcsharp.IaC.deployproj`, `${root}/${this.botName}.IaC.deployproj`);
   this.copy(`${src}/botcsharp.json`, `${root}/botapp.json`);
   this.copy(`${src}/botcsharp.parameters.json`, `${root}/botapp.parameters.json`);
   this.copy(`${src}/Deployment.targets`, `${root}/Deployment.targets`);

   // Test project
   src = `${this.sourceRoot()}/botcsharp.Tests`;
   root = `${this.botName}/${this.botName}.Tests`;

   this.copy(`${src}/packages.config`, `${root}/packages.config`);

   this.fs.copyTpl(`${src}/UnitTest1.cs`, `${root}/UnitTest1.cs`, tokens);
   this.fs.copyTpl(`${src}/Properties/AssemblyInfo.cs`, `${root}/Properties/AssemblyInfo.cs`, tokens);
   this.fs.copyTpl(`${src}/botcsharp.Tests.csproj`, `${root}/${this.botName}.Tests.csproj`, tokens);
}

module.exports = generators.Base.extend({
   // The name `constructor` is important here
   constructor: construct,

   // 2. Where you prompt users for options (where you'd call this.prompt())
   prompting: input,

   // 5. Where you write the generator specific files (routes, controllers, etc)
   writing: writeFiles
});