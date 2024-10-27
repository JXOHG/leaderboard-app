import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Submit from './pages/Submit';
import Login from './pages/Login';
import Settings from './pages/Settings'; // Import the settings page
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/submit" element={<Submit />} />
<<<<<<< HEAD
        <Route path="/settings" element={<Settings/>} />
        <Route path="/login" element={<Login />} /> {/* Define settings route */}
=======
        <Route path="/settings" element={<Settings/>} /> 
        <Route path="/login" element={<Login/>} /> {/* Define settings route */}
>>>>>>> 7b2b8998361ad9038ec28bfac4656136a4cf2443
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;