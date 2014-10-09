define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("app", ['ngRoute']);

  app.config(function ($routeProvider, $locationProvider, $httpProvider) {
  	$locationProvider.html5Mode(true);
   	$locationProvider.hashPrefix = '!';

    $routeProvider.when("/home", angularAMD.route({
      templateUrl: '/views/home/' + Math.random(),
      controller: 'home',
      controllerUrl: 'js/home/controller'
    })).when("/meus-dados", angularAMD.route({
      templateUrl: '/views/perfil/' + Math.random(),
      controller: 'perfil',
      controllerUrl: 'js/perfil/controller'
    })).when("/tempo-real", angularAMD.route({
      templateUrl: '/views/arduino/temporeal/' + Math.random(),
      controller: 'tempoReal',
      controllerUrl: 'js/arduino/temporeal/controller'
    })).otherwise({redirectTo: "/home"});
  });

  app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
  });

  app.factory("SweetAlert", function(){
    var swal = window.swal,
      self = {
        swal: function(arg1,arg2,arg3,arg4,arg5){
          swal(arg1,arg2,arg3,arg4,arg5)
        },
        success: function(title,message,text){
          swal(title,message,"success", text, 0)
        },
        error: function(title,message,text){
          swal(title,message,"error", text, 1)
        },
        warning:function(title,message,text){
          swal(title,message,"warning", text, 0)
        },
        info: function(title,message,text){
          swal(title,message,"info", text, 0)
        }
      };
    return self;
  });

  app.controller("homeCtrl", function($scope, $window){
    $scope.sair = function(){
      $window.location.href = "/logout";
    };
  });

  return angularAMD.bootstrap(app);
});