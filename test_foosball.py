"""
"""


import os
import tempfile
import unittest
try:
    from urllib import request as urllib
except ImportError:
    import urllib2 as urllib

from flask.ext.testing import LiveServerTestCase
from selenium import webdriver

from foosball import app


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
        response = urllib.urlopen(self.get_server_url())
        print("body:", response.read())
        self.assertEqual(response.code, 200)

    def test_with_phantom_js(self):
        driver = webdriver.PhantomJS()
        driver.get(self.get_server_url())
        print(driver.current_url)
        driver.quit()
