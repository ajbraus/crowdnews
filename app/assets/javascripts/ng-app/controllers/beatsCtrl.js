angular.module('CrowdNews')
  .controller('BeatDetailsCtrl', function ($scope, $routeParams, Beat, current_user) {
    $scope.current_user = current_user;

    Beat.get({ id: $routeParams.beatId }, function (data) {
      $scope.beat = data
    })
  })

  .controller('NewBeatCtrl', function ($scope, $location, Beat, current_user) {
    $scope.current_user = current_user;
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