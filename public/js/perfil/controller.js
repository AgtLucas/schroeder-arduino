define(['js/app'], function (app) {
  app.controller('perfil', function ($scope, $http, SweetAlert) {
    angular.extend($scope, {
      dados: {}
    });

    $http.get('/schroeder/users/info').success(function(data) {
      angular.extend($scope, {
        dados: data
      });
    });

    $scope.updateUser = function(){
      $http.put('/schroeder/users/' + $scope.dados.id, $scope.dados).success(function(data, status, headers, config) {
        SweetAlert.error(data.message, "");
      })
    };

  });
});
