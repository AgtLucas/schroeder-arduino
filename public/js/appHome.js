angular.module('schroederHome', ['ngResource', 'ngRoute'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/sensores', {
      templateUrl: 'views/arduino/arduinos.html',
      controller: 'ArduinoController'
    });

    $locationProvider.html5Mode(true);
  }]);;
