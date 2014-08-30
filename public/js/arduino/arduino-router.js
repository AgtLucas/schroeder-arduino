'use strict';

angular.module('schroeder')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/sensores', {
        templateUrl: 'views/arduino/arduinos.html',
        controller: 'ArduinoController',
        resolve:{
          resolvedArduino: ['Arduino', function (Arduino) {
            return Arduino.query();
          }]
        }
      })
    }]);
