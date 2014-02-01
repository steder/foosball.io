from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os

from flask import Flask
from flask import jsonify
from flask import render_template
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


@app.route("/api")
def api_placeholder():
    return jsonify({"placeholder": "hey, make an api!"})


if __name__ == '__main__':
    manager.run()
