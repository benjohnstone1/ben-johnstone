/* global angular */
var module = angular.module('profileController', ['ngCookies']);

module.controller('profileCtrl', ['$scope', '$http', 'AuthService', '$cookieStore', '$window', 
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