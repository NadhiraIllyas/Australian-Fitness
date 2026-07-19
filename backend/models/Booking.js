const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    className: {
      type: String,
      required: [true, 'Class name is required'],
    },
    gymName: {
      type: String,
      required: [true, 'Gym name is required'],
    },
    classTime: {
      type: Date,
      required: [true, 'Class booking time is required'],
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);