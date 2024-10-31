
import React, { useState, useEffect, useRef } from 'react'
import './CsvUploadEntry.css';
import Papa from 'papaparse'

interface CSVData {
  'Group Name': string;
  'Total Steps': string;
  'Distance covered': string;
  [key: string]: string;
}

export default function CSVUploadEntry() {
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [csvData, setCsvData] = useState<CSVData[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('test_csv_data')
    if (storedData) {
      setCsvData(JSON.parse(storedData))
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      fetch('http://localhost:5000/csv', {
        method: "POST",
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw an error if the response isn't OK
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        alert(data.message); // Show the message from the JSON response
      })
      .catch(error => {
        alert('File upload failed: ' + error.message); // Show error message if it fails
      });
    }
  }
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }


  return (
    <div className="p-4 max-w-4xl mx-auto text-center">
      <div className="flex flex-col items-center">
        <button className="button mulish-regular" onClick={triggerFileInput}>
          Upload New CSV
        </button>
        <input type="file" accept=".csv" onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }}/>
      </div>
      {uploadStatus && <p className="mt-4 text-gray-700">{uploadStatus}</p>}
    </div>
  )
}
