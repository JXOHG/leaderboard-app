import React from 'react';

interface CircularProgressProps {
  value: number; // Current value
  goal: number;  // Goal value
  size?: number; // Size of the SVG
  strokeWidth?: number; // Width of the circle stroke
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  goal,
  size = 100,
  strokeWidth = 15, // Thicker circle
}) => {
  // Calculate the percentage
  const percentage = Math.min(100, (value / goal) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke-dasharray and stroke-dashoffset (from 12 o'clock)
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Calculate the angle for the needle (starting from 12 o'clock or -90 degrees)
  const startAngle = 0; // 12 o'clock position
  const angle = startAngle + (percentage / 100) * 360; // Full circle progress

  // Length of the needle (triangle height)
  const needleLength = radius;

  // Define the points for the triangular needle (equilateral triangle centered at the middle)
  const triangleWidth = 10; // Width of the base of the triangle (the arrow's thickness)
  const needlePoints = `
    ${size / 2},${size / 2 - needleLength} 
    ${size / 2 - triangleWidth / 2},${size / 2} 
    ${size / 2 + triangleWidth / 2},${size / 2}
  `;

  // Calculate the remaining steps to reach the goal
  const remainingSteps = Math.max(0, goal - value);

  // Check if the goal is reached
  const goalReached = value >= goal;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#fff', // White outer rectangle
      border: '2px solid #ccc', // Border for white rectangle
      borderRadius: '12px', // Rounded corners for the white rectangle
      padding: '20px', // Space around the pink rectangle
      width: 'fit-content', // Adjust width to fit content
    }}>
      {/* Goal Text inside the white rectangle */}
      <div style={{ 
        fontSize: '1.5em', 
        color: '#8B0000', 
        marginBottom: '20px', 
        fontWeight: 'bold' 
      }}>
        {`Goal: ${goal} steps`}
      </div>

      {/* Pink Rectangle containing the circular progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #ccc', // Border for pink rectangle
        borderRadius: '10px', // Rounded corners for pink rectangle
        padding: '20px', // Space between the box and the circle
        backgroundColor: '#FFB6C1', // Pink background
        flexDirection: 'column' // Stack elements vertically
      }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f75658" // Background circle color
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FE0004" // Progress circle color
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            strokeLinecap="round" // Smooth rounded end to the stroke
            style={{ transition: 'stroke-dashoffset 0.35s' }}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`} // Rotate circle to start from the top
          />
          {/* Triangular Needle */}
          <polygon
            points={needlePoints}
            fill="#8B0000" // Needle color
            transform={`rotate(${angle}, ${size / 2}, ${size / 2})`} // Rotate needle based on percentage from top
          />
        </svg>

        {/* Percentage Text */}
        <div style={{ marginTop: '10px', fontSize: '2em', color: ' #8B0000', fontWeight: 'bold' }}>
          {`${Math.round(percentage)}%`}
        </div>
      </div>

      {/* Remaining Steps or Goal Reached Text */}
      <div style={{ 
        marginTop: '20px', 
        fontSize: '1.2em', 
        color: '#8B0000', 
        fontWeight: 'bold' 
      }}>
        {goalReached ? 'Goal Reached!' : `Remaining: ${remainingSteps} steps`}
      </div>
    </div>
  );
};

export default CircularProgress;
