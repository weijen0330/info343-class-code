/* 
    script for the tasks.html file

    TWO-WAY DATA BINDING
*/

angular.module('Tasks', [])
    // all controllers can use this variable
    .constant('tasksKey', 'tasks')
    .controller('TasksController', function($scope, tasksKey) {
        console.log("controllerloaded");
        // initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];
        // initialize newTask to an empty object
        $scope.newTask = {};

        function saveTasks() {
            // toJSON --> convert  data to JSON
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }
        // in javascript, object is a map. Key is the variable name and function is the value.
        // Function in js is an object type. Add a function to add newTask to the array
        // Anything added to $scope, the view can access it!
        $scope.addTask = function() {
            // push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            saveTasks();
            //reset newTask to an empty array
            $scope.newTask = {};
        };

        //function to toggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });