"use client"

import React, { useState, useEffect } from 'react'

// Mock CSV data
const mockCSVData = [
  { id: 1, name: 'John Doe', steps: 30 },
  { id: 2, name: 'Jane Smith', steps: 25 },
  { id: 3, name: 'Bob Johnson', steps: 35 },
]

interface RowData {
  id: number
  name: string
  steps: number
  rank?: number
}

export default function CSVUploader() {
  const [csvData, setCsvData] = useState<RowData[]>(mockCSVData)
  const [newRow, setNewRow] = useState<Omit<RowData, 'id' | 'rank'>>({ name: '', steps: 0 })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    updateRanksAndSort()
  }, [csvData])

  const updateRanksAndSort = () => {
    const sortedData = [...csvData].sort((a, b) => b.steps - a.steps)
    const rankedData = sortedData.map((row, index) => ({
      ...row,
      rank: index + 1
    }))
    setCsvData(rankedData)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
      // In a real scenario, you would parse the CSV file here
      // For now, we'll just use our mock data
      setCsvData(mockCSVData)
    }
  }

  const handleAddRow = () => {
    const newId = Math.max(...csvData.map(row => row.id), 0) + 1
    setCsvData(prevData => [...prevData, { id: newId, ...newRow, steps: Number(newRow.steps) || 0 }])
    setNewRow({ name: '', steps: 0 })
  }

  const handleEditRow = (id: number) => {
    setEditingId(id)
    const rowToEdit = csvData.find(row => row.id === id)
    if (rowToEdit) {
      setNewRow({ name: rowToEdit.name, steps: rowToEdit.steps })
    }
  }

  const handleUpdateRow = (id: number) => {
    setCsvData(prevData => 
      prevData.map(row => row.id === id ? { ...row, ...newRow, steps: Number(newRow.steps) || 0 } : row)
    )
    setEditingId(null)
    setNewRow({ name: '', steps: 0 })
  }

  const handleDeleteRow = (id: number) => {
    setCsvData(prevData => prevData.filter(row => row.id !== id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRow(prev => ({
      ...prev,
      [name]: name === 'steps' ? value : value
    }))
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSV Data Manager</h1>
      
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />

      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Rank</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Steps</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row) => (
            <tr key={row.id}>
              <td className="border border-gray-300 p-2">{row.rank}</td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  <input
                    type="text"
                    name="name"
                    value={newRow.name}
                    onChange={handleInputChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  <input
                    type="number"
                    name="steps"
                    value={newRow.steps}
                    onChange={handleInputChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row.steps
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  <button 
                    onClick={() => handleUpdateRow(row.id)} 
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEditRow(row.id)} 
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteRow(row.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          name="name"
          value={newRow.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="steps"
          value={newRow.steps}
          onChange={handleInputChange}
          placeholder="Steps"
          className="p-2 border rounded"
        />
        <button 
          onClick={handleAddRow} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Row
        </button>
      </div>
    </div>
  )
}