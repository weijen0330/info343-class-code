/* Test script for the Tasks List app */

//describe() creates a new set of test cases
//you can also include a describe() inside another
//describe if you want to create a subset of related tests
describe('the tasks app', function() {
    //this callback function is just a normal JavaScript
    //function, so you can create variables and custom
    //functions to make your tests easier to write

    //create some variables that reference elements in the page
    //element() is used to create an element reference
    //element() takes a 'locator' and you can create locators
    //using the `by` object
    //see https://angular.github.io/protractor/#/api?view=ProtractorBy
    //and https://angular.github.io/protractor/#/api?view=ElementFinder.prototype.$
    //for details
    var taskTitleInp = element(by.model('newTask.title'));
    var addTaskBtn = element(by.buttonText('Add Task'));
    //element.all() gets a reference to set of elements
    var tasksList = element.all(by.repeater('task in tasks'));
    var requiredMsg = $('.title-required-error');

    function addTask(title) {
        //sendKeys literally types text into an input
        taskTitleInp.sendKeys(title);
        
        //the .click() method clicks the button 
        //just like a user would
        addTaskBtn.click();
    }

    function addMultipleTasks(num) {
        var idx;
        for (idx = 0; idx < num; ++idx) {
            addTask('Task ' + idx);
        }
    }

    //the function passed to beforeEach()
    //will execute before each test
    beforeEach(function() {
        //reload the page so we start the test fresh
        browser.get('http://localhost:8000/');
    });

    //each test is defined using the it() function
    //the callback function passed as the second param
    //creates an execution context for the test
    it('must have the proper page title', function() {
        //the expect() and related functions are defined
        //by the Jasmine library
        //see http://jasmine.github.io/2.3/introduction.html
        //for details
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must add a task hitting enter', function() {
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);
        taskTitleInp.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleared');
        //this is how you get the current value in an input control
        //use getAttribute('value')
        //don't try getText() because it won't work as expected
        expect(taskTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function() {
        var num = 20;
        addMultipleTasks(num);
        expect(tasksList.count()).toEqual(num);
    });

    it('must show required validation error', function() {
        //use isPresent() to test if an element that has an
        //ng-if is in the DOM or not
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys('abc');
        //use .clear() to clear an input
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it('must disable add task button with blank title', function() {
        //use getAttribute('disabled') to test whether a button
        //is currently disabled
        //note that the value will be 'true' (as a string) if the
        //button is disabled, or null if the button is enabled
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        taskTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toBe(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('     ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');        
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        //when testing for style classes, use toContain()
        //instead of toEqual(), as there may be multiple
        //style classes added to the element
        expect(tasksList.get(0).getAttribute('class'))
            .toContain('completed-task');
        expect(tasksList.get(1).getAttribute('class'))
            .not.toContain('completed-task');
    });

    it('must purge completed tasks', function() {
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });


});
