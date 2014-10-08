define(['js/app', 'socketIO'], function (app, socketIO) {
		app.controller('tempoReal', function ($scope, $http) {

  	var socket = socketIO();

  	angular.extend($scope, {
  		data: "00:00 00/00/0000",
  		humidade: "0",
  		temperatura: "0"
  	});

  	socket.on('new-medicao', function(obj){
    	angular.extend($scope, {
  			data: $scope.getData(obj.createdAt),
  			humidade: obj.humidity,
  			temperatura: obj.temperature
  		});
  	});

  	$scope.getData = function(data){
  		var _data = data.split("T")[0].split("-")[2] + "/" + data.split("T")[0].split("-")[1] + "/" + data.split("T")[0].split("-")[0];
  		var _hora = teste.split("T")[1].split(":")[0] + ":" + teste.split("T")[1].split(":")[1];
  		return _hora + " " + _data;
  	};

	  });

});
