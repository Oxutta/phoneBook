'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope,$http,$timeout) {
    
    function getData() {
        $http.post('/db/getPhones.php').success(function(data) {
            console.log(data)
            $scope.phones = data;
            //$scope.timer();
        });
    }
    $scope.timer = function() {
        $timeout(function(){
            getData();
        },5000);
    }
    getData();
  /*$scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];*/
});
