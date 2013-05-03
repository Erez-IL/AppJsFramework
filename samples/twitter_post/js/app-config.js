;(function() {
    var __AppConfig = function() {};

    __AppConfig.prototype = {
        TWITTER_CONFIGURES : {
            CONSUMER_KEY : 'xxxx',
            CONSUMER_SECRET : 'xxxx'
        },

        BITLY_CONFIGURES : {
            ACCESS_TOKEN : 'xxxx'
        },

        API_URLS : {
            TWITTER_REQUEST_TOKEN : 'https://api.twitter.com/oauth/request_token',
            TWITTER_ACCESS_TOKEN : 'https://api.twitter.com/oauth/access_token',
            TWITTER_AUTHORIZE : 'https://api.twitter.com/oauth/authorize',
            TWITTER_STATUSES_UPDATE : 'https://api.twitter.com/1.1/statuses/update.json',
            BITLY_SHORTEN_URL : 'https://api-ssl.bitly.com/v3/shorten'
        },

        APP_ROUTE : '/www/',

        ALERT_MESSAGES : {
            POST_TWEET_SEND_COMPLETE : 'ツイートを投稿しました',
            POST_TWEET_SEND_FAILED : 'ツイートの投稿に失敗しました。\nしばらく待ってから再度お試し下さい。',
            POST_MAKE_CONTENTS_FAILED : '記事内容の取得に失敗しました。\nしばらく待ってから再度お試し下さい。'
        }

    }

    App['config'] = new __AppConfig();
})();