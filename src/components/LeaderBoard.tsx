import React from 'react';
import './Leaderboard.css';

interface UserSteps {
  id: number;
  name: string;
  steps: number;
}

interface LeaderboardProps {
  users: UserSteps[];
  currentUserSteps: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserSteps }) => {
  // Sort users by steps in descending order
  const sortedUsers = [...users].sort((a, b) => b.steps - a.steps);

  return (
    <div className="leaderboard-card">
      <h1 className="leaderboard-heading">Leaderboard</h1>
      <ul className="leaderboard-list">
        {sortedUsers.map((user, index) => (
          <li key={user.id} className={user.steps === currentUserSteps ? 'current-user' : ''}>
            {index + 1}. {user.name}: {user.steps} Steps
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
