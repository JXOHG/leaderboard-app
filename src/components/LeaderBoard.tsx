// Leaderboard.tsx
import React from 'react';
import './Leaderboard.css';

interface LeaderboardProps {
  users: { id: number; name: string; steps: number }[];
}

export default function Leaderboard({ users }: LeaderboardProps) {
  // Sort users by steps in descending order
  const sortedUsers = [...users].sort((a, b) => b.steps - a.steps);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      
      {/* Header Row */}
      <div className="leaderboard-header">
        <span className="leaderboard-header-item name">Name</span>
        <span className="leaderboard-header-item steps">Steps</span>
        <span className="leaderboard-header-item rank">Rank</span>
      </div>

      <div className="leaderboard-container" style={{ maxHeight: 'calc(80vh - 150px)', overflowY: 'auto' }}>
        {sortedUsers.map((user, index) => (
          <div 
            key={user.id} 
            className={`leaderboard-item ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}
          >
            <span className="leaderboard-name">{user.name}</span>
            <span className="leaderboard-steps">{user.steps} steps</span>
            <span className="leaderboard-rank">{index + 1}</span>
          </div>
        ))}

        {sortedUsers.length === 0 && <div>No users available</div>}
      </div>
    </div>
  );
}