angular
    .module('CrowdNews', ['ngRoute', 'ngResource', 'templates', 'CrowdNews.services'])
    
    // .constant('HOST', 'https://www.coride.co/api/v1') //PRODUCTION
    .constant('HOST', 'http://localhost:3000/api/v1') //DEV

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'post-index.html',
                controller: 'PostIndexCtrl'
            })
            .when('/story/:postId', {
                templateUrl: 'post-details.html',
                controller: 'PostDetailsCtrl'
            })
            .when('/journalists', {
                templateUrl: 'user-index.html',
                controller: 'UserIndexCtrl'
            })
            .when('/user/:userId', {
                templateUrl: 'user-details.html',
                controller: 'UserDetailsCtrl'
            });
        $locationProvider.html5Mode(true);
    });