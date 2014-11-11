'use strict';

angular.module('services', [])
  .factory('Post', function ($resource, HOST) {
    return $resource(HOST + '/posts/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      filter: { url: HOST + '/filter/posts', method: 'GET', isArray: true }
    })
  })

  .factory('User', function ($resource, HOST) {
    return $resource(HOST + '/users/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      sign_up: { url: HOST + '/users', method: 'POST', isArray: false },
      sign_in: { url: HOST + '/users/sign_in', method: 'POST', isArray: false },
      sign_out: { url: HOST + '/users/sign_out', method: 'POST', isArray: false }
    })
  });

