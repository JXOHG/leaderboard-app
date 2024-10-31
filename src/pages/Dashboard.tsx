import React, { useEffect, useState } from 'react';
import StepDisplay from '../components/StepDisplay';
import RankDisplay from '../components/RankDisplay';
import Leaderboard from '../components/LeaderBoard';
import './Dashboard.css';
import AdminButton from "../components/AdminButton";
import StepGoalDisplay from '../components/StepGoalDisplay';
import { Anchor } from 'lucide-react';

interface UserSteps {
  id: number;
  name: string;
  steps: number;
}

const Dashboard: React.FC = () => {
  const [otherUsersSteps, setOtherUsersSteps] = useState<UserSteps[]>([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const csvFilePath = `${API_BASE_URL}/csv`; // Update to the correct path

  useEffect(() => {
    const fetchUserSteps = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
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
    </>
  );
};

export default Dashboard;