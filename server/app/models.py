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

    # method to return user object as json to populate react user state
    def return_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }