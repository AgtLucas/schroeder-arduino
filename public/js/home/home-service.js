'use strict';

angular.module('schroeder')
  .factory('User', ['$resource', function ($resource) {
    return $resource('schroeder/users/');
  }]);