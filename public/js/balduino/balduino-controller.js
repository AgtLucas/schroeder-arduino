'use strict';

angular.module('schroeder')
  .controller('BalduinoController', ['$scope', '$modal', 'resolvedBalduino', 'Balduino',
    function ($scope, $modal, resolvedBalduino, Balduino) {

      $scope.balduinos = resolvedBalduino;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.balduino = Balduino.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Balduino.delete({id: id},
          function () {
            $scope.balduinos = Balduino.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Balduino.update({id: id}, $scope.balduino,
            function () {
              $scope.balduinos = Balduino.query();
              $scope.clear();
            });
        } else {
          Balduino.save($scope.balduino,
            function () {
              $scope.balduinos = Balduino.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.balduino = {
          
          "temperature": "",
          
          "humidity": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var balduinoSave = $modal.open({
          templateUrl: 'balduino-save.html',
          controller: BalduinoSaveController,
          resolve: {
            balduino: function () {
              return $scope.balduino;
            }
          }
        });

        balduinoSave.result.then(function (entity) {
          $scope.balduino = entity;
          $scope.save(id);
        });
      };
    }]);

var BalduinoSaveController =
  function ($scope, $modalInstance, balduino) {
    $scope.balduino = balduino;

    

    $scope.ok = function () {
      $modalInstance.close($scope.balduino);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
