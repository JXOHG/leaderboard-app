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


@app.route("/csv", methods=['POST'])
def csv():

  if request.method == 'POST':
    # upload file flask
      f = request.files['file']

      # Extracting uploaded file name
      data_filename = secure_filename(f.filename)
      
      file_path = os.path.join(app.config['UPLOAD_FOLDER'], f.filename)
      
      f.save(file_path)
      os.rename(file_path, os.path.join(app.config['UPLOAD_FOLDER'], 'temp.csv'))
      try:
        df = pd.read_csv("public/temp.csv")
        if set(['Group Name', 'Total Steps', 'Distance covered']).issubset(df.columns):
          df = df[["Group Name", "Total Steps", "Distance covered"]]
          df = df.sort_values(by="Total Steps", axis=0, ascending=False)
          df.to_csv("public/main.csv", index=False)
          os.remove("public/temp.csv")
        else:
          os.remove("public/temp.csv")
          return jsonify({"message": "wrong csv file"}), 200
      except:
        os.remove("public/temp.csv")
      
      

      return jsonify({"message": 'works'}), 200
  return jsonify({"message": 'doesnt work'}), 400

if __name__ == '__main__':
    app.run(debug=True) 