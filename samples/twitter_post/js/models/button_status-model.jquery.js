;(function() {
    var ATTR_ORIGINAL_TEXT = "temporary-original-text";
    var LOADING_ANIMATION_INTERVAL = 500;
    var LOADING_LABEL_PATTERN = [
        '.  ',
        ' . ',
        '  .'
    ];
    $.fn.extend({
        buttonStatusChange : function(params) {
            var mode = params['mode'],
                $sender = $(this);

            if( mode == 'loading' ) {
                var loadingTxt = params['text'];
                $sender.addClass('disabled');
                $sender.attr(ATTR_ORIGINAL_TEXT, $sender.val());
                ;(function() {

                    var idx = 0;
                    var interval = setInterval(
                        function() {
                            if( idx >= LOADING_LABEL_PATTERN.length ) {
                                idx = 0;
                            }
                            $sender.val( loadingTxt + LOADING_LABEL_PATTERN[idx] );

                            idx ++ ;

                        }, LOADING_ANIMATION_INTERVAL
                    );

                    $sender.bind('loadingComplete',
                        function() {
                            $sender.removeClass('disabled');
                            $(this).val( $(this).attr(ATTR_ORIGINAL_TEXT) );
                            clearInterval( interval );

                        }
                    );

                })();

            }else if( mode === 'enable' ) {
                $sender.trigger('loadingComplete');


            }else {
                throw 'Button status change error. invalid mode type';

            }

            return $(this);
        }
    });
})();