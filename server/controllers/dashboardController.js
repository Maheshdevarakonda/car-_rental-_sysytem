const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalVehicles = await Vehicle.countDocuments({});
    const totalBookings = await Booking.countDocuments({});
    
    // Aggregate total revenue from paid bookings
    const revenueAggregation = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);
    
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalVehicles,
      totalBookings,
      totalRevenue
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
