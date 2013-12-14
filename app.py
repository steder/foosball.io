from flask import Flask
from flask import render_template
from flask.ext.assets import Environment, Bundle

app = Flask(__name__)
app.config["DEBUG"] = True
assets = Environment(app)

#js = Bundle('jquery.js', 'base.js', 'widgets.js',
#            filters='jsmin', output='gen/packed.js')
#assets.register('js_all', js)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()