'use strict';

angular.module('schroederHome')
  .factory('Arduino', ['$resource', function ($resource) {
    return $resource('schroeder/medicoes');
  }]);
