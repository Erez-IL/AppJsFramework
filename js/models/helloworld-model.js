;(function() {
    var __HelloWorldModel = function() {};

    __HelloWorldModel.prototype = {
        getString : function() {
            return App.config.DEMO_STRINGS.HELLO_WORLD;
        }
    };

    App['helloWorldModel'] = new __HelloWorldModel();
})();