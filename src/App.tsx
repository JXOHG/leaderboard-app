import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Change to HashRouter
import Dashboard from './pages/Dashboard';
import Submit from './pages/Submit';
import Login from './pages/Login';
import Settings from './pages/Settings'; // Import the settings page
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';
import ProtectedRoute from './ProtectedRoute';


const apiUrl = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/submit" element={<ProtectedRoute> <Submit /> </ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute> <Login /> </ProtectedRoute>} /> {/* Define settings route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;