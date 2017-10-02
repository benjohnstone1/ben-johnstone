/* global angular */
/*
var module = angular.module('loginController', []);

module.controller('loginCtrl', ['$scope', '$http', 'Authservice', function($scope, $http, Authservice) {
    // $scope.username = 'testing';
    // $scope.password = '';

    // $scope.User = {};
    // $scope.errorMessage = '';

    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // this function will be called when the login form is submitted
    $scope.login = function() {
        console.log("POST LOGIN FIRED");
        //   $http.post('/login', $scope.User)
        Authservice.login($scope.loginForm.username, $scope.loginForm.password)
            .then(function(data) {
                //   $location.path('/');
                $scope.disabled = false;
                $scope.loginForm = {};
                console.log("Success Data:" + data);
            }).catch(function(err) {
                console.log("Error Message: " + err);
                $scope.error = true;
                $scope.errorMessage = err;
                $scope.disabled = false;
                $scope.loginForm = {};
            });
    };
}]);*/

var module = angular.module('loginController', []);
module.controller('loginCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

    $scope.login = function () {
    
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      $scope.user = {
          username: '',
          password: ''
      };

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
