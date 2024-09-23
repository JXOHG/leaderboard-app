import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Settings.css'; // Assuming your CSS file for the page styling
import LegalDisclaimer from '../components/LegalDisclaimer'; // Import the LegalDisclaimer component
import triangle from "../assets/image/triangle.png";



const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'userInfo' | 'goal' | 'legal'>('main');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to render the main page
  const renderMainPage = () => (
    <div className="settings-main-page">
      <div className="settings-header">
        <Settings size={24} />
        <h2>Settings</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')} // Navigate to the dashboard when the back button is pressed
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div>
        <button className="settings-option" onClick={() => setActiveTab('userInfo')}>
          User Info
        <img src={triangle} className = "triangle" />
        </button>
        
        <button className="settings-option" onClick={() => setActiveTab('goal')}>
          Goal
        </button>
        <button className="settings-option" onClick={() => setActiveTab('legal')}>
          Legal
        </button>
      </div>
    </div>
  );

  // Function to render the User Info tab content
  const renderUserInfo = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <h2>User Info</h2>
      {/* Add the User Info content here */}
    </div>
  );

  // Function to render the Goal tab content
  const renderGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <h2>Goal</h2>
      {/* Add the Goal content here */}
    </div>
  );

  // Function to render the Legal tab content
  const renderLegal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <LegalDisclaimer /> {/* Render the LegalDisclaimer component here */}
    </div>
  );

  // Main function to determine which content to display based on activeTab
  return (
    <div className="settings-container">
      {activeTab === 'main' && renderMainPage()}
      {activeTab === 'userInfo' && renderUserInfo()}
      {activeTab === 'goal' && renderGoal()}
      {activeTab === 'legal' && renderLegal()}
    </div>
  );
};

export default SettingsPage;