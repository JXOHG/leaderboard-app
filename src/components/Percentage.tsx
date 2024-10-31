import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  value?: number;
  goal?: number;
  size?: number;
  strokeWidth?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL

// Mock API function to fetch the amount raised
const mockApiFetchAmountRaised = async () => {
  const response = await fetch(`${API_BASE_URL}/current_value`);
  const data = await response.json();
  console.log('Fetched amount raised:', data.current_value); // Log the value
  return parseInt(data.current_value, 10)
};

const fetchGoalFromFile = async () => {
  const response = await fetch(`${API_BASE_URL}/goal`);
  const data = await response.json(); 
  console.log('Fetched goal:', data.goal); // Log the goal
  return parseInt(data.goal, 10);
};


const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  goal,
  size = 220,
  strokeWidth = 30,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [currentGoal, setCurrentGoal] = useState<number>(0);

  // Fetch current amount raised and goal
  useEffect(() => {
    const fetchData = async () => {
      const fetchedValue = await mockApiFetchAmountRaised();
      const fetchedGoal = await fetchGoalFromFile(); // Fetch goal from goal.txt
      setCurrentValue(fetchedValue);
      setCurrentGoal(fetchedGoal);
    };
    fetchData();
  }, []);

  const percentage = Math.min(100, (currentValue / currentGoal) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const startAngle = 0;
  const angle = startAngle + (percentage / 100) * 360;
  const needleLength = radius;
  const triangleWidth = 10;
  const needlePoints = `
    ${size / 2},${size / 2 - needleLength} 
    ${size / 2 - triangleWidth / 2},${size / 2} 
    ${size / 2 + triangleWidth / 2},${size / 2}
  `;
  const remainingAmount = Math.max(0, currentGoal - currentValue);
  const goalReached = currentValue >= currentGoal;

  return (
    <div style={{
      top: 70,
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      border: '2px solid #ccc',
      borderRadius: '12px',
      padding: '20px',
      width: 'fit-content',
      zIndex: 99
    }}>
      <div style={{
        fontSize: '1.5em',
        color: '#8B0000',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        {`Goal: $${currentGoal} raised`}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
      }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(197, 127, 45, 0.6)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke=" rgba(197, 127, 45, 1)"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.35s' }}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />
          <polygon
            points={needlePoints}
            fill="#8B0000"
            transform={`rotate(${angle}, ${size / 2}, ${size / 2})`}
          />
        </svg>

        <div style={{ marginTop: '10px', fontSize: '2em', color: '#8B0000', fontWeight: 'bold' }}>
          {`${Math.round(percentage)}%`}
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        fontSize: '1.2em',
        color: '#8B0000',
        fontWeight: 'bold',
        textAlign: "center",
      }}>
        {goalReached ? 'Goal Reached!' : `Remaining: $${remainingAmount} to raise`}
      </div>
    </div>
  );
};

export default CircularProgress;
