angular
    .module('CrowdNews', ['ngRoute', 'ngSanitize', 'ngResource', 'templates', 'ngTagsInput', 'wysiwyg.module', 'colorpicker.module', 'CrowdNews.services', 'CrowdNews.interceptors', 'CrowdNews.directives', 'CrowdNews.filters'])
    
    // .constant('HOST', 'https://www.coride.co/api/v1') //PRODUCTION
    .constant('HOST', 'http://localhost:3000/api/v1') //DEV
    .run(function (AuthService, User) {
        AuthService.checkLogin();
    })
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
            .when('/new/story', {
                templateUrl: 'post-new.html',
                controller: 'NewPostCtrl'
            })
            .when('/journalists', {
                templateUrl: 'user-index.html',
                controller: 'UserIndexCtrl'
            })
            .when('/journalist/:userId', {
                templateUrl: 'user-details.html',
                controller: 'UserDetailsCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'user-dashboard.html',
                controller: 'UserDashboardCtrl'
            });
        $locationProvider.html5Mode(true);
    });