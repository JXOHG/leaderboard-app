from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
import os
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'public'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
          
          #insert code here to merge manual.csv with submit.csv
          
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

if __name__ == '__main__':
    app.run(debug=True) 