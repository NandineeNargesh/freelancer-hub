// client/src/pages/ClientsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ClientFormModal from '../components/ClientFormModal'; // Import the new component
import './ClientsPage.css';

const ClientsPage = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
 const [editingItem, setEditingItem] = useState(null);

    const fetchClients = async () => {
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
            const response = await axios.get('http://localhost:5000/api/clients', config);
            setClients(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch clients:', err);
            setError('Failed to load clients. Please try again.');
            setLoading(false);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleEdit = (client) => {
        setEditingItem(client);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null); // Reset the editing item
    };
    useEffect(() => {
        fetchClients();
    }, [navigate]);
  const handleDelete = async (clientId) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
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
                await axios.delete(`http://localhost:5000/api/clients/${clientId}`, config);
                // Re-fetch the clients to update the list
                fetchClients();
            } catch (err) {
                console.error('Failed to delete client:', err);
                alert('Failed to delete client. Please try again.');
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="clients-page-container">
                <div className="clients-header">
                    <h2>All Clients</h2>
                    <button 
                        className="new-client-btn" 
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                    >
                        + New Client
                    </button>
                </div>
                {loading ? (
                    <p className="loading-message">Loading clients...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="clients-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Company Name</th>
                                    <th>Email Address</th>
                                    <th>Phone Number</th>
                                    <th>Projects Assigned</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client._id}>
                                        <td>{client.name}</td>
                                        <td>{client.companyName}</td>
                                        <td>{client.email}</td>
                                        <td>{client.phoneNumber}</td>
                                        <td>{client.projectsAssigned} Projects</td>
                                       <td>
                                    <button onClick={() => handleEdit(client)}>Edit</button>
                                    <button onClick={() => handleDelete(client._id)}>Delete</button>
                                </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
             <ClientFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onClientAdded={fetchClients}
                itemToEdit={editingItem} // Pass the item to be edited to the modal
            />
        </DashboardLayout>
    );
};

export default ClientsPage;