import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SizesExample() {
  const navigate = useNavigate(); // Create a navigate function

  // Handle click event
  const handleSubmitClick = () => {
     //  PUT SOME PAGE TO NAVIGATE TO HERE -- page for editing goal
  };

  return (
    <>
      <div className="mb-2">
        <Button variant="secondary" size="lg" onClick={handleSubmitClick}>
          Change Goal
        </Button>
      </div>
    </>
  );
}

export default SizesExample;