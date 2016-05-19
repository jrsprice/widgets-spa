'use strict';
(function(){
    app.config(['$stateProvider', 'SETTINGS', function($stateProvider, SETTINGS){
        $stateProvider.state('layout.widgetCreate', {
            url: '/widget/create',
            templateUrl: 'app/widget/create.html',
            controller: 'WidgetCreateCtrl'
        })
    }]);

    app.controller('WidgetCreateCtrl', ['$rootScope', '$scope', '$http', '$state', 'SETTINGS', WidgetCreateCtrl]);

    function WidgetCreateCtrl($rootScope, $scope, $http, $state, SETTINGS) {
        $scope.widget = {};

        $scope.save = function() {
            var data = {
                    name: $scope.widget.name,
                    color: $scope.widget.color,
                    inventory: parseFloat($scope.widget.inventory),
                    melts: $scope.widget.melts || false,
                    price: parseFloat($scope.widget.price)
            };

            $http.post(SETTINGS.apiBase + '/widgets', data).then(function(response) {
                alert(response.data);
            });
        };
    };
}());
