var app = app || {};

app.TodoView = Backbone.View.extend( {
	tagName: "li",
	events: {
		"click .toggle":   "toggleDone",
		"dblclick .view":  "edit",
		"click a.destroy": "clear",
		"keypress .edit":  "updateOnEnter",
		"blur .edit":      "close"
	},
	initialize: function () {
		this.template = _.template( $( '#item-template' ).html() );
		this.listenTo( this.model, 'change', this.render );
		this.listenTo( this.model, 'destroy', this.remove );
	},
	render: function () {
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$el.toggleClass( 'done', this.model.get( 'done' ) );

		this.$view  = this.$( '.view' );
		this.$input = this.$( '.edit' );
		return this;
	},
	toggleDone: function () {
		this.model.toggle();
	},
	edit: function () {
		this.$view.hide();
		this.$input.show();
		this.$input.focus();
	},
	close: function () {
		var value = this.$input.val();
		if ( !value ) return this.clear();

		this.$view.show();
		this.$input.hide();
		this.model.save( { title: value } );
	},
	updateOnEnter: function ( event ) {
		if ( event.keyCode == 13 ) this.close();
	},
	clear: function () {
		this.model.destroy();
	}
});

