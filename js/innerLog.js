
define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'jquerymobile'
  
], function($, _, Backbone ){

	innerLog = Backbone.Model.extend({

		defaults:{

			"description":""
			
			
		},
		
		localStorage: new Backbone.LocalStorage("innerlog"),
		
		url: '/innerlogs/',
		
		add: function(text){
		
			//this.set("description",this.get("description")+text);
			//this.save();
		
		}
	
	});



   return innerLog;
});