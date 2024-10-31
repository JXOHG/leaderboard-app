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
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submit behavior

    // Basic validation: Check if both fields are filled
    if (form.username === '' || form.password === '') {
      setError('Please enter both username and password.');
      return;
    }

    setError(''); // Clear any existing errors

    // Here you would typically send the form data to the back-end for authentication
    console.log('Form submitted!', form);

    // Redirect to /submit after form submission
    navigate('/submit');
  };

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
              <LoginButton disabled={disabled}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;