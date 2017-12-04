var appInsights = require('applicationinsights');

module.exports = {

    Initialize: function Initialize() {
        appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
        return appInsights.getClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
    },

    getClient: function getClient() {
        return appInsights.getClient(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
    },

    createTelemetry: (session, properties) => {
        var data = {
            conversationData: JSON.stringify(session.conversationData),
            privateConversationData: JSON.stringify(session.privateConversationData),
            userData: JSON.stringify(session.userData),
            conversationId: session.message.address.conversation.id,
            userId: session.message.address.user.id
        };

        if (properties) {
            for (property in properties) {
                data[property] = properties[property];
            }
        }

        return data;
    }
}
