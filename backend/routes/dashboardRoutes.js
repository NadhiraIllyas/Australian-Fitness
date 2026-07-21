const express = require('express');
const router = express.Router();
const { getDashboardStats, performCheckIn, createBooking } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Secure all dashboard metrics routes

router.get('/stats', getDashboardStats);
router.post('/checkin', performCheckIn);
router.post('/booking', createBooking);

module.exports = router;