import React, { useState, useEffect } from 'react'; 
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import './Settings.css'; 
import LegalDisclaimer from '../components/LegalDisclaimer'; 
import Percentage from '../components/Percentage';
import triangle from "../assets/image/triangle2.png";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'siteInfo' | 'goal' | 'changeSitePass' | 'changeGoal' | 'legal'>('main');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [goal, setGoal] = useState<number>(1000); // State to hold the current goal
  const [newGoal, setNewGoal] = useState<number | string>(''); // State for new goal input
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  // Mock API function to change the password
  const mockApiChangePassword = (oldPassword: string, newPassword: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (oldPassword === "11111") {
          resolve("Password changed successfully.");
        } else {
          reject("Old password is incorrect.");
        }
      }, 1000);
    });
  };

  // Mock API function to fetch the goal
  const mockApiFetchGoal = () => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(1000); // Simulate fetching the goal from the server
      }, 1000);
    });
  };

  // Mock API function to update the goal
  const mockApiUpdateGoal = (goal: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Goal updated successfully.");
      }, 1000);
    });
  };

  // Fetch goal information on component mount
  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedGoal = await mockApiFetchGoal();
      setGoal(fetchedGoal);
    };
    fetchGoal();
  }, []);

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

  // Handle goal update
  const handleUpdateGoal = async () => {
    if (typeof newGoal === 'number') {
      try {
        const response = await mockApiUpdateGoal(newGoal);
        setMessage(response);
        setGoal(newGoal); // Update the goal state with the new goal
        setNewGoal(''); // Clear the input field after successful update
      } catch (error) {
        setMessage("Failed to update the goal."); // Handle any error
      }
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
        <p className="mulish-regular">Current Website Password: 11111</p>
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
          <p className="mulish-regular">Current Goal: ${goal}</p>
          <div className="change-button-rectangle">
            <button className='change-option mulish-regular' onClick={() => setActiveTab("changeGoal")}>
              Change Goal
            </button>
          </div>
        </div>
        
        <div className="percentage-container">
          <Percentage />
        </div>
      </div>
    </div>
  );

  const renderChangeGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('goal')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Goal</h2>
        <p className="mulish-regular">Enter new goal:</p>
        <input
          type="number" // Allow only numeric input for the goal
          value={newGoal}
          onChange={(e) => setNewGoal(Number(e.target.value) || '')} // Convert to number or clear input
          className="w-full p-1 border rounded"
        />
        <button className="change-option mulish-regular" onClick={handleUpdateGoal}>
          Update Goal
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
      {activeTab === 'changeGoal' && renderChangeGoal()}
      {activeTab === 'changeSitePass' && renderChangeSitePass()}
    </div>
  );
};

export default SettingsPage;