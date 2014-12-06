angular.module('CrowdNews')
  .controller('BeatDetailsCtrl', function ($scope, $routeParams, Beat) {
    Beat.get({ id: $routeParams.beatId }, function (data) {
      $scope.beat = data
    })
  })

  .controller('NewBeatCtrl', function ($scope, $location, Beat) {
    $scope.beat = {};
    $scope.createBeat = function() {
      Beat.save({}, $scope.beat, 
        function (data) {
          $location.path('/beat/' + data.beat_id)
        },
        function (data) {

        }
      );
    };
  });