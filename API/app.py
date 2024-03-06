from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from bson.json_util import dumps
from bson import ObjectId
from dotenv import load_dotenv
from geopy.geocoders import Nominatim
from functools import partial
from flask_cors import CORS
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure MongoDB
mongo_uri = os.getenv('MONGO_URI')
mongo_dbname = os.getenv('DB')
mongo_client = MongoClient(mongo_uri)
mongo_db = mongo_client[mongo_dbname]

# Initialize geopy geolocator
geolocator = Nominatim(user_agent="BlackCoffee/1.0")

# Define API Endpoints

@app.route('/api/data', methods=['GET'])
def get_all_data():
    page = request.args.get('page', default=1, type=int)
    items_per_page = 25  # Adjust as needed

    data = mongo_db.main.find().skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/<string:data_id>', methods=['GET'])
def get_data_by_id(data_id):
    data = mongo_db.main.find_one({'_id': ObjectId(data_id)})
    return dumps(data)

@app.route('/api/data/filter', methods=['GET'])
def filter_data():
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    filters = request.args.to_dict()
    data = mongo_db.main.find(filters).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

# Filter Endpoints

def apply_filter(filter_name, value):
    return mongo_db.main.find({filter_name: value})

@app.route('/api/data/filter/end_year/<int:end_year>', methods=['GET'])
def filter_by_end_year(end_year):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('end_year', end_year).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/filter/topic/<string:topic>', methods=['GET'])
def filter_by_topic(topic):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('topic', topic).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/filter/sector/<string:sector>', methods=['GET'])
def filter_by_sector(sector):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('sector', sector).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/filter/region/<string:region>', methods=['GET'])
def filter_by_region(region):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('region', region).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/filter/pestle/<string:pestle>', methods=['GET'])
def filter_by_pestle(pestle):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('pestle', pestle).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/filter/source/<string:source>', methods=['GET'])
def filter_by_source(source):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('source', source).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

@app.route('/api/data/filter/country/<string:country>', methods=['GET'])
def filter_by_country(country):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    data = apply_filter('country', country).skip((page - 1) * items_per_page).limit(items_per_page)
    return dumps(data)

# Filter by city with country data
@app.route('/api/data/filter/city/<string:city>', methods=['GET'])
def filter_by_city_with_country(city):
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10  # Adjust as needed

    # Use geopy to get country information for the city
    geocode = partial(geolocator.geocode, language="es")
    location = geocode(city)

    if location:
        country = location.raw.get('address', {}).get('country', '')
        # Fetch additional data related to the country
        country_data = mongo_db.main.find({'country': country}).skip((page - 1) * items_per_page).limit(items_per_page)

        # Combine city data and related country data
        result = {
            'city_data': {'city': city, 'country': country},
            'related_country_data': dumps(country_data)
        }

        return jsonify(result)
    else:
        return jsonify({'error': 'City not found'}), 404
    
@app.route('/api/swot-analysis', methods=['GET'])
def swot_analysis():
    page = request.args.get('page', type=int)

    data = mongo_db.main.find()

    strengths = []
    weaknesses = []
    opportunities = []
    threats = []

    for item in data:
        if item['intensity'] >= 5:
            strengths.append(item)
        elif item['intensity'] <= 2:
            weaknesses.append(item)
        elif item['relevance'] >= 3:
            opportunities.append(item)
        else:
            threats.append(item)

    result = {
        'strengths': strengths,
        'weaknesses': weaknesses,
        'opportunities': opportunities,
        'threats': threats
    }

    return dumps(result)

if __name__ == '__main__':
    app.run(debug=True)
