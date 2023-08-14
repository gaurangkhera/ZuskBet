from flask import Flask
import os
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from .models import db

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SESSION_TYPE'] = 'filesystem'
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False
app.config['SECRET_KEY'] = 'super secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')

sess = Session()
sess.init_app(app=app)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()