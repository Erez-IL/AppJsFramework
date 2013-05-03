;(function() {
    var __AppConfig = function() {};

    __AppConfig.prototype = {
        APP_ROUTE : '/www/',

        DEMO_STRINGS : {
            HELLO_WORLD : 'hello world'
        }

    }

    App['config'] = new __AppConfig();
})();