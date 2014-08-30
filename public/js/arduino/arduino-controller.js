'use strict';

angular.module('schroeder').controller('ArduinoController', ['$scope', 'resolvedArduino',
  function ($scope, resolvedArduino) {
    $scope.arduinos = resolvedArduino;
}]);