"""
"""


import os
import tempfile
import unittest
import urllib2

from flask.ext.testing import LiveServerTestCase
from selenium import webdriver

from foosball import app


class FlaskDatabaseTestCase(unittest.TestCase):
    def setUp(self):
        #self.db_fd, app.config['DATABASE'] = tempfile.mkstemp()
        app.config['TESTING'] = True
        self.app = app.test_client()
        #app.init_db()

    def tearDown(self):
        #os.close(self.db_fd)
        #os.unlink(flaskr.app.config['DATABASE'])
        pass


class FooTest(FlaskDatabaseTestCase):
    def test_one(self):
        self.assertEqual(1+1, 2)



class MyTest(LiveServerTestCase):
    def create_app(self):
        #app = Flask(__name__)
        app.config['TESTING'] = True
        # Default port is 5000
        app.config['LIVESERVER_PORT'] = 8943
        app.use_reloader = False
        app.debug = False
        return app

    def test_server_is_up_and_running(self):
        response = urllib2.urlopen(self.get_server_url())
        print "body:", response.read()
        self.assertEqual(response.code, 200)

    def test_with_phantom_js(self):
        driver = webdriver.PhantomJS()
        driver.get(self.get_server_url())
        print driver.current_url
        driver.quit

