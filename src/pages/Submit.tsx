import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';  // Import QR Reader
import './Submit.css';

const Submit: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'manual' | 'screenshot' | 'qr'>('main');
  const [username, setUsername] = useState<string>('');
  const [qrResult, setQrResult] = useState<string | null>(null); // State to hold the QR code result
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
        <button className="button" onClick={() => setCurrentPage('qr')}>Upload CSV</button> {/* QR Page */}
        <span className="or">OR</span>
        <button className="button" onClick={() => setCurrentPage('manual')}>Enter Manually</button>
      </div>
    </div>
  );

  const ManualPage = () => (
    <div className="submit-page">
      <h2>1. Enter steps:</h2>
      <input type="number" placeholder="Enter steps" />
      <button className="button" onClick={() => setCurrentPage('screenshot')}>Next</button>
    </div>
  );

  const ScreenshotPage = () => (
    <div className="submit-page">
      <h2>2. Submit a Screenshot containing your Steps</h2>
      <button className="button" onClick={() => console.log('Upload screenshot')}>Upload</button>
      <p>Please ensure the image clearly shows your step count.</p>
    </div>
  );

  // New QR Code Page
  const QRPage = () => (
    <div className="submit-page">
      <h2>Scan QR Code</h2>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setQrResult(result.getText()); // Get the QR code result
            console.log(result.getText()); // You can handle the result here
            setCurrentPage('main'); // Go back to main after scanning
          }

          if (!!error) {
            console.error(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{qrResult ? `Scanned Result: ${qrResult}` : 'No result yet'}</p> {/* Display the scanned result */}
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
          {currentPage === 'screenshot' && <ScreenshotPage />}
          {currentPage === 'qr' && <QRPage />} {/* Add QRPage */}
        </div>
      </div>
    </div>
  );
};

export default Submit;