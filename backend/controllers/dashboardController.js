const Visit = require('../models/Visit');
const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Get dashboard metrics, charts data & user details
// @route   GET /api/dashboard/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const visits = await Visit.find({ user: req.user.id }).sort({ checkInTime: -1 });
    const bookings = await Booking.find({ user: req.user.id }).sort({ classTime: 1 });

    // Calculate weekly activity chart values (last 7 days check-in counts)
    const chartData = [0, 0, 0, 0, 0, 0, 0];
    const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formattedChart = [];

    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayIndex = d.getDay();
      
      // Count visits matching this day
      const count = visits.filter(visit => {
        const vDate = new Date(visit.checkInTime);
        return vDate.toDateString() === d.toDateString();
      }).length;

      formattedChart.push({
        day: daysName[dayIndex],
        visits: count
      });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        favouriteGym: user.favouriteGym,
        membership: user.membership
      },
      stats: {
        totalVisits: visits.length,
        upcomingClassesCount: bookings.filter(b => new Date(b.classTime) > new Date()).length,
        completionRate: visits.length > 0 ? Math.min(Math.round((visits.length / 12) * 100), 100) : 0
      },
      chart: formattedChart,
      recentVisits: visits.slice(0, 5),
      upcomingBookings: bookings.slice(0, 5)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Perform mock gym check-in (Creates visit record)
// @route   POST /api/dashboard/checkin
const performCheckIn = async (req, res, next) => {
  const { gymName } = req.body;

  if (!gymName) {
    res.status(400);
    return next(new Error('Gym name is required for check-in'));
  }

  try {
    const visit = await Visit.create({
      user: req.user.id,
      gymName
    });

    res.status(201).json(visit);
  } catch (error) {
    next(error);
  }
};

// @desc    Create upcoming class booking
// @route   POST /api/dashboard/booking
const createBooking = async (req, res, next) => {
  const { className, gymName, classTime, instructor } = req.body;

  if (!className || !gymName || !classTime || !instructor) {
    res.status(400);
    return next(new Error('Please provide all booking details'));
  }

  try {
    const booking = await Booking.create({
      user: req.user.id,
      className,
      gymName,
      classTime,
      instructor
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats, performCheckIn, createBooking };