(function() {
    var __AccessTokenController = function() {};

    __AccessTokenController.prototype  = {
        init : function() {
            App.common.import('js/models/twitter-model.js');

            App.twitterModel.getAccessToken(
                App.common.getUrlVars(),
                App.accessTokenController.getAccessToken_onSuccess
            );

        },

        getAccessToken_onSuccess : function(data) {
            App.db.setValue(
                App.db.keyStrings.TWITTER_OAUTH_INFO,
                JSON.stringify(data)
            );
            App.common.transition(App.common.getAppDir() + 'pages/post.html');
        }

    };

    App['accessTokenController'] = new __AccessTokenController();
})();

App.common.ready( App.accessTokenController.init );