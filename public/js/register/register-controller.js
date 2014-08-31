angular.module('schroeder')
  .controller('RegisterController', ['$scope', 'User', '$timeout', '$window', '$location', function ($scope, User, $timeout, $window, $location) {

    angular.extend($scope,{
      showMessagem: false,
      error: "",
      nome: "",
      email: "",
      password: ""
    });

    $scope.registrar = function(){
      User.save({ nome: $scope.nome, email: $scope.email, password: $scope.password },
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
           $location.path("/");
        }
      });
    };

  }]);
