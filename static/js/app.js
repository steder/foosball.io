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
        this.resource('league', { path: '/:league_id' }, function() {});

    });
    this.resource('game', { path: '/leagues/:league_id/games/:game_id' });
    this.resource('games', { path: '/leagues/:league_id/games'}, function() {
        this.route("new");
    });
    this.resource('players', function() {
        this.route('new');
        this.resource('player', { path: '/:player_id' });
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


App.LeagueRoute = Ember.Route.extend({
    model: function(params) {
        console.log("returning a league model...");
        return this.store.find('league', params.league_id);
    },
    setupController: function(controller, model) {
      console.log("LEAGUE ROUTE SETUP CONTROLLER");
      console.log(model);
      var gn = this.controllerFor('gamesNew');
      console.log(gn);
      gn.set('league', model);
    }
});


App.LeagueController = Ember.ObjectController.extend({
    actions: {
        addGame: function() {
            this.transitionToRoute('games.new');
        },
        addPlayer: function() {
            this.transitionToRoute('players.new');
        }
    }
});


App.Player = DS.Model.extend({
  name: DS.attr( 'string' ),
  leagues: DS.hasMany('league', {async: true})
});

App.Player.FIXTURES = [
  { id: 1, name: 'Somebody', leagues: [1]},
  { id: 2, name: 'Someone Else', leagues: [1]}
];

App.PlayersNewController = Ember.ObjectController.extend({
    actions: {
        addPlayer: function() {
            console.log("adding player");
            this.transitionToRoute('leagues');
        }
    }
});

App.PlayerRoute = Ember.Route.extend({
    model: function(params) {
        console.log("returning a player model...");
        return this.store.find('player', params.player_id);
    },
    /* if you want to customize the parameters passed to a route you need to 
      override serialize on the route */
    // serialize: function(model) {
    //   console.log("serialize");
    //   console.log(model);
    //   return {
    //     league_id: model.get("league"),
    //     player_id: model.get("id")
    //   };
    // }
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
    },
    serialize: function(model) {
      return {
        league_id: model.get("league").get("id"),
        game_id: model.get("id")
      }
    }
});


App.GamesNewRoute = Ember.Route.extend({
     model: function(params) {},
     setupController: function(controller, model) {
        controller.set('content', []);
        console.log("TODO: filter players based on league membership");
        controller.set('players', this.store.find('player'));
        controller.set('homeTeam', Ember.ArrayProxy.create({content: Ember.A([])}));
        controller.set('visitorTeam', Ember.ArrayProxy.create({content: Ember.A([])}));
     }
});


App.GamesNewController = Ember.ObjectController.extend({
    // needs: 'league',
    // league: Ember.computed.alias("controllers.league"),
    teams: ['home', 'visitors'],
    selectedPlayer: null,
    selectedTeam: null,
    error: null,
    actions: {
        addGame: function() {
            console.log("adding game");
            console.log("TODO: validate that the game has players on both teams");
            console.log("LEAGUE");
            console.log(this.league);
            console.log("LEAGUE ID");
            console.log(this.league.id);
            var game = this.store.createRecord("game", {name: 'new game', 
                                             homeScore: 0,
                                             visitorScore: 0,
                                             league: league_id,
                                           });
            game.homePlayers = this.homeTeam;
            game.visitorPlayers = this.visitorTeam;
            game.save();
            this.transitionToRoute('league', this.league);
        },
        addPlayer: function() {
            console.log("adding a player to this game");
            console.log("selectedPlayer:");
            console.log(this.selectedPlayer);
            console.log(this.selectedTeam);
            if (!this.selectedTeam || !this.selectedPlayer) {
              this.set('error', 'Select a player and their team!');
              return;
            } {
              this.set('error', null);
            }

            if (this.selectedTeam === 'home') {
              this.get('homeTeam').pushObject(this.selectedPlayer);
            } else {
              this.get('visitorTeam').pushObject(this.selectedPlayer);
            }
            console.log("clearing the select boxes");
            this.set('selectedTeam', null);
            this.set('selectedPlayer', null);
        }
    }
});
