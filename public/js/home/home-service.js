'use strict';

angular.module('schroederHome')
  .factory('User', ['$resource', function ($resource) {
    return $resource('schroeder/users/');
  }]);
