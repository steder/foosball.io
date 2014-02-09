from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

from flask import Flask
from flask import jsonify
from flask import render_template
from flask import Blueprint
from flask.views import MethodView, View
from flask.ext.assets import Environment #, Bundle
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.script import Manager


ROOT = os.path.dirname(__file__)

app = Flask(__name__)
app.config["DEBUG"] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}foosball.db'.format(ROOT)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

assets = Environment(app)
#js = Bundle('jquery.js', 'base.js', 'widgets.js',
#            filters='jsmin', output='gen/packed.js')
#assets.register('js_all', js)


# Models:
players_table = db.Table('players',
    db.Column('player_id', db.Integer, db.ForeignKey('player.id')),
    db.Column('league_id', db.Integer, db.ForeignKey('league.id'))
)


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    shortName = db.Column(db.String(15))
    displayName = db.Column(db.String(50))
    leagues = db.relationship('League',
                              secondary=players_table,
                              backref=db.backref('leagues'))


class League(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    shortName = db.Column(db.String(15))
    displayName = db.Column(db.String(50))
    games = db.relationship('Game', backref=db.backref('games'))
    players = db.relationship('Player', 
                              secondary=players_table,
                              backref=db.backref('players'))


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #shortName = db.Column(db.String(15))
    #displayName = db.Column(db.String(100))
    description = db.Column(db.Text())
    league_id = db.Column(db.Integer, db.ForeignKey('league.id'))
    league = db.relationship('League',
        backref=db.backref('league'))
    homeGoalie = db.Column(db.Integer, db.ForeignKey('player.id'))
    visitorGoalie = db.Column(db.Integer, db.ForeignKey('player.id'))
    homeShooter = db.Column(db.Integer, db.ForeignKey('player.id'))
    visitorShooter = db.Column(db.Integer, db.ForeignKey('player.id'))

    def __init__(self, **kwargs):
        super(Game, self).__init__(**kwargs)
        self.description = ""


# Routes:
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")




## api endpoints
# leagues:
api = Blueprint('api', __name__,
                        template_folder='templates')


@api.route("/")
def api_placeholder():
    return jsonify({"placeholder": "hey, make an api!"})


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    api.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET',])
    api.add_url_rule(url, view_func=view_func, methods=['POST',])
    api.add_url_rule('%s<%s:%s>' % (url, pk_type, pk), view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


def attrs(*attrs):
    def row_to_dict(row):
        d = {}
        for attr in attrs:
            d[attr] = getattr(row, attr)
        return d
    return row_to_dict


class LeagueApi(MethodView): 
    model = League 
    attrs = attrs("id", "shortName")

    def get(self, league_id):
        if league_id is not None:
            league = League.query.filter_by(id=league_id).one()
            return jsonify(self.attrs(league))
        else:
            data = self.model.query.all()
            leagues = []
            for league in data:
                leagues.append(self.attrs(league))
            return jsonify({"leagues": list(data)})

    def post(self):
        # TODO: validate request.data has all the necessary fields
        # at that the values make sense based on the db constraints
        return "TODO: Create a new league based on request.data"

    def put(self, league_id):
        # TODO: validate request.data
        return "TODO: Update a league based on request.data"

    def delete(self, league_id):
        return "TODO: Delete a league!"


register_api(LeagueApi, 'leagues', '/leagues/', pk='league_id', pk_type='int')


app.register_blueprint(api, url_prefix='/api')


if __name__ == '__main__':
    for rule in app.url_map.iter_rules():
        print("rule:", rule)
    manager.run()
