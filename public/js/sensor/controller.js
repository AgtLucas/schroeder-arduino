define(['js/app'], function (app) {
  app.controller('sensor', function ($scope, $http, SweetAlert) {

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

    $scope.remover = function(obj, index) {
      $http.delete('/schroeder/sensor/' + obj.id).success(function(data, status, headers, config) {
        SweetAlert.success("Sensor removido com sucesso!", "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        $scope.dados.splice(index, 1);
      })
    };

  });
});
