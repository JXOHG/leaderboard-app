import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import uwem from "../assets/image/uwem.svg";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // This will navigate to the dashboard (home) page when clicked
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
      backgroundColor: '#fff',
      borderBottom: '2px solid #ccc',
    }}>
      <div 
        onClick={handleLogoClick} // Add onClick handler for the logo click
        style={{
          display: 'block',  // Ensures the image is treated as a block element
          marginLeft: '0',   // Aligns to the left
          marginRight: 'auto', // Auto right margin helps in centering if needed
          cursor: 'pointer' // Change cursor to pointer for better UX
        }}
      >
        <img src={uwem} alt="United Way Elgin Middlesex" /> {/* Add alt attribute for accessibility */}
      </div>
    </header>
  );
};

export default Header;
