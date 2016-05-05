var mean = angular.module('mean', ['ngRoute']); 

// ROUTES
	mean.config(function($routeProvider){
		$routeProvider 
			.when('/', {templateUrl:""}) 
			
			.otherwise({redirectTo:"/"})

	})

// FACTORIES
	mean.factory('', function($http){
		var factory = {}; 

		return factory; 
	}); 
// CONTROLLERS
	mean.controller('', function($scope){

	}); 

