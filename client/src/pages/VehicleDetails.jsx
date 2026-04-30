import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Users, Briefcase, Zap, CalendarDays } from 'lucide-react';
import { Button } from '../components/Button';
import api from '../utils/api';

const MOCK_VEHICLE = {
  id: 1, 
  name: 'Cyber Roadster X', 
  type: 'Electric', 
  price: 15000, 
  rating: 4.9, 
  reviews: 128,
  image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80',
  images: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    'https://images.unsplash.com/photo-1503376625866-17b5f13458e0?w=800&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
  ],
  features: ['Autopilot', '0-60 in 1.9s', 'Glass Roof', 'Premium Audio'],
  description: 'The Cyber Roadster X represents the pinnacle of electric performance. With blistering acceleration, a futuristic aesthetic, and cutting-edge autonomous capabilities, this vehicle offers a driving experience like no other.'
};

export const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchVehicle = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/vehicles/${id}`);
        setVehicle({
          ...res.data,
          id: res.data._id || res.data.id,
          image: res.data.images?.[0] || res.data.image
        });
      } catch (error) {
        console.error('Failed to fetch vehicle', error);
        setVehicle(MOCK_VEHICLE);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            <div className="flex space-x-4">
              <div className="h-24 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              <div className="h-24 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            </div>
          </div>
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!vehicle) return <div className="text-center py-20">Vehicle not found.</div>;

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link to="/vehicles" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to fleet
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Col: Images & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <img 
                src={vehicle.images[activeImage]} 
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                {vehicle.type}
              </div>
            </motion.div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {vehicle.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative shrink-0 h-20 w-32 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[var(--color-primary)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{vehicle.name}</h1>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 space-x-4">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                    {vehicle.rating} ({vehicle.reviews || 0} reviews)
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="flex items-center text-[var(--color-primary)] font-medium">
                    <Zap className="h-4 w-4 mr-1" />
                    Premium Selection
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {vehicle.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <Users className="h-6 w-6 text-[var(--color-primary)] mb-2" />
                <span className="text-sm font-medium">{vehicle.seats || 4} Seats</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <Briefcase className="h-6 w-6 text-[var(--color-primary)] mb-2" />
                <span className="text-sm font-medium">{vehicle.brand || 'Premium'}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <Zap className="h-6 w-6 text-[var(--color-primary)] mb-2" />
                <span className="text-sm font-medium">{vehicle.fuelType || 'Electric'}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center">
                <div className="h-6 w-6 text-[var(--color-primary)] mb-2 flex items-center justify-center font-bold">{vehicle.transmission === 'manual' ? 'M' : 'A'}</div>
                <span className="text-sm font-medium">{vehicle.transmission === 'manual' ? 'Manual' : 'Auto'}</span>
              </div>
            </div>

            {vehicle.features && vehicle.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Booking Card */}
        <div className="lg:col-span-1">
          <div className="glass p-6 md:p-8 rounded-3xl sticky top-24">
            <div className="mb-6">
              <span className="text-3xl font-bold text-[var(--color-primary)]">₹{vehicle.pricePerDay || vehicle.price}</span>
              <span className="text-slate-500 dark:text-slate-400"> / day</span>
            </div>

            <form className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" /> Rental Duration (Days)
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="30"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl space-y-3 text-sm border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>₹{vehicle.pricePerDay || vehicle.price} x {days} days</span>
                  <span>₹{(vehicle.pricePerDay || vehicle.price) * days}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Insurance & Fees</span>
                  <span>₹5000</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                  <span>Total Due</span>
                  <span className="text-[var(--color-primary)]">₹{((vehicle.pricePerDay || vehicle.price) * days) + 5000}</span>
                </div>
              </div>

              <Link 
                to="/booking" 
                state={{ vehicle, days }}
                className="block w-full pt-2"
              >
                <Button className="w-full py-4 text-lg">Continue to Book</Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
