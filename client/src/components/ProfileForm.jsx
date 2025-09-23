// client/src/components/ProfileForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put('http://localhost:5000/api/auth/profile', formData, config);
            
            // Update localStorage with the new user data and token
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);

            alert('Profile updated successfully!');
            // You might want to refresh the page or redirect
            window.location.reload();
        } catch (error) {
            console.error('Failed to update profile:', error.response.data.message);
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Leave blank to keep current password"
                />
            </div>
            <button type="submit" className="signup-button">Save Changes</button>
        </form>
    );
};

export default ProfileForm;