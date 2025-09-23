// client/src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    // Hooks must be declared at the top of the component
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for the presence of a token on component mount
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Clear the token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false); // Update state to reflect logout
        navigate('/'); // Redirect to the homepage
    };

    const scrollToSection = (sectionId) => {
        // Navigate to the homepage first
        navigate('/');
        // Wait for the navigation to complete before scrolling
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // A small delay to ensure the page has rendered
    };

    return (
        <header className="main-header">
            <nav className="main-nav">
                <div className="logo">
                    <Link to="/">F-Hub.</Link>
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/browse">Find Talent</Link>
                    
                    <div onClick={() => scrollToSection('work')} style={{ cursor: 'pointer', color: 'white' }}>
                        How it Works
                    </div>
                    
                    <Link to="/blog">Blog</Link>
                </div>
                
                {isLoggedIn ? (
                    <div className="nav-cta">
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="btn">Log Out</button>
                    </div>
                ) : (
                    <div className="nav-cta">
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn-secondary ">Log In</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;