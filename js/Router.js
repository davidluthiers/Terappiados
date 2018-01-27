define([
    'jquery',
    'underscore',
    'backbone',
    'languageModel',
    'donotshowModel',
    'historyCollection',
	'mainView',
    'mainModel',
    'innerLog',
    'jDrupal',
    'fastclick',
    'localStorage'
    ], function($, _, Backbone, languageModel, donotshowModel, historyCollection, mainView, mainModel, innerLog, jDrupal, fastclick){
  
   
        var AppRouter = Backbone.Router.extend({
            routes:{
                "":"principal",
                "summary":"summary",
				"button":"button"
            },
            principal: function(){
				
				/*
				$(document).one('pagecontainershow', function (e, ui) {
					var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage').attr('id');
					console.log("activePage: ");
					console.log(activePage);
				});
				*/
				
				console.log("START");
				
				$(function () {
					console.log("initializing external components");
					$(".external").toolbar();
				});
				
				historial.fetch();
				language.fetch();
				donotshow.fetch();
	    				
				fastclick.attach(document.body);

                $.mobile.buttonMarkup.hoverDelay = 0;
                $.mobile.ajaxEnabled = false;
                $.mobile.linkBindingEnabled = false;
                $.mobile.hashListeningEnabled = false;
                $.mobile.pushStateEnabled = false;
		
                this.loaded=false;
                				
                var self=this;

                // Remove page from DOM when it's being replaced
                $(document).on('pageshow', function (event, ui) {
			
                    $(ui.prevPage).remove();

                });
			
                $(document).one('pageshow', function (event, ui) {
                    loaded=true;
                    console.log("FIRST LOAD");
					try{
							navigator.splashscreen.hide();
					}
					catch(e){
						if(debuglevel>2) console.log(e);
					}
                });
	
                document.addEventListener("backbutton", self.backKeyDown, true);
			
                try{
                    screen.lockOrientation('portrait');
                }
                catch(e){
					if(debuglevel>2) console.log(e);
				}
			
	
                historial.create(donotshow);
				
				this.mainview = new mainView({
                    //model: this.mainmodel
                });
				
				this.mainview.render();
				this.changePage (this.mainview);
								
                //this.changePage (this.mainview);
                
            },
			
			button: function(){
				
				console.log("button pressed");
				this.changePage (this.mainview);
				
			},
			
            login: function(){ //funcion de logueo para LOCALHOST
	
                var self=this;
 
                $.ajaxSetup({
                    xhrFields: {
                        withCredentials: true
                    }
                });

                var DRUPAL_SERVER = "http://app.hoffman-international.com/hoffapp/";
                console.log("intenta fer un login d'appuser");
                var self=this;
                logintrys -= 1;
                var params = {
                    type: 'post',
                    dataType: 'json',
                    url: DRUPAL_SERVER + "user/login.json",
                    data: {
                        'username': 'appuser',
                        'password': 'appuser'
                    },
                    success: function(data) {
                        if(logintrys>=0){
                            language.set("sesToken",data.token);
                            historial.create(language);
                            console.log("TOKEN: " + data.token);
                            self.lookForLanguage();
                        //self.getToken();
                        }
                        else {
                            console.log("Máximo de intentos de logueo");
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("MIERDA PURA");
                        console.log(JSON.stringify(XMLHttpRequest));
                        console.log(JSON.stringify(textStatus));
                        console.log(JSON.stringify(errorThrown));
                        if(logintrys>=0){
                            if(false){ //no tengo internet
                                alert("Internet failure");
                            }
                            else{ //ya está logueado
                                self.lookForLanguage();
                            }
                        }
				
                    }
                };

                $.ajax(params);
	
            },
			
            drupaldo: function(job, param, fromsummary){
				if(typeof device === "undefined"){ //PC VERSION
					console.log("drupaldo pcversion, executing job");
					if(param!="null")
						job(param);
					else
						job();
				}
				else{
					logintrys=6;
					var self=this;
					console.log("drupaldo");
					try{
						if(navigator.connection.type==Connection.NONE || navigator.connection.type==Connection.UNKNOWN){
							if(typeof fromsummary!="undefined" && fromsummary){
								//No hacer nada								
							}
							else{
								try{
									window.plugins.spinnerDialog.hide();
								}
								catch(e){
									console.log(e);
								}
								if(typeof historial.get("languages").get("dic_no_internet")!="undefined"){
									try{
										navigator.notification.confirm(historial.get("languages").get("dic_no_internet"), function(indexans){
											app_router.navigate("auxsummary", {
												trigger: true,
												replace: true
											});
										}, "Sayit",["Ok"]);
									}
									catch(e){
										console.log(e);
										app_router.navigate("auxsummary", {
												trigger: true,
												replace: true
											});
									}
								}
								else{
									try{
										navigator.notification.confirm("App needs an internet connection, try again later", function(indexans){
											navigator.app.exitApp(); //Puesto que no tenemos lenguas, cerramos la aplicación
										}, "Sayit",["Ok"]);
									}
									catch(e){
										console.log(e);
										navigator.app.exitApp();
									}
								}
								
							}
						}
						else{
							self.checkAndDo(job, param);
						}
					}
					catch(e){
						self.checkAndDo(job, param);
					}
				}
            },
	
            logAndDo: function(job, param){
		
                var self=this;
                if(logintrys==0){
                    alert("Connection failure, try again later");
                }
                else{
                    logintrys--;
                    Drupal.settings.site_path = "http://app.hoffman-international.com";
                    Drupal.settings.endpoint = "hoffapp";

                    user_login("appuser", "appuser", {
                        success:function(result){
                            console.log("Login success, result:");
                            console.log(result);
                            auxlang=historial.get("languages");
                            historial.get("languages").destroy();
                            auxlang.set("sesToken", result.token);
                            auxlang.save();
                            historial.create(auxlang);
                            self.checkAndDo(job, param);
                        },
                        error:function(xhr, status, message){
                            console.log("Error trying to login, message: " + message);
                        }
                    });
                }
            },

            checkAndDo: function(job, param){
		
                var self=this;
			
                Drupal.settings.site_path = "http://app.hoffman-international.com";
                Drupal.settings.endpoint = "hoffapp";
                innerlog.add("Executing checkAndDo:\n");
				console.log("checkAndDo");
                system_connect({
                    success: function(result) {
                        innerlog.add("success\n");
                        var account = Drupal.user;
                        console.log(account);
                        if(typeof account.roles[1] === "undefined")
                            user=account.roles[2];
                        else
                            user=account.roles[1];
					
                        console.log("Checking connection: " + user);
				
                        if(user=="anonymous user" || historial.get("languages").get("sesToken")=="none"){
                            self.logAndDo(job, param);
                        }
                        else{
                            if(user=="authenticated user"){
                                if(param!="null")
									job(param);
								else
									job();
							}
						}
	
                    },
                    error: function(xhr, status, message){
                        alert(message); //Comentar para el release
						self.logAndDo(job, param);
						Backbone.history.navigate("#auxsummary", {
                        trigger: true
						});
                    }
                });
            },
			
			backKeyDown: function(){ //función que se llama cuando se pulsa el botón Back
				console.log("backkey event");
                var self=this;
                try{
					if(device.platform=='Android'){
						navigator.notification.confirm(
							//historial.get("languages").get("dic_exitApp"),
							"Salir de la aplicación",
							function(indexans){
								if(indexans==1){
									if (navigator.app) {
										navigator.app.exitApp();
									}
									else if (navigator.device) {
										navigator.device.exitApp();
									}
								}
							},
							//historial.get("languages").get("dic_Hoffman"),
							"Terappiados",
							[
							//historial.get("languages").get("dic_transf_p9_text2"),historial.get("languages").get("dic_transf_p9_text3")
							"Sí", "No"
							]);
					}
					else{
						navigator.notification.confirm(
							historial.get("languages").get("dic_exitApp"),
							function(indexans){
								if(indexans==2){
									if (navigator.app) {
										navigator.app.exitApp();
									}
									else if (navigator.device) {
										navigator.device.exitApp();
									}
								}
							},
							historial.get("languages").get("dic_Hoffman"),[historial.get("languages").get("dic_transf_p9_text3"),historial.get("languages").get("dic_transf_p9_text2")]);
					}
                }
                catch(e){
                    self.onbackSuccess(1);
                    console.log(e);
                }
			},
	
            changePage:function (view) {
      				
				$("body").append(view.$el);
				$(":mobile-pagecontainer").pagecontainer( "change", $(view.el) );	
				
                console.log("cambio de página");
				setTimeout(function(){
                    fastclick.attach(document.body);
                },1500);
                
		
                $( ".ui-input-text" ).bind( "click", function(event, ui) {
                    console.log("evento de router");
                    if(device.platform=='Android'){
                        setTimeout(function(){
                            $("div[data-role='footer']").attr('class', 'ui-footer ui-bar-a ui-footer-fixed slideup ui-panel-content-fixed-toolbar ui-panel-content-fixed-toolbar-closed');
                        },1000);
                    }
                });

            }
        });

        var initialize = function(){
    
	
			
            app_router = new AppRouter();
	
    
            // As above, call render on our loaded module
            // 'views/users/list'
    
            Backbone.history.start();
        };
  
        var historial= new historyCollection;
        var language = new languageModel({
            id: "languages"
        });
        var donotshow= new donotshowModel({
            id: "donotshow"
        });
		var app_router;
        var logintrys = 8;
        var loaded = false;
        var innerlog = new innerLog;
		var debuglevel = 1; // 1(mínimo obligatorio): Operaciones exitosas, 2: Además, el proceso interno de cada operación, 3: También incluye llamadas nativas de Phonegap
		
        return {
            initialize: initialize
        };
    });
