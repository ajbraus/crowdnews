'use strict';

angular.module('CrowdNews.services', [])
  .factory('Post', function ($resource, HOST) {
    return $resource(HOST + '/posts/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      filter: { url: HOST + '/filter/posts', method: 'GET', isArray: true }
    })
  })

  .factory('Invitation', function ($resource, HOST) {
    return $resource(HOST + '/invitations/:id', { id: '@id' })
  })

  .factory('Beat', function ($resource, HOST) {
    return $resource(HOST + '/beats/:id', { id: '@id' })
  })

  .factory('current_user', function (AuthService, User) {
    if (AuthService.isLoggedIn()) {
      var current_user = JSON.parse(localStorage.getItem("current_user"));
      User.get({ id: localStorage.getItem("crowdnews_auth_token") }, function(data) {
        localStorage.setItem('current_user', JSON.stringify(data));
        var current_user = data;
      });
      return current_user
    } else {
      return null
    }
  })

  .factory('User', function ($resource, HOST) {
    return $resource(HOST + '/users/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      sign_up: { url: HOST + '/users', method: 'POST', isArray: false },
      sign_in: { url: HOST + '/users/sign_in', method: 'POST', isArray: false },
      sign_out: { url: HOST + '/users/sign_out', method: 'POST', isArray: false }
    })
  })

  .factory('AuthService', function ($rootScope, User, HOST) {
    return {
      checkLogin: function() {
        // Check if logged in and fire events
        if(this.isLoggedIn()) {
          $rootScope.$broadcast('app.loggedIn'); 
          console.log("logged in")
        } else {
          $rootScope.$broadcast('app.loggedOut'); 
          console.log("logged out")
        }
      },
      isLoggedIn: function() {
        // Check auth token here from localStorage
        if (localStorage.getItem("crowdnews_auth_token") === null || localStorage.getItem("crowdnews_auth_token") === "undefined") {
          return false
        } else {
          return true
        };
      },
      logout: function(email, pass) {
       // Same thing, log out user
       $rootScope.$broadcast('app.loggedOut');
      }
    }
  });

