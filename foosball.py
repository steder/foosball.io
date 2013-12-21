from flask import Flask
from flask import jsonify
from flask import render_template
from flask.ext.assets import Environment #, Bundle

app = Flask(__name__)
app.config["DEBUG"] = True
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
    return jsonify({"placeholder": "stuff"})


if __name__ == "__main__":
    app.run()