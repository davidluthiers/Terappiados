define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/main.html',
    'mainModel',
    'jquerymobile'
  
    ], function($, _, Backbone, main, mainModel){

        mainView = Backbone.View.extend({
  
            events:{
	
            },
	
            render: function(){
                //this.$el.attr('data-role', 'page');
                //this.$el.attr('data-theme', 'a');
                //this.$el.attr('class', 'page');
				this.$el.attr('id', 'mainViewpage');
                //this.history=historycollection;
				//this.router=router;
  
				//historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_quad_helppanel"));
				//result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
				compiledTemplate = _.template( main );
				//compiledheaderandpanel=_.template( headerandpanel );
				this.$el.empty().append(compiledTemplate); //.append(compiledheaderandpanel(result));
				
				
			},

            model:mainModel

        });

        return mainView;
    });
