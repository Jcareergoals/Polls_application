var mean = angular.module('mean', ['ngRoute']); 

// ROUTES
	mean.config(function($routeProvider){
		$routeProvider 
			.when('/', {templateUrl:"./static/partials/login.html"}) 
			.when('/dashboard', {templateUrl:"./static/partials/dashboard.html"})
			.when('/create', {templateUrl:"./static/partials/createPoll.html"})
			.when('/poll/:id',{templateUrl:"./static/partials/polls.html"})
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
			$http.post('/polls', data).success(function(data){
				if(data.status == 'success'){
					console.log('Poll was successfully created'); 
					$window.location.href='#/dashboard'; 
				} else {
					console.log('There was an error creating the poll'); 
				}
			}); 
		}
		factory.index = function(callback){
			$http.get('/polls').success(function(data){
				callback(data); 
			}); 
		}
		factory.getPoll = function(data, callback){
			$http.get('/poll/'+data.id).success(function(data){
				callback(data);
			}); 
		}
		factory.vote = function(data, callback){
			$http.post('/vote', data).success(function(data){
				callback(data);
			});
		}
		factory.delete = function(data, callback){
			$http.post('/delete', data).success(function(data){
				callback(data); 
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
	mean.controller('dashboard', function($scope, pollFactory){
		$scope.polls = []; 
		pollFactory.index(function(data){
			console.log(data); 
			$scope.polls = data; 
		}); 
		$scope.delete = function(data){
			pollFactory.delete(data, function(data){
				console.log(data);
				$scope.polls = data; 
			}); 
		}
	}); 
	mean.controller('createPoll', function($scope, pollFactory){
		$scope.createPoll = function(){
			console.log($scope.poll); 
			pollFactory.create($scope.poll); 
		}
	}); 
	mean.controller('polls', function($scope, pollFactory, $routeParams){
		pollFactory.getPoll($routeParams, function(data){
			console.log(data); 
			$scope.survey = data; 
		}); 
		$scope.vote = function(data){
			var newVote = {
				id: $scope.survey._id, 
				option: data
			} 
			pollFactory.vote(newVote, function(data){
				$scope.survey = data; 
				newVote = {};
			}); 
		}
	}); 
