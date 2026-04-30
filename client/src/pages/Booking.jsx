import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, ShieldCheck, CheckCircle, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import api from '../utils/api';

export const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get vehicle data from location state or use placeholder if none
  const { vehicle, days = 1 } = location.state || { 
    vehicle: { id: 1, name: 'Cyber Roadster X', pricePerDay: 15000, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80' },
    days: 3
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Real API call
      await api.post('/bookings', {
        vehicleId: vehicle.id || vehicle._id,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
        totalCost: ((vehicle.pricePerDay || vehicle.price) * days) + 8500 // Including fees/taxes
      });
      
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success('Booking confirmed successfully!');
    } catch (error) {
      console.error('Booking failed', error);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-10 rounded-3xl max-w-lg w-full"
        >
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-8">
            Your reservation for the {vehicle.name} has been confirmed. You will receive an email with the details shortly.
          </p>
          <div className="space-y-4">
            <Link to="/dashboard" className="block w-full">
              <Button variant="primary" className="w-full py-3">View in Dashboard</Button>
            </Link>
            <Link to="/vehicles" className="block w-full">
              <Button variant="outline" className="w-full py-3">Browse More Cars</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          <form id="booking-form" onSubmit={handleConfirm} className="space-y-8">
            {/* Personal Info */}
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="First Name" placeholder="John" required />
                <Input label="Last Name" placeholder="Doe" required />
                <Input label="Email" type="email" placeholder="john@example.com" required wrapperClassName="md:col-span-2" />
                <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" required wrapperClassName="md:col-span-2" />
              </div>
            </div>

            {/* Payment Info */}
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Payment Details
              </h2>
              <div className="space-y-6">
                <div className="relative">
                  <CreditCard className="absolute left-3 top-9 text-slate-400 h-5 w-5" />
                  <Input label="Card Number" placeholder="0000 0000 0000 0000" className="pl-10" required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Expiry Date" placeholder="MM/YY" required />
                  <Input label="CVC" placeholder="123" type="password" required />
                </div>
                <Input label="Name on Card" placeholder="John Doe" required />
              </div>
            </div>
          </form>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="glass p-6 md:p-8 rounded-3xl sticky top-24">
            <h3 className="text-lg font-semibold mb-6">Booking Summary</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <img src={vehicle.image} alt={vehicle.name} className="w-20 h-16 object-cover rounded-lg" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{vehicle.name}</h4>
                <p className="text-sm text-slate-500 capitalize">{vehicle.type || 'Premium'}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center"><Calendar className="h-4 w-4 mr-2" /> Duration</span>
                <span className="font-medium">{days} Days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center"><ShieldCheck className="h-4 w-4 mr-2" /> Insurance</span>
                <span className="font-medium">Premium</span>
              </div>
            </div>
 
            <div className="space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Rental Rate (₹{vehicle.pricePerDay || vehicle.price} x {days})</span>
                <span>₹{(vehicle.pricePerDay || vehicle.price) * days}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Insurance Fee</span>
                <span>₹5000</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Taxes & Fees</span>
                <span>₹3500</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                <span>Total Due</span>
                <span className="text-[var(--color-primary)]">₹{((vehicle.pricePerDay || vehicle.price) * days) + 8500}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="booking-form"
              className="w-full py-4 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                'Confirm & Pay'
              )}
            </Button>
            <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center">
              <Lock className="h-3 w-3 mr-1" /> Payments are secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
