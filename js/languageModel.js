

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'jquerymobile'
  
], function($, _, Backbone ){
	
	urlRoot:'/language/',

	languageModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("mylanguage"),
		
		defaults:{

			"downloaded":"no",
			"customFeelings":"",
			"Checkversion":false
		}
	
});



   return languageModel;
});