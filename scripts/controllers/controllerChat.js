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
    if (UserService.login == '') {
        UserService.login = 'Oxutta';
        //$location.path('login');
    }
    $scope.login = UserService.login;
    
    $scope.allMessages = [
        {   from : 'my',
            text : '123'
        },
        {   from : 'friend',
            text : '1326546544',
            status : '',
            correctMessage : ''
        }, 
        {   from : 'friend',
            text : '5454654 dfg',
            status : '',
            correctMessage : ''
        },
        {   from : 'my',
            text : 'Fdg gfdg'
        }
    ];
    
    $scope.sendMessage = function() {
        var text = $scope.newMessage;
        if (text == undefined || text == '' || text.replace(' ','').length == 0) {
            document.querySelector('#new_message').classList.add('inputError');
            return false;
        }
        $scope.allMessages.push({
            from : 'my',
            text : text
        });
        $scope.newMessage = '';
    }
    
    $scope.typingMes = function(){
        document.querySelector('#new_message').classList.remove('inputError');
    }
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

chatApp.controller('messageController', function($scope) {
    $scope.this.showEditPanel = false;
    $scope.this.showEditedMes = false;

    $scope.check = function() {
        this.message.status = 'check';
        $scope.this.showEditPanel = false;
    }
    $scope.changeText = function() {
        this.message.correctMessage = this.message.text;
        console.log(this.message.text)
    }
    $scope.showEdit = function() {
        this.message.correctMessage = this.message.text;
        $scope.this.showEditPanel = !$scope.this.showEditPanel;
    }
    $scope.fix = function($event) {
        $scope.this.showEditPanel = false;
        if (this.message.correctMessage == this.message.text) {
            return false;
        }
        console.log(event.target.parentNode.parentNode.parentNode)
        event.target.parentNode.parentNode.parentNode.querySelector('.message_text').classList.add('editedMes');
        $scope.this.showEditedMes = true;
    }
});

chatApp.directive('focus', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focus);
      scope.$watch(model, function(value) {
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
  };
});