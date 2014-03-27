'use strict';

/* App Module */

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
      }).
      when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
app.factory('AuthService',function() {
    function auth(credentials) {
        return credentials.login === 'admin' && credentials.password === 'admin';
    }
    return {
        auth: auth
    };
});
app.controller('LoginController',function($location, $scope, AuthService) {
    $scope.credentials = {login : '', password : ''};
    
    $scope.login = function() {
        if (AuthService.auth($scope.credentials)) {
            $location.path('home');
        }
    };
});  
app.controller('HomeController',['$location', '$scope', function(loc, scope) {
    scope.logout = function() {
        loc.path('login');
    };
}]);

app.directive('copyright', function() {
    return {
        restrict: 'AE',
        template: '(c) 2013 BARS Level Up'
    };
});

