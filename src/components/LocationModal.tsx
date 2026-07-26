import { Check, MapPin, Navigation, Plus, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Address } from '../types';

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setLocationModalOpen, currentAddress, setCurrentAddress, user, addNotification } = useStore();
  const [search, setSearch] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleSelect = (addr: Address) => {
    setCurrentAddress(addr);
    setLocationModalOpen(false);
    addNotification('Location Updated', `Delivering to ${addr.title}`);
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      const detected: Address = {
        id: `addr_${Date.now()}`,
        title: 'Current GPS Location',
        street: '450 Fifth Avenue, Midtown',
        city: 'Metro City',
        pincode: '10018',
        lat: 40.7527,
        lng: -73.9822,
      };
      setIsDetecting(false);
      setCurrentAddress(detected);
      setLocationModalOpen(false);
      addNotification('GPS Locked', 'Location pinpointed to 450 Fifth Avenue.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Select Delivery Location</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Where should we deliver your gourmet meal?</p>
            </div>
          </div>
          <button
            id="close_location_modal_btn"
            onClick={() => setLocationModalOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* GPS Detect CTA */}
        <button
          id="detect_gps_btn"
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer"
        >
          <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
          <span>{isDetecting ? 'Locating via High-Precision GPS...' : 'Use Current GPS Location'}</span>
        </button>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, area, street, or landmark..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Saved Addresses List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Saved Addresses</span>
          {user.savedAddresses.map((addr) => {
            const isSelected = currentAddress.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => handleSelect(addr)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/5 dark:bg-amber-500/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className={`w-4 h-4 mt-0.5 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{addr.title}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{addr.street}</span>
                    {addr.landmark && (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">Note: {addr.landmark}</span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Address Action */}
        <button
          onClick={() => {
            const newAddr: Address = {
              id: `addr_${Date.now()}`,
              title: 'Summer Villa',
              street: '88 Ocean Drive, Palm Beach',
              city: 'Metropolis',
              pincode: '33480',
              lat: 26.7056,
              lng: -80.0364,
            };
            handleSelect(newAddr);
          }}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-600 dark:text-slate-300 hover:text-amber-500 text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>

      </div>
    </div>
  );
};
