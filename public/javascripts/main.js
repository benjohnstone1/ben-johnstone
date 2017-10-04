/* global angular */
var myApp = angular.module('myApp', ['ngRoute', 'AuthService']);

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../partials/home.html',
      access: { restricted: false }
    })
    .when('/accounts', {
      templateUrl: '../partials/accounts.html',
      access: { restricted: false }
    })
    .when('/todos', {
      templateUrl: '../partials/todos.html',
      access: { restricted: false }
    })
    .when('/login', {
      templateUrl: '../partials/login.html',
      access: { restricted: false }
    })
    .when('/signup', {
      templateUrl: '../partials/signup.html',
      access: { restricted: false }
    })
    .when('/profile', {
      templateUrl: '../partials/profile.html',
      access: { restricted: false }
    })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {

      /*
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
      */
    });
});