;(function() {
    var __PostController = function() {};

    __PostController.prototype = {
        init : function() {
            var _self = this;
            return function () {
                App.common.import('js/models/twitter-model.js');
                App.common.import('js/models/button_status-model.jquery.js');

                _self.eventBinds();
            };

        },

        eventBinds : function() {
            $('#btnTweetPost').off('touchend').on('touchend', this.sendPost_onTapped() );
            $('#btnLogout').off('touchend').on('touchend', this.btnLogout_onTapped );
        },

        btnLogout_onTapped : function() {
            App.db.clearValues();
            App.common.transition(App.common.getAppDir() + 'pages/index.html')

        },

        sendPost_onTapped : function() {
            var _self = this;
            return function() {

                $(this).buttonStatusChange({
                    text: $(this).attr('loading-label'),
                    mode: 'loading'
                });

                App.twitterModel.postUpdateStatuses({
                    msg: $('#txtAreaTweetBox').val(),
                    onSuccess: _self.sendPost_onSuccess,
                    onFail: _self.sendPost_onFail
                });

            };
        },

        sendPost_onSuccess : function(successObj) {
            $('#btnTweetPost').buttonStatusChange({ mode: 'enable' });
            alert(App.config.ALERT_MESSAGES.POST_TWEET_SEND_COMPLETE);
        },

        sendPost_onFail : function() {
            $('#btnTweetPost').buttonStatusChange({ mode: 'enable' });
            alert(App.config.ALERT_MESSAGES.POST_TWEET_SEND_FAILED);
        }

    };

    App['postController'] = new __PostController();
})();

App.common.ready( App.postController.init() );