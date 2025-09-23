// client/src/components/ProjectFormModal.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';

const ProjectFormModal = ({ isOpen, onClose, onProjectAdded, itemToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    // Use useEffect to pre-fill the form if an item is being edited
    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                title: itemToEdit.title,
                description: itemToEdit.description,
            });
        } else {
            setFormData({
                title: '',
                description: '',
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
                await axios.put(`http://localhost:5000/api/projects/${itemToEdit._id}`, formData, config);
            } else {
                // This is a CREATE request
                await axios.post('http://localhost:5000/api/projects', formData, config);
            }

            onProjectAdded(); // Call the function to re-fetch projects
            onClose(); // Close the modal
        } catch (error) {
            console.error('Failed to save project:', error.response.data.message);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{itemToEdit ? 'Edit Project' : 'Add New Project'}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Project Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-submit-btn">{itemToEdit ? 'Save Changes' : 'Add Project'}</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectFormModal;