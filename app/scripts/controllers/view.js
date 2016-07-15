'use strict';

/**
 * @ngdoc function
 * @name webversionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webversionApp
 */
angular.module('webversionApp')
  .controller('ViewCtrl', function ($scope,$http,$location,$rootScope) {
    $scope.user = $rootScope.user;
    $scope.item = $rootScope.currentItem;
    $scope.delete = function(lead){
      $('#delete').modal('show');
    };
    $scope.edit = function(){
      $location.path('/edit');
    };
    $scope.sureDelete = function () {
      var req = {
        method: 'DELETE',
        url: 'http://52.66.64.197:3000/api/leads/'+$scope.item._id,
      }
      $('#delete').modal('hide');
      $('#stallView').modal('show');
      $http(req).then(function(response){
        $('#stallView').modal('hide');
        if(response.data)
          alert("Record deleted successfully!");
      });
    };
    $('#stallView').on('hidden.bs.modal', function () {
      $location.path('/about');
      $scope.$apply();
    });
  });
