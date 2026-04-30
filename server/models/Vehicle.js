const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a vehicle name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please add a vehicle type'],
      enum: ['sedan', 'SUV', 'hatchback', 'luxury', 'electric'],
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Please add a price per day'],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    images: {
      type: [String],
      required: true,
    },
    fuelType: {
      type: String,
      required: [true, 'Please add a fuel type'],
    },
    seats: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      enum: ['manual', 'automatic'],
      default: 'automatic',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 5,
    },
  },
  {
    timestamps: true, // Manages createdAt and updatedAt
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
