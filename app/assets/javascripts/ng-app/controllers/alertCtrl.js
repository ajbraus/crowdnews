angular.module('CrowdNews')
  .controller('AlertCtrl', function ($scope, $rootScope, $timeout) {
    // $scope.alerts = [
    //   // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    //   { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    // ];
    $scope.$watch('alerts', function() {
      $timeout(function() { 
        $scope.closeAlerts();
      }, 5000)
    })
    $scope.closeAlerts = function() {
      $scope.alerts = [];
    };
  });