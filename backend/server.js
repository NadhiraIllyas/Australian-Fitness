require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Root Endpoint (Resolves Vercel "Cannot GET /" 404 error)
app.get('/', (req, res) => {
  res.send('AussieFit Aggregator API is currently active.');
});

// Routes Mount
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Export app instance for Vercel Serverless Functions
module.exports = app;