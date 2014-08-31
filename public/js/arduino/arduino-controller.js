'use strict';

angular.module('schroeder').controller('ArduinoController', ['$scope', 'Arduino',
  function ($scope, Arduino) {
    $scope.arduinos = Arduino.query();
}]);