angular.module('CrowdNews')
  .controller('NewSubscriptionCtrl', function ($scope, $routeParams, Beat, Subscription) {
      $scope.beat = Beat.get({ id: $routeParams.beatId })
      $scope.subscription = {};
  })
