var app = app || {};

app.TodoList = Backbone.Collection.extend( {
	model: app.Todo,
	localStorage: new Backbone.LocalStorage( "todo-storage" ),
	done: function () {
		return this.where( { done: true } );
	},
	remaining: function () {
		return this.without.apply( this, this.done() );
	},
	nextOrder: function () {
		if ( !this.length ) return 1;
		return this.last().get( 'order' ) + 1;
	},
	comparator: 'order'
});
