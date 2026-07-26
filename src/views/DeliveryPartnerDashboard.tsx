import {
  CheckCircle2,
  DollarSign,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  Truck
} from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_DRIVERS, MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const DeliveryPartnerDashboard: React.FC = () => {
  const { addNotification } = useStore();
  const driver = MOCK_DRIVERS[0];

  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState<any | null>(null);
  const [completedToday, setCompletedToday] = useState(14);
  const [earnedToday, setEarnedToday] = useState(182.50);

  const availableJobs = [
    {
      id: 'JOB_801',
      restaurantName: "L'Atelier du Truffle & Steak",
      restaurantAddress: '120 Fifth Ave, Midtown',
      customerName: 'Alexander Wright',
      customerAddress: '450 Fifth Avenue, Apt 14B',
      pay: 16.50,
      distance: '2.4 km',
      items: '2x Wagyu Truffle Burger, 1x Rosemary Fries',
    },
    {
      id: 'JOB_802',
      restaurantName: 'Sakura Omakase & Sushi Bar',
      restaurantAddress: '88 Madison Ave',
      customerName: 'Elena Rostova',
      customerAddress: '320 Park Avenue, Penthouse',
      pay: 22.00,
      distance: '3.1 km',
      items: '1x Chef Omakase Nigiri Platter',
    },
  ];

  const handleAcceptJob = (job: any) => {
    setActiveJob(job);
    addNotification('Delivery Accepted! 🛵', `Navigate to ${job.restaurantName} for pickup.`);
  };

  const handleCompleteJob = () => {
    if (!activeJob) return;
    setCompletedToday(completedToday + 1);
    setEarnedToday(earnedToday + activeJob.pay);
    addNotification('Trip Completed! 🎉', `+$${activeJob.pay.toFixed(2)} credited to your wallet.`);
    setActiveJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Rider Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={driver.avatar} alt={driver.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/50" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black font-serif">{driver.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-[10px] uppercase">
                5.0★ Top Driver
              </span>
            </div>
            <p className="text-xs text-slate-400">{driver.vehicleModel} • {driver.licensePlate}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              isOnline ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isOnline ? '🟢 Online & Ready' : '🔴 Go Online'}
          </button>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Today's Total Earnings</span>
          <span className="text-2xl font-black font-serif text-emerald-500 font-mono">${earnedToday.toFixed(2)}</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Deliveries</span>
          <span className="text-2xl font-black font-serif text-slate-900 dark:text-white font-mono">{completedToday} Trips</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Acceptance Rate</span>
          <span className="text-2xl font-black font-serif text-amber-500 font-mono">98.5%</span>
        </div>
      </div>

      {/* Active Navigation Job or Available Feed */}
      {activeJob ? (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent border-2 border-amber-500 shadow-2xl space-y-4">
          <div className="flex justify-between items-center text-xs font-black uppercase text-amber-500">
            <span>Active Delivery Job #{activeJob.id}</span>
            <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">${activeJob.pay.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-rose-500 uppercase">1. Pickup Location</span>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{activeJob.restaurantName}</h4>
              <p className="text-xs text-slate-500">{activeJob.restaurantAddress}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-500 uppercase">2. Customer Dropoff</span>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{activeJob.customerName}</h4>
              <p className="text-xs text-slate-500">{activeJob.customerAddress}</p>
            </div>
          </div>

          <button
            onClick={handleCompleteJob}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Delivered & Claim ${activeJob.pay.toFixed(2)}</span>
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Available Delivery Requests Nearby</h3>
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <div key={job.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{job.restaurantName}</span>
                    <span className="text-[10px] font-mono text-slate-400">({job.distance})</span>
                  </div>
                  <p className="text-xs text-slate-500">{job.items}</p>
                  <p className="text-[10px] text-amber-500 font-bold">Deliver to: {job.customerAddress}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-mono text-base font-black text-emerald-500">${job.pay.toFixed(2)}</span>
                  <button
                    onClick={() => handleAcceptJob(job)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 cursor-pointer"
                  >
                    Accept Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
