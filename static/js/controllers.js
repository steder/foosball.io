var FoosControllers = angular.module('FoosControllers', ['firebase']);


function slugify(text) {
    // shamelessly stolen from: https://gist.github.com/mathewbyrne/1280286
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}


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
    {id: 20, name: "Bro"},
    {id: 30, name: "Yolo"}
];


var GAME_FIXTURES = [
    {id: 100, name: "Game 1", homeScore: 3, visitorScore: 10,
     homeTeam: [{id: 10, name: "Dude"}],
     visitorTeam: [{id: 20, name: "Bro"}],
     active: true
    },
    {id: 200, name: "Game 2", homeScore: 10, visitorScore: 7,
     homeTeam: [{id: 10, name: "Dude"}],
     visitorTeam: [{id: 20, name: "Bro"}],
     active: false
    }
];


FoosControllers.controller("LeaguesCtrl", ['$scope', '$firebase', function($scope, $firebase) {
    var firebase_root_url = "https://foos.firebaseio.com/";
    var leagues_url = firebase_root_url + "leagues";
    var fire = new Firebase(leagues_url);
    var sync = $firebase(fire);
    $scope.leagues = sync.$asObject();
}]);


FoosControllers.controller("LeagueCtrl", ["$scope", "$route", "$location", "flash", "$firebase",
function($scope, $route, $location, flash, $firebase) {

    console.log($route.current.params);
    console.log($route.current.params.league_id);
    var league_id = $route.current.params.league_id;
    console.log("league_id: " + league_id);

    var firebase_root_url = "https://foos.firebaseio.com/";
    var league_url = firebase_root_url + "leagues/" + league_id;
    var fire = new Firebase(league_url);
    var sync = $firebase(fire);
    var league = sync.$asObject();

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
    // for (var player_idx = 0; player_idx < PLAYER_FIXTURES.length; player_idx++) {
    //     for (var league_idx = 0; league_idx < league.player_ids.length; league_idx++) {
    //         var player = PLAYER_FIXTURES[player_idx];
    //         if (player.id == league.player_ids[league_idx]) {
    //             $scope.players.push(player);
    //         }
    //     }
    // }

    // Lookup games:
    $scope.games = [];
    // for (var game_idx = 0; game_idx < GAME_FIXTURES.length; game_idx++) {
    //     for (var league_idx = 0; league_idx < league.game_ids.length; league_idx++) {
    //         var game = GAME_FIXTURES[game_idx];
    //         if (game.id == league.game_ids[league_idx]) {
    //             $scope.games.push(game);
    //         }
    //     }
    // }
    // $scope.availablePlayers = [PLAYER_FIXTURES[2],];
}]);


FoosControllers.controller("NewLeagueCtrl", ["$scope", "$location", "$firebase", function($scope, $location, $firebase) {
    var firebase_root_url = "https://foos.firebaseio.com/";
    var leagues_url = firebase_root_url + "leagues";
    var fire = new Firebase(leagues_url);
    var sync = $firebase(fire);
    var leagues = sync.$asObject();
    $scope.leagues = leagues;
    $scope.shortName = "";
    $scope.displayName = "";

    $scope.addLeague = function() {
        console.log("TODO: Create league '" + $scope.shortName + "' for real");
        var new_league = {
            id: slugify($scope.shortName),
            shortName: $scope.shortName,
            name: $scope.displayName,
            player_ids: [],
            game_ids: []
        };
        $scope.leagues[new_league.id] = new_league;
        $scope.leagues.$save();
        $location.path("/leagues/" + new_league.id);
    };
    $scope.validShortName = /^\w+$/;
    $scope.validDisplayName = /^[\w-' ]+$/;
}]);


FoosControllers.controller("NewGameCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.shortName = "";
    $scope.displayName = "";

    $scope.availablePlayers = PLAYER_FIXTURES;

    $scope.addGame = function() {
        console.log("TODO: Create game '" + $scope.text + "' for real");
        var new_game = {
            id: GAME_FIXTURES.length + 1,
            shortName: $scope.shortName,
            name: $scope.displayName,
            homeScore: 0,
            visitorScore: 0,
            homeTeam: [],
            visitorTeam: [],
            active: true
        };
        GAME_FIXTURES.push(new_game);
        //$scope.leagues[league_id].game_ids.push(new_game.id);
        $location.path("/games/" + new_game.id);
    };
    $scope.validShortName = /^\w+$/;
    $scope.validDisplayName = /^[\w- ]+$/;
}]);


FoosControllers.controller("NewPlayerCtrl", ["$scope", "$location", function($scope, $location) {
    $scope.shortName = "";
    $scope.displayName = "";

    $scope.addPlayer = function() {
        console.log("TODO: Create player '" + $scope.text + "' for real");
        var new_player = {
            id: PLAYER_FIXTURES.length + 1,
            shortName: $scope.shortName,
            name: $scope.displayName,
        };
        PLAYER_FIXTURES.push(new_player);
        $location.path("/players/" + new_player.id);
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
