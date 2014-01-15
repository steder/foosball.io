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
    {id: 100, name: "Game 1", homeScore: 3, visitorScore: 10,
     homeTeam: [{id: 10, name: "Dude"}],
     visitorTeam: [{id: 20, name: "Bro"}]
    },
    {id: 200, name: "Game 2", homeScore: 10, visitorScore: 7,
     homeTeam: [{id: 10, name: "Dude"}],
     visitorTeam: [{id: 20, name: "Bro"}]
     }
];


FoosControllers.controller("LeaguesCtrl", ['$scope', function($scope) {
    $scope.leagues = LEAGUE_FIXTURES;
}]);


FoosControllers.controller("LeagueCtrl", ["$scope", "$route", "$location", "flash",
                                          function($scope, $route, $location, flash) {
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
        console.log("TODO: render 404 as this league didn't exist?");
        flash("error", "Sorry, /leagues/" + league_id + " doesn't exist!");
        $location.path("/leagues");
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


FoosControllers.controller("PlayerCtrl", ["$scope", "$route", "$location", function($scope, $route, $location) {
    var player_id = $route.current.params.player_id;
    var player = undefined;
    for (var i = 0; i < PLAYER_FIXTURES.length; i++) {
        if (PLAYER_FIXTURES[i].id == player_id) {
            player = PLAYER_FIXTURES[i];
        }
    }
    console.log("player: " + player);
    $scope.player = player;
}]);


FoosControllers.controller("GameCtrl", ["$scope", "$route", "$location", function($scope, $route, $location) {
    var game_id = $route.current.params.game_id;
    var game = undefined;
    for (var i = 0; i < GAME_FIXTURES.length; i++) {
        if (GAME_FIXTURES[i].id == game_id) {
            game = GAME_FIXTURES[i];
        }
    }
    console.log("game: " + game);
    $scope.game = game;
}]);
