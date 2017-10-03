/* global angular */
var module = angular.module('profileController', ['ngCookies']);

module.controller('profileCtrl', ['$scope', '$http', 'AuthService', '$cookieStore', function($scope, $http, AuthService, $cookieStore) {
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
}]);