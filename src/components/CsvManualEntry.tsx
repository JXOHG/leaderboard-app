import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'

interface RowData {
  id: number
  name: string
  steps: number
  averageSteps: number
  rank?: number
}

export default function ManualCSVEntry() {
  const [data, setData] = useState<RowData[]>([])
  const [newRow, setNewRow] = useState<Omit<RowData, 'id' | 'rank'>>({ name: '', steps: 0, averageSteps: 0 })
  const [editingId, setEditingId] = useState<number | null>(null)
  const API_BASE_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    updateRanksAndSort()
  }, [data])

  const updateRanksAndSort = () => {
    const sortedData = [...data].sort((a, b) => b.steps - a.steps)
    const rankedData = sortedData.map((row, index) => ({
      ...row,
      rank: index + 1
    }))
    setData(rankedData)
  }

  const handleAddRow = () => {
    const newId = Math.max(...data.map(row => row.id), 0) + 1
    setData(prevData => [...prevData, { id: newId, ...newRow, steps: Number(newRow.steps) || 0, averageSteps: Number(newRow.averageSteps) || 0 }])
    setNewRow({ name: '', steps: 0, averageSteps: 0 })
  }

  const handleEditRow = (id: number) => {
    setEditingId(id)
    const rowToEdit = data.find(row => row.id === id)
    if (rowToEdit) {
      setNewRow({ name: rowToEdit.name, steps: rowToEdit.steps, averageSteps: rowToEdit.averageSteps })
    }
  }

  const handleUpdateRow = (id: number) => {
    setData(prevData => 
      prevData.map(row => row.id === id ? { ...row, ...newRow, steps: Number(newRow.steps) || 0, averageSteps: Number(newRow.averageSteps) || 0 } : row)
    )
    setEditingId(null)
    setNewRow({ name: '', steps: 0, averageSteps: 0 })
  }

  const handleDeleteRow = (id: number) => {
    setData(prevData => prevData.filter(row => row.id !== id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRow(prev => ({
      ...prev,
      [name]: name === 'steps' || name === 'averageSteps' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleSaveToCSV = async () => {
    const csvData = Papa.unparse(data)
    
    try {
      const response = await fetch(`${API_BASE_URL}/manual`, {
        method: 'POST',
        body: csvData,
      })
      
      if (response.ok) {
        alert('Data saved successfully!')
      } else {
        alert('Failed to save data')
      }
    } catch (error) {
      console.error('Error saving CSV:', error)
      alert('An error occurred while saving the data')
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border border-gray-300 p-2 text-white">{row.rank}</td>
              <td className="border border-gray-300 p-2 text-white">
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
              <td className="border border-gray-300 p-2 text-white">
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
              <td className="border border-gray-300 p-2 text-white">
                {editingId === row.id ? (
                  <input
                    type="number"
                    name="averageSteps"
                    value={newRow.averageSteps}
                    onChange={handleInputChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row.averageSteps
                )}
              </td>
              <td className="border border-gray-300 p-2 text-white">
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
                    className="px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteRow(row.id)} 
                  className="px-2 py-1 rounded"
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
          value={newRow.steps === 0 ? '' : newRow.steps}
          onChange={handleInputChange}
          placeholder="Steps"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="averageSteps"
          value={newRow.averageSteps === 0 ? '' : newRow.averageSteps}
          onChange={handleInputChange}
          placeholder="Average Steps"
          className="p-2 border rounded"
        />
        <button 
          onClick={handleAddRow} 
          className="px-4 py-2 rounded"
        >
          Add Participant
        </button>
        <button 
          onClick={handleSaveToCSV} 
          className="px-4 py-2 rounded"
        >
          Save to CSV
        </button>
      </div>
    </div>
  )
}
