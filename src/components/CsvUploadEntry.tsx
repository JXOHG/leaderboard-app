"use client"

import React, { useState, useEffect } from 'react'

interface RowData {
  id: number
  name: string
  steps: number
  rank?: number
}

export default function CSVUploadEntry() {
  const [csvData, setCsvData] = useState<RowData[]>([])

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
      const formData = new FormData()
      formData.append('file', file)
      fetch('http://localhost:5000/csv', {
        method: "POST",
        body: formData,
      })
      .then(response => {
        if (!response.ok){
          console.log('bad')
        }
      })

    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />

      {csvData.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Rank</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Steps</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-300 p-2">{row.rank}</td>
                <td className="border border-gray-300 p-2">{row.name}</td>
                <td className="border border-gray-300 p-2">{row.steps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}