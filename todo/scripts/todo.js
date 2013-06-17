'use strict';

var todoApp = angular.module("todoApp", []);

todoApp.controller('AppCtrl', function AppCtrl($scope) {
	$scope.name = 'Dave';

	var items = [
		{text: 'Add a task!', completed: false},
		{text: 'Git \'er done!', completed: false}
	];

	$scope.items = items;

	var newItem = {text: '', completed: false};

	$scope.newItem = newItem;

	$scope.remaining = function() {
		return items.reduce(function(count, item) {
			return item.completed ? count : count+1;
		}, 0);
	};

	$scope.add = function(newItem) {
		var item = {text: newItem.text, completed: false};
		items.push(item);
		newItem.text = '';
	};

	$scope.archive = function() {
		items = $scope.items = items.filter(function(item) {
			return !item.completed;
		});
	};
});