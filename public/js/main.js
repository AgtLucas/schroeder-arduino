require.config({
  baseUrl: "",
  paths: {
    'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min',
    'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
    'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min'
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular']
  },
  deps: ['js/app']
});