import React, { useState } from 'react';

// Mock CSV data
const mockCSVData = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
];

const CSVUploader = () => {
  const [csvData, setCsvData] = useState(mockCSVData);
  const [newRow, setNewRow] = useState({ name: '', age: '', city: '' });
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
    setNewRow({ name: '', age: '', city: '' });
  };

  const handleEditRow = (id) => {
    setEditingId(id);
  };

  const handleUpdateRow = (id) => {
    setCsvData(csvData.map(row => row.id === id ? { ...row, ...newRow } : row));
    setEditingId(null);
    setNewRow({ name: '', age: '', city: '' });
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
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">City</th>
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
                    name="age"
                    value={newRow.age || row.age}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  row.age
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  <input
                    type="text"
                    name="city"
                    value={newRow.city || row.city}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  row.city
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
          name="age"
          value={newRow.age}
          onChange={handleInputChange}
          placeholder="Age"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="city"
          value={newRow.city}
          onChange={handleInputChange}
          placeholder="City"
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