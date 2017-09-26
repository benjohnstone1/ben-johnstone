var module = angular.module('profileController', [])

module.controller("mainCtrl", ['$scope', function($scope) {
    $scope.title = 'Top Sellers in Books';
}]);