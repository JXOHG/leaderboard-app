
import React, { useState } from 'react'

export default function DeleteParticipant() {
  const [participantName, setParticipantName] = useState('')
  const [message, setMessage] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const handleDeleteParticipant = async () => {
    if (!participantName.trim()) {
      setMessage('Please enter a participant name.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/manual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
        },
        body: `name,steps,averageSteps\n${participantName},-1000000,0`,
      })
      
      if (response.ok) {
        setMessage(`Participant ${participantName} has been marked for deletion.`)
        setParticipantName('')
      } else {
        setMessage('Failed to process the deletion request.')
      }
    } catch (error) {
      console.error('Error deleting participant:', error)
      setMessage('An error occurred while processing the request.')
    }
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-[300px] p-4">
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        id="participantName"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        className="p-2 border rounded"
        placeholder="Enter participant name"
      />
      <button 
        onClick={handleDeleteParticipant}
        className="px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Participant
      </button>
    </div>
    {message && (
      <p className="mt-4 text-sm font-semibold text-center">
        {message}
      </p>
    )}
  </div>
)
}