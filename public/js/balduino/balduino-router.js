'use strict';

angular.module('schroeder')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/balduinos', {
        templateUrl: 'views/balduino/balduinos.html',
        controller: 'BalduinoController',
        resolve:{
          resolvedBalduino: ['Balduino', function (Balduino) {
            return Balduino.query();
          }]
        }
      })
    }]);
