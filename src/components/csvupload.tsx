import React, { useState } from 'react';

// Mock CSV data
const mockCSVData = [
  { id: 1, name: 'John Doe', steps: 30},
  { id: 2, name: 'Jane Smith', steps: 25},
  { id: 3, name: 'Bob Johnson', steps: 35},
];

const CSVUploader = () => {
  const [csvData, setCsvData] = useState(mockCSVData);
  const [newRow, setNewRow] = useState({ name: '', steps: ''});
  const [editingId, setEditingId] = useState(null);

  const handleFileUpload = (event) => {
    // Mock file upload
    console.log('File selected:', event.target.files[0].name);
    // In a real scenario, you would parse the CSV file here
    // For now, we'll just use our mock data
    setCsvData(mockCSVData);
  };

  const handleAddRow = () => {
    setCsvData([...csvData, { id: csvData.length + 1, ...newRow }]);
    setNewRow({ name: '', steps: ''});
  };

  const handleEditRow = (id) => {
    setEditingId(id);
  };

  const handleUpdateRow = (id) => {
    setCsvData(csvData.map(row => row.id === id ? { ...row, ...newRow } : row));
    setEditingId(null);
    setNewRow({ name: '', steps: ''});
  };

  const handleDeleteRow = (id) => {
    setCsvData(csvData.filter(row => row.id !== id));
  };

  const handleInputChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload CSV and Display Data</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Steps</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row) => (
            <tr key={row.id}>
              <td className="border border-gray-300 p-2">{row.id}</td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  <input
                    type="text"
                    name="name"
                    value={newRow.name || row.name}
                    onChange={handleInputChange}
                    className="w-full"
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
                    value={newRow.steps || row.steps}
                    onChange={handleInputChange}
                    className="w-full"
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

      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={newRow.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="steps"
          value={newRow.steps}
          onChange={handleInputChange}
          placeholder="Steps"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddRow}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Row
        </button>
      </div>
    </div>
  );
};

export default CSVUploader;