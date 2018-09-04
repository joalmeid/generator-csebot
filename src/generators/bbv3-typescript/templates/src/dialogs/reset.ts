import * as instrumentation from '../util/instrumentation';
import { Session, IDialogWaterfallStep } from 'botbuilder';
import * as botConsts from '../models/Consts';

// Setting up advanced instrumentation
let logger = instrumentation.getInstance();

const waterfall: IDialogWaterfallStep[] = [

    function (session: Session, args: any, next: Function) {

        logger.trackCustomEvent(botConsts.CseBotLogging.Reset, { description: 'Reset on current dialog' }, session);
    
        // reset data
        session.conversationData = {};
        session.dialogData = {};
        session.privateConversationData = {};
        session.userData = {};
        session.send('Alright! Let\'s try it again.');
        session.replaceDialog('/');
    }
];
export { waterfall };