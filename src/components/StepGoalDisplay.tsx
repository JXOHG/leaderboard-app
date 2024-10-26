import React from 'react';
import './StepGoalDisplay.css';

interface StepGoalDisplayProps {
  currentSteps: number;
  goalSteps: number;
}

export default function StepGoalDisplay({ currentSteps, goalSteps }: StepGoalDisplayProps) {
  const progress = (currentSteps / goalSteps) * 100;

  return (
    <div className="step-goal-display">
      <div className="step-count mulish-bold">{currentSteps.toLocaleString()} Total Steps</div>
      <div className="step-goal mulish-regular">{goalSteps.toLocaleString()} steps left to meet current goal!</div>
      <div className="progress-bar">
        <div className="custom-progress" style={{ width: `${progress}%`  }}></div>
      </div>
    </div>
  );
}