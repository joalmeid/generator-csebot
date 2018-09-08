const path = require('path');
const mkdirp = require('mkdirp');
const uuidV4 = require('uuid/v4');
const argUtils = require(`../app/args`);
const util = require(`../app/utility`);
const prompts = require(`../app/prompt`);
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
   // The name `constructor` is important here
   constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);

      // Order is important 
      argUtils.botName(this);
      argUtils.botLocation(this);
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
         prompts.botLocation(this),
         prompts.tfs(this)
      ]).then(function (answers) {
         // Transfer answers to local object for use in the rest of the generator
         this.botName = util.reconcileValue(cmdLnInput.options.botName, answers.botName);
         this.botLocation = util.reconcileValue(cmdLnInput.options.botLocation, answers.botLocation);
         this.tfs = util.reconcileValue(cmdLnInput.options.tfs, answers.tfs);
      }.bind(this));

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

   // 5. Where you write the generator specific files (routes, controllers, etc)
   writing() {

      var tokens = {
         name: this.botName,
         uuid1: uuidV4(),
         uuid2: uuidV4(),
         uuid3: uuidV4(),
         name_lowercase: this.botName.toLowerCase(),
         location: this.botLocation,
         projectUrl: `${util.getFullURL(this.tfs)}/${this.botName}`,
         MicrosoftAppId: "",
         MicrosoftAppPassword: ""
      };

      var src = this.sourceRoot();
      var root = this.botName;

      // Root files
      this.fs.copy(`${src}/gitignore`, `${root}/.gitignore`);
      this.fs.copy(`${src}/gitattributes`, `${root}/.gitattributes`);
      this.fs.copyTpl(`${src}/botcsharp.sln`, `${root}/${this.botName}.sln`, tokens);

      // Bot App project
      src = `${this.sourceRoot()}/botcsharp`;
      root = `${this.botName}/${this.botName}`;

      // App_Start
      this.fs.copyTpl(`${src}/App_Start/WebApiConfig.cs`, `${root}/App_Start/WebApiConfig.cs`, tokens);

      //Connected Services
      this.fs.copy(`${src}/Connected Services/Application Insights/ConnectedService.json`, `${root}/Connected Services/Application Insights/ConnectedService.json`);

      //Controllers
      this.fs.copyTpl(`${src}/Controllers/MessagesController.cs`, `${root}/Controllers/MessagesController.cs`, tokens);

      //Dialogs
      this.fs.copyTpl(`${src}/Dialogs/RootDialog.cs`, `${root}/Dialogs/RootDialog.cs`, tokens);
      
      //Properties
      this.fs.copyTpl(`${src}/Properties/AssemblyInfo.cs`, `${root}/Properties/AssemblyInfo.cs`, tokens);

      //Util
      this.fs.copyTpl(`${src}/Util/TelemetryExtensions.cs`, `${root}/Util/TelemetryExtensions.cs`, tokens);
      
      //Root Folder
      this.fs.copy(`${src}/ApplicationInsights.config`, `${root}/ApplicationInsights.config`);
      this.fs.copyTpl(`${src}/Global.asax`, `${root}/Global.asax`, tokens);
      this.fs.copyTpl(`${src}/Global.asax.cs`, `${root}/Global.asax.cs`, tokens);
      this.fs.copyTpl(`${src}/botcsharp.csproj`, `${root}/${this.botName}.csproj`, tokens);
      this.fs.copyTpl(`${src}/default.htm`, `${root}/default.htm`, tokens);
      this.fs.copy(`${src}/packages.config`, `${root}/packages.config`);
      this.fs.copyTpl(`${src}/web.config`, `${root}/web.config`, tokens);
      this.fs.copy(`${src}/web.Debug.config`, `${root}/web.Debug.config`);
      this.fs.copy(`${src}/web.Release.config`, `${root}/web.Release.config`);
      
      // IaC project
      src = `${this.sourceRoot()}/botcsharp.IaC`;
      root = `${this.botName}/${this.botName}.IaC`;

      this.fs.copy(`${src}/botcsharp.json`, `${root}/botapp.json`);
      this.fs.copy(`${src}/botcsharp.parameters.json`, `${root}/botapp.parameters.json`);
      this.fs.copy(`${src}/bot-registration.json`, `${root}/bot-registration.json`);
      this.fs.copy(`${src}/bot-registration.parameters.json`, `${root}/bot-registration.parameters.json`);
      this.fs.copy(`${src}/appInsigthsApiAccess.ps1`, `${root}/appInsigthsApiAccess.ps1`);

      this.fs.copyTpl(`${src}/Deploy-AzureResourceGroup.ps1`, `${root}/Deploy-AzureResourceGroup.ps1`, tokens);
      
      this.fs.copy(`${src}/botcsharp.IaC.deployproj`, `${root}/${this.botName}.IaC.deployproj`);
      this.fs.copy(`${src}/Deployment.targets`, `${root}/Deployment.targets`);

      // Test project
      src = `${this.sourceRoot()}/botcsharp.Tests`;
      root = `${this.botName}/${this.botName}.Tests`;

      this.fs.copy(`${src}/packages.config`, `${root}/packages.config`);

      this.fs.copyTpl(`${src}/UnitTest1.cs`, `${root}/UnitTest1.cs`, tokens);
      this.fs.copyTpl(`${src}/Properties/AssemblyInfo.cs`, `${root}/Properties/AssemblyInfo.cs`, tokens);
      this.fs.copyTpl(`${src}/botcsharp.Tests.csproj`, `${root}/${this.botName}.Tests.csproj`, tokens);
   }
};