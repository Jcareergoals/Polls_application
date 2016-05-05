var mean = angular.module('mean', ['ngRoute']); 

// ROUTES
	mean.config(function($routeProvider){
		$routeProvider 
			.when('/', {templateUrl:"./static/partials/login.html"}) 
			.when('/dashboard', {templateUrl:"./static/partials/dashbaord.html"})
			.otherwise({redirectTo:"/"})

	})

// FACTORIES
	mean.factory('loginFactory', function($http, $window){
		var factory = {}; 
		factory.create = function(data){
			$http.post('/session', data).success(function(data){
				if(data.status == 'success'){
					console.log('successfully created session')
					$window.location.href='#/dashboard'
				} else {
					console.log('There was an error while setting user session')
				}
			}); 
		}
		return factory; 
	}); 
// CONTROLLERS
	mean.controller('login', function($scope, loginFactory){
		$scope.tab = 'login';
		$scope.login = function(){
			loginFactory.create($scope.session)
		}
	}); 

