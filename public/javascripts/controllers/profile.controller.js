/* global angular */
var module = angular.module('profileController', ['ngCookies']);

module.controller('profileCtrl', ['$scope', '$http', 'AuthService', '$cookieStore', function($scope, $http, AuthService, $cookieStore) {
    $scope.title = 'Foobar';
    $scope.username = '';
    $scope.password = '';
    console.log("Profile Controller Launched!");
    // Call service getting request for user
    // AuthService.login().then(function(data){
    //     $scope.user = data;
    //     console.log($scope.user);
    // });
    $scope.username = AuthService.getUser();
    $scope.title = AuthService.getUser();
    console.log("Cookie success?: "+$scope.title);
}]);