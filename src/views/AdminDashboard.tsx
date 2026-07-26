import {
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Store,
  TrendingUp,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const AdminDashboard: React.FC = () => {
  const { addNotification } = useStore();
  const [restaurants, setRestaurants] = useState(MOCK_RESTAURANTS);

  const toggleFeatured = (id: string) => {
    setRestaurants(
      restaurants.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r))
    );
    addNotification('Status Updated', 'Restaurant feature flag updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-[10px] uppercase">
              Super Admin Console
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black font-serif text-slate-900 dark:text-white mt-1">Platform Control Hub</h1>
        </div>

        <button
          onClick={() => addNotification('Restaurant Added', 'Opened new onboarding wizard.')}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Restaurant</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total GMV Revenue', val: '$1,284,950', change: '+18.4%', icon: DollarSign, color: 'text-amber-500' },
          { label: 'Total Orders Handled', val: '48,290', change: '+12.1%', icon: ShoppingBag, color: 'text-emerald-500' },
          { label: 'Active Partner Places', val: '142', change: '+5 new', icon: Store, color: 'text-sky-500' },
          { label: 'Registered Customers', val: '210,400', change: '+2,400', icon: Users, color: 'text-purple-500' },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black font-serif text-slate-900 dark:text-white">{m.val}</span>
                <span className="text-[10px] font-bold text-emerald-500">{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Partner Restaurants Management Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Partner Restaurants Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">Restaurant</th>
                <th className="p-3">Cuisines</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Delivery Time</th>
                <th className="p-3">Featured</th>
                <th className="p-3 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {restaurants.map((r) => (
                <tr key={r.id}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <img src={r.logo} alt={r.name} className="w-8 h-8 rounded-xl object-cover" />
                    <span>{r.name}</span>
                  </td>
                  <td className="p-3">{r.cuisines.join(', ')}</td>
                  <td className="p-3 font-bold text-amber-500 font-mono">⭐ {r.rating}</td>
                  <td className="p-3">{r.deliveryTime}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.isFeatured ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}>
                      {r.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleFeatured(r.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-[10px] transition-colors"
                    >
                      Toggle Feature
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
