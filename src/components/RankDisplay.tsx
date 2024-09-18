import React from 'react';
import './RankDisplay.css';

interface RankDisplayProps {
  currentSteps: number;
  otherUsersSteps: number[];
}

const RankDisplay: React.FC<RankDisplayProps> = ({ currentSteps, otherUsersSteps }) => {
  const totalUsers = otherUsersSteps.length + 1; // Include current user
  const usersWithHigherSteps = otherUsersSteps.filter(steps => steps > currentSteps).length;
  const rank = totalUsers - usersWithHigherSteps;

  return (
    <div className="rank-display-card">
      <h1 className="rank-display-heading">Your Rank</h1>
      <div className="rank-display-number">
        {rank} / {totalUsers}
      </div>
    </div>
  );
};

export default RankDisplay;