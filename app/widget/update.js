'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.widgetUpdate', {
            url: '/widget/{widgetId:int}/edit',
            templateUrl: 'app/widget/update.html',
            controller: 'WidgetUpdateCtrl',
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

    app.controller('WidgetUpdateCtrl', ['$rootScope', '$scope', '$http', 'data', 'SETTINGS', WidgetUpdateCtrl]);

    function WidgetUpdateCtrl($rootScope, $scope, $http, data, SETTINGS) {
        $scope.widget = data[0].data;

        $scope.save = function() {
            var data = {
                    name: $scope.widget.name,
                    color: $scope.widget.color,
                    inventory: parseFloat($scope.widget.inventory),
                    melts: $scope.widget.melts || false,
                    price: parseFloat($scope.widget.price)
            };

            $http.put(SETTINGS.apiBase + '/widgets/' + $scope.widget.id, data).then(function(response) {
                alert('Updated!');
            });
        };
    };
}());
