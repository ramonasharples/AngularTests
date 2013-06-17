var myApp = angular.module('myApp', []);

myApp.directive("enter", function () {
	return function (scope, element, attrs) {
		element.bind("mouseenter", function () {
			scope.$apply(attrs.enter);
		});
	}
});

function FirstCtrl($scope) {
	$scope.oneFish = function () {
		console.log("One fish, two fish");
	};

	$scope.redFish = function () {
		console.log("Red fish, blue fish");
	};
}

function SecondCtrl($scope) {

}