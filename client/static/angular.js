var mean = angular.module('mean', ['ngRoute']); 

// ROUTES
	mean.config(function($routeProvider){
		$routeProvider 
			.when('/', {templateUrl:"./static/partials/login.html"}) 
			.when('/dashboard', {templateUrl:"./static/partials/dashboard.html"})
			.when('/create', {templateUrl:"./static/partials/createPoll.html"})
			.otherwise({redirectTo:"/"})

	})

// FACTORIES
	mean.factory('loginFactory', function($http, $window){
		var factory = {}; 
		factory.create = function(data){
			$http.post('/session', data).success(function(data){
				if(data.status == 'success'){
					console.log('successfully created session');
					$window.location.href='#/dashboard';
				} else {
					console.log('There was an error while setting user session');
				}
			}); 
		}
		return factory; 
	}); 
	mean.factory('dashboardFactory', function($http, $window){
		var factory = {};  
		// too be added
		return factory; 
	}); 
	mean.factory('')
	mean.factory('pollFactory', function($http, $window){
		var factory = {}; 
		factory.create = function(data){
			$http.post('/poll', data).success(function(data){
				if(data.status == 'success'){
					console.log('Poll was successfully created'); 
					$window.location.href='#/dashboard'; 
				} else {
					console.log('There was an error creating the poll'); 
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
	mean.controller('dashboard', function($scope, dashboardFactory){
	}); 
	mean.controller('createPoll', function($scope, pollFactory){
		$scope.createPoll = function(){
			console.log($scope.poll); 
			pollFactory.create($scope.poll); 
		}
	}); 
