// client/src/components/DashboardLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './DashboardLayout.css'; // Create this CSS file

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-wrapper">
            <div className="sidebar">
                <h1 className="logo-dashboard">Dashboard</h1>
                <div className="sidebar-nav">
                   
                    <Link to="/projects">Projects</Link>
                    <Link to="/clients">Clients</Link>
                    <Link to="/invoices">Invoices</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/support">Support</Link>
                </div>
            </div>
            <div className="main-content-area">
                <Header />
                <main className="dashboard-main">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;