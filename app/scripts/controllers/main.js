'use strict';

/**
 * @ngdoc function
 * @name firebaseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseTestApp
 */
angular.module('firebaseTestApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    var temperatures = $firebase(new Firebase('https://radiant-fire-9056.firebaseio.com/temperatures'));
    $scope.temperatures = temperatures.$asArray();

    var times = $firebase(new Firebase('https://radiant-fire-9056.firebaseio.com/times'));
    $scope.times = times.$asArray();

    $scope.temp = function (temperatures, tempId) {
      return _.findWhere(temperatures, {id: tempId}).degree;
    };


    $scope.newTime = {
      start: '18:00',
      end: '22:00'
    };
    $scope.addTime = function (newTimeData) {
      var newTime = {
        start: newTimeData.start,
        end: newTimeData.end,
        temperatureId: newTimeData.tempId
      };
      $scope.times.$add(newTime);
    };

    $scope.removeTime = function (time) {
      $scope.times.$remove(time);
    };
  });
