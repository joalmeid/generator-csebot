import * as instrumentation from '../util/instrumentation';
import { IDialogResult, Session, IDialogWaterfallStep } from 'botbuilder';
import * as botConsts from '../models/Consts';

// Setting up advanced instrumentation
let logger = instrumentation.getInstance();

const waterfall: IDialogWaterfallStep[] = [

    function (session: Session) {

        //Welcome Message
        const welcomeMessage = `Hi! I'm a Typescript Bot Framework created with cse-bot Yeoman Generator.`;
        session.send(welcomeMessage);

        logger.trackCustomEvent(botConsts.CseBotLogging.RootDialog , { description: "Started root dialog", setDefault: false }, session);

    },
    function (session: Session, result: IDialogResult<any>) {
        // on error, start over
        session.on('error', function (err: Error) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });
    }
];

export { waterfall };