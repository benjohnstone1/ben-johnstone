/* global angular */
angular.module('scotchTodo', ['todoController', 'todoService']);
angular.module('accountsApp', ['accountsController', 'accountsService']);
angular.module('profileApp', ['profileController', 'loginService']);
angular.module('loginApp', ['loginController', 'loginService']);

var homeApp = angular.module('homeApp', []);
homeApp.controller('homeCtrl', ['$scope', function($scope){
    $scope.welcome = 'Home... Welcome :)';
}]);

