'use strict';

angular.module('schroeder')
  .factory('Balduino', ['$resource', function ($resource) {
    return $resource('schroeder/balduinos/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
