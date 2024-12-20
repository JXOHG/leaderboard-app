import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Submit.css';
import ManualCsvEntry from "../components/CsvManualEntry";
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
      
      <div className="button-container">
        <h1 className="mulish-bold admin">Hello Admin,</h1>
        <h2 className="mulish-regular admin">Ready to Submit Steps?</h2>
        <button className="button mulish-regular" onClick={() => setCurrentPage('csv')}>Upload CSV</button> {/* CSV Page */}
        <button className="button mulish-regular" onClick={() => setCurrentPage('manual')}>Enter Manually</button>
      </div>
    </div>
  );

  // Page for manually inputting participant data
  const ManualPage = () => (
    <div className="submit-page">
      <h2 className="mulish-bold text-colour">Enter steps:</h2>
      <div>
        <ManualCsvEntry/>
      </div>
      <div className="text-container">
        <h5 className="mulish-regular text-colour">Disclaimer:</h5>
        <p className="mulish-regular text-colour">Please click "Add Participant" before clicking "Save to CSV!"</p>
      </div>
    </div>
  );

  // Page for uploading CSV files containing user steps
  const CSVPage = () => (
    <div className="submit-page">
      <h2 className="mulish-bold text-colour">Upload CSV File</h2>
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
          onClick={() => currentPage === 'main' ? navigate('/settings') : setCurrentPage('main')}
        >
          <ArrowLeft color="#666" absoluteStrokeWidth/>
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