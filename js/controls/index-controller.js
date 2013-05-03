App.common.ready( function() {
    App.common.import('js/models/helloworld-model.js');

    $('#lblDemo').text( App.helloWorldModel.getString() );
});