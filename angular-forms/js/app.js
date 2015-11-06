/*
   The view is the HTML file

   {{name.toLowerCase()}} <-- any js works!

   for total price: call a function that calculates the total price for you

    uuid --> universally unique id, use computer MAC address in the algorithm

    factory: fetch data for multiple controllers. The function only executes once
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    /* storageKey same as the constant */
    .factory('contacts', function(localStorageService, storageKey) {
        return localStorageService.get(storageKey) || [];
    })
    /* called once when module is loaded */
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                /* local url */
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'

            })
            /* first parameter is the name of the state */
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });
        /* resetting if someone put in a bad url */
        $urlRouterProvider.otherwise('/contacts');

    })
    // register a directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                // modelValue = what the user has put into the input box
                controller.$validators.inThePast = function(modelValue) {
                   var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    /* sets contacts variable to hatever the factory function returns */
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams,
                                                    $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
        /* id matches in state('detail') */
            return contact.id === $stateParams.id;
       });
    })
    .controller('EditContactController', function($scope, $stateParams,
                                                  $state, uuid, localStorageService,
                                                  storageKey, contacts) {
        var existingContact = contacts.find(function(contact) {
           return contact.id === $stateParams.id;
        });
        $scope.contact = angular.copy(existingContact);

        $scope.saveContact = function() {
            /* source, destination */
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                // unique id for contact
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }
            localStroageService.set(stroageKey, contacts);
            $state.go('list');
        }
    });
