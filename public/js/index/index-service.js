'use strict';

angular.module('schroeder')
  .factory('Login', ['$resource', function ($resource) {
    return $resource('schroeder/login/');
  }])
  .factory('User', ['$resource', function ($resource) {
    return $resource('schroeder/users/');
  }]);
