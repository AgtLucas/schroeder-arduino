define(['js/app'], function (app) {
  app.controller('new-client', function ($scope, $http, SweetAlert) {

    angular.extend($scope, {
      dados: {}
    });

    $scope.saveClient = function(){
      $http.post('/schroeder/clients/', $scope.dados).success(function(data, status, headers, config) {
        SweetAlert.success(data.message, "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        angular.extend($scope, {
          dados: {}
        });
      })
    };

  });
});
