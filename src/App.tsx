import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Submit from './pages/Submit';  // Import Submit page
import Footer from './components/Footer';
import "./App.css";
const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/submit" element={<Submit />} />  {/* Add route for Submit */}
      </Routes>
    </Router>
    <div className="footer"><Footer /></div>
    </>
  );
};

export default App;