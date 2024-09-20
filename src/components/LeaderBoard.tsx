// Leaderboard.tsx
import React from 'react';
import './Leaderboard.css'; // Make sure to import the CSS file

interface LeaderboardProps {
  users: { id: number; name: string; steps: number }[];
  currentUserSteps: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserSteps }) => {
  // Sort users by steps in descending order
  const sortedUsers = [...users].sort((a, b) => b.steps - a.steps);

  // Get the top 3 users
  const topUsers = sortedUsers.slice(0, 3);
  
  // Find the current user
  const currentUser = sortedUsers.find(user => user.steps === currentUserSteps);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      
      {/* Header Row */}
      <div className="leaderboard-header">
        <span className="leaderboard-header-item name">Name</span>
        <span className="leaderboard-header-item steps">Steps</span>
        <span className="leaderboard-header-item rank">Rank</span>
      </div>

      <div className="leaderboard-container">
        {topUsers.map((user, index) => (
          <div 
            key={user.id} 
            className={`leaderboard-item ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}
          >
            <span className="leaderboard-name">{user.name}</span>
            <span className="leaderboard-steps">{user.steps} steps</span>
            <span className="leaderboard-rank">{index + 1}</span>
          </div>
        ))}

        {/* Display current user's information below the top 3 */}
        {currentUser && topUsers.length === 3 && (
          <div className="current-user-info">
            <h4>Your Information:</h4>
            <div className="leaderboard-item">
              <span className="leaderboard-name">{currentUser.name}</span>
              <span className="leaderboard-steps">{currentUser.steps} steps</span>
              <span className="leaderboard-rank">{sortedUsers.indexOf(currentUser) + 1}</span>
              <span className="current-user">(You)</span>
            </div>
          </div> 
        )}
        
        {sortedUsers.length === 0 && <div>No users available</div>}
      </div>
    </div>
  );
};

export default Leaderboard;