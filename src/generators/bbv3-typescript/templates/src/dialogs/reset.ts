import * as telemetryModule from '../util/telemetry-module';
import { IDialogResult, Session, IDialogWaterfallStep } from 'botbuilder';

const waterfall: IDialogWaterfallStep[] = [

    function (session: Session, args: any, next: Function) {

        const telemetry = telemetryModule.createTelemetry(session, null);
        telemetryModule.getClient().trackEvent('Reset', telemetry);

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