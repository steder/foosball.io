var FoosControllers = angular.module('FoosControllers', []);


var LEAGUE_FIXTURES = [
    {id: 1,
     name: "Skinny Scrub",
     player_ids: [10, 20],
     game_ids: [100, 200]
    },
    {id: 2,
     name: "Skinny Pro",
     game_ids: [],
     player_ids: []
    }
];


var PLAYER_FIXTURES = [
    {id: 10, name: "Dude"},
    {id: 20, name: "Bro"}
]


var GAME_FIXTURES = [
    {id: 100, name: "Game 1"},
    {id: 200, name: "Game 2"}
];



FoosControllers.controller("LeaguesCtrl", ['$scope', function($scope) {
    $scope.leagues = LEAGUE_FIXTURES;
}]);


FoosControllers.controller("LeagueCtrl", ["$scope", "$route", "$location", function($scope, $route, $location) {
    console.log($route.current.params);
    console.log($route.current.params.league_id);
    var league_id = parseInt($route.current.params.league_id);
    console.log("league_id: " + league_id);
    var league = undefined;

    for (var league_idx = 0; league_idx < LEAGUE_FIXTURES.length; league_idx++) {
        if (LEAGUE_FIXTURES[league_idx].id === league_id) {
            league = LEAGUE_FIXTURES[league_idx];
        }
    }

    if (!league) {
        // there was no league, render 404?
        console.log("TODO: render 404 as this league didn't exist");
    }

    console.log("league: " + league);
    $scope.league = league;
    // lookup players:
    $scope.players = [];
    for (var player_idx = 0; player_idx < PLAYER_FIXTURES.length; player_idx++) {
        for (var league_idx = 0; league_idx < league.player_ids.length; league_idx++) {
            var player = PLAYER_FIXTURES[player_idx];
            if (player.id == league.player_ids[league_idx]) {
                $scope.players.push(player);
            }
        }
    }
    $scope.games = [];
    for (var game_idx = 0; game_idx < GAME_FIXTURES.length; game_idx++) {
        for (var league_idx = 0; league_idx < league.game_ids.length; league_idx++) {
            var game = GAME_FIXTURES[game_idx];
            if (game.id == league.game_ids[league_idx]) {
                $scope.games.push(game);
            }
        }
    }
}]);


FoosControllers.controller("NewLeagueCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.shortName = "";
    $scope.displayName = "";

    $scope.addLeague = function() {
        console.log("TODO: Create league '" + $scope.text + "' for real");
        var new_league = {
            id: LEAGUE_FIXTURES.length + 1,
            shortName: $scope.shortName,
            name: $scope.displayName,
            player_ids: [],
            game_ids: []
        };
        LEAGUE_FIXTURES.push(new_league);
        console.log("TODO: investigate flash messages?");
        $location.path("/leagues/" + new_league.id);
    };
    $scope.validShortName = /^\w+$/;
    $scope.validDisplayName = /^[\w- ]+$/;
}]);
