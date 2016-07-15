'use strict';

/**
 * @ngdoc function
 * @name webversionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webversionApp
 */
angular.module('webversionApp')
  .controller('AboutCtrl', function ($scope,$http,$filter,$location,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.currentItem = null;
    var header= [];
    var j = 0;
    if(!$rootScope.user)
      $location.path('/main');
    var user = window.localStorage.user;
    if(!user)
      user = $rootScope.user;

    $http.get("http://52.66.64.197:3000/api/leads/cnamelist/"+user).then(function(response){
      $scope.data = response.data;
      $scope.$broadcast("gotdata",response.data);

      for(var i = 0; i < $scope.data.length ; i++)
      {
        if($scope.data[i]['condition'] == null)
          $scope.data[i]['condition'] == 'no data';
        j = 0;
        if($scope.data[i]['condition_type'] == null)
          $scope.data[i]['condition_type'] = "no data";
        if($scope.data[i]['condition_name'] == null)
          $scope.data[i]['condition_name'] = "no data";
        angular.forEach($scope.data[i],function(value,key){
          if(key == 'condition'){
            $scope.data[i].condition_type = value[0].type;
            $scope.data[i].condition_name = value[0].name;
          }
          if(key == 'created'){
            var d = new Date(value);
            $scope.data[i].created = $filter('date')(d, 'short');
          }

        });
        delete $scope.data[i].condition;
      }
  });
  $scope.createNew = function(){
    $location.path('/edit');
  }
  $scope.show = function(lead){
    $rootScope.currentItem = lead;
    $location.path('/view');
  };
});
