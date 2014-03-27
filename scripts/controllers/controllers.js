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
    
    $scope.deleteContact = function(item) {
        for (var i in $scope.phones) {
            if ($scope.phones[i] === item) {
                $scope.phones.splice(i,1);
                break;
            }
        }
    }
    
    $scope.toSpam = function(item) {
        for (var i in $scope.phones) {
            if ($scope.phones[i] === item) {
                $scope.phones[i].group = 'spam';
                break;
            }
        }
    }
    $scope.notSpam = function(item) {
        for (var i in $scope.phones) {
            if ($scope.phones[i] === item) {
                $scope.phones[i].group = '';
                break;
            }
        }
    }
    
    
});

function phonesEditController($scope) {
    $scope.enableEdit = false;
    
    $scope.editContact = function() {
        $scope.enableEdit = true;
        this.fname = this.phone.name;
        this.fsurname = this.phone.surname;
        this.fnumber = this.phone.number;
        this.fgroup = this.phone.group;
    }
    $scope.saveContact = function() {
        if (this.fname == '' || this.fnumber == '') {
            //this.querySelector('.fname').classList.add('inputError');
            return false;
        }
        this.phone.name = this.fname;
        this.phone.surname = this.fsurname;
        this.phone.number = this.fnumber;
        this.phone.group = this.fgroup;
        
        $scope.enableEdit = false;
    }
    $scope.cancelContact = function() {
        $scope.enableEdit = false;
    }
}
