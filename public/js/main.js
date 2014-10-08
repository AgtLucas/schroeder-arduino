require.config({
  baseUrl: "",
  paths: {
    'angular': 'lib/angular/angular.min',
    'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
    'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min',
    'socketIO': 'lib/socketio/socket.io',
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular']
  },
  deps: ['js/app', 'socketIO']
});