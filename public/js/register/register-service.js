'use strict';

angular.module('schroeder')
  .factory('User', ['$resource', function ($resource) {
    return $resource('schroeder/users/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'},
      'create': { method: 'POST'}
    });
  }]);
