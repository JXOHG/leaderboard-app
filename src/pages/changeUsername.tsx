import React, { useState } from 'react';
import { ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './changeUsername.css'; // Assuming your CSS file for the page styling

const changeUsername: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook


  return (
    <div className="main">
        { /* dont know yet why this wont display */}
        <h2>Change Username</h2>
    </div>
  )
};

export default changeUsername;