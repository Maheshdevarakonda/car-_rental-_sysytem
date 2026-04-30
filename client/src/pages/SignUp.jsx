import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Mail, Lock, User, Shield, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export const SignUp = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await register(formData);
    setIsLoading(false);
    
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 md:p-10 rounded-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-[var(--color-primary)]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
            <p className="text-slate-500 text-sm">Join FutureRide and start your journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-9 text-slate-400 h-5 w-5" />
              <Input 
                label="Full Name"
                type="text" 
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-9 text-slate-400 h-5 w-5" />
              <Input 
                label="Email Address"
                type="email" 
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-9 text-slate-400 h-5 w-5" />
              <Input 
                label="Password"
                type="password" 
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                I am signing up as a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-colors ${formData.role === 'user' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="user" 
                    className="sr-only"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                  />
                  <User size={24} className="mb-2" />
                  <span className="text-sm font-medium">Customer</span>
                </label>
                <label className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-colors ${formData.role === 'admin' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="admin" 
                    className="sr-only"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                  />
                  <Shield size={24} className="mb-2" />
                  <span className="text-sm font-medium">Admin</span>
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full group mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--color-primary)] font-medium hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
