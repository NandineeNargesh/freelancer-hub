// client/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import BlogPage from './pages/BlogPage';
import Dashboard from './pages/Dashboard';
import ClientsPage from './pages/ClientsPage';
import ProjectsPage from './pages/ProjectsPage';
import InvoicesPage from './pages/InvoicesPage';
import SettingsPage from './pages/SettingsPage';
import SupportPage from './pages/SupportPage';
import DashboardLayout from './components/DashboardLayout';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
       <Route path="/talent/:id" element={<PortfolioPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Router>
  );
}

export default App;