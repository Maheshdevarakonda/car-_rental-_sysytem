const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getBookings);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/:id')
  .put(protect, admin, updateBookingStatus)
  .delete(protect, admin, deleteBooking);

module.exports = router;
