'use client'

import React, { useEffect, useState } from 'react'
import './StepGoalDisplay.css'

// Mock API function to fetch the current steps
const mockApiFetchSteps = async () => {
  try {
    const response = await fetch('http://localhost:5000/current_steps')
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

const fetchStepGoalFromFile = async () => {
  const response = await fetch('http://localhost:5000/step_goal')
  const data = await response.json()
  console.log('Fetched goal:', data.goal) // Log the goal
  return parseInt(data.goal, 10)
}

export default function StepGoalDisplay() {
  const [currentSteps, setCurrentSteps] = useState(0)
  const [goalSteps, setGoalSteps] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedSteps, fetchedGoal] = await Promise.all([
        mockApiFetchSteps(),
        fetchStepGoalFromFile()
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