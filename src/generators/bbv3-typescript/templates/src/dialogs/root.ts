import * as telemetryModule from '../util/telemetry-module';
import { IDialogResult, Session, IDialogWaterfallStep } from 'botbuilder';

const waterfall: IDialogWaterfallStep[] = [

    function (session: Session) {
        const telemetry = telemetryModule.createTelemetry(session, { setDefault: false });

        //Welcome Message
        const welcomeMessage = `Hi! I'm a Typescript Bot Framework created with cse-bot Yoeman Generator.`;
        session.send(welcomeMessage);

        telemetryModule.getClient().trackEvent('start');

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