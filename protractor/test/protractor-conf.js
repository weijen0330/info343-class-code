//in general you should leave this file as is,
//but you might need to adjust rootElement if
//you put your ng-app attribute on an element
//other than <body>
//the rootElement property should set to a
//CSS selector that selects the particular
//element where you added the ng-app attribute
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'],
    rootElement: 'body'
};
