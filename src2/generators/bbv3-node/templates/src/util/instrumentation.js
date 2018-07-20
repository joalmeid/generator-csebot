const instrumentation = require('botbuilder-instrumentation');


var logger = (() => {
    var instance;
 
    function createInstance(config) {

        // Setting up advanced instrumentation
        var object = new instrumentation.BotFrameworkInstrumentation(config);

        return object;
    }
 
    return {
        getInstance: function (config) {
            if (!instance) {
                instance = createInstance(config);
            }
            return instance;
        }
    };
})();
 
module.exports = {
    logger
};
