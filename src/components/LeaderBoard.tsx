import React, { useState, useEffect } from 'react'; 
import Papa from 'papaparse';
import './Leaderboard.css';

interface User {
  id: number;
  name: string;
  steps: number;
  distance: number; // This will represent Avg Daily Steps now
}

interface LeaderboardProps {
  csvFilePath: string;
}

interface CSVRow {
  Name: string; // Updated to match your CSV header
  'Total Steps': string;
  'Avg Daily Steps': string; // Updated to use this header
  [key: string]: string; // Allow for additional fields
}

export default function Leaderboard({ csvFilePath }: LeaderboardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(csvFilePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const parsedUsers = (results.data as CSVRow[])
              .filter((row) => row.Name && row['Total Steps']) // Filter out any incomplete rows
              .map((row, index) => ({
                id: index,
                name: row.Name, // Use 'Name' here
                steps: parseInt(row['Total Steps'].replace(/,/g, ''), 10) || 0,
                distance: parseFloat(row['Avg Daily Steps']) || 0 // Use 'Avg Daily Steps' here
              }));
            setUsers(parsedUsers);
            setIsLoading(false);
          },
          error: (error: Error) => {
            console.error('Error parsing CSV:', error);
            setError(`Error parsing CSV: ${error.message}`);
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
        setError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
      }
    };

    fetchCSV();
  }, [csvFilePath]);

  // Sort users by steps in descending order
  const sortedUsers = [...users].sort((a, b) => b.steps - a.steps);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="leaderboard">
      <h3 className="mulish-bold">Leaderboard</h3>
      
      {/* Header Row */}
      <div className="leaderboard-header">
        <span className="leaderboard-header-item name mulish-bold">Name</span>
        <span className="leaderboard-header-item steps mulish-bold">Steps</span>
        <span className="leaderboard-header-item distance mulish-bold">Avg Daily Steps</span>
        <span className="leaderboard-header-item rank mulish-bold">Rank</span>
      </div>

      <div className="leaderboard-container" style={{ maxHeight: 'calc(80vh - 150px)', overflowY: 'auto' }}>
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user, index) => (
            <div 
              key={user.id} 
              className={`leaderboard-item ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}
            >
              <span className="leaderboard-name mulish-bold">{user.name}</span>
              <span className="leaderboard-steps mulish-bold">{user.steps.toLocaleString()} steps</span>
              <span className="leaderboard-distance mulish-bold">{user.distance.toFixed(2)} steps</span> {/* Changed to steps */}
              <span className="leaderboard-rank mulish-bold">{index + 1}</span>
            </div>
          ))
        ) : (
          <div>No users available</div>
        )}
      </div>
    </div>
  );
}
