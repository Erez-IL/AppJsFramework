;(function() {
    App.common.import('js/models/twitter_oauth-model.js');

    var JSON_KEY_OAUTH_TOKEN = "oauth_token";
    var JSON_KEY_OAUTH_TOKEN_SECRET = "oauth_token_secret";

    var __TwitterModel = function() {};

    __TwitterModel.prototype = {
        /**
         *
         * @param onSuccess
         */
        request_token : function(onSuccess) {

            var dataParams = App.twitterOauthModel.setSignatureTimestampAndGetParameterMap({
                action: App.config.API_URLS.TWITTER_REQUEST_TOKEN,
                token: null,
                method: 'POST',
                secret: ''
            });

            $.ajax({
                type: 'POST',
                url: App.config.API_URLS.TWITTER_REQUEST_TOKEN,
                data: dataParams,
                success: function(msg){
                    var requestTokenResult = App.twitterModel.parseRequestToken( msg );
                    onSuccess(requestTokenResult);
                }
            });
        },

        /**
         *
         * @param callbackUrl
         * @returns {Function}
         */
        goAuthorizePage : function(callbackUrl) {
            return function(requstTokenResult) {
                location.href = App.config.API_URLS.TWITTER_AUTHORIZE + '?' +
                    'oauth_token=' + requstTokenResult['oauth_token'] + '&' +
                    'oauth_callback=' + encodeURIComponent(callbackUrl)

            };
        },

        /**
         *
         * @param parseString
         * @return {Object}
         */
        parseRequestToken : function(parseString) {
            var resultArray = {};
            var ampStrings = parseString.split('&');
            var ampLength = ampStrings.length;

            for( var i = 0; i < ampLength; i++ ) {
                var equalSparate = ampStrings[i].split('=');
                resultArray[equalSparate[0]] = equalSparate[1];

            }

            return resultArray;
        },

        getAccessToken : function(params, onSuccess) {
            // param check
            if( typeof params['oauth_token'] == 'undefined' ||
                typeof params['oauth_verifier'] == 'undefined' ) {

                return false;
            }

            var verifier = params['oauth_verifier'],
                token = params['oauth_token'];

            var target = App.twitterOauthModel.setSignatureTimestampAndGetAddedUrl({
                action: App.config.API_URLS.TWITTER_ACCESS_TOKEN,
                method: 'POST',
                token: token,
                secret: token,
                option: {
                    oauth_verifier: verifier
                }
            });
            $.ajax({
                url: target,
                success: function(msg){
                    var requestTokenResult = App.twitterModel.parseRequestToken( msg );
                    onSuccess( requestTokenResult );
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    var errorMsg = 'Error Fire ... ' + JSON.stringify({
                        XMLHttpRequest: XMLHttpRequest,
                        textStatus: textStatus,
                        errorThrown: errorThrown
                    });
                    alert(errorMsg);
                    console.log(errorMsg);
                }
            });
        },

        postUpdateStatuses : function(params) {
            var msg = params['msg'],
                onSuccess = params['onSuccess'],
                onFail = params['onFail'];

            if( null == App.db.getValue( App.db.keyStrings.TWITTER_OAUTH_INFO ) ) {
                throw 'Nothing TwitterAccessToken invalid status';
                return ;

            }
            var oauthInfo = JSON.parse( App.db.getValue(App.db.keyStrings.TWITTER_OAUTH_INFO) );
            var token = oauthInfo[JSON_KEY_OAUTH_TOKEN],
                tokenSecret = oauthInfo[JSON_KEY_OAUTH_TOKEN_SECRET];

            var target = App.twitterOauthModel.setSignatureTimestampAndGetAddedUrl({
                action: App.config.API_URLS.TWITTER_STATUSES_UPDATE,
                method: 'POST',
                token: token,
                secret: tokenSecret,
                option: {
                    status: msg
                }
            });

            $.ajax({
                type: 'POST',
                url: target,
                dataType: 'json',
                success: onSuccess,
                error: onFail
            });
        }

    };

    App['twitterModel'] = new __TwitterModel();
})();