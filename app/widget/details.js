'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.widgetDetails', {
            url: '/widget/{widgetId:int}',
            templateUrl: 'app/widget/details.html',
            controller: 'WidgetDetailsCtrl',
            resolve: {
                data: function($stateParams, $q, $http) {
                    return $q.all([
                        $http.get(SETTINGS.apiBase + '/widgets/' + $stateParams.widgetId)
                    ]).then(function(responses){
                        return responses;
                    });
                }
            }
        })
    }]);

    app.controller('WidgetDetailsCtrl', ['$rootScope', '$scope', '$http', 'data',  WidgetDetailsCtrl]);

    function WidgetDetailsCtrl($rootScope, $scope, $http, data) {
        $scope.widget = data[0].data;
    };
}());
