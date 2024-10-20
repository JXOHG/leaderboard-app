from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
import os
from flask_cors import CORS
from io import StringIO

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
    combined_df = combined_df.sort_values(by="Total Steps", axis=0, ascending=False)
    # Replace the existing 'main.csv' with the combined data
    combined_df.to_csv("public/main.csv", index=False)

    print("Files combined successfully, and 'main.csv' has been replaced.")

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
      return jsonify({"message": 'works'}), 200
  return jsonify({"message": 'doesnt work'}), 400

@app.route("/manual", methods=['POST'])
def manual():

  if request.method == 'POST':
    csvStr = request.data.decode('utf-8')
    csvStr = StringIO(csvStr)
      
    #opens the csv into a dataframe to be modified by pandas
    df = pd.read_csv(csvStr, sep=",", header=0)
    #checks if csv has the correct columns
    if set(['name', 'steps']).issubset(df.columns):
      #extract neccessary columns
      df = df[["name", "steps"]]
      df.rename(columns={'steps': 'Total Steps', 'name': 'Name'},inplace=True)

      print(df)
      #lines 69 and 70 should be
      #df = df[["name", "steps", "avg daily steps"]]
      #df.rename(columns={'steps': 'Total Steps', 'name': 'Name', 'avg daily steps': 'Average Daily Steps},inplace=True)
      #but it isnt for now until frontend is updated to include avg daily steps column
      
      
      #sort by total steps
      df = df.sort_values(by="Total Steps", axis=0, ascending=False)
      
      #write file to submit.csv so it can be combined with manual.csv later
      df.to_csv("public/manual.csv", index=False)
      
      #insert code here to merge manual.csv with submit.csv
      
    else:
      #incorrect csv file submitted (wrong columns)
      return jsonify({"message": "wrong csv file"}), 400


    return jsonify({"message": "CSV received and processed"}), 200
  return jsonify({"message": "fail"}), 400
      
"""       df = pd.read_csv(csvStr, sep=',', header = None)
      print(df) """
      



if __name__ == '__main__':
    app.run(debug=True) 