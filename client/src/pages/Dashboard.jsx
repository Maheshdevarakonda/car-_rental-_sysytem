import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, Car, DollarSign, Users, Settings, LogOut, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import api from '../utils/api';
import toast from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const statusIcons = {
  pending: <Clock size={14} />,
  confirmed: <CheckCircle size={14} />,
  active: <Car size={14} />,
  completed: <CheckCircle size={14} />,
  cancelled: <XCircle size={14} />,
};

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await api.get('/bookings/mybookings');
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
      // Don't show error toast for 401 (handled by interceptor)
      if (error.response?.status !== 401) {
        toast.error('Failed to load bookings');
      }
    }
    setLoadingBookings(false);
  };

  const activeBookings = bookings.filter(b => ['pending', 'confirmed', 'active'].includes(b.status));
  const pastBookings = bookings.filter(b => ['completed', 'cancelled'].includes(b.status));
  const totalSpent = bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const stats = user?.role === 'admin' ? [
    { label: 'Total Revenue', value: `₹${totalSpent.toLocaleString('en-IN')}`, icon: <DollarSign className="text-green-500" /> },
    { label: 'Active Bookings', value: `${activeBookings.length}`, icon: <Calendar className="text-blue-500" /> },
    { label: 'Total Bookings', value: `${bookings.length}`, icon: <Car className="text-[var(--color-primary)]" /> },
  ] : [
    { label: 'Active Rentals', value: `${activeBookings.length}`, icon: <Activity className="text-blue-500" /> },
    { label: 'Past Bookings', value: `${pastBookings.length}`, icon: <Calendar className="text-slate-500" /> },
    { label: 'Total Spent', value: `₹${totalSpent.toLocaleString('en-IN')}`, icon: <DollarSign className="text-green-500" /> },
  ];

  if (!user) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="glass p-6 rounded-2xl sticky top-24">
          <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {user.name?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{user.name}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{user.role}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'overview' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Activity size={18} />
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'bookings' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Calendar size={18} />
              <span>{user.role === 'admin' ? 'All Bookings' : 'My Bookings'}</span>
            </button>
            
            {user.role === 'admin' && (
              <>
                <button 
                  onClick={() => setActiveTab('vehicles')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'vehicles' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Car size={18} />
                  <span>Manage Fleet</span>
                </button>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'users' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Users size={18} />
                  <span>Manage Users</span>
                </button>
              </>
            )}

            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'settings' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>

          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          {activeTab === 'bookings' && (
            <Button variant="outline" className="flex items-center text-sm" onClick={fetchBookings}>
              <Activity size={16} className="mr-1" /> Refresh
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Booking History */}
        {(activeTab === 'overview' || activeTab === 'bookings') && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                {activeTab === 'overview' ? 'Recent Bookings' : 'All Bookings'}
              </h2>
              <span className="text-sm text-slate-500">{bookings.length} total</span>
            </div>

            {loadingBookings ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-slate-500 text-sm">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="mx-auto mb-4 text-slate-400" size={40} />
                <p className="text-slate-500 font-medium">No bookings yet</p>
                <p className="text-slate-400 text-sm mt-1">Your booking history will appear here once you rent a vehicle.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {(activeTab === 'overview' ? bookings.slice(0, 5) : bookings).map((booking, idx) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* Vehicle Image */}
                    <div className="w-full sm:w-20 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      {booking.vehicleId?.images?.[0] ? (
                        <img 
                          src={booking.vehicleId.images[0]} 
                          alt={booking.vehicleId.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car size={24} className="text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {booking.vehicleId?.name || 'Vehicle'}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status] || statusColors.pending}`}>
                      {statusIcons[booking.status] || statusIcons.pending}
                      {booking.status}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">
                        ₹{(booking.totalPrice || 0).toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-slate-500">{booking.totalDays || 1} day{(booking.totalDays || 1) > 1 ? 's' : ''}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== 'overview' && activeTab !== 'bookings' && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="font-semibold text-lg capitalize">{activeTab}</h2>
            </div>
            <div className="p-12 text-center text-slate-500">
              <Settings className="mx-auto mb-4 text-slate-400" size={40} />
              <p className="font-medium">{activeTab} section coming soon</p>
              <p className="text-sm text-slate-400 mt-1">This feature is under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
