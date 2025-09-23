// client/src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import './Dashboard.css';

// Import Chart.js and chart components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register the chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
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
                const response = await axios.get('http://localhost:5000/api/dashboard/overview', config);
                setDashboardData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Failed to load dashboard data. Please log in again.');
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (loading) {
        return <div className="dashboard-loading-screen">Loading...</div>;
    }

    if (error) {
        return <div className="dashboard-error-screen">{error}</div>;
    }

    // Chart Data and Options
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Earnings',
            data: dashboardData.monthlyEarnings,
            borderColor: '#ecaf13e3',
            backgroundColor: 'rgba(255, 217, 0, 0.2)',
            tension: 0.4,
            fill: true
        }],
    };

    const projectStatusData = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [{
            data: [
                dashboardData.pendingProjects,
                dashboardData.inProgressProjects,
                dashboardData.completedProjects
            ],
            backgroundColor: ['#ecaf13e3', '#3b83f6ee', '#10b981e7'],
            borderColor: ['#1a1a1a', '#1a1a1a', '#1a1a1a'],
            borderWidth: 1,
        }],
    };

    // Chart.js options to manage layout and legend
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 25,
                    font: {
                        size:12
                    }
                }
            },
        },
        layout: {
            padding: 20
        },
    };

    return (
        <DashboardLayout>
            <div className="dashboard-page-container">
                <div className="dashboard-header">
                    <h1 className="welcome-back-title">Welcome Back!</h1>
                    <p className="user-info">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'User'}</p>
                </div>

                <div className="dashboard-metrics-grid">
                    <div className="metric-card">
                        <h3>Total Earnings</h3>
                        <p className="metric-value">${dashboardData.totalEarnings}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Projects</h3>
                        <p className="metric-value">{dashboardData.totalProjects}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Clients</h3>
                        <p className="metric-value">{dashboardData.totalClients}</p>
                    </div>
                </div>

                <div className="dashboard-charts-grid">
                    <div className="chart-card">
                        <h3>Monthly Earnings</h3>
                         <div className="chart-wrapper">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="chart-card">
                        <h3>Project Status</h3>
                        <div className="chart-wrapper">
                            <Doughnut data={projectStatusData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;