const express = require('express');
const router = express.Router();
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');
const { protect, admin } = require('../middlewares/authMiddleware');
const { vehicleValidation } = require('../middlewares/validationMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
  .get(getVehicles)
  .post(protect, admin, upload.array('images', 5), vehicleValidation, createVehicle);

router.route('/:id')
  .get(getVehicleById)
  .put(protect, admin, upload.array('images', 5), updateVehicle)
  .delete(protect, admin, deleteVehicle);

module.exports = router;
