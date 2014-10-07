define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("app", ['ngRoute']);

  app.config(function ($routeProvider) {
    $routeProvider.when("/home", angularAMD.route({
    	templateUrl: 'views/home/index.html',
    	controller: 'home',
    	controllerUrl: 'js/home/controller'
    })).otherwise({redirectTo: "/home"});
  });

  return angularAMD.bootstrap(app);
});