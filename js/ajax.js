
	  // SERVER CONNECTION
	  // General settings
	  var DRUPAL_SERVER = "http://app.hoffman-international.com/hoffapp/";
	  var LANGUAGE = "es";


        // Check connection to server.
        var params_connect = {
            type: 'POST',
            dataType: 'jsonp',
            beforeSend: function (request) {
                request.setRequestHeader("X-CSRF-Token", data.token); // data.token viene del login
            },
            url: DRUPAL_SERVER + "system/connect.jsonp",
            processData: true,
            success: function(data) {
                alert('Hello user #' + data.user.uid);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
        };
        var connect_result = $.ajax(params_connect);


	  // Get languages
	  var params_languages = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + "languages.jsonp",
            processData: true,
            success: function(data) {
            	console.log("languages: ", data);
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params);
		var downloaded_languages = $.ajax(params_languages);
		//console.log("a: ", a);	  

	  // Get translation strings
	  var params_translations = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + LANGUAGE + ".jsonp",
            processData: true,
            success: function(data) {
            	//console.log("data: ", data);
            	var translations = {};
            	for (index = 0; index < data.length; ++index) {
            		translations[data[index]["key"]] = data[index][LANGUAGE];
            	}
            	console.log("translations: ", translations);
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params);
		var downloaded_translations = $.ajax(params_translations);
		//console.log("a: ", a);


	  // Get list of available audios
	  var params_audios = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + "audios.jsonp",
            processData: true,
            success: function(data) {
            	console.log("audios: ", data);
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params);
		var downloaded_audio_list = $.ajax(params_audios);
		//console.log("a: ", a);

	  // Get an audio node
	  var AUDIO_NID = 6;
	  var params_audio_node = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + "node/" + AUDIO_NID + ".jsonp",
            processData: true,
            success: function(data) {
            	console.log("audio node 6: ", data);
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params_audio_node);
		var downloaded_audio_node = $.ajax(params_audio_node);
		//console.log("downloaded object: ", downloaded_audio_node);
       

	  // Get an audio file  (PARA LAS IMAGES ES EXACTAMENTE IGUAL)
	  var AUDIO_FID = 3;
	  var params_audio_file = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + "file/" + AUDIO_FID + ".jsonp",
            processData: true,
            success: function(data) {
            	console.log("audio file 3: ", data);
            	//var snd = new Audio("data:audio/mp3;base64," + data["file"]);
				//snd.play();
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params_audio_node);
		var downloaded_audio_file = $.ajax(params_audio_file);
		//console.log("downloaded object: ", downloaded_audio_node);
       
// PARA SACAR IMAGENES: meter en el src "data:image/png;base64," + file base64 string


	  // Get quotes in a given language
	  LANGUAGE = "es";
	  var params_quotes = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + "quotes_" + LANGUAGE + ".jsonp",
            processData: true,
            success: function(data) {
            	console.log("quotes: ", data);
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params);
		var downloaded_quotes = $.ajax(params_quotes);
		//console.log("a: ", a);


	  // Get Hoffman centers addresses
	  var params_centers = {
            type: 'GET',
            dataType: 'jsonp',
            url: DRUPAL_SERVER + "hoffman-centers.jsonp",
            processData: true,
            success: function(data) {
            	console.log("centers: ", data);
        	},
            error: function(code) {console.log("petada", code);}
        };
		//console.log("params ", params);
		var downloaded_centers = $.ajax(params_centers);
		//console.log("a: ", a);

