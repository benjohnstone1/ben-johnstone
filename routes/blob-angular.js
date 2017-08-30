var app = angular.module('Testing', []);

 // get all todos
    app.get('/blobs', function(req, res) {

        // use mongoose to get all todos in the database
        Blob.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

/*app.controller('MainCtrl', [
    '$scope',
    function($scope) {



        $scope.test = 'Hello world!';

        $scope.posts = [
            { title: 'Post 1', upvotes: 5 },
            { title: 'Post 2', upvotes: 10 },
            { title: 'Post 3', upvotes: 12 },
            { title: 'Post 4', upvotes: 8 },
            { title: 'Post 5', upvotes: 17 },
        ];

        $scope.addPost = function() {
            if (!$scope.title || $scope.title === '') { return; }
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0
            });
            $scope.title = '';
            $scope.link = '';
        }

        $scope.upVote = function(post) {
            post.upvotes += 1;
        }
    }
]);*/

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/blobs')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}