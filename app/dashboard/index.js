'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.dashboard', {
            url: '/',
            templateUrl: 'app/dashboard/index.html',
            controller: 'DashboardCtrl',
            resolve: {
                data: function($q, $http) {
                    return $q.all([
                        $http.get(SETTINGS.apiBase + '/users'),
                        $http.get(SETTINGS.apiBase + '/widgets')
                    ]).then(function(responses){
                        return responses;
                    });
                }
            }
        })
    }]);

    app.controller('DashboardCtrl', ['$rootScope', '$scope', '$http', 'data',  DashboardCtrl]);

    function DashboardCtrl($rootScope, $scope, $http, data) {
        $scope.users = data[0].data;
        $scope.widgets = data[1].data;
    };
}());
