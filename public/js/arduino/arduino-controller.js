'use strict';

angular.module('schroederHome').controller('ArduinoController', ['$scope', 'Arduino',
  function ($scope, Arduino) {
    $scope.arduinos = Arduino.query();
}]);