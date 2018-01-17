

define([
  'jquery',
  'underscore',
  'backbone',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	urlRoot:'/quads/',

	mainModel = historyModel.extend({

		defaults:{
			
			
		}
	
});



   return mainModel;
});