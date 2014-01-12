var FoosApp = angular.module('FoosApp', [
  'ngRoute',
  'FoosControllers',
  'FoosDirectives',
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
      when('/games/:game_id', {
          templateUrl: '/static/templates/game.html',
      }).
      when('/players/:player_id', {
          templateUrl: '/static/templates/player.html'
      }).
      otherwise({
        templateUrl: '/static/templates/404.html',
        // redirectTo:
      });
  }]);
