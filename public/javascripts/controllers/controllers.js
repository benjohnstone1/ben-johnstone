/* global angular, Chartist */
//=======================   Init Application =================================
var myApp = angular.module('myApp');

//=======================  Home Controller =================================
myApp.controller('homeController', ['$scope', '$http', 'AuthService', 'ExperiencesService',
	function($scope, $http, AuthService, ExperiencesService) {
		// Checks if user is logged in
		AuthService.getUserStatus();
		var user = null;
		user = AuthService.isLoggedIn();

		var fname = null;
		if (user) {
			AuthService.getProfile()
				.success(function(response) {
					fname = response[0].fname;
					// $scope.welcome = 'Welcome ' + fname;
				});
		}
		$scope.welcome = 'Welcome';

		// Use Benji.Forrest profile as Home Page Resume
		AuthService.getHomeProfile()
			.success(function(response) {
				$scope.about_me = response[0].about_me;
			})
			.error(function(response) {
				$scope.about_me = 'Error ' + response;
			});
		
		// Get Experiences
		AuthService.getHomeExperiences()
			.success(function(response) {
				$scope.experiences = response;
			})
			.error(function(response) {
				$scope.experiences = 'Error ' + response;
			});
			
		//SHOW EXPERIENCES
		$scope.showExperience = function(id) {
			ExperiencesService.showEditPage(id)
				.success(function(data) {
					$scope.experience = data[0];
					$scope.loading = false;
				})
				.error(function() {
					alert('Error');
				});
		};
	}
]);

//=======================  Analytics Controller ================================
myApp.controller('analyticsController', ['$scope', '$http', '$location', 'AccountsService',
	function($scope, $http, $location, AccountsService) {
		$scope.formData = {};
		$scope.loading = true;

		function paymentTermSeries(callback) {
			// GET ===================================================
			AccountsService.get()
				.success(function(data) {
					$scope.accounts = data;
					callback(data);
					$scope.loading = false;
				});
		}
		paymentTermSeries(function(data) {
			var p1 = 0;
			var p2 = 0;
			var p3 = 0;
			for (var i = 0; i < data.length; i++) {
				switch (data[i].paymentTerm) {
					case 30:
						p1 += 1;
						break;
					case 60:
						p2 += 1;
						break;
					case 90:
						p3 += 1;
						break;
					default:
						console.log("Undefined payment term");
				}
			}
			var chartData = {
				labels: ['30 Days', '60 Days', '90 Days'],
				series: [p1, p2, p3]
			};

			var options = {
				width: 400,
				height: 300,
				donut: true,
				donutWidth: 50,
				donutSolid: true,
				startAngle: 90,
				showLabel: true
			};

			new Chartist.Pie('#paymentTermsChart', chartData, options);

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
						$location.path('/accounts');
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
	}
]);

//=======================  Accounts Controller ================================
myApp.controller('accountsController', ['$scope', '$http', '$location', 'AccountsService',
	function($scope, $http, $location, AccountsService) {
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
						$location.path('/accounts');
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
					$location.path('/accounts/view/' + accountID);
				})
				.error(function() {
					$scope.loading = false;
					alert("Error - Couldn't Save Update");
				});
		};
	}
]);

//=======================  View Accounts Controller ================================

myApp.controller('viewAccountsController', ['$scope', '$http', '$routeParams', '$location', 'AccountsService',
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

		// Show Edit Account Page ==================================================
		$scope.showEditPage = function(id) {
			$scope.loading = true;

			AccountsService.showEditPage(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data;
				});
		};

		// DELETE ==================================================================
		$scope.deleteAccount = function(id) {
			$scope.loading = true;
			var answer = confirm("Are you sure you want to delete this account?");
			if (answer) {
				AccountsService.deleteAccount(id)
					.success(function(data) {
						$scope.loading = false;
						$scope.accounts = data;
						$location.path('/accounts/');
					});
			}
			else {
				$scope.loading = false;
			}
		};

	}
]);

//=======================  Users Controller ================================
myApp.controller('usersController', ['$scope', '$http', 'UsersService', 'AuthService',
	function($scope, $http, UsersService, AuthService) {
		$scope.loading = true;

		UsersService.get()
			.success(function(data) {
				$scope.users = data;
				$scope.loading = false;
			});

		$scope.deleteUser = function(id) {
			var answer = confirm("Are you sure you want to delete this user?");
			$scope.loading = true;
			if (answer) {
				AuthService.deleteUser(id)
					.success(function(data) {
						UsersService.get()
							.success(function(data) {
								$scope.users = data;
								$scope.loading = false;
							});
					});
			}
			else {
				$scope.loading = false;
			}
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
				.then(function() {
					$scope.success = true;
					$scope.successMessage = "Successfully registered!";
				}).then(function() {
					AuthService.login($scope.signupForm.username, $scope.signupForm.password)
						.then(function() {
							$location.path('/profile');
							$scope.signupForm = {};
						});
				})
				.catch(function() {
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.signupForm = {};
				});
		};
	}
]);

//=======================  Profile Controller ================================
myApp.controller('profileController', ['$scope', '$http', 'AuthService', 'ExperiencesService', '$cookieStore', '$routeParams', '$location',
	function($scope, $http, AuthService, ExperiencesService, $cookieStore, $routeParams, $location) {
		//var profileID = $routeParams.profileID;
		// return username from AuthService

		AuthService.getProfile()
			.success(function(response) {
				$scope.username = response[0].username;
				$scope._id = response[0]._id;
				$scope.fname = response[0].fname;
				$scope.lname = response[0].lname;
				$scope.admin = response[0].admin;
				$scope.about_me = response[0].about_me;
				$scope.skills = response[0].skills;
			});

		$scope.editUser = function(id, fname, lname, about_me) {
			var user = { fname: fname, lname: lname, about_me: about_me };
			AuthService.editUser(id, user)
				.success(function(data) {
					$location.path('/profile');
				})
				.error(function() {
					alert("Error - could not update");
				});
		};

		$scope.editSkills = function(id, skills) {
			var user = { skills: skills };
			AuthService.editUser(id, user)
				.success(function(data) {
					$location.path('/profile');
				})
				.error(function() {
					alert("Error - could not update");
				});
		};

		$scope.cancelEdit = function() {
			AuthService.getProfile()
				.success(function(response) {
					$scope.username = response[0].username;
					$scope._id = response[0]._id;
					$scope.fname = response[0].fname;
					$scope.lname = response[0].lname;
					$scope.admin = response[0].admin;
					// adding about me
					$scope.about_me = response[0].about_me;
					$scope.skills = response[0].skills;
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

		// EXPERIENCES ==================================================================

		ExperiencesService.get()
			.success(function(response) {
				$scope.experiences = response;
			});

		// CREATE ==================================================================
		$scope.createExperience = function(company, title, overview, achievements, fromDate, toDate, location) {
			$scope.loading = true;
			var experience = { company: company, title: title, overview: overview, achievements: achievements, fromDate: fromDate, toDate: toDate, location: location };
			// call the create function from our service (returns a promise object)
			ExperiencesService.create(experience)
				.success(function(data) {
					// $location.path('/profile');
					$scope.loading = false;
					// $scope.experience = {}; // clear the form so our user is ready to enter another
					$scope.experiences = data; // assign our new list of experiences
				})
				.error(function() {
					alert("Error - could not create experience");
				});
		};

		// DELETE ==================================================================
		$scope.deleteExperience = function(id) {
			var answer = confirm('Sure you want to delete?');
			if (answer) {
				$scope.loading = true;
				ExperiencesService.delete(id)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.experiences = data;
					});
			}
			else {
				$scope.loading = false();
			}
		};

		// UPDATE =======================================================
		$scope.showExperience = function(id) {
			ExperiencesService.showEditPage(id)
				.success(function(data) {
					$scope.experience = data[0];
					$scope.loading = false;

					$scope.updateExperience = function() {
						$scope.loading = true;
						ExperiencesService.update(id, $scope.experience)
							.success(function(data) {
								$scope.loading = false;
								$scope.experience = data;
								// Called so all updates are calleed
								ExperiencesService.get()
									.success(function(response) {
										$scope.experiences = response;
									});
							})
							.error(function() {
								$scope.loading = false;
							});
					};
				})
				.error(function() {
					alert('Error');
				});
		};

	}
]);