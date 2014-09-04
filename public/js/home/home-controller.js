angular.module('schroederHome')
  .controller('homeCtrl', ['$scope', '$timeout', 'User', function ($scope, $timeout, User) {

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

  }]);
