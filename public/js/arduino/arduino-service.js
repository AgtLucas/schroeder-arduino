'use strict';

angular.module('schroeder')
  .factory('Arduino', ['$resource', function ($resource) {
    return $resource('schroeder/arduinos/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'}
    });
  }]);
