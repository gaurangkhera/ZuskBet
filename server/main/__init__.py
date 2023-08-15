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
app.config['STRIPE_BET_PRICE'] = 'price_1Nf02xSJta2f9afKJyURLQ2A'
app.config['STRIPE_PK'] = 'pk_test_51Nf01HSJta2f9afKAikfTsoIHNxSZSslblmrngu4GYm35mautfrU3e14I6RoM1psV4ZvIzl8nLloA4YJ7S0msEZW00owHeQvQC'
app.config['STRIPE_SK'] = 'sk_test_51Nf01HSJta2f9afKkeaNJjl0hLNLoJImnf8TcRXuKlEDkWcwHK66BAHdl6AQwPt84QVHaHuEkPMmBLvLaQMPdQho00we3HxMZ9'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')

sess = Session()
sess.init_app(app=app)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()