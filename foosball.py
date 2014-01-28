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


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")


@app.route("/api")
def api_placeholder():
    return jsonify({"placeholder": "hey, make an api!"})


if __name__ == '__main__':
    manager.run()
