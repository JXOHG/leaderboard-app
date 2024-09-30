
interface CircularProgressProps{
  value?:number;
  goal?:number;
  size?:number;
  strokeWidth?:number;
}
const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  goal,
  size = 250,
  strokeWidth = 50,
}) => {
  const percentage = Math.min(100, (value / goal) * 100);
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
  const remainingSteps = Math.max(0, goal - value);
  const goalReached = value >= goal;

  return (
    <div style={{
         // Use absolute positioning
      top: 70,                // Adjust based on header height (e.g., 70px)
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      border: '2px solid #ccc',
      borderRadius: '12px',
      padding: '20px',
      width: 'fit-content',
      zIndex: 99              // Make sure it stays below the StepDisplay
    }}>
      <div style={{
        fontSize: '1.5em',
        color: '#8B0000',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        {`Goal: ${goal} steps`}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#FFB6C1',
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
            stroke="#f75658"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FE0004"
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
        textAlign:"center",
        fontSize:'20px'
      }}>
        {goalReached ? 'Goal Reached!' : `Remaining: ${remainingSteps} steps`}
      </div>
    </div>
  );
};

export default CircularProgress;
