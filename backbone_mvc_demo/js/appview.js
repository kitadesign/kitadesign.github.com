var app = app || {};

app.AppView = Backbone.View.extend( {
	events: {
		"keypress #new-todo":	  "createOnEnter",
		"click #clear-completed": "clearCompleted",
		"click #toggle-all":      "toggleAllComplete"
	},
	initialize: function () {
		this.collection  = new app.TodoList;
		this.input       = this.$( "#new-todo" );
		this.allCheckbox = this.$( "#toggle-all" )[ 0 ];
		this.listenTo( this.collection, 'add',   this.addOne );
		this.listenTo( this.collection, 'reset', this.addAll );
		this.listenTo( this.collection, 'all',   this.render );
		this.footer = this.$( 'footer' );
		this.main   = $( '#main' );
		this.statsTemplate = _.template( $( '#stats-template' ).html() );
		this.collection.fetch();
	},
	render: function () {
		var done      = this.collection.done().length;
		var remaining = this.collection.remaining().length;
		this.allCheckbox.checked = !remaining;
		if ( this.collection.length ) {
			this.main.show();
			this.footer.show();
			this.footer.html( this.statsTemplate( { done: done, remaining: remaining } ) );
			return;
		}
		this.main.hide();
		this.footer.hide();
	},
	addOne: function ( todo ) {
		var view = new app.TodoView( { model: todo } );
		this.$( "#todo-list" ).append( view.render().el );
	},
	addAll: function() {
		this.collection.each( this.addOne, this );
	},
	createOnEnter: function ( event ) {
		if ( event.keyCode != 13 ) return;
		if ( !this.input.val() ) return;

		this.collection.create( {
			title: this.input.val(),
			order: this.collection.nextOrder()
		} );
		this.input.val( '' );
	},
	clearCompleted: function () {
		_.invoke( this.collection.done(), 'destroy' );
		return false;
	},
	toggleAllComplete: function () {
		var done = this.allCheckbox.checked;
		this.collection.each( function ( todo ) {
			todo.save( { 'done': done } );
		} );
	}
});
