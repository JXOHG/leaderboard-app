import React from 'react';
import './StepDisplay.css';

interface StepDisplayProps {
  currentSteps: number;
}

const StepDisplay: React.FC<StepDisplayProps> = ({ currentSteps }) => {
  return (
    <div className="step-display-card">
      <div className="step-display-content">
        <h1 className="step-display-heading">Steps Taken</h1>
        <div className="step-display-number">
          {currentSteps}<span className="step-display-text">Steps</span>
        </div>
      </div>
    </div>
  );
};

export default StepDisplay;
