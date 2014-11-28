angular.module('CrowdNews')
  .controller('InvitationCtrl', function ($scope, $rootScope, $timeout, Invitation) {
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
  });