// client/src/components/ClientFormModal.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';

const ClientFormModal = ({ isOpen, onClose, onClientAdded, itemToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        phoneNumber: '',
    });

    // Use useEffect to pre-fill the form if an item is being edited
    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                name: itemToEdit.name,
                companyName: itemToEdit.companyName,
                email: itemToEdit.email,
                phoneNumber: itemToEdit.phoneNumber,
            });
        } else {
            setFormData({
                name: '',
                companyName: '',
                email: '',
                phoneNumber: '',
            });
        }
    }, [itemToEdit]);

    if (!isOpen) return null;

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
            alert('You must be logged in.');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            
            if (itemToEdit) {
                // This is an UPDATE request
                await axios.put(`http://localhost:5000/api/clients/${itemToEdit._id}`, formData, config);
            } else {
                // This is a CREATE request
                await axios.post('http://localhost:5000/api/clients', formData, config);
            }

            onClientAdded(); // Re-fetch the data to update the list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Failed to save client:', error.response.data.message);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{itemToEdit ? 'Edit Client' : 'Add New Client'}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Client Name</label>
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
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="form-input"
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
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-submit-btn">{itemToEdit ? 'Save Changes' : 'Add Client'}</button>
                </form>
            </div>
        </div>
    );
};

export default ClientFormModal;