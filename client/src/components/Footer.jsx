// client/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            {/* CTA Section */}
            <div className="footer-cta">
                <h2 className="footer-cta-title">Have an idea? Let's do something great together!</h2>
                <a href="mailto:contact@fhub.com" className="footer-cta-button">send message</a>
            </div>

            {/* Main Content Section */}
            <div className="footer-main-content">
                {/* About Us Column */}
                <div className="footer-column about-us">
                    <h3>About Us:</h3>
                    <p>F-Hub is an innovative full-service agency with a vast experience in creative design and with offices in 25 countries.</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#"><i className="fab fa-behance"></i></a>
                    </div>
                </div>

                {/* Blog Column */}
                <div className="footer-column blog-posts">
                    <h3>Check out our Blog:</h3>
                    <div>
                        <a href="#">
                            <h4>freelance</h4>
                            <p>06. sep 2025.</p>
                        </a>
                        <a href="#">
                            <h4>The guide</h4>
                            <p>06. oct 2025.</p>
                        </a>
                        <a href="#">
                            <h4>portfolio tips</h4>
                            <p>06. Jul 2025.</p>
                        </a>
                    </div>
                </div>

                {/* Contact Column */}
                <div className="footer-column contact-info">
                    <h3>Contact:</h3>
                    <p>contact@fhub.com</p>
                    <p>+9152366852</p>
                </div>

                {/* Locations Column - Skip images as requested */}
                <div className="footer-column locations">
                    <h3>Locations:</h3>
                    {/* Placeholder for map - style will be applied by CSS */}
                    <div style={{ backgroundColor: '#090909ff', height: '150px', width: '100%' }}></div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom-bar">
                <div className="logo">F-Hub.</div>
                <p>© 2025 F-Hub. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;