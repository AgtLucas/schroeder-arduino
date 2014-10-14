define(['js/app', 'socketIO'], function (app, socketIO) {
		app.controller('log', function ($scope, $http) {

  	var socket = socketIO();

    $http.get('/schroeder/medicoes/last').success(function(data) {
      angular.extend($scope, {
        dados: data
      });
    });

  	socket.on('new-log', function(obj){
    	$scope.dados.push(obj);
  		$scope.$apply();
  	});

  	$scope.getData = function(data){
  		var _data = data.split("T")[0].split("-")[2] + "/" + data.split("T")[0].split("-")[1] + "/" + data.split("T")[0].split("-")[0];
  		return _data;
  	};

    $scope.getHota = function(data){
      var _hora = data.split("T")[1].split(":")[0] + ":" + data.split("T")[1].split(":")[1];
      return _hora;
    };

	 });
});
