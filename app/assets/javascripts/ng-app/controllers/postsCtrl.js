angular.module('CrowdNews')
    .controller('PostIndexCtrl', function ($scope, Post, User, Beat, current_user) {
        var get_data = function() {
            $scope.current_user = current_user;
            $scope.top_posts = Post.query();
            $scope.trending_beats = Beat.query();
            $scope.trending_journalists = User.query({'kind':"trending_journalists"});
            $scope.trending_posts = Post.query();
        }
        $scope.$on('app.loggedIn', function (event, data) { get_data() });
        $scope.$on('app.loggedOut', function (event, data) { get_data() });
        get_data();
    })

    .controller('PostDetailsCtrl', function ($scope, $routeParams, Post, User, current_user) {
        $scope.current_user = current_user;
        $scope.post = Post.get({ id: $routeParams.postId });
        $scope.similar_posts = Post.query(); // Post.query({ post_id: $routeParams.postId });
        $scope.similar_journalists = User.query(); // User.query({ post_id: $routeParams.postId });
    })

    .controller('NewPostCtrl', function ($scope, $location, Post, current_user) {
        $scope.alerts = [];
        $scope.post = {}
        $scope.publish = false
        $scope.customMenu = [
                [ 'quote', 'link'],
                ['indent', 'outdent'],
                ['bold', 'italic', 'underline','subscript', 'superscript'], 
                ['ordered-list', 'unordered-list'],
                ['remove-format']
            ];
        $scope.createPost = function() {
            if ($scope.publish) {
              $scope.post.published_at = new Date();
            }
            Post.save({}, $scope.post,
                function (data) {
                    $location.path('/');
                    var message = 'Story Saved successfully!'
                    console.log(message);
                    $scope.alerts = [];
                    $scope.alerts.push({type: "success", msg: message});
                },
                function (data) {
                    console.log(data)
                    var message = 'There was a problem posting your Coride. Please try again.'
                    console.log(message);
                    $scope.alerts.push({type: "danger", msg: message});
                })
        }
    })

    .controller('PostDetailsCtrl', function ($scope, $routeParams, Post, User, current_user) {
        $scope.current_user = current_user;
        $scope.post = Post.get({ id: $routeParams.postId });
        $scope.similar_posts = Post.query(); // Post.query({ post_id: $routeParams.postId });
        $scope.similar_journalists = User.query(); // User.query({ post_id: $routeParams.postId });
    });