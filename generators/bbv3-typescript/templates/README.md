# Bot Builder for Typescript
Bot Builder for Typescript, will generate Node.JS code after compiling/transpiling. [Bot Builder for Node.js](http://docs.botframework.com/builder/node/overview/) is a powerful framework for constructing bots that can handle both freeform interactions and more guided ones where the possibilities are explicitly shown to the user. It is easy to use and models frameworks like Express & Restify to provide developers with a familiar way to write Bots.

High Level Features:

* Powerful dialog system with dialogs that are isolated and composable.
* Built-in prompts for simple things like Yes/No, strings, numbers, enumerations.
* Built-in dialogs that utilize powerful AI frameworks like [LUIS](http://luis.ai).
* Bots are stateless which helps them scale.
* Bots can run on almost any bot platform like the [Microsoft Bot Framework](http://botframework.com), [Skype](http://skype.com), and [Slack](http://slack.com).

## Build a bot
Go to the directory created with the boilerplate code. Get the Bot modules using npm.

    npm install --save-dev
    
## Test your bot
Use the [Bot Framework Emulator](http://docs.botframework.com/connector/tools/bot-framework-emulator/) to test your bot on localhost. 

Install the emulator from [here](http://aka.ms/bf-bc-emulator) and then start your bot in a console window.

    node app.js
    
Start the emulator and say "hello" to your bot.

## DevOps with your bot
You now have full CI/CD pipelines, that will build and deploy your bot to the cloud. Take a look at your project [<%= name>](<%= project>).
Start by pushing the starting code, and doing a first build (*will start automatically*):

    git push

In the [build](<%= project>/_build), you have the **<%= name>-CI** build definition that will install all npm modules, run tsc, run tests and publish build artifacts.
In the [Release](<%= project>/_release), you have **<%= name>-CD** defining a pipeline with Dev, QA and Prod environments. For each environment the release process consists in Azure Resource Group deployment (check the ARM templates) and your bot app deployment.
Fell free to change build/release definitions accordingly to your needs/preferences.

## Publish your bot
After deployment, [register your bot](http://docs.botframework.com/connector/getstarted/#registering-your-bot-with-the-microsoft-bot-framework) with the Microsoft Bot Framework. 

NOTE: When you register your bot with the Bot Framework you'll want to update some information like appId,appSecret,App insights Instrumentation Key (not requried) and others. Use this values, assigned by the portal, in your bot and the emulator.

## Dive deeper
Learn how to build great bots.

* [Core Concepts Guide](http://docs.botframework.com/builder/node/guides/core-concepts/)
* [Bot Builder for Node.js Reference](https://docs.botframework.com/en-us/node/builder/chat-reference/modules/_botbuilder_d_.html)