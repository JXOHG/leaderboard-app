import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Submit.css';
import Csvuploader from "../components/csvupload";
import ManualCsvEntry from "../components/ManualCsvEntry";
import CsvUploadEntry from '../components/CsvUploadEntry';

const Submit: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'manual' | 'csv'>('main');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch the username
    const fetchUsername = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/user');
        const data = await response.json();
        setUsername(data.name); // Assuming the API returns an object with a 'name' field
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('User'); // Fallback name in case of error
      }
    };

    fetchUsername();
  }, []);

  const MainPage = () => (
    <div className="submit-page">
      <h1>Hello Admin,<br />Ready to Submit Steps?</h1>
      <div className="button-container">
        <button className="button" onClick={() => setCurrentPage('csv')}>Upload CSV</button> {/* CSV Page */}
        <span className="or">OR</span>
        <button className="button" onClick={() => setCurrentPage('manual')}>Enter Manually</button>
      </div>
    </div>
  );

  // Page for manually inputting participant data
  const ManualPage = () => (
    <div className="submit-page">
      <h2>Enter steps:</h2>
      <div>
        <ManualCsvEntry/>
      </div>
      <button className="button">Next</button>
    </div>
  );




  // Page for uploading CSV files containing user steps
  const CSVPage = () => (
    <div className="submit-page">
      <h2>Upload CSV File</h2>
      <div>
        <CsvUploadEntry/>
      </div>
    </div>
  );

  return (
    <div className="submit-container">
      <div className="content-wrapper">
        <button 
          className="backbutton back-button" 
          onClick={() => currentPage === 'main' ? navigate('/') : setCurrentPage('main')}
        >
          <ArrowLeft color="#666" absoluteStrokeWidth />
        </button>

        <div className="submit-page">
          {currentPage === 'main' && <MainPage />}
          {currentPage === 'manual' && <ManualPage />}
          {currentPage === 'csv' && <CSVPage />} {/* Add CSVPage */}
        </div>
      </div>
    </div>
  );
};

export default Submit;