import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Settings.css'; // Assuming your CSS file for the page styling
import LegalDisclaimer from '../components/LegalDisclaimer'; // Import the LegalDisclaimer component
import Percentage from '../components/Percentage';

import triangle from "../assets/image/triangle2.png"
import { render } from 'react-dom';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'siteInfo' | 'goal' | 'changeSitePass' | 'changeGoal' | 'legal'>('main');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to render the main page
  const renderMainPage = () => (
    <div className="settings-main-page">
      <div className="settings-header">
        <Settings size={24} />
        <h2 className="mulish-bold">Settings</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')} // Navigate to the dashboard when the back button is pressed
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div>

          <button className="settings-option mulish-regular" onClick={() => setActiveTab('siteInfo')}>
              Website Info      

              <img src={triangle} className="triangle"/>
          </button>
        <div>

        <button className="settings-option mulish-regular" onClick={() => setActiveTab('goal')}>
          Goal
          <img src={triangle} className="triangle"/>
        </button>
        <div>
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('legal')}>
          Legal
          <img src={triangle} className="triangle"/>
        </button>
        </div>
        </div>
        </div>
    </div>
  );

  // Function to render the User Info tab content
  const renderSiteInfo = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage"> {/* rectangular border that encompasses user info section */}
      <h2 className="mulish-bold">Website Info</h2>
      <p className="mulish-regular">Current Website Password: 11111 </p>
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
      <div className="settings-onpage"> {/* rectangular border that encompasses change user info section */}
        <h2 className="mulish-bold">Change Website Password</h2>
        <p></p> {/* this one just for spacing */}
        <p className="mulish-regular">Enter old password: </p>
        <input
                    type="text"
                    name="old password"
                    className="w-full p-1 border rounded"
                  />
        <p className="mulish-regular">Enter new password: </p>
        <input
                    type="text"
                    name="new password" 
                    className="w-full p-1 border rounded"
                  />
      </div>
    </div>
  );

  // Function to render the Goal tab content
  const renderGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage-goal"> {/* rectangular border that encompasses goal section */}
        <div className="text-group">
        <h2 className="mulish-bold">Fundraising Goal</h2>
        <p className="mulish-regular">Current Goal: $1000 </p>
        <div className="change-button-rectangle">
        <button className='change-option mulish-regular' onClick={() => setActiveTab("changeGoal")}>
            Change Goal
          </button>
        </div>
        </div>
        
        <div className="percentage-container">
          <Percentage/>
          </div>
      </div>
    </div>
  );

  const renderChangeGoal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('goal')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage"> {/* rectangular border that encompasses change goal section */}
        <h2 className="mulish-bold">Change Goal</h2>
        <p className="mulish-regular">Enter new goal: </p>
        <input
                    type="text"
                    name="new password" 
                    className="w-full p-1 border rounded"
                  />
      </div>
    </div>
  );

  // Function to render the Legal tab content
  const renderLegal = () => (
    <div className="settings-content">
      <button className="back-button" onClick={() => setActiveTab('main')}>
        <ArrowLeft size={24} />
      </button>
      <div className="settings-onpage"> {/* rectangular border that encompasses legal section */}
        <LegalDisclaimer /> {/* Render the LegalDisclaimer component here */}
      </div>
    </div>
  );

  // Main function to determine which content to display based on activeTab
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