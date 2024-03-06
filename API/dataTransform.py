import pandas as pd
import json

# Assuming your JSON data is stored in a file, adjust the file path accordingly
json_file_path = './jsondata.json'

# Load JSON data
with open(json_file_path, 'r', encoding='utf-8') as json_file:
    json_data = json.load(json_file)

# Convert JSON data to a Pandas DataFrame
df = pd.json_normalize(json_data)

# Specify the CSV file path where you want to save the data
csv_file_path = './output_data.csv'

# Save the DataFrame to a CSV file
df.to_csv(csv_file_path, index=False)

print(f"CSV file has been created at {csv_file_path}")
