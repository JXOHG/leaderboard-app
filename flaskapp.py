from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
import os
from flask_cors import CORS
from io import StringIO
import json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Helper function to merge manual and submit csv files
def combine_and_replace_csv():
    # Read relevant columns from both CSV files
    if (os.path.isfile("public/manual.csv")):
        submit_df = pd.read_csv("public/submit.csv", usecols=["Name", "Total Steps", "Avg Daily Steps"])
        manual_df = pd.read_csv("public/manual.csv", usecols=["Name", "Total Steps", "Avg Daily Steps"])
    else:
        print("Manual.csv does not exist. No further operations")
        return

    # Combine the two DataFrames
    combined_df = pd.concat([submit_df, manual_df], ignore_index=True)

    combined_df = combined_df.groupby('Name').agg(
            {'Total Steps': 'sum', 'Avg Daily Steps': 'sum'}  # Sum Total Steps and Average Avg Daily Steps
        ).reset_index()
    
    combined_df = combined_df.sort_values(by="Total Steps", axis=0, ascending=False)
    # Replace the existing 'main.csv' with the combined data
    combined_df.to_csv("public/main.csv", index=False)

    print("Files combined successfully, and 'main.csv' has been replaced.")

def load_users():
    try:
        with open('users.json') as f:
            data = json.load(f)
            return data
    except:
        print('Failed to open data')
        
def save_users(username, password):
    try:
        with open('users.json') as f:
            data = json.load(f)
            data[username] = password
        with open('users.json', 'w') as f:
            json.dump(data,f)
            
    except Exception as e:
        print(e)
        print('Failed to save data')
            

# handles csv file upload
@app.route("/csv", methods=['POST'])
def csv():

  if request.method == 'POST':
      f = request.files['file']

      # Extracting uploaded file name
      data_filename = secure_filename(f.filename)
      file_path = os.path.join(app.config['UPLOAD_FOLDER'], data_filename)

      #saves the file to a temporary csv
      f.save(file_path)
      os.rename(file_path, os.path.join(app.config['UPLOAD_FOLDER'], 'temp.csv'))
      try:
        #opens the csv into a dataframe to be modified by pandas
        df = pd.read_csv("public/temp.csv")
        
        #checks if csv has the correct columns
        if set(['Name', 'Total Steps', "Avg Daily Steps"]).issubset(df.columns):
          #extract neccessary columns
          df = df[["Name", "Total Steps", "Avg Daily Steps"]]
          #sort by total steps
          df = df.sort_values(by="Total Steps", axis=0, ascending=False)
          #write file to submit.csv so it can be combined with manual.csv later
          df.to_csv("public/submit.csv", index=False)
          
          # Merges manual.csv with submit.csv
          combine_and_replace_csv()
          
          os.remove("public/temp.csv")
        else:
          #incorrect csv file submitted (wrong columns)
          os.remove("public/temp.csv")
          return jsonify({"message": "wrong csv file"}), 400
      except:
        #if there is any error, remove temp.csv if it exists
        #if temp.csv is not deleted and a new csv is uploaded
        #the server will stop working
        if os.path.isfile('public/temp.csv'):
          os.remove("public/temp.csv")
      return jsonify({"message": "File uploaded successfully"}), 200
  return jsonify({"message": "File did not upload successfully"}), 400

@app.route("/manual", methods=['POST'])
def manual():
    
    if request.method == 'POST':
        csvStr = request.data.decode('utf-8')
        csvStr = StringIO(csvStr)

        df = pd.read_csv(csvStr, sep=",", header=0)

        # Check if CSV has the correct columns
        if set(['name', 'steps']).issubset(df.columns):
            # Extract necessary columns and rename them
            df = df[["name", "steps"]]
            df.rename(columns={'steps': 'Total Steps', 'name': 'Name'}, inplace=True)

            # Add the Avg Daily Steps column and set it to 0
            df['Avg Daily Steps'] = 0  # Default to 0 for manual entries

            # Append new data to manual.csv instead of replacing it
            # If manual.csv exists, append; otherwise, create a new one
            if os.path.isfile("public/manual.csv"):
                df.to_csv("public/manual.csv", mode='a', header=False, index=False)
            else:
                df.to_csv("public/manual.csv", index=False)
            # Now, read the manual.csv to sort it by Total Steps
            manual_df = pd.read_csv("public/manual.csv")
            manual_df = manual_df.sort_values(by="Total Steps", ascending=False)

            # Write the sorted DataFrame back to manual.csv
            manual_df.to_csv("public/manual.csv", index=False)

            # Call the combine_and_replace_csv function to update main.csv
            combine_and_replace_csv()

        return jsonify({"message": "CSV received and processed"}), 200
    return jsonify({"message": "fail"}), 400

      
@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        #get dictionary of {username:password}
        try:
            users = load_users()
        except:
            return jsonify({"message": "Failed to load user data"}), 400
        userpass = request.data.decode('utf-8')
        #username pw will be submitted as "username password"
        #so split when there is space to separate username and pw
        userpass = userpass.split()
        
        uname = userpass[0]
        pw = userpass[1]
        
        #hash pw function here
        
        if users[uname] == pw:
            #login function should be here
            return jsonify({'message': 'Successful login!'}), 200
        else:
            return jsonify({"message": 'Login failed!'}), 400

@app.route("/changepw", methods=['POST'])
def changepw():
    if request.method == 'POST':
        #get dictionary of {username:password}
        users = load_users()
        
        userpass = request.data.decode('utf-8')
        userpass = userpass.split()
        
        uname = userpass[0]
        pw = userpass[1]
        
        #hash password here
        
        try:
            save_users(uname, pw)    
        except:    
            return jsonify({"message": "Failed to load users"}), 400
        return jsonify({"message": "Password updated!"}), 200
        
"""       df = pd.read_csv(csvStr, sep=',', header = None)
      print(df) """
      



if __name__ == '__main__':
    app.run(debug=True) 