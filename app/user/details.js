'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.userDetails', {
            url: '/user/{userId:int}',
            templateUrl: 'app/user/details.html',
            controller: 'UserDetailsCtrl',
            resolve: {
                data: function($stateParams, $q, $http) {
                    return $q.all([
                        $http.get(SETTINGS.apiBase + '/users/' + $stateParams.userId)
                    ]).then(function(responses){
                        return responses;
                    });
                }
            }
        })
    }]);

    app.controller('UserDetailsCtrl', ['$rootScope', '$scope', '$http', 'data',  UserDetailsCtrl]);

    function UserDetailsCtrl($rootScope, $scope, $http, data) {
        $scope.user = data[0].data;
    };
}());
