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
				});
		};
		// UPDATE ==================================================================
		$scope.updateAccount = function(id) {
			$scope.loading = true;
			AccountsService.put(id, $scope.editAccountData)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
				});
		};
	}
]);

//=======================  Users Controller ================================
myApp.controller('usersController', ['$scope', '$http', 'UsersService',
	function($scope, $http, UsersService) {
		$scope.loading = true;

		UsersService.get()
			.success(function(data) {
				$scope.users = data;
				$scope.loading = false;
			});
	}
]);

//=======================  Edit Accounts Controller ================================
myApp.controller('editAccountsController', ['$scope', '$http', '$routeParams', '$location', 'AccountsService',
	function($scope, $http, $routeParams, $location, AccountsService) {
		$scope.editAccountData = {};
		$scope.loading = true;
		var accountID = $routeParams.accountID;

		// GET Edit Page ===================================================
		AccountsService.showEditPage(accountID)
			.success(function(data) {
				$scope.accounts = data[0];
				$scope.loading = false;
			});

		// UPDATE ==================================================================
		$scope.updateAccount = function(id) {
			$scope.loading = true;
			AccountsService.update(id, $scope.accounts)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
					$location.path('/accounts');
				})
				.error(function() {
					$scope.loading = false;
					alert("Error - Couldn't Save Update");
				});
		};
	}
]);

//=======================  Todos Controller =================================
myApp.controller('todosController', ['$scope', '$http', 'TodosService', '$location',
	function($scope, $http, TodosService, $location) {
		$scope.formData = {};
		$scope.loading = true;

		TodosService.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			})
			.error(function(error) {
				console.log(error);
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

		// INCREASE ==================================================================
		$scope.increase = function(id) {
			$scope.loading = true;
			// Get todo to edit
			TodosService.getTodo(id)
				.success(function(todo) {
					todo[0].rank += 1;
					updateTodo(id, todo);
				});
		};

		// DECREASE ==================================================================
		$scope.decrease = function(id) {
			$scope.loading = true;
			// Get todo to edit
			TodosService.getTodo(id)
				.success(function(todo) {
					todo[0].rank += -1;
					updateTodo(id, todo);
				});
		};

		function updateTodo(id, todo) {
			// Update todos by id
			TodosService.update(id, todo)
				.success(function(todoList) {
					$scope.todos = todoList;
					$scope.loading = false;
				})
				.error(function(error) {
					alert('could not update!');
					$scope.loading = false;
				});
		}

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
				.catch(function(error) {
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
					$location.path('/');
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
			$scope.success = false;

			AuthService.signup($scope.signupForm.username, $scope.signupForm.password, $scope.signupForm.fname, $scope.signupForm.lname)
				// handle success
				.then(function() {
					$scope.error = false;
					$scope.success = true;
					$scope.successMessage = "Successfully registered!";
					$location.path('/profile');
					$scope.signupForm = {};
				})
				// handle error
				.catch(function() {
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.signupForm = {};
				});

		};
	}
]);

//=======================  Profile Controller ================================
myApp.controller('profileController', ['$scope', '$http', 'AuthService', '$cookieStore', '$routeParams', '$location',
	function($scope, $http, AuthService, $cookieStore, $routeParams, $location) {
		//var profileID = $routeParams.profileID;
		// return username from AuthService
		AuthService.getProfile()
			.success(function(response) {
				$scope.username = response[0].username;
				$scope._id = response[0]._id;
				$scope.fname = response[0].fname;
				$scope.lname = response[0].lname;
				$scope.admin = response[0].admin;
			}).error(function(err) {
				console.log("Error: " + err);
			});

		$scope.editUser = function(id, fname, lname) {
			var user = { fname: fname, lname: lname };
			AuthService.editUser(id, user)
				.success(function(data) {
					$location.path('/profile');
				})
				.error(function() {
					alert("Error - could not update");
				});
		};

		$scope.deleteUser = function(id) {
			var answer = confirm("Are you sure you want to delete your profile?");
			if (answer) {
				AuthService.deleteUser(id)
					.success(function(data) {
						AuthService.logout()
							.then(function() {
								$location.path('/');
							});
					});
			}
		};
	}
]);