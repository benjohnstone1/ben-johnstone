/* global angular */
var myApp = angular.module('myApp', ['ngRoute', 'AuthService']);

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../partials/home.html',
      access: { restricted: false }
    })
    .when('/users', {
      templateUrl: '../partials/users.html',
      access: { restricted: true }
    })
    .when('/accounts', {
      templateUrl: '../partials/accounts.html',
      access: { restricted: true }
    })
    // the :accountID is now available to the controller
    .when('/accounts/edit/:accountID', {
      templateUrl: '../partials/accounts.edit.html',
      access: { restricted: true }
    })
    .when('/todos', {
      templateUrl: '../partials/todos.html',
      access: { restricted: true }
    })
    .when('/todos/edit/:todo_id', {
      templateUrl: '../partials/todos.html',
      access: { restricted: true }
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
      access: { restricted: true }
    })
    .when('/profile/edit/:profileID', {
      templateUrl: '../partials/profile.edit.html',
      access: { restricted: true }
    })
    .when('/logout', {
      controller: 'logoutController',
      access: { restricted: false }
    })
    .otherwise({
      redirectTo: '/',
      access: { restricted: false }
    });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {
      AuthService.getUserStatus()
        .then(function() {
          try {
            if (next.access.restricted && !AuthService.isLoggedIn()) {
              $location.path('/login');
              $route.reload();
            }
          }
          catch (e) {
            // Error: Cannot read property 'restricted' of undefined, we see on homepage, unsure why next.access is undefined
          }
        });
    });
});