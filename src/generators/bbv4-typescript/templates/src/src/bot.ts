import { TurnContext, ConversationState, UserState } from 'botbuilder';
import { DialogSet } from 'botbuilder-dialogs';
// import * as instrumentation from './util/instrumentation';

import { RootDialog, ResetDialog } from './dialogs';
import { botFlow } from './models';

export class Bot {
    // private readonly dialogState: StatePropertyAccessor<DialogState>;
    private readonly dialogState: Object;
    private readonly dialogs: DialogSet;
    private readonly logger: DialogSet;

    constructor(conversationState: ConversationState, userState: UserState) {

        // Define state properties
        //this.dialogState = conversationState.createProperty(DIALOG_STATE_PROPERTY);
        this.dialogState = {};
        // this.logger = instrumentation.getInstance();
        // instrumentation.Initialize(this.);

        // Create top level dialogs
        // this.dialogs = new DialogSet(this.dialogState);
        this.dialogs = new DialogSet();
        this.dialogs.add(botFlow.RootDialog, new RootDialog(botFlow.RootDialog, conversationState));
        this.dialogs.add(botFlow.Reset, new ResetDialog(botFlow.Reset, conversationState));
    }

    public async dispatchActivity(context: TurnContext): Promise<void> {
        // Create dialog context
        const dc = await this.dialogs.createContext(context, this.dialogState);

        // Check for interruptions
        const isMessage = context.activity.type === 'message';
        if (isMessage) {
            const utterance = (context.activity.text || '').trim().toLowerCase();

            // Check for cancel
            if (/((reset)|(cancel)|(return)|(start again))/.test(utterance)) {
                if (dc.activeDialog) {
                    await dc.endAll();
                    await dc.context.sendActivity(`Alright! Let\'s try it again.`);
                } else {
                    await dc.context.sendActivity(`Nothing to cancel.`);
                }
            }
        }
        else {
            await context.sendActivity(`${context.activity.type} event detected.`);
        }

        // Route activity to current dialog if not interrupted
        if (!context.responded) {
            await dc.continue();
        }

        // Perform fallback logic if no active dialog or interruption
        if (!context.responded && isMessage) {
            // await dc.context.sendActivity(`Hi! I'm a Typescript Bot Framework (V4) created with cse-bot Yeoman Generator.`);
            await dc.endAll();
            await dc.begin(botFlow.RootDialog);
        }
    }
}