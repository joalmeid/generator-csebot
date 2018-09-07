import { ConversationState, TurnContext } from 'botbuilder';
import { DialogContainer, DialogContext } from 'botbuilder-dialogs';
// import * as instrumentation from '../util/instrumentation';
import { botFlow } from '../models';

export class ResetDialog extends DialogContainer {
    constructor(dialogId: string, conversationState: ConversationState) {
        super(dialogId);

        // Add control flow dialogs
        this.dialogs.add(botFlow.Reset, [
            async function (dc: DialogContext<TurnContext>) {
                const state = conversationState.get(dc.context);
                const count = state.count === undefined ? state.count = 0 : ++state.count;
                await dc.context.sendActivity(`${count}: You said "${dc.context.activity.text}"`);
                await dc.end();
            }
        ]);
    }

}