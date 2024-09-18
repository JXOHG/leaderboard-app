import React, { useEffect, useState } from 'react';
import StepDisplay from './components/StepDisplay';
import RankDisplay from './components/RankDisplay';
import Leaderboard from './components/LeaderBoard'; // Import the Leaderboard component
import './App.css';
import Footer from './components/Footer';
import Percentage from './components/Percentage';

interface UserSteps {
  id: number;
  name: string;
  steps: number;
}

const App: React.FC = () => {
  const [currentSteps, setCurrentSteps] = useState(8500); // Example current steps
  const [currentGoals, setCurrentGoals] = useState(10000); // Example current steps
  const [otherUsersSteps, setOtherUsersSteps] = useState<UserSteps[]>([]);

  // Fetch user step data
  useEffect(() => {
    const fetchUserSteps = async () => {
      try {
        const response = await fetch('http://localhost:5000/users'); // Replace with your API endpoint
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
      <Leaderboard users={otherUsersSteps} currentUserSteps={currentSteps} /> {/* Pass users to Leaderboard */}
      <Percentage value={currentSteps} goal={currentGoals}/>
    </div>
    <Footer className="footer"/>

</>
  );
};

export default App;