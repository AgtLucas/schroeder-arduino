angular.module('schroederHome')
  .controller('homeCtrl', ['$scope', '$window', '$timeout', 'User', '$http', function ($scope, $window, $timeout, User, $http) {

    $scope.registrar = function(){
      User.save({ nome: $scope.nomeRegister, email: $scope.emailRegister, password: $scope.passwordRegister },
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
          $scope.voltar();
        }
      });
    };

    $scope.sair = function(){
      $http({method: 'GET', url: '/logout'});
      $window.location.href = "/";
    }

  }]);
