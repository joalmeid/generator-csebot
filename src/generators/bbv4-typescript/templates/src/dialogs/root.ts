import { ConversationState, TurnContext } from 'botbuilder';
import { Dialog, DialogContainer, WaterfallStep , DialogContext, SkipStepFunction, TextPrompt } from 'botbuilder-dialogs';
// import * as instrumentation from '../util/instrumentation';
import { botFlow } from '../models';

export class RootDialog extends DialogContainer {

    constructor(dialogId: string, private conversationState: ConversationState) {
        super(dialogId);

        // Add control flow dialogs
        // this.dialogs.add(botFlow.RootDialog, [
            // this.initializeValuesStep, //WaterfallStep<TurnContext>
            // this.EchoStep

            // async function (dc: DialogContext<TurnContext>) {
            //     const state = conversationState.get(dc.context);
            //     const count = state.count === undefined ? state.count = 0 : ++state.count;
            //     await dc.context.sendActivity(`${count}: You said "${dc.context.activity.text}"`);
            //     await dc.end();
            // }
        // ]);

        //Add control flow dialogs
        this.dialogs.add(botFlow.RootDialog, [
            async function (dc: DialogContext<TurnContext>) {
                const state = conversationState.get(dc.context);
                const count = state.count === undefined ? state.count = 0 : ++state.count;

                return await dc.continue();
            },
            async function (dc: DialogContext<TurnContext>) {
                const state = conversationState.get(dc.context);
                await dc.context.sendActivity(`Hi! I'm a Typescript Bot Framework (V4) created with cse-bot Yeoman Generator.`);
                return await dc.continue();
            },
            async function(dc: DialogContext<TurnContext>) {
                // await dc.context.sendActivity(`Type something in your mind!`);
                // await dc.prompt('textPrompt', `text: enter some text`);
                await dc.prompt(botFlow.MindPrompt, `Type something in your mind!`);
            },
            async function (dc: DialogContext<TurnContext>) {
                const state = conversationState.get(dc.context);
                await dc.context.sendActivity(`${state.count}: You said "${dc.context.activity.text}"`);
                return await dc.end();
            }
        ]);

        // Add support prompts
        this.dialogs.add(botFlow.MindPrompt, new TextPrompt());
    }

    // private async initializeValuesStep(dc: DialogContext<TurnContext>): Promise<TurnContext> {
    //     // const state = dc.activeDialog.state;
    //     const state = await this.conv.get(dc.context);
    //     //const state = this.conversationState.get(dc.context);
    //     //dc.activeDialog.state.profile.phone = phone;

    //     const count = state.count === undefined ? state.count = 0 : ++state.count;

    //     // return await next('teste');
    //     return await dc.continue();
    // }

    // // private async EchoStep(dc: DialogContext<TurnContext>, step: WaterfallStepContext<AddAlarmOptions>): Promise<DialogTurnResult> {
    // private async EchoStep(dc: DialogContext<TurnContext>, conv: ConversationState): Promise<TurnContext> {
    //     const state = dc.activeDialog.state;
    //     // const state = this.conversationState.get(dc.context);

    //     await dc.context.sendActivity(`${state.count}: You said "${dc.context.activity.text}"`);
    //     return await dc.end();
    // }
}