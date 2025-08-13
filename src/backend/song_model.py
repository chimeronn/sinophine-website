from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
USERNAME = os.environ['USERNAME']
PASSWORD = os.environ['PASSWORD']
DBNAME = os.environ['DBNAME']

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{USERNAME}:{PASSWORD}@34.44.90.143:5432/{DBNAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Song(db.Model):
    id = db.Column(db.String(30), primary_key=True)
    popularity_rank = db.Column(db.Integer)
    title = db.Column(db.String(50))
    date = db.Column(db.Date)
    image_url = db.Column(db.String(100))

def init_db():
    with app.app_context():
        db.create_all()