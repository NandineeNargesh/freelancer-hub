// client/src/components/InvoiceFormModal.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';

const InvoiceFormModal = ({ isOpen, onClose, onInvoiceAdded, itemToEdit }) => {
    const [formData, setFormData] = useState({
        invoiceId: '',
        client: '',
        amount: '',
        status: 'Pending',
    });

    // Use useEffect to pre-fill the form if an item is being edited
    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                invoiceId: itemToEdit.invoiceId,
                client: itemToEdit.client._id, // Set the client's ID
                amount: itemToEdit.amount,
                status: itemToEdit.status,
            });
        } else {
            setFormData({
                invoiceId: '',
                client: '',
                amount: '',
                status: 'Pending',
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
            alert('You must be logged in to manage invoices.');
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
                await axios.put(`http://localhost:5000/api/invoices/${itemToEdit._id}`, formData, config);
            } else {
                // This is a CREATE request
                await axios.post('http://localhost:5000/api/invoices', formData, config);
            }

            onInvoiceAdded(); // Re-fetch the data to update the list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Failed to save invoice:', error.response.data.message);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{itemToEdit ? 'Edit Invoice' : 'Create New Invoice'}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="invoiceId" className="form-label">Invoice ID</label>
                        <input
                            type="text"
                            id="invoiceId"
                            name="invoiceId"
                            value={formData.invoiceId}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="client" className="form-label">Client (ID)</label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="Enter Client ID"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount" className="form-label">Amount ($)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                    <button type="submit" className="form-submit-btn">{itemToEdit ? 'Save Changes' : 'Create Invoice'}</button>
                </form>
            </div>
        </div>
    );
};

export default InvoiceFormModal;