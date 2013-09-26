var app = app || {};

app.Todo = Backbone.Model.extend( {
	defaults: function () {
		return {
			title: '',
			order: 0,
			done:  false
		};
	},
	toggle: function () {
		this.save( { done: !this.get( "done" ) } );
	}
} );
