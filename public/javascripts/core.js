/* global angular */
// angular.module('myApp', ['todoController', 'todoService', 'loginController', 'loginService', 'accountsController', 'accountsService', 'profileController']);
// angular.module('myApp', ['accountsController', 'AccountsService']);
// angular.module('myApp', ['profileController', 'loginService']);
// angular.module('myApp', ['loginController', 'loginService']);

angular.module('myApp', []).controller('homeController', ['$scope', function($scope) {
    $scope.welcome = 'Home... Welcome :)';
}]);
