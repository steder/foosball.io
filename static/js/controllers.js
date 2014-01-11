var FoosControllers = angular.module('FoosControllers', []);

FoosControllers.controller("LeaguesCtrl", ['$scope', function($scope) {
    $scope.leagues = [{id: 1, name: "Skinny Scrub"},
                      {id: 2, name: "Skinny Pro"}];
}]);
