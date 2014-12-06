angular.module('CrowdNews')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, User, Alert) {
    if (localStorage.getItem("current_user")) {
      $scope.current_user = JSON.parse(localStorage.getItem("current_user"));      
    } 
    if (localStorage.getItem("crowdnews_auth_token")) {
      User.get({ id: localStorage.getItem("crowdnews_auth_token") }, function(data) {
        localStorage.setItem('current_user', JSON.stringify(data));
        $scope.current_user = data;
        $rootScope.unread_messages_count = data.unread_messages_count;
      });
    }

    $rootScope.$on('app.loggedIn', function() {
      console.log("blah")
      User.get({ id: localStorage.getItem("crowdnews_auth_token") }, function(data) {
        localStorage.setItem('current_user', JSON.stringify(data));
        $rootScope.current_user = data;
      });
    });

    $scope.logout = function() {
      User.sign_out(function(data) {
        $rootScope.current_user = null;
        window.localStorage.clear();
        $rootScope.$broadcast('app.loggedOut'); 
        $location.path('/');
        var message = "Successfully Logged Out"
        Alert.add('success', message, 5000);
      }, function(data) {
        var message = "There was a problem logging out."
        Alert.add('danger', message, 5000);
      })
    }
  })
  .controller('LoginCtrl', function ($scope, User, AuthService) {
    $scope.session = {
      'remember_me': true
    };

    $scope.login = function() {
      User.sign_in({}, {"user": $scope.session},
        function (data) {
          localStorage.setItem("crowdnews_auth_token", data.auth_token);
          AuthService.checkLogin();
          $('#loginModal').modal('hide')
        },
        function (data) {
          var message = "Invalid Email or Password"
          console.log(message);
          AuthService.checkLogin();
        }
      );
    };
  })
  .controller('SignUpCtrl', function ($scope, User, AuthService) {
    $scope.registration = {
      'remember_me': true
    };
    $scope.signUp = function() {
      User.sign_up({}, {'user': $scope.registration}, 
        function (data) {
          localStorage.setItem("crowdnews_auth_token", data.auth_token);
          console.log("Sign up Successful")
          AuthService.checkLogin();
          $('#signUpModal').modal('hide')
        }, 
        function (data) {
          var message = "";
          angular.forEach(data.data.error, function(value, key){
             message += key + ' ' + value[0] + "\n";
          });
          console.log(message);
          AuthService.checkLogin();
        }
      );
    };
  });