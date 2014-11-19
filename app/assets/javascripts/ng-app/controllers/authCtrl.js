angular.module('CrowdNews')
    .controller('NavbarCtrl', function ($rootScope, $location, $scope, User, current_user) {
      $scope.current_user = current_user
      $scope.logout = function() {
        window.localStorage.clear();
        $rootScope.$broadcast('app.loggedOut'); 
      }
      $scope.newRequest = function() {
        $scope.current_user.requested_at = +new Date;
        User.update({}, $scope.user,
          function(data) {
            console.log("Journalist Request Submitted");
          },
          function(data) {
            console.log("There was a Problem Submitting Your Journalist Request");
          }
        );
      }
    })
    .controller('LoginCtrl', function ($scope, User, AuthService, current_user) {
      $scope.session = {
        'remember_me': true
      };

      $scope.login = function() {
        User.sign_in({}, {"user": $scope.session},
          function (data) {
            localStorage.setItem("crowdnews_auth_token", data.auth_token);
            AuthService.checkLogin();
            $scope.current_user = current_user;
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