define(['js/app'], function (app) {
  app.controller('client', function ($scope, $http, SweetAlert) {

    $http.get('/schroeder/clients/').success(function(data, status, headers, config) {
      angular.extend($scope, {
        dados: data
      });
    })

    $scope.remover = function(obj, index) {
      $http.delete('/schroeder/clients/' + obj.id).success(function(data, status, headers, config) {
        SweetAlert.success("Cliente removido com sucesso!", "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        $scope.dados.splice(index, 1);
      })
    };

  });
});
