/* global angular */
var module = angular.module('profileController', []);

module.controller('profileCtrl', ['$scope', '$http', 'User', function($scope, $http, User) {
    $scope.title = 'Foobar';
    $scope.username = '';
    $scope.password = '';

    // Call service getting request for user
    User.identity().then(function(identity){
        $scope.user = identity;
        $scope.username = identity.username;
    });
}]);