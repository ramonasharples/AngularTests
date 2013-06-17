'use strict';

//controllers and such

var memoryGameApp = angular.module('memoryGameApp', []);

memoryGameApp.filter('capitalize', function () {
	return function (text) {
		if (!text) {
			return "";
		}
		return text.slice(0, 1)[0].toUpperCase() + text.slice(1, text.length);
	};
});

memoryGameApp.factory('game', function () {
	var tileNames = ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'pink'];

	return new Game(tileNames);
});

memoryGameApp.controller('GameCtrl', function GameCtrl($scope, game) {
	$scope.game = game;
});

memoryGameApp.directive('mgCard', function() {
	return {
		restrict: 'E', 
		template: '<div class="container">' +
				    '<div class="card" ng-class="{flipped: tile().flipped}">' +
				      '<img class="front" ng-src="images/back.png">' +
				      '<img class="back" ng-src="images/{{tile().title}}.png">' +
				    '</div>' + 
				  '</div>',
		scope: {
			tile: 'accessor'
		}
	}
});