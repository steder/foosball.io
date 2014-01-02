App = Ember.Application.create({
     LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

/* App.Store = DS.Store.extend({
  revision: 13,
  adapter: DS.FixtureAdapter
}); */

App.Router.reopen({
    location: 'history'
});

App.Router.map(function() {
    // put your routes here
    this.route('index', { path: '/' });
    this.resource('leagues', function() {
        this.route('new');
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


App.League = DS.Model.extend({
  name: DS.attr( 'string' ),
  games: DS.hasMany("game", {async: true}),
  players: DS.hasMany("player", {async: true})
});

App.League.FIXTURES = [
  { id: 1, name: 'Skinny Scrub',
    games: [1, 2],
    players: [1, 2]
   },
  { id: 2, name: 'Skinny Pro'}
];


App.LeaguesIndexRoute = Ember.Route.extend({
    model: function() {
        // console: returning all the leagues
        return this.store.find('league');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }
});


// App.LeaguesNewRoute = Ember.Route.extend({
//     model: function() {
//         return App.League();
//     },
//     setupController: function(controller, model) {
//         controller.set('model', model);
//     }
// });


App.LeaguesNewController = Ember.Controller.extend({
    actions: {
        addLeague: function() {
            console.log("CREATE A LEAGUE");
            console.log(this.name);
            var league = this.store.createRecord('league', {
                name: this.name
            });
            league.save();
            this.transitionToRoute('leagues');
        }
    }
});


App.LeaguesIndexController = Ember.Controller.extend({
    // initial values of controller state:
    someFlag: false,

    actions: {
        addLeague: function() {
            //this.set('someFlag', true);
            this.transitionToRoute('leagues.new');
        }
    }
});


App.LeaguesLeagueController = Ember.Controller.extend({

});


App.LeagueRoute = Ember.Route.extend({
    model: function(params) {
        console.log("returning a league model...");
        return this.store.find('league', params.league_id);
    }
});


App.Player = DS.Model.extend({
  name: DS.attr( 'string' ),
});

App.Player.FIXTURES = [
  { id: 1, name: 'Somebody'},
  { id: 2, name: 'Someone Else'}
];


App.PlayerRoute = Ember.Route.extend({
    model: function(params) {
        console.log("returning a player model...");
        return this.store.find('player', params.player_id);
    }
});


App.Game = DS.Model.extend({
    name: DS.attr('string'),
    homeScore: DS.attr("number"),
    visitorScore: DS.attr("number"),
    league: DS.belongsTo("league"),
    homePlayers: DS.hasMany("player", {async: true}),
    visitorPlayers: DS.hasMany("player", {async: true})
});

App.Game.FIXTURES = [
        {id: 1, name: 'Game 1', 
         homeScore: 3,
         visitorScore: 10,
         league: 1,
         homePlayers: [1],
         visitorPlayers: [2]
        },
        {id: 2, name: 'Game 2',
         homeScore: 10,
         visitorScore: 3,
         league: 1,
         homePlayers: [2],
         visitorPlayers: [1]
        }
];


App.GameRoute = Ember.Route.extend({
    model: function(params) {
        console.log("returning a game model...");
        return this.store.find('game', params.game_id)
    }
});