define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("app", ['ngRoute']);

  app.config(function ($routeProvider, $locationProvider, $httpProvider) {
  	$locationProvider.html5Mode(true);
   	$locationProvider.hashPrefix = '/';

    $routeProvider.when("/home", angularAMD.route({
    	templateUrl: 'views/home/index.html',
    	controller: 'home',
    	controllerUrl: 'js/home/controller'
    })).otherwise({redirectTo: "/home"});

		var httpStatusInterceptor = function($window){
    	function success(response){
    		if(response.data.error == 1){
    			return error(response);
    		}
        return response;
      }
      function error(response) {
				return $window.location.href="/logout";
      }

     	return function(promise) {
      	return promise.then(success, error);
      }
    }

    $httpProvider.responseInterceptors.push(httpStatusInterceptor);

  });

  return angularAMD.bootstrap(app);
});