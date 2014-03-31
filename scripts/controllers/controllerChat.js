'use strict';
var chatApp = angular.module('chatApp', ['ngRoute']);

chatApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl : 'views/login.html',
        controller : 'LoginController'
    }).when ('/chat', {
        templateUrl : 'views/chat.html',
        controller : 'ChatController'
    }).otherwise({
        redirectTo : '/login'
    });
}]);

chatApp.factory('AuthService',function() {
    function auth(credentials) {
        return credentials.login === 'admin' && credentials.password === 'admin';
    }
    return {
        auth: auth
    };
});

chatApp.factory('UserService',function() {
    return {
        login : '',
        password : ''
    };
});

chatApp.controller('ChatController', function($scope,$location,UserService) {
    if (UserService.login == '') $location.path('login');
    $scope.login = UserService.login;
});

chatApp.controller('LoginController', function($scope,$location,AuthService,UserService) {
    $scope.credentials = {login : '', password : ''};
    
    $scope.login = function() {
        /*if (AuthService.auth($scope.credentials)) {
            $location.path('chat');
        }*/
        var form = document.querySelector('.login');
        form.querySelector('#login').classList.remove('inputError');
        //пустой логин
        if ($scope.credentials.login.replace(' ','').length == 0) {
            form.querySelector('#login').classList.add('inputError');
            return false;
        }
        UserService.login = $scope.credentials.login;
        UserService.password = $scope.credentials.password;
        $location.path('chat');
    };
});