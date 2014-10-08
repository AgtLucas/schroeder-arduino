define(['js/app', 'socketIO'], function (app, socketIO) {
		app.controller('tempoReal', function ($scope, $http) {
  	var socket = socketIO();

  	socket.on('new-medicao', function(obj){
    	alert();
  	});

	  });

});
