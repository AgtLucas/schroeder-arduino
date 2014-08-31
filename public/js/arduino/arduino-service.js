'use strict';

angular.module('schroeder')
  .factory('Arduino', ['$resource', function ($resource) {
    return $resource('schroeder/arduinos');
  }]);
