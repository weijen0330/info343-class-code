/*
    script for the index.html file
*/

Parse.initialize("aVxOTATXVMK1mzTEeFCJvafjMs35yuZsjVoVjBYc", "4coxrujsx2qb6oM7tvFgPkhwmVVDmBlxCkrKFfG9");

$(function() {
    'use strict';

    // new Task class for pase
    var  Task = Parse.Object.extend('Task');

    // Query is making us a new Parse Query object.
    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);

    // Data and time this was created. Sorting based on that
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    // reference to the task list element
    var tasksList = $('#tasks-list');

    // reference to the error message alert
    var errorMessage = $('#error-message');

    //current set of tasks
    var tasks = [];

    // reference to our rating element
    var ratingElem = $('#rating');

    // .text shows plain texts --> stops script encryption attacks with .html or innerHTML
    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();

    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }


    // .find() is asynchronous --> promise --> then()
    // the second parameter in then is what to do when there is an error
    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            var li = $(document.createElement('li'))
                .text(task.get("title"))
                // similar to if ? what should happen :(else) what should happen
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(tasksList)
                .click(function() {
                    task.set('done', !task.get('done'));
                    task.save().then(renderTasks, displayError);
            });
            // span and div mean nothing. span is inline and div is block
            $(document.createElement('span'))
                // **********          this means that if the first part is undefined, js will think of it as "false"
                // **********          and use what comes after the || (or) as the default
                .raty({readOnly: true, score: (task.get('rating') || 0), hints : ['crap', 'awful', 'ok', 'nice', 'awesome']})
                .appendTo(li);
        });
    }

    //when the user submits the new task form...
    $('#new-task-form').submit(function(evt) {
       // asks the browser to not post the form on website
       // return false is needed ALWAYS by some browsers
        evt.preventDefault();
        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));
        task.save().then(fetchTasks, displayError).then(function() {
            // clears out title once the task is saved
            titleInput.val('');
            ratingElem.raty('set', {});
        });
        return false;
    });

    fetchTasks();
    ratingElem.raty();

    // window: global object like document and navigator. Sets a timer
    window.setInterval(fetchTasks, 3000);
});
