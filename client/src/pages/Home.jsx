import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import api from '../utils/api';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/vehicles?limit=3');
        const data = res.data.data || res.data;
        setFeaturedCars(data.map(v => ({
          ...v,
          id: v._id || v.id,
          image: v.images?.[0] || v.image,
        })));
      } catch (error) {
        console.error('Failed to fetch featured cars', error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-primary)] via-transparent to-transparent"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Drive the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-blue-500">
                Future
              </span> Today.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
              Experience the next generation of mobility. Rent futuristic, high-performance, and eco-friendly vehicles at your fingertips.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/vehicles">
                <Button className="group">
                  Browse Fleet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary)] to-blue-600 blur-2xl opacity-20 dark:opacity-40 rounded-full animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Futuristic Concept Car" 
              className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Why Choose FutureRide?</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We offer a premium, seamless experience designed for the modern world.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="h-8 w-8 text-[var(--color-primary)]" />, title: 'Instant Booking', desc: 'Book your dream car in seconds with our streamlined process.' },
            { icon: <Shield className="h-8 w-8 text-[var(--color-primary)]" />, title: 'Secure & Insured', desc: 'Every ride is fully insured and monitored for your safety.' },
            { icon: <Star className="h-8 w-8 text-[var(--color-primary)]" />, title: 'Premium Fleet', desc: 'Access to the latest, most advanced vehicles on the market.' },
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mx-auto w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Featured Fleet</h2>
            <p className="text-slate-500 mt-2">Discover our most popular futuristic rides.</p>
          </motion.div>
          <Link to="/vehicles" className="hidden sm:flex text-[var(--color-primary)] hover:text-blue-500 font-medium items-center transition-colors">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" /> {car.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-[var(--color-primary)] transition-colors">{car.name}</h3>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{car.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">₹{car.pricePerDay?.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 block">/ day</span>
                  </div>
                </div>
                <Link to={`/vehicles/${car.id}`} className="block w-full">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
