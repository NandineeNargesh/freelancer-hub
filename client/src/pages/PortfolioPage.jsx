// client/src/pages/PortfolioPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PortfolioPage.css';

const PortfolioPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [freelancer, setFreelancer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreelancer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
                setFreelancer(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch freelancer data:', err);
                setError('Freelancer not found or failed to load data.');
                setLoading(false);
            }
        };
        
        if (id) {
            fetchFreelancer();
        }
    }, [id]);

    const handleHireClick = () => {
        alert(`You are about to hire ${freelancer.name}.`);
    };

    if (loading) {
        return <div className="portfolio-loading-screen">Loading...</div>;
    }

    if (error) {
        return <div className="portfolio-error-screen">{error}</div>;
    }

    if (!freelancer) {
        return <div className="portfolio-error-screen">No freelancer data available.</div>;
    }

    return (
        <>
            <Header />
            <div className="portfolio-page-wrapper">
                {/* Individual Portfolio Header */}
                <section className="individual-portfolio-header">
                    <div className="header-content">
                        <img 
                            src="https://via.placeholder.com/150" 
                            alt={`${freelancer.name}'s profile`} 
                            className="profile-picture" 
                        />
                        <div className="header-text">
                            <h1 className="freelancer-name">{freelancer.name}</h1>
                            <p className="freelancer-specialty">{freelancer.specialty || 'Freelance Professional'}</p>
                            <button onClick={handleHireClick} className="hire-btn">Hire {freelancer.name.split(' ')[0]}</button>
                        </div>
                    </div>
                </section>
                
                {/* About and Skills Section */}
                <section className="profile-details-section">
                    <div className="details-container">
                        <div className="about-me-section">
                            <h2 className="section-title">About Me</h2>
                            <p className="section-text">
                                {freelancer.bio || "This freelancer has not yet added a bio."}
                            </p>
                        </div>
                        <div className="skills-section">
                            <h2 className="section-title">Skills</h2>
                            <div className="skills-grid">
                                {freelancer.skills && freelancer.skills.length > 0 ? (
                                    freelancer.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))
                                ) : (
                                    <p className="no-skills-message">No skills added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Portfolio Grid Section */}
                <section className="portfolio-grid-section">
                    <h2 className="portfolio-grid-title">My Work</h2>
                    <div className="masonry-grid-container">
                        {freelancer.portfolioItems && freelancer.portfolioItems.length > 0 ? (
                            freelancer.portfolioItems.map(item => (
                                <div key={item._id} className="masonry-item">
                                    <div 
                                        className="masonry-image" 
                                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                                    ></div>
                                    <div className="masonry-overlay">
                                        <span className="masonry-category">{item.category}</span>
                                        <h3 className="masonry-title">{item.title}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-portfolio-items">Coming Soon.....</p>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default PortfolioPage;