import * as appInsights from 'applicationinsights';
import * as builder from 'botbuilder';

export function Initialize() {
    appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
    return appInsights.getClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
}

export function getClient() {
    return appInsights.getClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
}

export function createTelemetry(session: builder.Session, properties: any) {
    const data = {
        conversationData: JSON.stringify(session.conversationData),
        privateConversationData: JSON.stringify(session.privateConversationData),
        userData: JSON.stringify(session.userData),
        conversationId: session.message.address.conversation.id,
        userId: session.message.address.user.id
    };

    if (properties) {
        for (const property in properties) {
            if (property) {
                data[property] = properties[property];
            }
        }
    }

    return data;
}
