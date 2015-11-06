
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com')
    .controller('ChatController', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth, firebaseUrl) {
        //create reference to the Firebase
        var rootRef = new Firebase(firebaseUrl);
        var auth = $firebaseAuth(rootRef);
        $scope.users = $firebaseObject(rootRef.child('users'));

        auth.$onAuth(function(authData) {
            if (authData) {
                $scope.users[authData.github.username] = authData.github;
                $scope.users.$save();

                $scope.user = authData.github;

                var messagesRef = rootRef.child('messages');
                messagesRef.limitToLast(1000);
                $scope.messages = $firebaseArray(messagesRef);
            }
            else {
                auth.$authWithOAuthRedirect('github')
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        });

        $scope.sendMessage = function() {
            //adds a new object to the array and synchronizes
            //with the server
            $scope.messages.$add({
                username: $scope.user.username,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            $scope.body = null;
        }; //sendMessage()

    });
