angular.module('schroederHome', ['ngResource']).controller('schroederCtrl', ['$scope', '$http', function ($scope, $http) {

   $http({method: 'GET', url: '/schroeder/users/info'}).success(function(data, status, headers, config) {
      $scope.dados = data;
    }).error(function(data, status, headers, config) {
      alert(2);
    });

}]);
