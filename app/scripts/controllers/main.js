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
    var ref = new Firebase('https://radiant-fire-9056.firebaseio.com/');

    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    var syncObject = sync.$asObject();
    syncObject.$bindTo($scope, 'schedule');


    $scope.temp = function (schedule, tempId) {
      return _.findWhere(schedule.temperatures, {id: tempId}).degree;
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
      $scope.schedule.times.push(newTime);
    };

    $scope.removeTime = function (time) {
      _.pull($scope.schedule.times, time);
    };
  });
