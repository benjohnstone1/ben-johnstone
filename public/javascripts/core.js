angular.module('scotchTodo', ['todoController', 'todoService']);
angular.module('accountsApp', ['accountsController', 'accountsService']);
angular.module('profileApp', ['profileController']);

var app = angular.module('homeApp', []);
app.controller('homeCtrl', ['$scope', function($scope){
    $scope.welcome = 'Home... Welcome :)';
}]);

