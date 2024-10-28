// Button.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SizesExample() {
  const navigate = useNavigate(); // Create a navigate function

  // Handle click event
  const handleSubmitClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <>
      <div className="mb-2">
        <Button variant="secondary" size="lg" onClick={handleSubmitClick} style={{ width: "24vw", backgroundColor: "#d9d9d9", color: "#54585A", fontWeight:"500", borderRadius: "18px", border: "#bbb", filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25)", marginTop:"2vh"}}>
          Admin Options

        </Button>
      </div>
    </>
  );
}

export default SizesExample;