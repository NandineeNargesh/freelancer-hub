// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const clientRoutes = require('./routes/clientRoutes');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoiceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes'); const projectRoutes = require('./routes/projectRoutes'); // Import the new routes
const { protect } = require('./middleware/authMiddleware');
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Allows the server to accept JSON data in the body
app.use(cors()); // Enables Cross-Origin requests
// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes); 
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/invoices', invoiceRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});
// New protected route for user profile
app.get('/api/users/profile', protect, (req, res) => {
  // `req.user` is available here because the `protect` middleware attached it
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
