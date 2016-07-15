'use strict';

/**
 * @ngdoc function
 * @name webversionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webversionApp
 */
angular.module('webversionApp')
  .controller('MainCtrl', function ($scope,$http,$location,$rootScope) {
  $rootScope.logout  = function(){
    $rootScope.user = null;
    window.localStorage.removeItem('user');
    $location.path('/');
  };
    var user = window.localStorage.user;
    if(user){
      $rootScope.user = user;
      $location.path('/about');
    }
    $('#form')
      .submit(function(e) {
        $scope.login($('#user').val(),$('#pass').val());
      });
    $scope.login = function(user,pass){
      var req = {
        method: 'POST',
        url: 'http://52.66.64.197:3000/api/logins/check',
        data: {
          "username" : user,
          "password" : pass
        }
      }
      $http(req).then(function(response){
        if(response.data.status){
          if($scope.remember){
            window.localStorage.user = user;
            window.localStorage.pass = pass;
          }
          $rootScope.user = user;
          $location.path('/about');
        }
        else{
          alert("Login Failed, Try again");
        }
      });
    }
  });
