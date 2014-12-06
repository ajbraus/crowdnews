angular
    .module('CrowdNews', ['ngRoute', 'ngSanitize', 'ngResource', 'templates', 'videosharing-embed', 'ngTagsInput', 'wysiwyg.module', 'colorpicker.module', 'CrowdNews.services', 'CrowdNews.interceptors', 'CrowdNews.directives', 'CrowdNews.filters'])
    
    // .constant('HOST', 'https://www.gonzzzo.com/api/v1') //PRODUCTION
    .constant('HOST', 'http://localhost:3000/api/v1') //DEV

    .run(function (AuthService, User) {
        AuthService.checkLogin();
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'splash-page.html',
                controller: 'InvitationCtrl'
            })
            .when('/stories', {
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
            .when('/admin', {
                templateUrl: 'admin.html',
                controller: 'AdminCtrl'
            })
            .when('/tag/:tagName', {
                templateUrl: 'tag-detail.html',
                controller: 'TagDetailsCtrl'
            })
            .when('/journalists', {
                templateUrl: 'user-index.html',
                controller: 'UserIndexCtrl'
            })
            .when('/new/journalist', {
                templateUrl: 'user-journalist-request.html',
                controller: 'NewJournalistCtrl'
            })
            .when('/journalist/:userId', {
                templateUrl: 'user-details.html',
                controller: 'UserDetailsCtrl'
            })
            .when('/beat/:beatId', {
                templateUrl: 'beat-details.html',
                controller: 'BeatDetailsCtrl'
            })
            .when('/new/beat', {
                templateUrl: 'beat-new.html',
                controller: 'NewBeatCtrl'
            })
            .when('/beat/:beatId/subscribe', {
                templateUrl: 'subscription-new.html',
                controller: 'NewSubscriptionCtrl'
            });
        $locationProvider.html5Mode(true);
    });