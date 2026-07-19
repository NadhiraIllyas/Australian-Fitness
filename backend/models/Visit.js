const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gymName: {
      type: String,
      required: [true, 'Gym name is required'],
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visit', visitSchema);