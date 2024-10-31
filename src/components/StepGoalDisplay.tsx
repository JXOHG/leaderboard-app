

import React, { useEffect, useState } from 'react'
import './StepGoalDisplay.css'

const API_BASE_URL = import.meta.env.VITE_API_URL

const fetchCurrentSteps = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/current_steps`)
    if (!response.ok) {
      throw new Error('Failed to fetch current steps')
    }
    const data = await response.json()
    console.log('Fetched total step count:', data.current_steps)
    return parseInt(data.current_steps, 10)
  } catch (error) {
    console.error('Error fetching current steps:', error)
    return 0
  }
}

const fetchStepGoal = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/step_goal`)
    if (!response.ok) {
      throw new Error('Failed to fetch step goal')
    }
    const data = await response.json()
    console.log('Fetched step goal:', data.step_goal)
    return parseInt(data.step_goal, 10)
  } catch (error) {
    console.error('Error fetching step goal:', error)
    return 10000 // Default step goal
  }
}

export default function StepGoalDisplay() {
  const [currentSteps, setCurrentSteps] = useState(0)
  const [goalSteps, setGoalSteps] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedSteps, fetchedGoal] = await Promise.all([
        fetchCurrentSteps(),
        fetchStepGoal()
      ])
      setCurrentSteps(fetchedSteps)
      setGoalSteps(fetchedGoal)
    }
    fetchData()
  }, [])

  const progress = Math.min((currentSteps / goalSteps) * 100, 100)
  const stepsLeft = Math.max(goalSteps - currentSteps, 0)

  return (
    <div className="step-goal-display">
      <div className="step-count mulish-bold">{currentSteps.toLocaleString()} Total Steps</div>
      <div className="step-goal mulish-regular">{stepsLeft.toLocaleString()} steps left to meet current goal!</div>
      <div className="progress-bar">
        <div className="custom-progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}