const { validationResult, check } = require('express-validator');

// Middleware to catch validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  check('name', 'Name is required').trim().not().isEmpty().escape(),
  check('email', 'Please include a valid email').trim().isEmail().normalizeEmail(),
  check('password', 'Password must be 6 or more characters').trim().isLength({ min: 6 }).escape(),
  validate
];

const loginValidation = [
  check('email', 'Please include a valid email').trim().isEmail().normalizeEmail(),
  check('password', 'Password is required').trim().exists().escape(),
  validate
];

const vehicleValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('brand', 'Brand is required').not().isEmpty(),
  check('type', 'Valid type is required').isIn(['sedan', 'SUV', 'hatchback', 'luxury', 'electric']),
  check('pricePerDay', 'Price must be a number').isNumeric(),
  check('description', 'Description is required').not().isEmpty(),
  check('fuelType', 'Fuel type is required').not().isEmpty(),
  check('seats', 'Seats must be a number').isNumeric(),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  vehicleValidation
};
