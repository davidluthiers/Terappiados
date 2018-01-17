

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'historyModel',
  'jquerymobile'
  
], function($, _, Backbone, historyModel ){

	historyCollection = Backbone.Collection.extend({

		localStorage: new Backbone.LocalStorage("historystorage"),
		url: '/historycollection/',
		
		
		
		destroyhistory: function(elemento){
			
			var length = this.length;
			for (var i = 0; i < length; i++) {
				this.at(0).destroy();//aqui pone 0 porque cada vez que destruimos un modelo el resto corre hasta las primeras posiciones
			}
	
	
				}
		

		
		
		
	});



   return historyCollection;
});