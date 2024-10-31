import React, { useState } from 'react';
import './Login.css'; // Assuming your CSS file for the page styling
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginButton from '../components/LoginButton'
import { useNavigate } from 'react-router-dom';


interface LoginFormState {
    username: string;
    password: string;
}


const Login: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL

  const [form, setForm] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  // Handles state of button
  const disabled = form.username === '' || form.password === ''

  // State to handle form errors
  const [error, setError] = useState<string>('');

  // Use useNavigate hook from React Router for programmatic navigation
  const navigate = useNavigate();

  // Handle changes in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, // Updates the correct field based on input's name
    });
    setError('')
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // Prevent the default form submit behavior
    setError(''); // Clear any existing errors

    // Here you would typically send the form data to the back-end for authentication
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      })
      if (!response.ok) {
        setError("Incorrect username or password combination.")
        return
      } else {
        successfulLogin()
        return
      }
    } catch (error) {
      setError("Error logging in. Please try again later.")
      console.error('Error logging in:', error)
    }
  };

  // Handles what happens on successful login
  const successfulLogin = () => {
    // Redirect to /submit after form submission
    navigate('/submit');
  }

  return (
    <div className="body">
      <div className="login">
        <div className="center-card">
          <h2 className="header">Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={form.username}
                onChange={handleChange}
                required
                className="username"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                required
                className="password"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <LoginButton disabled={disabled} onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;