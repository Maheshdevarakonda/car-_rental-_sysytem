const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vehicle = require('./models/Vehicle');

dotenv.config();

const vehicles = [
  // ── Electric ──
  {
    name: 'Cyber Roadster X',
    brand: 'Tesla',
    type: 'electric',
    pricePerDay: 15000,
    availability: true,
    description: 'The Cyber Roadster X represents the pinnacle of electric performance. With blistering 0-60 in 1.9 seconds and a range of 620 miles.',
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'],
    fuelType: 'Electric',
    seats: 2,
    transmission: 'automatic',
    rating: 4.9
  },
  {
    name: 'Model S Plaid',
    brand: 'Tesla',
    type: 'electric',
    pricePerDay: 12000,
    availability: true,
    description: 'The fastest accelerating sedan ever made. Tri-motor all-wheel drive with 1,020 horsepower for unmatched performance.',
    images: ['https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80'],
    fuelType: 'Electric',
    seats: 5,
    transmission: 'automatic',
    rating: 4.8
  },
  {
    name: 'e-tron GT',
    brand: 'Audi',
    type: 'electric',
    pricePerDay: 14000,
    availability: true,
    description: 'Audi\'s all-electric grand tourer combines stunning design with exhilarating performance and cutting-edge technology.',
    images: ['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80'],
    fuelType: 'Electric',
    seats: 4,
    transmission: 'automatic',
    rating: 4.7
  },
  {
    name: 'Eco Commuter',
    brand: 'Fiat',
    type: 'electric',
    pricePerDay: 4000,
    availability: true,
    description: 'The perfect city car – compact, efficient, and stylish. Ideal for daily commutes with zero emissions.',
    images: ['https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?w=800&q=80'],
    fuelType: 'Electric',
    seats: 4,
    transmission: 'automatic',
    rating: 4.3
  },

  // ── Luxury ──
  {
    name: 'Neon Phantom',
    brand: 'Rolls Royce',
    type: 'luxury',
    pricePerDay: 35000,
    availability: true,
    description: 'Experience ultimate luxury with the Neon Phantom. Hand-crafted interior, starlight headliner, and a whisper-quiet cabin.',
    images: ['https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'automatic',
    rating: 5.0
  },
  {
    name: 'Continental GT',
    brand: 'Bentley',
    type: 'luxury',
    pricePerDay: 28000,
    availability: true,
    description: 'A grand touring masterpiece blending breathtaking performance with handcrafted luxury. W12 twin-turbocharged engine.',
    images: ['https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'automatic',
    rating: 4.9
  },
  {
    name: 'S-Class Maybach',
    brand: 'Mercedes-Benz',
    type: 'luxury',
    pricePerDay: 32000,
    availability: true,
    description: 'The pinnacle of automotive luxury. Executive rear seating, champagne cooler, and an unmatched ride quality.',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'automatic',
    rating: 4.9
  },

  // ── SUV ──
  {
    name: 'Stellar SUV',
    brand: 'Range Rover',
    type: 'SUV',
    pricePerDay: 18000,
    availability: true,
    description: 'The ultimate luxury SUV. Go anywhere in supreme comfort with advanced terrain response and air suspension.',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
    fuelType: 'Diesel',
    seats: 7,
    transmission: 'automatic',
    rating: 4.8
  },
  {
    name: 'Urus Performante',
    brand: 'Lamborghini',
    type: 'SUV',
    pricePerDay: 42000,
    availability: true,
    description: 'The world\'s first Super Sport SUV. Lamborghini DNA meets everyday versatility with 666 horsepower.',
    images: ['https://images.unsplash.com/photo-1669721773444-1e96b07bfa7d?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'automatic',
    rating: 4.9
  },
  {
    name: 'GLS 580',
    brand: 'Mercedes-Benz',
    type: 'SUV',
    pricePerDay: 16000,
    availability: true,
    description: 'First-class comfort in an SUV package. Three rows of luxury seating with E-Active Body Control suspension.',
    images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 7,
    transmission: 'automatic',
    rating: 4.6
  },

  // ── Sedan ──
  {
    name: 'Aero Sedan',
    brand: 'BMW',
    type: 'sedan',
    pricePerDay: 9000,
    availability: true,
    description: 'The ultimate driving machine. Perfectly balanced performance and technology for spirited daily driving.',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'automatic',
    rating: 4.6
  },
  {
    name: 'Camry Premium',
    brand: 'Toyota',
    type: 'sedan',
    pricePerDay: 5500,
    availability: true,
    description: 'Reliable, refined, and fuel-efficient. The perfect sedan for professionals who value comfort and economy.',
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80'],
    fuelType: 'Hybrid',
    seats: 5,
    transmission: 'automatic',
    rating: 4.5
  },
  {
    name: 'A6 Sportback',
    brand: 'Audi',
    type: 'sedan',
    pricePerDay: 11000,
    availability: true,
    description: 'Sleek coupe-like design meets spacious sedan practicality. Packed with Audi\'s latest virtual cockpit technology.',
    images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'automatic',
    rating: 4.7
  },
  {
    name: 'Civic Type R',
    brand: 'Honda',
    type: 'sedan',
    pricePerDay: 7000,
    availability: true,
    description: 'Track-bred performance in a practical package. Turbocharged and tuned for enthusiasts who crave excitement.',
    images: ['https://images.unsplash.com/photo-1588636142575-0c86d933be27?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'manual',
    rating: 4.8
  },
  {
    name: 'M5 Competition',
    brand: 'BMW',
    type: 'sedan',
    pricePerDay: 19000,
    availability: true,
    description: 'A supercar disguised as a sedan. 617 HP twin-turbo V8 with M xDrive all-wheel drive for insane performance.',
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80'],
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'automatic',
    rating: 4.9
  },
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb');
    console.log(`MongoDB Connected for seeding: ${conn.connection.host}`);
    
    // Clear old vehicles and re-seed with the expanded fleet
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(vehicles);
    console.log(`Database seeded with ${vehicles.length} vehicles successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
