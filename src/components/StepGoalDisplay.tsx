'use client'

import React, { useEffect, useState } from 'react'
import './StepGoalDisplay.css'

const API_BASE_URL = 'http://localhost:5000'

const fetchCurrentSteps = async () => {
  const response = await fetch(`${API_BASE_URL}/current_steps`)
  const data = await response.json()
  console.log('Fetched total step count:', data.current_steps)
  return parseInt(data.current_steps, 10)
}

const fetchStepGoal = async () => {
  const response = await fetch(`${API_BASE_URL}/step_goal`)
  const data = await response.json()
  console.log('Fetched step goal:', data.step_goal)
  return parseInt(data.step_goal, 10)
}

export default function StepGoalDisplay() {
  const [currentSteps, setCurrentSteps] = useState(0)
  const [goalSteps, setGoalSteps] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [fetchedSteps, fetchedGoal] = await Promise.all([
        fetchCurrentSteps(),
        
        fetchStepGoal()
      ])
      setCurrentSteps(fetchedSteps)
      setGoalSteps(fetchedGoal)
      setError(null)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="step-goal-display">Loading...</div>
  }

  if (error) {
    return <div className="step-goal-display error">{error}</div>
  }

  const progress = goalSteps > 0 ? Math.min((currentSteps / goalSteps) * 100, 100) : 0
  const stepsLeft = Math.max(goalSteps - currentSteps, 0)

  return (
    <div className="step-goal-display">
      <div className="step-count mulish-bold">{currentSteps.toLocaleString()} Total Steps</div>
      {goalSteps > 0 ? (
        <>
          <div className="step-goal mulish-regular">
            {
              `${stepsLeft.toLocaleString()} steps left to meet current goal!`
            }
          </div>
          <div className="progress-bar">
            <div className="custom-progress" style={{ width: `${progress}%` }}></div>
          </div>
        </>
      ) : (
        <div className="step-goal mulish-regular">No step goal set. Please set a goal in the settings.</div>
      )}
    </div>
  )
}