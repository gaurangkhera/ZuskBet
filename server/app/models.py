from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
import json

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

# user schema
class User(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(32), nullable=False, unique=True)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.String, nullable=False)
    money = db.Column(db.Integer, default=0)
    bets = db.relationship('Bet')

    # method to return user object as json to populate react state
    def return_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "money": self.money,
            "bets": [x.return_json() for x in self.bets],
        }
    
# contestant schema
class Contestant(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String)
    bets = db.Column(db.Integer)

    # method to return contestant object as json to populate react state
    def return_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "bets": self.bets
        }
    
# bet schema
class Bet(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    amount = db.Column(db.Integer)
    betFor = db.Column(db.String)
    user = db.Column(db.String, db.ForeignKey('user.id'))

    # method to return bet object as json to populate react state
    def return_json(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "betFor": self.betFor,
            "user": self.user
        }