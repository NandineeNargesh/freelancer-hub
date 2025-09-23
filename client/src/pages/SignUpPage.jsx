// client/src/pages/SignUpPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios
import Header from '../components/Header';
import './SignUpPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      console.log('User registered successfully:', response.data);
      // You can redirect to the login page or a dashboard after a successful sign-up
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      // You can add an alert or state to display an error message on the page
      alert(error.response.data.message); 
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <h1 className="signup-title">Create an Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
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
                minLength="6"
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <p className="login-prompt">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;