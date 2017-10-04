/* global angular */
//=======================   Init Application =================================
var myApp = angular.module('myApp', ['AuthService']);

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

			AccountsService.show(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
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

		// DELETE ==================================================================
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			TodosService.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}
]);

//=======================  Login Controller =================================
// var loginApp = angular.module('myApp', ['AuthService']);
myApp.controller('loginController', ['$scope', '$location', 'AuthService',
	function($scope, $location, AuthService) {
		$scope.login = function() {
			// initial values
			$scope.error = false;
			$scope.disabled = true;

			AuthService.login($scope.loginForm.username, $scope.loginForm.password)
				// handle success
				.then(function() {
					$location.path('/');
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
}]);