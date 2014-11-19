angular.module('CrowdNews')
    .controller('UserDetailsCtrl', function ($scope, $routeParams, User, current_user) {
        $scope.current_user = current_user;
        $scope.user = User.get({id: $routeParams.userId })
    })

    .controller('UserIndexCtrl', function ($scope, User, current_user) {
        $scope.current_user = current_user;
        $scope.users = User.query();
    })

    .controller('UserDashboardCtrl', function ($scope, User, current_user) {
      $scope.current_user = current_user;

      $scope.updateAccount = function() {
        User.update({}, $scope.current_user, 
          function (data) {
            var message = 'Updated Account Successfully'
            console.log(message);
            $scope.alerts.push({type: "success", msg: message});
          },
          function (data) {
            var message = 'There was a problem posting your Coride. Please try again.'
            console.log(message);
            $scope.alerts.push({type: "danger", msg: message});
          }
        );
      }
    });