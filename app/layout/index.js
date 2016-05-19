'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout', {
            abstract: true,
            templateUrl: 'app/layout/index.html',
            controller: 'LayoutCtrl'
        })
    }]);

    app.controller('LayoutCtrl', ['$state', '$rootScope', '$scope', '$http', 'SETTINGS', LayoutCtrl]);

    function LayoutCtrl($state, $rootScope, $scope, $http, SETTINGS) {
    };
}());
