angular.module('schroeder')
  .controller('HomeController', ['$scope', 'Login', '$window', '$location', '$timeout', '$rootScope', function ($scope, Login, $window, $location, $timeout, $rootScope) {

    angular.extend($scope, {
      email: "",
      password: "",
      showMessagem: false,
      error: ""
    })

    $scope.logar = function(){
      Login.save({ email: $scope.email, password: $scope.password },
      function (data) {
        if(data.error){
          angular.extend($scope,{
            showMessagem: true,
            error: data.error
          });
          $timeout(function(){
            angular.extend($scope,{
              showMessagem: false,
              error: ''
            });
          }, 5000)
        }else{
          $location.path("sensores");
        }
      });
    };
  }]);
