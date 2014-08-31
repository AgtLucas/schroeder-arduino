angular.module('schroeder')
  .controller('schroederCtrl', ['$scope', 'Login', '$window', '$timeout', 'User', '$http', function ($scope, Login, $window, $timeout, User, $http) {

    angular.extend($scope, {
      view: 1,
      email: "",
      password: "",
      nomeRegister: "",
      emailRegister: "",
      passwordRegister: "",
      showMessagem: false,
      error: ""
    })

    $scope.voltar = function(){
      angular.extend($scope, {
        view: 1,
        email: "",
        password: "",
        nomeRegister: "",
        emailRegister: "",
        passwordRegister: "",
        showMessagem: false,
        error: ""
      });
    };

    $scope.irRegistrar = function(){
      angular.extend($scope, {
        view: 2,
        email: "",
        password: "",
        nomeRegister: "",
        emailRegister: "",
        passwordRegister: "",
        showMessagem: false,
        error: ""
      });
    };

    $scope.logar = function(){
      Login.save({ username: $scope.email, password: $scope.password },
      function (data) {
        if(!!data.success){
          $window.location.href = "/home";
        }else{
          angular.extend($scope,{
            showMessagem: true,
            error: "Usuário inválido!"
          });
          $timeout(function(){
            angular.extend($scope,{
              showMessagem: false,
              error: ""
            });
          }, 5000)
        }
      });
    };

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
