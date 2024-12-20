import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import LegalDisclaimer from '../components/LegalDisclaimer';
import Percentage from '../components/Percentage';
import triangle from "../assets/image/triangle2.png";
import SubmitStepsButton from "../components/Button";
import Button from 'react-bootstrap/Button';
import DeleteParticipant from './DeleteParticipant';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'siteInfo' | 'goal' | 'changeSitePass' | 'changeGoal' | 'changeStepGoal' | 'deleteParticipant' | 'legal'>('main');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [goal, setGoal] = useState<number>(0);
  const [newGoal, setNewGoal] = useState<number | string>('');
  const [stepGoal, setStepGoal] = useState<number>(0);
  const [newStepGoal, setNewStepGoal] = useState<number | string>('');
  const [currentValue, setCurrentValue] = useState<number | string>('');
  const [newCurrentValue, setNewCurrentValue] = useState<number | string>('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchGoal = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/goal`);
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
      const response = await fetch(`${API_BASE_URL}/current_value`);
      const data = await response.json();
      if (response.ok) {
        setCurrentValue(data.current_value);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error fetching current value:', error);
      setMessage('Failed to fetch current value');
    }
  };

  const fetchStepGoal = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/step_goal`);
      const data = await response.json();
      if (response.ok) {
        setStepGoal(data.step_goal);
      } else {
        setMessage(data.message || 'Failed to fetch step goal');
      }
    } catch (error) {
      console.error('Error fetching step goal:', error);
      setMessage('Failed to fetch step goal');
    }
  };

  useEffect(() => {
    fetchGoal();
    fetchCurrentValue();
    fetchStepGoal();
  }, []);

  const handleUpdateGoal = async () => {
    if (typeof newGoal === 'number') {
      try {
        const response = await fetch(`${API_BASE_URL}/goal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal: newGoal }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
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
        const response = await fetch(`${API_BASE_URL}/current_value`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_value: newCurrentValue }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          await fetchCurrentValue();
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

  const changePasswordDisabled = oldPassword === '' || newPassword == ''
  const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/changepw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: sessionStorage.getItem('USERNAME'),
          oldPassword: oldPassword,
          newPassword: newPassword
        })
      })

      if (!response.ok) {
        setMessage("Incorrect password. Please try again.")
      } else {
        setMessage("Password successfully changed!")
      }

      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      // Handle the error correctly
      console.log(error)
    }
  };

  const handleUpdateStepGoal = async () => {
    if (typeof newStepGoal === 'number') {
      try {
        const response = await fetch(`${API_BASE_URL}/step_goal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ step_goal: newStepGoal }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          await fetchStepGoal();
          setNewStepGoal('');
        } else {
          setMessage(data.message || 'Failed to update step goal');
        }
      } catch (error) {
        console.error('Error updating step goal:', error);
        setMessage('Failed to update step goal');
      }
    } else {
      setMessage('Please enter a valid number for the step goal.');
    }
  };

  const renderSubPageHeader = (title: string, onBack: () => void) => (
    <div className="settings-header">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={24} />
      </button>
      <h2 className="mulish-bold">{title}</h2>
    </div>
  );

  const renderMainPage = () => (
    <div className="settings-main-page">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={24} />
        </button>
        <h2 className="mulish-bold">Administrative Settings</h2>
      </div>

      <div>
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('siteInfo')}>
          Admin Settings      
          <img src={triangle} className="triangle" alt="triangle" />
        </button>
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('goal')}>
          Goal
          <img src={triangle} className="triangle" alt="triangle" />
        </button>
        <button className="settings-option mulish-regular" onClick={() => setActiveTab('legal')}>
          Legal
          <img src={triangle} className="triangle" alt="triangle" />
        </button>
        <div className="submit-button">
          <div className="submit-button"><SubmitStepsButton/></div>
          <div className="submit-button">
            <Button onClick={() => setActiveTab('deleteParticipant')} variant="secondary" size="lg" style={{ width: "24vw", backgroundColor: "#d9d9d9", color: "#54585A", fontWeight:"500", borderRadius: "18px", border: "#bbb", filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25)", marginTop:"2vh"}}>Delete Participant</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSiteInfo = () => (
    <div className="settings-content">
      {renderSubPageHeader("", () => setActiveTab('main'))}
      <div className="settings-onpage">
        <h2 className="mulish-bold">Admin Settings</h2>
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
      {renderSubPageHeader("", () => setActiveTab('siteInfo'))}
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Website Password</h2>
        <p className="mulish-regular">Enter old password:</p>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-1 border rounded"
        />
        <br />
        <p className="mulish-regular">Enter new password:</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-1 border rounded"
        />
        <button className="change-option mulish-regular" 
          type="submit" onClick={handleChangePassword}
        >
          Change Password
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );

  const renderGoal = () => (
    <div className="settings-content">
      {renderSubPageHeader("", () => setActiveTab('main'))}
      <div className="settings-onpage-goal">
        <div className="text-group">
          <h2 className="mulish-bold">Fundraising Goal</h2>
          <p className="mulish-regular">Current Goal: ${goal}</p>
          <h2 className="mulish-bold">Funds raised currently</h2>
          <p className="mulish-regular">Current amount raised: ${currentValue}</p>
          <div className="change-button-rectangle">
            <button className='change-option mulish-regular' onClick={() => setActiveTab("changeGoal")}>
              Change Values
            </button>
          </div>
          <br />
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

  const renderChangeGoal = () => (
    <div className="settings-content">
      {renderSubPageHeader("", () => setActiveTab('goal'))}
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Donation Goal</h2>
        <p className="mulish-regular">Enter New Goal:</p>
        <input
          type="number"
          value={newGoal}
          onChange={(e) => setNewGoal(Number(e.target.value) || '')}
          className="w-full p-1 border rounded"
        />
        <br />
        <button className="change-option mulish-regular" onClick={handleUpdateGoal}>
          Update Goal
        </button>
        <h2 className="mulish-bold">Change Amounts currently raised</h2>
        <p className="mulish-regular">Enter Value:</p>
        <input
          type="number"
          value={newCurrentValue}
          onChange={(e) => setNewCurrentValue(Number(e.target.value) || '')}
          className="w-full p-1 border rounded"
        />
        <br />
        <button className="change-option mulish-regular" onClick={handleUpdateCurrentValue}>
          Update Value
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );

  const renderChangeStepGoal = () => (
    <div className="settings-content">
      {renderSubPageHeader("", () => setActiveTab('goal'))}
      <div className="settings-onpage">
        <h2 className="mulish-bold">Change Step Goal</h2>
        <p className="mulish-regular">Current Step Goal: {stepGoal}</p>
        <p className="mulish-regular">Enter New Goal:</p>
        <input
          type="number"
          value={newStepGoal}
          onChange={(e) => setNewStepGoal(Number(e.target.value) || '')}
          className="w-full p-1 border rounded"
        />
        <br />
        <button className="change-option mulish-regular" onClick={handleUpdateStepGoal}>
          Update Goal
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );


  const renderDeleteParticipant = () => (
  <div className="settings-content">
    {renderSubPageHeader("", () => setActiveTab('main'))}
    <div className="settings-onpage flex align-items-center justify-center min-h-[calc(100vh-100px)]">
    <h2 className="mulish-bold">Delete Participant</h2>
      <DeleteParticipant />
    </div>
  </div>
);

  const renderLegal = () => (
    <div className="settings-content">
      {renderSubPageHeader("", () => setActiveTab('main'))}
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
      {activeTab === 'deleteParticipant' && renderDeleteParticipant()}
      {activeTab === 'changeStepGoal' && renderChangeStepGoal()}
      {activeTab === 'changeSitePass' && renderChangeSitePass()}
    </div>
  );
};

export default SettingsPage;