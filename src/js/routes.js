'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider'
    , function ($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('dashboard', {
            url: '/'
            , templateUrl: 'templates/dashboard.html'
            , controller: 'DashboardController'
            , controllerAs: 'vm'
        })
    }
]);