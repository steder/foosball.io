var FoosApp = angular.module('FoosApp', [
  'ngRoute',
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
      }).
      otherwise({
        templateUrl: '/static/templates/404.html',
        // redirectTo:
      });
  }]);
