# app.py
from flask import Flask
import json, os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Connect to MongoDB
def conn(uri:str):
    client = MongoClient(uri)
    db = client.black_Coffee  # Replace 'your_database_name' with your desired database name
    jsonData = db.main  # Use a meaningful collection name

    # Load JSON data into MongoDB
    with open('jsondata.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        jsonData.insert_many(data)

    return "Data loaded successfully."

# Test Route
@app.route('/')
def hello_world():
    # Pass your MongoDB URI as an argument when running the script
    uri = os.getenv('MONGO_URI')
    res = conn(uri)
    return 'Hello, World! ' + res

if __name__ == '__main__':
    app.run(debug=False)
