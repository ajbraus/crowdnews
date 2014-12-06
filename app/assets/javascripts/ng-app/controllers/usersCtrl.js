angular.module('CrowdNews')
    .controller('UserDetailsCtrl', function ($scope, $routeParams, User) {
        $scope.user = User.get({id: $routeParams.userId })
    })

    .controller('UserIndexCtrl', function ($scope, User) {
        $scope.users = User.query();
    })

    .controller('NewJournalistCtrl', function ($scope, User) {
     
      $scope.newRequest = function() {
        $scope.current_user.requested_at = +new Date;
        User.update({}, $scope.current_user,
          function(data) {
            console.log("Journalist Request Submitted");
          },
          function(data) {
            console.log("There was a Problem Submitting Your Journalist Request");
          }
        );
      }
    })

    .controller('UserDashboardCtrl', function ($rootScope, $scope, User) {
      $scope.updateAccount = function() {
        User.update({}, $rootScope.current_user, 
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