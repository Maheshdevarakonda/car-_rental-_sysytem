import { Link } from 'react-router-dom';
import { Car, Globe, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6 text-[var(--color-primary)]" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-blue-500">
                FutureRide
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              The future of mobility is here. Rent futuristic, premium vehicles with the tap of a button.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-[var(--color-primary)] transition">Home</Link></li>
              <li><Link to="/vehicles" className="hover:text-[var(--color-primary)] transition">Browse Cars</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-primary)] transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-primary)] transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="#" className="hover:text-[var(--color-primary)] transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-primary)] transition">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-primary)] transition">Rental Agreement</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-[var(--color-primary)] transition">
                <Globe size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-[var(--color-primary)] transition">
                <Mail size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-[var(--color-primary)] transition">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} FutureRide. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 md:mt-0 flex items-center">
            Built with <span className="text-red-500 mx-1">♥</span> for a seamless ride.
          </p>
        </div>
      </div>
    </footer>
  );
};
