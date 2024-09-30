// Button.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SizesExample() {
  const navigate = useNavigate(); // Create a navigate function

  // Handle click event
  const handleSubmitClick = () => {
    navigate('/submit'); // Navigate to the Submit page
  };

  return (
    <>
      <div className="mb-2">
        <Button variant="secondary" size="lg" onClick={handleSubmitClick}>
          Submit Steps
        </Button>
      </div>
    </>
  );
}

export default SizesExample;