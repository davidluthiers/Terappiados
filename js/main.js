// Sets the require.js configuration for your application.
require.config( {

    // 3rd party script alias names
    paths: {

        // Core Libraries
        "jquery": "jquery-2.1.4.min",
        "jquerymobile": "jquery.mobile-1.4.5.min",
        "underscore": "underscoreplugin",
        "backbone": "backbone",
        "localStorage": "backbone.localStorage",
        "text": "textplugin",
        "fastclick": "fastclick",
        "paper": "paper"

    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {

        "backbone": {
            "deps": [ "underscore", "jquery" ],
            "exports": "Backbone"  //attaches "Backbone" to the window object
        },
        "underscore":{
            exports: '_'
        }

    } // end Shim Configuration

} );

require([ "jquery", "underscore", "backbone", "Router"], function( $, _, Backbone, Router ) {

    $( document ).on( "mobileinit",
        // Set up the "mobileinit" handler before requiring jQuery Mobile's module
        function() {
            // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
            $.mobile.linkBindingEnabled = false;

            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;
        }
	);
	
    document.addEventListener("deviceready",onDeviceReady,false);
    try{
        window.plugins.spinnerDialog.show(null, null, function () {
            console.log("callback");
        });
    }
    catch(e){
    //console.log(e);
    }
    function onDeviceReady() {
		
    }
    require( [ "jquerymobile" , "underscore"], function() {
        // Instantiates a new Backbone.js Mobile Router
		Router.initialize();
    		
    });
} );








