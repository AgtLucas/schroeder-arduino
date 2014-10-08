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

  app.controller("homeCtrl", function($scope, $window){
    $scope.sair = function(){
      $window.location.href = "/logout";
    };
  });

  return angularAMD.bootstrap(app);
});