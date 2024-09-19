// RankDisplay.tsx
import React from 'react';
import "./RankDisplay.css";

interface RankDisplayProps {
  currentSteps: number;
  otherUsersSteps: number[];
}

const RankDisplay: React.FC<RankDisplayProps> = ({ currentSteps, otherUsersSteps }) => {
  // Combine the current user's steps with others to calculate rank
  const allSteps = [...otherUsersSteps, currentSteps];

  // Sort steps in descending order to find the rank
  const sortedSteps = allSteps.sort((a, b) => b - a);
  const rank = sortedSteps.indexOf(currentSteps) + 1; // Add 1 to convert index to rank

  return (
    <div className="rank-display-card"> {/* Use the class here */}
      <h3 className="rank-display-heading">Your Current Rank:</h3>
      <div className="rank-display-number">{rank}</div> {/* Use the class here */}
    </div>
  );
};

export default RankDisplay;