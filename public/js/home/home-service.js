'use strict';

angular.module('schroeder')
  .factory('Login', ['$resource', function ($resource) {
    return $resource('schroeder/login/', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'}
    });
  }]).factory('isLogin', ['$resource', function ($resource) {
    return $resource('schroeder/isLogin/', {}, {
      'login': { method: 'POST'}
    });
  }]);
