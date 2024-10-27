import React, { useState, useEffect } from 'react'; 
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import './Settings.css'; 
import LegalDisclaimer from '../components/LegalDisclaimer'; 
import Percentage from '../components/Percentage';
import triangle from "../assets/image/triangle2.png";
import Button from "../components/Button";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'siteInfo' | 'goal' | 'changeSitePass' | 'changeDonationGoal' | 'changeStepGoal' | 'legal'>('main');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [goal, setGoal] = useState<number>(0); // Initialize state to hold the current goal
  const [newDonationGoal, setNewDonationGoal] = useState<number | string>(''); // State for new donation goal input
  const [currentValue, setCurrentValue] = useState<number | string>(''); // State for new goal input
  const [newCurrentValue, setNewCurrentValue] = useState<number | string>(''); // State for new goal input
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

   // Fetch goal on component mount
  
    const fetchGoal = async () => {
      try {
        const response = await fetch('http://localhost:5000/goal');
        const data = await response.json();
        if (response.ok) {
          setGoal(data.goal);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
        setMessage('Failed to fetch goal');
      }
    };

    const fetchCurrentValue = async () => {
      try {
        const response = await fetch('http://localhost:5000/current_value');
        const data = await response.json();
        if (response.ok) {
          setCurrentValue(data.current_value); // Set the current value
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error('Error fetching current value:', error);
        setMessage('Failed to fetch current value');
      }
    };
    useEffect(() => {
    fetchGoal();
    fetchCurrentValue(); // Fetch current value on mount
  }, []);



  const handleUpdateGoal = async () => {
    if (typeof newDonationGoal === 'number') {
        try {
            const response = await fetch('http://localhost:5000/goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ goal: newDonationGoal }),
            });

            const data = await response.json();

            // Check if the response was successful
            if (response.ok) {
                setMessage(data.message); // This should indicate success
                // Re-fetch the updated goal
                await fetchGoal();
            } else {
                setMessage(data.message || 'Failed to update goal');
            }
        } catch (error) {
            console.error('Error updating goal:', error);
            setMessage('Failed to update goal');
        }
    } else {
        setMessage('Please enter a valid number for the goal.');
    }
};
const handleUpdateCurrentValue = async () => {
  if (typeof newCurrentValue === 'number') {
    try {
      const response = await fetch('http://localhost:5000/current_value', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ current_value: newCurrentValue }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        await fetchCurrentValue(); // Re-fetch the updated current value
      } else {
        setMessage(data.message || 'Failed to update current value');
      }
    } catch (error) {
      console.error('Error updating current value:', error);
      setMessage('Failed to update current value');
    }
  } else {
    setMessage('Please enter a valid number for the current value.');
  }
};

  // Handle password change
  const handleChangePassword = async () => {
    try {
      const response = await mockApiChangePassword(oldPassword, newPassword);
      setMessage(response);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error);
    }
  };



  const renderMainPage = () => (
    <div className="settings-main-page">
      <div className="settings-header">
        <Settings size={24} />
        <h2 className="mulish-bold">Settings</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div>
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('siteInfo')}>
          Website Info      
          <img src={triangle} className="triangle" />
        </button>
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('goal')}>
          Goal
          <img src={triangle} className="triangle" />
        </button>
        
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('legal')}>
          Legal
          <img src={triangle} className="triangle" />
        </button>
        <div className="submit-button-wrapper mulish-bold">
        <Button />
      </div>
      </div>
    </div>
  );

  const renderSiteInfo = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage">
        <h2 className="mulish-bold">Website Info</h2>
        <div className="change-button-rectangle">
          <button className='change-option mulish-regular' onClick={() => setActiveTab("changeSitePass")}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderChangeSitePass = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('siteInfo')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Website Password</h2>
        <p className="mulish-regular">Enter old password:</p>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-1 border rounded"
        />
        <br></br>
        <p className="mulish-regular">Enter new password:</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-1 border rounded"
        />
        <button className="change-option mulish-regular" onClick={handleChangePassword}>
          Change Password
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
 
  const renderGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage-goal">
        <div className="text-group">
          <h2 className="mulish-bold">Fundraising Goal</h2>
          <p className="mulish-regular">Current Goal: ${goal}</p> {/* Display the current goal */}
          <h2 className="mulish-bold">Funds raised currently</h2>
          <p className="mulish-regular">Current amount raised: ${currentValue}</p> {/* Display the current goal */}
          <div className="change-button-rectangle">
            <button className='change-option mulish-regular' onClick={() => setActiveTab("changeDonationGoal")}>
              Change Values
            </button>
          </div>
          <br></br>
          <div className="change-button-rectangle">
            <button className='change-option mulish-regular' onClick={() => setActiveTab("changeStepGoal")}>
              Change Step Goal
            </button>
          </div>
        </div>
        <div className="percentage-container">
          <Percentage />
        </div>
      </div>
    </div>
  );

  const renderChangeStepGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('goal')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Step Goal</h2>
        <p className="mulish-regular">Enter New Goal:</p>
        <input
          type="number" // Allow only numeric input for the goal
          value={newDonationGoal}
          onChange={(e) => setNewDonationGoal(Number(e.target.value) || '')} // Convert to number or clear input
          className="w-full p-1 border rounded"
        />
        <br></br>
        <button className="change-option mulish-regular" onClick={handleUpdateGoal}>
          Update Goal
        </button>
        {message && <p className="message">{message}</p>} {/* Display message for goal update */}
      </div>
    </div>
  );

  const renderChangeDonationGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('goal')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Donation Goal</h2>
        <p className="mulish-regular">Enter New Goal:</p>
        <input
          type="number" // Allow only numeric input for the goal
          value={newDonationGoal}
          onChange={(e) => setNewDonationGoal(Number(e.target.value) || '')} // Convert to number or clear input
          className="w-full p-1 border rounded"
        />
        <br></br>
        <button className="change-option mulish-regular" onClick={handleUpdateGoal}>
          Update Goal
        </button>
        <h2 className="mulish-bold">Change Amounts currently raised</h2>
        <p className="mulish-regular">Enter Value:</p>
        <input
          type="number" // Allow only numeric input for the goal
          value={newCurrentValue}
          onChange={(e) => setNewCurrentValue(Number(e.target.value) || '')} // Convert to number or clear input
          className="w-full p-1 border rounded"
        />
        <br></br>
        <button className="change-option mulish-regular" onClick={handleUpdateCurrentValue}>
          Update Value
        </button>
        {message && <p className="message">{message}</p>} {/* Display message for goal update */}
      </div>
    </div>
  );

  const renderLegal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage">
        <LegalDisclaimer />
      </div>
    </div>
  );


  return (
    <div className="settings-container">
      {activeTab === 'main' && renderMainPage()}
      {activeTab === 'siteInfo' && renderSiteInfo()}
      {activeTab === 'goal' && renderGoal()}
      {activeTab === 'legal' && renderLegal()}
      {activeTab === 'changeDonationGoal' && renderChangeDonationGoal()}
      {activeTab === 'changeStepGoal' && renderChangeStepGoal()}
      {activeTab === 'changeSitePass' && renderChangeSitePass()}
    </div>
  );
};

export default SettingsPage;
