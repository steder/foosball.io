App = Ember.Application.create({
     LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend({
  revision: 13,
  adapter: DS.FixtureAdapter
});

App.Router.reopen({
    location: 'history'
});

App.Router.map(function() {
    // put your routes here
    this.route('index', { path: '/' });
    this.resource('leagues', function() { 
        this.resource('league', { path: '/:league_id' });
    });
    this.resource('players', function() {
        this.resource('player', { path: '/:player_id' });
    });
    this.resource('games', function() {
        this.resource('game', { path: '/:game_id' });
    });
    //this.route('account', { path: '/account'});
    this.route('about', { path: '/about' });

});


App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});


App.LeaguesController = Ember.Controller.extend({
    // initial values of controller state:
    someFlag: false,

    actions: {
        addLeague: function() {
            //this.set('someFlag', true);
            console.log("Add a league!");
        }
    }
});


App.LeaguesLeagueController = Ember.Controller.extend({

});


App.LeagueRoute = Ember.Route.extend({
    model: function(league_id) {
        console.log("returning a league model...");
        return {name: 'Skinny Scrub League'};
    }
});


App.PlayerRoute = Ember.Route.extend({
    model: function(player_id) {
        console.log("returning a player model...");
        return {name: 'Somebody!'};
    }
});


App.GameRoute = Ember.Route.extend({
    model: function(game_id) {
        console.log("returning a game model...");
        return {
            name: 'Game 1', 
            homeScore: 3,
            visitorScore: 10
        };
    }
});