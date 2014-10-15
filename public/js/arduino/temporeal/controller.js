define(['js/app', 'socketIO'], function (app, socketIO) {
		app.controller('tempoReal', function ($scope, $http) {

    $scope.init = function() {
      $("iframe").css("height", ($(window).height() - 150));
    };

    $(window).resize(function(){
      $("iframe").css("height", ($(window).height() - 150));
    });

	 });
});
