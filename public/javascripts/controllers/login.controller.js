/* global angular */
var module = angular.module('loginController', []);

module.controller('loginCtrl', ['$scope', '$http', 'User', function($scope, $http, User) {
    $scope.username = 'testing';
    $scope.password = '';
    // this function will be called when the login form is submitted
     $scope.submit = function() {
          $http.post('/login', {username: $scope.username, password: $scope.password })
               .success(function(identity) {
                   // assumes /path/to/signin returns a JSON representation of the signed-in user upon successful authentication
                   // presumably the endpoint also sets a cookie representing an auth token or something of that nature. the browser will store this automatically for you
                   User.identity(identity); // set the identity immediately
                   // do whatever else on successful login, like redirect to another route
                  // $scope.user = identity;
                   
                   $scope.username = User.identity(identity).username;
               });
     };
}]);