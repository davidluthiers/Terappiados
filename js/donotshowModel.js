

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'jquerymobile'
  
], function($, _, Backbone ){
	
	urlRoot:'/donotshow/',

	donotshowModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("donotshow"),
	
	
});



   return donotshowModel;
});