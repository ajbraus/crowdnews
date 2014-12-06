angular.module('CrowdNews')
  .controller('InvitationCtrl', function ($scope, $rootScope, $location, $timeout, Invitation, AuthService) {
    $scope.splash = true;
    $scope.alerts = [];
    $scope.invitation = {};
    $scope.createInvitation = function() {
      console.log($scope.invitation)
      Invitation.save({}, {"invitation": $scope.invitation},
        function (data){
          console.log(data)
          $scope.alerts.push({type: "success", msg: "Request sent."});
        },
        function (data) {
          console.log(data) 
          $scope.alerts.push({type: "danger", msg: "There was a problem. Reqeuest not sent."});
        }
      );
    }

    $rootScope.$on('app.loggedIn', function() {
      console.log('blah')
      $location.path('/stories');
    })
  });