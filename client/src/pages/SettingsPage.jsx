// client/src/pages/SettingsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import './SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialty: '',
        bio: '',
        skills: '',
        portfolioItems: [],
        password: '',
    });

    const [newPortfolioItem, setNewPortfolioItem] = useState({
        imageUrl: '',
        title: '',
        description: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect if no token is found
                navigate('/login');
                return;
            }
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:5000/api/auth/profile', config);
                const user = response.data;
                setFormData({
                    name: user.name,
                    email: user.email,
                    specialty: user.specialty || '',
                    bio: user.bio || '',
                    skills: user.skills ? user.skills.join(', ') : '',
                    portfolioItems: user.portfolioItems || [],
                    password: '',
                });
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // Redirect to login on authentication failure
                if (error.response && error.response.status === 401) {
                     navigate('/login');
                }
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePortfolioChange = (e) => {
        const { name, value } = e.target;
        setNewPortfolioItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddPortfolioItem = (e) => {
        e.preventDefault();
        if (newPortfolioItem.imageUrl && newPortfolioItem.title) {
            setFormData((prevState) => ({
                ...prevState,
                portfolioItems: [...prevState.portfolioItems, newPortfolioItem],
            }));
            setNewPortfolioItem({ imageUrl: '', title: '', description: '' });
        }
    };

    const handleRemovePortfolioItem = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            portfolioItems: prevState.portfolioItems.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put('http://localhost:5000/api/auth/profile', {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim()),
            }, config);
            alert('Profile updated successfully!');
            const response = await axios.get('http://localhost:5000/api/auth/profile', config);
            localStorage.setItem('user', JSON.stringify(response.data));
            window.location.reload();
        } catch (error) {
            console.error('Failed to update profile:', error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="settings-page-container">
                <h2 className="settings-title">Account Settings</h2>
                <p className="settings-description">
                    Manage your profile, password, and other account details.
                </p>

                <div className="settings-sections">
                    <div className="settings-section">
                        <h3>Profile Information & Security</h3>
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
                                <label htmlFor="specialty" className="form-label">Specialty</label>
                                <input
                                    type="text"
                                    id="specialty"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., UI/UX Designer"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="form-input"
                                    rows="4"
                                    placeholder="Write a brief description of yourself..."
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills" className="form-label">Skills</label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., React, Node.js, Design (separate with commas)"
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
                    </div>

                    <div className="settings-section">
                        <h3>My Portfolio Items</h3>
                        <form onSubmit={handleAddPortfolioItem}>
                            <div className="form-group">
                                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={newPortfolioItem.imageUrl}
                                    onChange={handlePortfolioChange}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newPortfolioItem.title}
                                    onChange={handlePortfolioChange}
                                    className="form-input"
                                />
                            </div>
                            <button type="submit" className="form-submit-btn">Add Item</button>
                        </form>
                        <div className="portfolio-items-list">
                            {formData.portfolioItems.map((item, index) => (
                                <div key={index} className="portfolio-item-card">
                                    <img src={item.imageUrl} alt={item.title} />
                                    <span>{item.title}</span>
                                    <button onClick={() => handleRemovePortfolioItem(index)}>&times;</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SettingsPage;