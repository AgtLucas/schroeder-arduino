define(['js/app', 'socketIO'], function (app, socketIO) {
		app.controller('tempoReal', function ($scope, $http) {

			angular.extend($scope, {
	      clientePassword: null
      });

        var socket = socketIO();

        socket.on('update-sensor', function(obj){
          for(var i = 0; i < $scope.dados.length; i++){
            if($scope.dados[i].id = obj.id){
              $scope.dados[i] = obj;
            }
          }
          $scope.$apply();
        });


			$http.get('/schroeder/sensores/').success(function(data, status, headers, config) {
      	angular.extend($scope, {
	        dados: data
      	});
    	})

    	$http.get('/schroeder/clients/').success(function(data, status, headers, config) {
    		if(data.length > 0){
    			angular.extend($scope, {
	        	clientes: data,
	        	clientePassword: data[0].password || null
      		});
    		}
    	})

    	$scope.toogle = function(obj){
    		$http.put('/schroeder/sensor/' + obj.id, { password: $scope.clientePassword }).success(function(data, status, headers, config) {
    			data = data.entity;
		    	for(var i = 0; i < $scope.dados.length; i++){
		    		if($scope.dados[i].id == data.id){
		    			$scope.dados[i] = data;
		    		}
		    	}
    		})
    	};

	 });
});
