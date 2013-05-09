/************
 * Override Browser implementation functions
 * ブラウザが持っている関数のオーバーライド
 */
var isUIWebView = true,
    debug = true;
(function() {

    /**
     * log関数の低レベル版
     * @param msg
     */
    window.log = function(msg) {

        // まずは通常通りのログ出力を行う。
        console.log(msg);

        // UIWebViewを用い手居る場合には、
        // XCODEのコンソールにも出力する仕組みを導入する。
        if (isUIWebView && debug) {
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", "ios-log:#iOS#" + msg);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
    }

    /**
     * エラーハンドリングのオーバーライド
     * @param errMsg
     * @param url
     * @param lineNumber
     *
     * **************************
     * iOSの場合のみ使用する
     * onDeviceReady化されていない場合でもerrorハンドリングする為のもの
     * 使用する場合はshouldStartLoadWithRequestイベントに下記のコードを追記する
    
    NSLog(@"webview shouldStartLoadWithRequest ... %@", [request URL]);
    // リクエストに「ios-log:#iOS#」が含まれる場合には、リクエストをキャッチする。
    NSString* nextUrl=[[request URL] absoluteString];
    NSRange range;
    if ((range=[nextUrl rangeOfString:@"ios-log:"]).location!=NSNotFound) {
 
        // リクエスト内容から、ログ内容を取得する。
        NSString *iOSLog = [nextUrl stringByReplacingOccurrencesOfString:@"ios-log:"withString:@""];
        // 文字列はパーセントエスケープされているので、デコードする。
        iOSLog = [iOSLog stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        NSLog(@"%@",iOSLog);
 
        // このリクエストは、ここで中断する。
        return NO;
    }
    
     * **************************
    window.onerror = function(errMsg, url, lineNumber) {

        function funcName(f){
            var s = ("" + f).match(/function (\w*)/)[1];
            return isEmpty(s) ? "[anonymous]" : s;
        }

        function isEmpty(s){
            return (s==null) || (s.length == 0);
        }

        function stackTrace(){
            var stack = "";

            for(var a = arguments.callee.caller; a != null; a = a.caller)
                stack = " -> " + funcName(a) + stack ;

            return stack;
        }

        window.log("[ERROR]" + url + "(" + lineNumber + ") : " + errMsg + "\n" + stackTrace());
    }

    // ダイアログにhtmlを表示しない。
    var _oldAlert = window.alert;
    window.alert = function(msg) {
        if( App.common.isDeviceReadied ) {
            navigator.notification.alert(
                msg,
                function() {},
                ' ',
                'OK'
            );

        }else {
            _oldAlert(msg);

        }
    }

})();

    *****/

/************
 * Common Base Library
 */
var App = {};
(function() {
    /***
     * Constructor
     * @private
     */
    var __AppCommon = function() {
        this.isDeviceReadied = false;

    };

    __AppCommon.prototype = {
        isDeviceReadied : null,
        onDeviceReady : null,

        alert : function(msg) {
            alert(msg);
        },

        ready : function(fn) {
            var _self = this;
            this.onDeviceReady = function() {
                _self.isDeviceReadied = true;
                fn();
            };
        },

        getAppDir : function() {
            var absolutePath = location.href;
            return ( absolutePath.split(App.config.APP_ROUTE)[0] ) + App.config.APP_ROUTE;
        },

        import : function(path) {

            var script_tag1     = document.createElement("script");
            script_tag1.type    = "text/javascript";
            script_tag1.src     = this.getAppDir() + path;
            script_tag1.charset = "utf-8";

            $("body").append(script_tag1);
        },

        /**
         * http://jquery-howto.blogspot.jp/2009/09/get-url-parameters-values-with-jquery.html
         * @return {Array}
         */
        getUrlVars : function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;

        },

        transition : function(url) {
            location.href = url;
        }

    };

    App['common'] = new __AppCommon();
})();

/************
 * LocalStorage Wrapper Library
 */
(function() {
    var __AppDB = function() {};

    __AppDB.prototype = {
        keyStrings : {
            TWITTER_OAUTH_INFO : 'twitterOauthInfo'
        },

        isValidKey : function(key) {
            for( var k in this.keyStrings ) {
                console.log('this.keyStrings[k] ... ' + this.keyStrings[k]);
                if( this.keyStrings[k] === key ) {
                    return true;

                }

            }

            return false;
        },

        getValue : function(key) {
            if( !this.isValidKey(key) ) {
                throw 'AppDb Architecture Violation : invalid key ... ' + key;
                return null;
            }

            return localStorage.getItem(key);
        },

        setValue : function(key, value) {
            if( !this.isValidKey(key) ) {
                throw 'AppDb Architecture Violation : invalid key ... ' + key;
                return;
            }

            localStorage.setItem(key, value);
        },

        clearValues : function() {
            localStorage.clear();

        }

    };

    App['db'] = new __AppDB();
})();

/*********
* Boot onLoader
*/
// jQueryMobile共通設定
$(document).bind('mobileinit', function(){

    $.extend($.mobile, {
        showLoadMsg : false,
        loadingMessage : false,
        pageLoadErrorMessage : 'ページ取得に失敗しました',
        defaultPageTransition : 'slide',
        activeBtnClass : null,          // ボタンアクティブのデフォルトCSSを無し
        allowCrossDomainPages : true,   // クロスドメイン通信を許可
        pushStateEnabled : false        // アドレスバーのURL表示を変更しない
    });

//    $.mobile.fixedToolbars.setTouchToggleEnabled(false);
//    $('[data-role=header]').fixedtoolbar({tapToggle:false});
});

$(document).ready( function() {
    if (typeof device === 'undefined'){
        document.addEventListener("deviceready", App.common.onDeviceReady, false);

    } else {
        App.common.onDeviceReady();

    }

});

