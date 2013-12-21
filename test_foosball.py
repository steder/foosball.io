"""
"""


import os

import unittest
import tempfile

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
