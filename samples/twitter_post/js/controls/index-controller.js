App.common.ready( function() {
    App.common.import('js/models/twitter-model.js');

    if( App.db.getValue(App.db.keyStrings.TWITTER_OAUTH_INFO) == null ) {
        App.twitterModel.request_token(
            App.twitterModel.goAuthorizePage(App.common.getAppDir() + 'pages/access_token.html')
        );

    }else {
        App.common.transition(App.common.getAppDir() + 'pages/post.html');

    }
});