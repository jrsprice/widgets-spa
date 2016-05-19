'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.widgets', {
            url: '/widgets',
            templateUrl: 'app/widget/index.html',
            controller: 'WidgetsCtrl',
            resolve: {
                data: function($q, $http) {
                    return $q.all([
                        $http.get(SETTINGS.apiBase + '/widgets')
                    ]).then(function(responses){
                        return responses;
                    });
                }
            }
        })
    }]);

    app.controller('WidgetsCtrl', ['$rootScope', '$scope', '$http', 'data',  WidgetsCtrl]);

    function WidgetsCtrl($rootScope, $scope, $http, data) {
        $scope.widgets = data[0].data;
    };
}());
