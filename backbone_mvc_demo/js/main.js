$( function () {
	app.Todos   = new app.TodoList;
	app.TodoApp	= new app.AppView( {
		el: $( '#todoapp' )
	} );
} );
