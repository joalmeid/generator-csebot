# generator-csebot
[![Build Status](https://joalmeid.visualstudio.com/_apis/public/build/definitions/8b82ddcf-c765-463a-8325-394badc0294a/65/badge)](https://joalmeid.visualstudio.com/generator-csebot/_build)

This project is Yeoman Generator with CI/CD for [Microsoft Bot Framework](http://botframework.com) a.k.a BotBuilder.
It started with a fork from [DarqueWarrior/generator-team](https://github.com/DarqueWarrior/generator-team) where [Donovan Brown](https://twitter.com/DonovanBrown) created a great yeoman generator for several languages and DevOps targeting different platforms.
Based on this [yo csebot](http://donovanbrown.com/post/yo-Team) yeoman generator, I had the need to be able to speed up project kickoffs with botbuilder.
I'm sharing this with the community - feel free to colaboration, raise [issues](https://github.com/joalmeid/generator-csebot/issues), and ask for features!

>
> With this generator, you can **pick your language**, and it will **create Bot boilerplates projects** with **complete CI and CD** on **VSTS** or **TFS**.
>

![Demo](images/cse-generator-demo.gif)

## Capabilities
***generator-csebot*** is a [Yeoman](http://yeoman.io/) generator that creates a complete CI/CD pipeline in [Team Foundation Server](https://www.visualstudio.com/tfs/) or [Visual Studio Team Services](https://www.visualstudio.com/team-services/) for your [Microsoft Bot Framework](http://botframework.com) bot in the following languages:
- Csharp (C#) 
- Node.js
- Typescript

Bot comes with:
- [Bot Builder SDK Azure Extensions](https://github.com/Microsoft/BotBuilder-Azure), namely with [Azure Table Storage](https://azure.microsoft.com/en-us/services/storage/tables/) for storing bot state.
- [Application Insights integration](https://github.com/Microsoft/BotBuilder-Azure), already configured and with sample telemetry modules, ready for use.
- It allows you to deploy to [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/web/) workloads.

## Requirements
- [Team Foundation Server 2017+](https://www.visualstudio.com/downloads/) or [Visual Studio Team Services Account](https://app.vsaex.visualstudio.com/profile/account)
   - [Personal Access Token](https://www.visualstudio.com/en-us/docs/setup-admin/team-services/use-personal-access-tokens-to-authenticate)
- [Azure Subscription](https://azure.microsoft.com/en-us/free/)
- [Node.js](http://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Git](http://git-scm.org/)
- [.NET Framework 4.6](https://www.microsoft.com/en-us/download/details.aspx?id=21)

## Install / Usage
You can read how to use it at ***[Getting Started](https://github.com/joalmeid/generator-csebot/wiki/Getting-Started)***.

## Roadmap
- Add docker support
- Investigate on how to register bot automatically into Dev Portal
- Add similar *templates* to Bot Dev Portal in all supported languages
  - **Basic bot**: A bot with the basic building blocks needed for any conversation: a welcome message, greeting, and a fallback response when what the user says is not understood by your bot.
  - **Echo bot**: A simple bot that can echo back a user's message.
  - **QnA bot**: A bot that demonstrates how to use qnamaker.ai to power a single-turn question and answer experience.
  - **Simple Conversation bot**: A bot that demonstrates the use of bot memory to have a simple, contextual conversation with the user.
  - **Bot memory**: A bot that remembers user’s communication preference and later recalls that in a conversation.
  - **Multi-turn conversation bot**: A bot that helps a user book a table at Contoso Cafe - a fictitious coffee shop, based out of Seattle, WA.
  - **Context carry over bot**: A bot that helps a user find cafe locations by carrying over context from prior conversations.
  - **Prompt for user input bot**: A bot that demonstrates different ways to prompt a user for input while interacting with Contoso Cafe - a fictitious coffee shop based out of Seattle, WA.
  - **Complete Contoso Cafe bot**: A complete bot for Contoso Cafe - a fictitious coffee shop based out of Seattle, WA. This bot can do all tasks that are otherwise covered in the individual samples.

## Debug
You can debug the generator using [VS Code](http://code.visualstudio.com/). You need to update the launch.json. Replace any value in [] with your information.  Use [npm link](https://docs.npmjs.com/cli/link) from the root folder to load your local version.
