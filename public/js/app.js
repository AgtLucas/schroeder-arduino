angular.module('schroeder', ['ngResource', 'ngRoute', 'ui.bootstrap'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController',
        access: false })
      .when('/sensores', {
        templateUrl: 'views/arduino/arduinos.html',
        controller: 'ArduinoController',
        access: true
      })
      .when('/register', {
        templateUrl: 'views/register/register.html',
        controller: 'RegisterController',
        access: false });
  }]);
