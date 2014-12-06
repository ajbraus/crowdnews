angular.module('CrowdNews')
  .controller('AdminCtrl', function ($scope, $rootScope, User) {
    $scope.journalists = User.query();

    $scope.judge = function(bool, journalist_id) {
      $scope.user = {
        'id': journalist_id
      }
      
      if (bool) {
        $scope.user.accepted_at = +new Date 
      } else {
        $scope.user.rejected_at = +new Date
      }

      User.update({}, $scope.user,
        function(data) {
          // mark journalist as accepted
        },
        function(data) {

        }
      );
    };
  });