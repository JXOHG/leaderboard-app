import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings'); // This will navigate to the settings page when clicked
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
      backgroundColor: '#fff',
      borderBottom: '2px solid #ccc',
    }}>
      <button
        onClick={handleSettingsClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#666',
        }}
        aria-label="Go to settings"
      >
        <Settings size={24} />
      </button>
    </header>
  );
};

export default Header;
