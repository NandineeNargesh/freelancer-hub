// client/src/pages/ProjectsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProjectFormModal from '../components/ProjectFormModal'; // Import the new component
import './ProjectsPage.css';

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const fetchProjects = async () => {
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
            const response = await axios.get('http://localhost:5000/api/projects', config);
            setProjects(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
            setError('Failed to load projects. Please try again.');
            setLoading(false);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        }
    };
 const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
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
                await axios.delete(`http://localhost:5000/api/projects/${projectId}`, config);
                // Re-fetch the projects to update the list
                fetchProjects();
            } catch (err) {
                console.error('Failed to delete project:', err);
                alert('Failed to delete project. Please try again.');
            }
        }
    };
    useEffect(() => {
        fetchProjects();
    }, [navigate]);
  const handleEdit = (project) => {
        setEditingItem(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null); // Reset the editing item
    };

    return (
        <DashboardLayout>
            <div className="projects-page-container">
                <div className="projects-header">
                    <h2>All Projects</h2>
                    <button 
                        className="new-project-btn" 
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                    >
                        + New Project
                    </button>
                </div>
                {loading ? (
                    <p className="loading-message">Loading projects...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="projects-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project._id}>
                                        <td>{project.title}</td>
                                        <td>{project.description}</td>
                                        <td>{project.status}</td>
                                        <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                                                                      <td>
                                    <button onClick={() => handleEdit(project)}>Edit</button>
                                    <button onClick={() => handleDelete(project._id)}>Delete</button>
                                </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
             <ProjectFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onProjectAdded={fetchProjects}
                itemToEdit={editingItem} // Pass the item to be edited to the modal
            />
        </DashboardLayout>
    );
};

export default ProjectsPage;