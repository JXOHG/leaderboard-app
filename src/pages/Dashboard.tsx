// App.tsx
import React, { useEffect, useState } from 'react';
import StepDisplay from '../components/StepDisplay';
import RankDisplay from '../components/RankDisplay';
import Leaderboard from '../components/LeaderBoard';
import Percentage from '../components/Percentage';

import './Dashboard.css';
import Button from "../components/Button";

interface UserSteps {
  id: number;
  name: string;
  steps: number;
}

const Dashboard: React.FC = () => {
  const [currentSteps, setCurrentSteps] = useState(8500); // Example current steps
  const [currentGoals, setCurrentGoals] = useState(10000); // Example current goals
  const [otherUsersSteps, setOtherUsersSteps] = useState<UserSteps[]>([]);

  // Fetch user step data
  useEffect(() => {
    const fetchUserSteps = async () => {
      try {
        const response = await fetch('http://localhost:5000/users'); // Use the JSON server URL
        const data: UserSteps[] = await response.json();
        setOtherUsersSteps(data);
      } catch (error) {
        console.error("Error fetching user steps:", error);
      }
    };

    fetchUserSteps();
  }, []);

  return (
    <>
      <div className="main">
      
        <StepDisplay currentSteps={currentSteps} />
        <RankDisplay currentSteps={currentSteps} otherUsersSteps={otherUsersSteps.map(user => user.steps)} />
        <Button />
        
       
        <Leaderboard users={otherUsersSteps} currentUserSteps={currentSteps} />
      
        <div className="percentage-container">
          <Percentage value={currentSteps} goal={currentGoals} />
        </div >
        
        
      </div>
      
    </>
  );
};

export default Dashboard;
