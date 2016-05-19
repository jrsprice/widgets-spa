'use strict';

var settings = {
    apiBase: 'http://spa.tglrw.com:4000'
};

var app = angular.module('widgets.spa', ['ui.router']);
(function(){
    app.constant('SETTINGS', settings);
    app.config(['$locationProvider', '$urlRouterProvider', '$httpProvider', 'SETTINGS', appConfig]);
    function appConfig($locationProvider, $urlRouterProvider, $httpProvider, SETTINGS) {
        $locationProvider.html5Mode(true);
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector){
            return {
                'response': function(response) {
                    return response;
                },
                'responseError': function(rejection) {
                    // Add global err handler
                    return $q.reject(rejection);
                }
            };
        }]);
    }

    app.run(['$state', '$rootScope', 'SETTINGS', appRun]);
    function appRun($state, $rootScope, SETTINGS) {
        $rootScope.copyYear = new Date().getFullYear();
        $rootScope.title = 'Widget Factory!';
        $state.go('layout.dashboard');
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, rejection) {
            $rootScope.loading = false;
            // if (rejection.status === 401) {
            //     // $state.go('error');
            // }
        });
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            $rootScope.loading = true;
        });
        $rootScope.$on('$stateChangeSuccess', function() {
            $rootScope.loading = false;
        });
    }

    // @todo move to filters.js
    app.filter('capitalize', function() {
        return function(input) {
          return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });
}());
