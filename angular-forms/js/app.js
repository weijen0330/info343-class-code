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
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return [{
            id: 'default-delete-me',
            fname: 'Andy',
            lname: 'Dwyer',
            phone: '206-555-1212',
            dob: '1/1/1900'
        }];
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
    /* sets contacts variable to water the factory function returns */
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
                                                  $state, contacts) {
        var existingContact = contacts.find(function(contact) {
           return contact.id === $stateParams.id;
        });
        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            /* source, destination */
            angular.copy($scope.contact, existingContact);
            $state.go('list');
        }
    });
