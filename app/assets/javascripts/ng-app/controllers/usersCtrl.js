angular.module('CrowdNews')
    .controller('UserDetailsCtrl', function ($scope) {
        $scope.user = {
           'id': 100,
           'name':'Adam Braus',
           'pic_url': 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
           'backers_count': 25,
           'bio': 'I am awesome',
           'earnings_range':'$25-199',
           'tags': [
              {'id': 1, 'name': 'Wealth Inequality'},
              {'id': 2, 'name': 'Prison Reform'},
              {'id': 3, 'name': 'Enviornmental Issues'},
              {'id': 4, 'name': 'USA'}
           ],
           'posts': [
              {'id':1,
               'title':"Awesome Sauce",
               'subtitle':"because I says so",
               'pic_url': 'http://upload.wikimedia.org/wikipedia/commons/3/31/NTS_-_BEEF_-_WATUSI.jpg',
               'published_at': "3:33pm Tuesday Nov 15th 2014",
               'body':"lorem ipsum"}
           ]
        }
    })
    .controller('UserIndexCtrl', function ($scope) {
        $scope.users = [
          {'id': 100,
           'name':'Adam Braus',
           'pic_url': 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
           'backers_count': 25,
           'bio': 'I am awesome',
           'earnings_range':'$25-199',
           'tags': [
              {'id': 1, 'name': 'Wealth Inequality'},
              {'id': 2, 'name': 'Prison Reform'},
              {'id': 3, 'name': 'Enviornmental Issues'},
              {'id': 4, 'name': 'USA'}
           ],
           'recent_post': {'id':1,
               'title':"Awesome Sauce",
               'subtitle':"because I says so",
               'pic_url': 'http://upload.wikimedia.org/wikipedia/commons/3/31/NTS_-_BEEF_-_WATUSI.jpg',
               'published_at': "3:33pm Tuesday Nov 15th 2014",
               'body':"lorem ipsum"}
          }
        ]
    });