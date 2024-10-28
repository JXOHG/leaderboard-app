import React, { useEffect, useState } from 'react';
import StepDisplay from '../components/StepDisplay';
import RankDisplay from '../components/RankDisplay';
import Leaderboard from '../components/LeaderBoard';
import './Dashboard.css';
import AdminButton from "../components/AdminButton";
import StepGoalDisplay from '../components/StepGoalDisplay';

interface UserSteps {
  id: number;
  name: string;
  steps: number;
}

const Dashboard: React.FC = () => {
  const [currentSteps, setCurrentSteps] = useState(10000);
  const [currentGoals, setCurrentGoals] = useState(15000);
  const [otherUsersSteps, setOtherUsersSteps] = useState<UserSteps[]>([]);
  const csvFilePath = '/main.csv';


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
      <div className="main">
        <div className="leaderboard">
          <Leaderboard csvFilePath={csvFilePath} />
        </div>
        <div className="side-by-side">
          <div className="step-goal-wrapper">
            <StepGoalDisplay/>
          </div>
          <div className="submit-button-wrapper mulish-bold">
          </div>
        </div>
      </div>
      <AdminButton/>
    </>
  );
};

export default Dashboard;