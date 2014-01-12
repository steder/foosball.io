var FoosControllers = angular.module('FoosControllers', []);


FoosControllers.controller("LeaguesCtrl", ['$scope', function($scope) {
    $scope.leagues = [{id: 1, name: "Skinny Scrub"},
                      {id: 2, name: "Skinny Pro"}];
}]);


FoosControllers.controller("LeagueCtrl", ["$scope", function($scope) {
    $scope.league = {id: 1, name: "Skinny Scrub"};
    $scope.players = [{id: 10, name: "Dude"},
                      {id: 20, name: "Bro"}];
    $scope.games = [{id: 100, name: "Game 1"},
                    {id: 200, name: "Game 2"}];
}]);


FoosControllers.controller("NewLeagueCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.shortName = "";
    $scope.displayName = "";

    $scope.addLeague = function() {
        console.log("TODO: Create league '" + $scope.text + "' for real");
        console.log("TODO: investigate flash messages?");
        $location.path("/leagues/3");
    };
    $scope.validShortName = /^\w+$/;
    $scope.validDisplayName = /^[\w- ]+$/;
}]);
