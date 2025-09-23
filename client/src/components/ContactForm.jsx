// client/src/components/ContactForm.jsx

import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send an email via a backend endpoint.
        // For now, we'll just log the data.
        console.log('Contact form submitted:', formData);
        alert('Your message has been sent!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
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
                <label htmlFor="email" className="form-label">Your Email</label>
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
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    rows="5"
                    required
                />
            </div>
            <button type="submit" className="signup-button">Send Message</button>
        </form>
    );
};

export default ContactForm;