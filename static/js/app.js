var FoosApp = angular.module('FoosApp', [
  'ngRoute',
  'FoosControllers',
  'FoosDirectives',
  'flash',
]);


FoosApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.
      when('/', {
        templateUrl: '/static/templates/index.html',
      }).
      when('/about', {
        templateUrl: '/static/templates/about.html',
      }).
      when('/leagues', {
        templateUrl: '/static/templates/leagues.html',
        controller: 'LeaguesCtrl',
      }).
      when('/leagues/new', {
          templateUrl: '/static/templates/league_new.html',
      }).
      when('/leagues/:league_id', {
          templateUrl: '/static/templates/league.html',
          controller: 'LeagueCtrl',
      }).
      when('/games/new', {
          templateUrl: '/static/templates/game_new.html',
      }).
      when('/games/:game_id', {
          templateUrl: '/static/templates/game.html',
          controller: 'GameCtrl',
      }).
      when('/players/new', {
          templateUrl: '/static/templates/player_new.html',
      }).
      when('/players/:player_id', {
          templateUrl: '/static/templates/player.html',
          controller: 'PlayerCtrl',
      }).
      otherwise({
        templateUrl: '/static/templates/404.html',
        // redirectTo:
      });
  }]);

FoosApp.controller("AppCtrl", ["$scope", "$location", function($scope, $location) {
  // setup a scope providing a "currentPath" variable that we can check to see if 
  $scope.currentPath = $location.path();
  // add the location service to the scope as we need it to be able to watch
  // $location.path() for changes:
  $scope.$location = $location;
  // finally; setup a watch on the $location.path() and update our currentPath
  // whenever we change the URL.
  $scope.$watch("$location.path()", function(loc) {
    $scope.currentPath = loc;
  });
}]);
