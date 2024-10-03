import React, { useState } from 'react';
import axios from 'axios';

// Define the structure of the data returned from the backend
interface CSVRow {
  [key: string]: string | number | null; // CSV can contain strings, numbers, or null values
}

const CSVUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<CSVRow[]>([]); // Array of CSV rows
  const [error, setError] = useState<string | null>(null); // Error state

  // Handle the file upload event
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:5000/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setCsvData(response.data); // Set the CSV data to state
        setError(null); // Clear any previous errors
      })
      .catch(err => {
        setError('Error uploading or parsing CSV file');
        console.error(err);
      });
    }
  };

  return (
    <div>
      <h1>Upload CSV and Display Data</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {csvData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CSVUploader;