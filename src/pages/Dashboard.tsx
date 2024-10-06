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
  const [currentSteps, setCurrentSteps] = useState(10000);
  const [currentGoals, setCurrentGoals] = useState(15000);
  const [otherUsersSteps, setOtherUsersSteps] = useState<UserSteps[]>([]);

  useEffect(() => {
    const fetchUserSteps = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data: UserSteps[] = await response.json();
        setOtherUsersSteps(data);
      } catch (error) {
        console.error("Error fetching user steps:", error);
      }
    };

    fetchUserSteps();
  }, []);

  const handleSettingsClick = () => {
    // Implement navigation to settings page or open settings modal
    console.log('Navigate to settings');
  };

  return (
    <>
    <div>
    </div>
      <div className="main">
       <Button />
       <div className="leaderboard"> <Leaderboard users={otherUsersSteps} /></div>
      </div>
    </>
  );
};

export default Dashboard;