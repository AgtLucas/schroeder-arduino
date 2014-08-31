angular.module('schroeder').run(function($rootScope, $location, isLogin, $http) {
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if(nextRoute.access){
      $http({method: 'POST', url: '/schroeder/isLogin'}).success(function(data, status, headers, config) {
        if(!data.success){
          $location.path("/");
        }}).error(function(data, status, headers, config) {
        $location.path("/");
      });
    }
  });
});