var module = angular.module('accountsController', [])

	// inject the account service factory into our controller
    module.controller('mainCtrl', ['$scope', '$http', 'Accounts', function($scope, $http, Accounts) {
    	$scope.formData = { };
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all accounts and show them
		// use the service to get all the accounts
		Accounts.get()
			.success(function(data) {
				$scope.accounts = data;
				$scope.loading = false;
			});
			
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createAccount = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Accounts.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
			}
		};

		// DELETE ==================================================================
		// delete an account after checking it
		$scope.deleteAccount = function(id) {
			$scope.loading = true;
			var answer = confirm("Are you sure you want to delete this account?")
			if (answer) {
				Accounts.delete(id)
					// if successful creation, call our get function to get all the new todos
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
		$scope.showEditPage = function(id){
			$scope.loading = true;
			
			Accounts.show(id)
			.success(function(data){
				$scope.loading = false;
			 	$scope.accounts = data;
			});
		};
		
		// UPDATE ==================================================================
		// update an account
		$scope.updateAccount = function(id) {
			$scope.loading = true;
			
			Accounts.put(id)
			.success(function(data){
				$scope.loading = false;
				$scope.accounts = data;
			});
		};
}]);