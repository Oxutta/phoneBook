'use strict';

/* Controllers */

var phoneBookApp = angular.module('phoneBook', []);

phoneBookApp.controller('PhoneBookCtrl', function($scope) {
    $scope.phones = [
    {   name: "Дмитрий",
		surname: "Медведев",
        number:'+7(945)777-3298',
		group:'home'
	}, 
    {   name: "Ахрик",
		surname: "Рустамов",
		number:'+7(945)754-2391',
		group:'work'
	}, 
    {   name: "Мамуля",
        number:'+7(876)456-2456',
		group:'home'
	}, 
    {   name: "Вероника",
		surname: "Гильмутдинова",
        number:'+7(234)789-1234',
		group:'friends'
	}, 
    {   name: 'Elsa',
        surname: "Richup",
        number:'+7(765)546-2456',
		group:'spam'
	}, 
    {   name: 'Nikita',
		number:'235-7856',
		group:'spam'
    }];
    $scope.groups = ['home','work','friends','spam'];
    $scope.showAdd = false;
    
    $scope.addContact = function() {
        var form = document.querySelector('.addContact');
        if (!$scope.fname || !$scope.fnumber) {
            if (!$scope.fname) form.querySelector('.fname').classList.add('inputError');
            if (!$scope.fnumber) form.querySelector('.fnumber').classList.add('inputError');
            return false;
        }
        form.querySelector('.fname').classList.remove('inputError');
        form.querySelector('.fnumber').classList.remove('inputError');
        
        $scope.phones.push({
            name : $scope.fname,
            surname : $scope.fsurname,
            number : $scope.fnumber,
            group : $scope.fgroup
        });
        $scope.fname = '';$scope.fsurname = ''; $scope.fnumber = ''; $scope.fgroup = '';
    
        $scope.showAdd = false;
    }
});
