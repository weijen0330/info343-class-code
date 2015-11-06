
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        // creating reference to the Firebase
        var ref = new FireBase(firebaseUrl);
        //only last 1000 messages
        ref.limitToLast(1000);
        // synchornized array that talks to Firebase
        $scope.messages = $firebaseArray(ref);

        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            // $add --> add to array,  push to firebase and sunchronizes with the server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            $scope.body = null;
        };
    });
