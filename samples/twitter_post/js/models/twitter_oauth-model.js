;(function() {
    App.common.import('js/libs/sha1.js');
    App.common.import('js/libs/oauth.js');

    function getMessageAccessor(params) {
        var action = params['action'],
            token = params['token'],
            method = params['method'],
            secret = params['secret'];


        var accessor = {
            consumerSecret: App.config.TWITTER_CONFIGURES.CONSUMER_SECRET,
            tokenSecret   : secret
        };
        var message = {
            action: action,
            method: method,
            parameters: [
                [  'oauth_consumer_key'  ,   App.config.TWITTER_CONFIGURES.CONSUMER_KEY  ],
                [  'oauth_signature_method'  ,   'HMAC-SHA1'  ],
            ]
        };

        if( token ) {
            message.parameters.push([  'oauth_token'  ,   token ]);
        }

        if( typeof params['option'] != 'undefined') {
            var option = params['option'];
            for( var key in option ) {
                console.log('key ... ' + key + ' : ' + option[key]);
                message.parameters.push([   key ,   option[key] ]);

            }

        }

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        return {
            message: message,
            accessor: accessor
        };
    }

    var __TwitterOauthModel = function() {};

    __TwitterOauthModel.prototype = {
        /**
         * OAuth認証の前処理を行う。
         * SignatureとTimeStampを生成し、設定する
         * @param params { token, tokenSecret }
         */
        setSignatureTimestamp : function(params) {
            getMessageAccessor(params);
        },

        setSignatureTimestampAndGetAddedUrl : function(params) {
            var msg_acs = getMessageAccessor(params);
            return OAuth.addToURL(msg_acs.message.action, msg_acs.message.parameters);

        },

        setSignatureTimestampAndGetParameterMap : function(params) {
            var msg_acs = getMessageAccessor(params);
            return OAuth.getParameterMap(msg_acs.message.parameters);
        }
    };

    App['twitterOauthModel'] = new __TwitterOauthModel();

})();