// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('User logged in successfully:', response.data);

      // Store the JWT token in localStorage for persistent login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      // Redirect to the home page or a dashboard
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <p className="signup-prompt">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;