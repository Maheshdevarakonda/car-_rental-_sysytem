import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, Car } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../utils/api';

// Mock data as fallback or for reference
const MOCK_VEHICLES = [
  { id: 1, name: 'Cyber Roadster X', type: 'Electric', price: 15000, rating: 4.9, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80' },
  { id: 2, name: 'Neon Phantom', type: 'Luxury', price: 29900, rating: 5.0, image: 'https://images.unsplash.com/photo-1503376625866-17b5f13458e0?w=800&q=80' },
  { id: 3, name: 'Stellar SUV', type: 'Hybrid', price: 12000, rating: 4.8, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' },
  { id: 4, name: 'Aero Sedan', type: 'Electric', price: 9000, rating: 4.6, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80' },
  { id: 5, name: 'Quantum Hypercar', type: 'Sport', price: 45000, rating: 4.9, image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80' },
  { id: 6, name: 'Eco Commuter', type: 'Electric', price: 6000, rating: 4.5, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?w=800&q=80' },
];

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  
  const types = ['All', 'sedan', 'SUV', 'luxury', 'electric'];

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/vehicles?limit=20');
        // Handle paginated response: { data: [...] }
        const vehicleData = res.data.data || res.data;
        const formattedData = vehicleData.map(v => ({
          ...v,
          id: v._id || v.id,
          image: v.images?.[0] || v.image
        }));
        setVehicles(formattedData.length > 0 ? formattedData : MOCK_VEHICLES);
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
        setVehicles(MOCK_VEHICLES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || v.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-64 shrink-0 space-y-6"
      >
        <div className="glass p-6 rounded-2xl sticky top-24">
          <div className="flex items-center space-x-2 mb-6 text-slate-900 dark:text-white">
            <SlidersHorizontal size={20} />
            <h2 className="font-semibold text-lg">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Car model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Vehicle Type
              </label>
              <div className="space-y-2">
                {types.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="type" 
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-[var(--color-primary)] transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Price Range
              </label>
              <input type="range" className="w-full accent-[var(--color-primary)]" min="50" max="500" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>₹5000</span>
                <span>₹50000+</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4" onClick={() => {setSearchTerm(''); setSelectedType('All');}}>
              Reset Filters
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Browse Fleet</h1>
          <span className="text-sm text-slate-500">{filteredVehicles.length} vehicles found</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl h-80"></div>
            ))}
          </div>
        ) : filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" /> {car.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1 truncate">{car.name}</h3>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{car.type}</span>
                  </div>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-xl font-bold text-[var(--color-primary)]">₹{car.pricePerDay || car.price}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400"> / day</span>
                    </div>
                  </div>
                  <Link to={`/vehicles/${car.id}`} className="block w-full">
                    <Button variant="primary" className="w-full text-sm py-2">Book Now</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Car className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No vehicles found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
