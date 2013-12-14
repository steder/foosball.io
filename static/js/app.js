App = Ember.Application.create();

App.Router.map(function() {
    // put your routes here
    this.route('index', { path: '/' });
    this.resource('leagues', function() { 
        this.resource('league', { path: '/leagues/:league_id' });
    });
    this.route('account', { path: '/account'});
    this.route('about', { path: '/about' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

/*
App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    // `controller` is the instance of ApplicationController
    controller.set('title', "Hello world!");
  }
});

App.ApplicationController = Ember.Controller.extend({
  appName: 'My First Example'
});
*/