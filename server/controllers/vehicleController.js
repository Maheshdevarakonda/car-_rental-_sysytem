const Vehicle = require('../models/Vehicle');

// @desc    Get all vehicles (with pagination & filtering)
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res, next) => {
  try {
    const { type, availability, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const query = {};
    if (type) query.type = type;
    if (availability !== undefined) query.availability = availability === 'true';
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Vehicle.countDocuments(query);
    const vehicles = await Vehicle.find(query).skip(skip).limit(limitNumber);

    res.json({
      success: true,
      count: vehicles.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
const createVehicle = async (req, res, next) => {
  try {
    const vehicleData = { ...req.body };

    // Extract image URLs if files are uploaded
    if (req.files && req.files.length > 0) {
      vehicleData.images = req.files.map(file => file.path);
    }

    // Convert seats to Number
    if (vehicleData.seats) vehicleData.seats = Number(vehicleData.seats);
    if (vehicleData.pricePerDay) vehicleData.pricePerDay = Number(vehicleData.pricePerDay);

    const vehicle = await Vehicle.create(vehicleData);
    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Admin
const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      const vehicleData = { ...req.body };
      
      // If new images are uploaded, combine or replace
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => file.path);
        // Assuming we replace all old images for simplicity if new ones are uploaded
        vehicleData.images = newImages;
      }

      if (vehicleData.seats) vehicleData.seats = Number(vehicleData.seats);
      if (vehicleData.pricePerDay) vehicleData.pricePerDay = Number(vehicleData.pricePerDay);

      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        vehicleData,
        { new: true, runValidators: true }
      );
      res.json(updatedVehicle);
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      await vehicle.deleteOne();
      res.json({ message: 'Vehicle removed' });
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
