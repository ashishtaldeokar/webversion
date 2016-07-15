'use strict';

/**
 * @ngdoc function
 * @name webversionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webversionApp
 */
angular.module('webversionApp')
  .controller('EditCtrl', function ($scope,$http,$location,$rootScope) {
    var req = {
      method: "POST",
      url : "http://52.66.64.197:3000/api/leads/"
    }
    $scope.user = $rootScope.user;
    $scope.editLead = $rootScope.currentItem;
    if($scope.editLead){
      req.method = "PUT";
      req.url = req.url+$scope.editLead._id;
    }
    $("#editForm").submit(function(){
      if($scope.editLead)
          $('#edit').modal('show');
      else {
        alert("Cant create totally empty field");
      }

    });
    $scope.push = function (){
      $scope.editLead.attendedBy = $scope.user;
      req.data = $scope.editLead;
      $('#edit').modal('hide');
      $('#stall').modal('show');
      $http(req).then(function(response){
        alert("Record added successfully");
        $('#stall').modal('hide');
      });
    };
    $('#stall').on('hidden.bs.modal', function () {
      $location.path('/about');
      $scope.$apply();
    });


  });
