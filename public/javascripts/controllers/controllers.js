/* global angular */
//=======================   Init Application =================================
var myApp = angular.module('myApp');

//=======================  Home Controller =================================
myApp.controller('homeController', ['$scope',
	function($scope) {
		$scope.welcome = 'Home... Welcome :)';
	}
]);

//=======================  Accounts Controller ================================
myApp.controller('accountsController', ['$scope', '$http', 'AccountsService',
	function($scope, $http, AccountsService) {
		$scope.formData = {};
		$scope.loading = true;

		// GET ===================================================
		AccountsService.get()
			.success(function(data) {
				$scope.accounts = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		$scope.createAccount = function() {
			if ($scope.formData.name != undefined) {
				$scope.loading = true;
				AccountsService.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
			}
		};

		// DELETE ==================================================================
		$scope.deleteAccount = function(id) {
			$scope.loading = true;
			var answer = confirm("Are you sure you want to delete this account?");
			if (answer) {
				AccountsService.delete(id)
					.success(function(data) {
						$scope.loading = false;
						$scope.accounts = data; // assign our new list of todos
					});
			}
			else {
				$scope.loading = false;
			}
		};
		// Show Edit Account Page ==================================================
		$scope.showEditPage = function(id) {
			$scope.loading = true;

			AccountsService.showEditPage(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
					console.log($scope.accounts[0]);
				});
		};

		// UPDATE ==================================================================
		$scope.updateAccount = function(id) {
			$scope.loading = true;
			AccountsService.put(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
				});
		};
	}
]);

//=======================  Edit Accounts Controller ================================
myApp.controller('editAccountsController', ['$scope', '$http', '$routeParams', 'AccountsService',
	function($scope, $http, $routeParams, AccountsService) {
		$scope.formData = {};
		$scope.loading = true;
		
		var accountID = $routeParams.accountID;

		// GET ===================================================
		AccountsService.get()
			.success(function(data) {
				$scope.accounts = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		$scope.createAccount = function() {
			if ($scope.formData.name != undefined) {
				$scope.loading = true;
				AccountsService.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
			}
		};

		// DELETE ==================================================================
		$scope.deleteAccount = function(id) {
			$scope.loading = true;
			var answer = confirm("Are you sure you want to delete this account?");
			if (answer) {
				AccountsService.delete(id)
					.success(function(data) {
						$scope.loading = false;
						$scope.accounts = data; // assign our new list of todos
					});
			}
			else {
				$scope.loading = false;
			}
		};
		// Show Edit Account Page ==================================================
		$scope.showEditPage = function(id) {
			$scope.loading = true;

			AccountsService.showEditPage(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
					console.log($scope.accounts[0]);
				});
		};

		// UPDATE ==================================================================
		$scope.updateAccount = function(id) {
			$scope.loading = true;
			AccountsService.put(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
				});
		};
	}
]);

//=======================  Todos Controller =================================
myApp.controller('todosController', ['$scope', '$http', 'TodosService',
	function($scope, $http, TodosService) {
		$scope.formData = {};
		$scope.loading = true;

		TodosService.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		$scope.createTodo = function() {
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				TodosService.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// INCRAESE ==================================================================
		$scope.increase = function(index) {
			console.log($scope.todos[index].text);
			console.log("Old Index: " + index);
			console.log("Old Rank:" + $scope.todos[index].rank);
			$scope.todos[index].rank += 1;
			console.log("New Rank:" + $scope.todos[index].rank);
			console.log("New Index: " + index);
		};

		// DECREASE ==================================================================
		$scope.decrease = function(index) {
			console.log(index);
			$scope.todos[index].rank += -1;
		};

		// DELETE ==================================================================
		$scope.deleteTodo = function(id) {
			var answer = confirm('Sure you want to delete?');
			if (answer) {
				$scope.loading = true;
				TodosService.delete(id)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.todos = data; // assign our new list of todos
					});
			}
			else {
				$scope.loading = false();
			}
		};
	}
]);

//=======================  Login Controller =================================
myApp.controller('loginController', ['$scope', '$location', 'AuthService',
	function($scope, $location, AuthService) {
		$scope.login = function() {
			// initial values
			$scope.error = false;
			$scope.disabled = true;

			AuthService.login($scope.loginForm.username, $scope.loginForm.password)
				// handle success
				.then(function() {
					$location.path('/profile');
					$scope.disabled = false;
					$scope.loginForm = {};
				})
				// handle error
				.catch(function() {
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.disabled = false;
					$scope.loginForm = {};
				});

		};
	}
]);

//=======================  Logout Controller =================================
myApp.controller('logoutController', ['$scope', '$location', 'AuthService',
	function($scope, $location, AuthService) {
		$scope.logout = function() {
			AuthService.logout()
				.then(function() {
					$location.path('/login');
				});
		};
	}
]);

//=======================  Signup Controller =================================
myApp.controller('signupController', ['$scope', '$location', 'AuthService',
	function($scope, $location, AuthService) {
		$scope.signup = function() {
			// initial values
			$scope.error = false;
			$scope.disabled = true;

			AuthService.signup($scope.signupForm.username, $scope.signupForm.password, $scope.signupForm.fname, $scope.signupForm.lname)
				// handle success
				.then(function() {
					$location.path('/profile');
					$scope.disabled = false;
					$scope.signupForm = {};
				})
				// handle error
				.catch(function() {
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.disabled = false;
					$scope.signupForm = {};
				});

		};
	}
]);

//=======================  Profile Controller ================================
myApp.controller('profileController', ['$scope', '$http', 'AuthService', '$cookieStore', '$window',
	function($scope, $http, AuthService, $cookieStore, $window) {
		// return email from AuthService
		AuthService.getProfile()
			.success(function(response) {
				$scope.username = response[0].username;
				$scope._id = response[0]._id;
				$scope.fname = response[0].fname;
				$scope.lname = response[0].lname;
			}).error(function(err) {
				console.log("Error: " + err);
			});

		$scope.editUser = function() {
			// edit user
		};

		$scope.deleteUser = function(id) {
			var answer = confirm("Are you sure you want to delete your profile?");
			if (answer) {
				AuthService.deleteUser(id)
					.success(function(data) {
						// Redirect to home page...
						$window.location.assign('/');
					});
			}
		};
	}
]);