'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.users', {
            url: '/users',
            templateUrl: 'app/user/index.html',
            controller: 'UsersCtrl',
            resolve: {
                data: function($q, $http) {
                    return $q.all([
                        $http.get(SETTINGS.apiBase + '/users'),
                    ]).then(function(responses){
                        return responses;
                    });
                }
            }
        })
    }]);

    app.controller('UsersCtrl', ['$rootScope', '$scope', '$http', 'data',  UsersCtrl]);

    function UsersCtrl($rootScope, $scope, $http, data) {
        $scope.users = data[0].data;
    };
}());
