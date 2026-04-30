import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-[var(--color-primary)] opacity-80" />
        </div>
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Oops! The page you're looking for seems to have drifted into another dimension. Let's get you back on the road.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary">Return Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
