import React from 'react';
import SizesExamples from '../components/Button';
import "./Admin.css"

const Admin: React.FC = () => {
  return (
    <>
        <div className="card">
            <h2 className="admin">Administration?</h2>
            <SizesExamples/>
        </div>
        
    </>
  );
};

export default Admin;