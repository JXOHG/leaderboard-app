import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import uwem from "../assets/image/uwem.svg"

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
      <a href="https://unitedwayem.ca/" target="_blank" rel="noopener noreferrer" style={{ 
    display: 'block',  // Ensures the image is treated as a block element
    marginLeft: '0',   // Aligns to the left
    marginRight: 'auto' // Auto right margin helps in centering if needed
  }}>
      <img  src={uwem}/>
  </a>
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
