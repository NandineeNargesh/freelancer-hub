// client/src/pages/InvoicesPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import InvoiceFormModal from '../components/InvoiceFormModal';
import './InvoicesPage.css';

const InvoicesPage = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // New state to hold the item being edited

    const fetchInvoices = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:5000/api/invoices', config);
            setInvoices(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch invoices:', err);
            setError('Failed to load invoices. Please try again.');
            setLoading(false);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleDelete = async (invoiceId) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`, config);
                fetchInvoices();
            } catch (err) {
                console.error('Failed to delete invoice:', err);
                alert('Failed to delete invoice. Please try again.');
            }
        }
    };

    const handleEdit = (invoice) => {
        setEditingItem(invoice); // Set the item to be edited
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null); // Reset the editing item
    };

    useEffect(() => {
        fetchInvoices();
    }, [navigate]);

    return (
        <DashboardLayout>
            <div className="invoices-page-container">
                <div className="invoices-header">
                    <h2>All Invoices</h2>
                    <button
                        className="new-invoice-btn"
                        onClick={() => {
                            setEditingItem(null); // Ensure the modal is in 'create' mode
                            setIsModalOpen(true);
                        }}
                    >
                        + New Invoice
                    </button>
                </div>
                {loading ? (
                    <p>Loading invoices...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="invoices-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Client</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(invoice => (
                                    <tr key={invoice._id}>
                                        <td>{invoice.invoiceId}</td>
                                        <td>{invoice.client.name}</td>
                                        <td>${invoice.amount}</td>
                                        <td>{invoice.status}</td>
                                        <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button onClick={() => handleEdit(invoice)}>Edit</button>
                                            <button onClick={() => handleDelete(invoice._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <InvoiceFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onInvoiceAdded={fetchInvoices}
                itemToEdit={editingItem} // Pass the item to be edited
            />
        </DashboardLayout>
    );
};

export default InvoicesPage;