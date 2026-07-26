import {
  Clock,
  Heart,
  MapPin,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  User,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const UserDashboard: React.FC = () => {
  const { user, wishlist, addToCart, setActivePage, addNotification, orders } = useStore();
  const [tab, setTab] = useState<'orders' | 'addresses' | 'wallet' | 'wishlist'>('orders');

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addToCart(item.menuItem, item.quantity);
    });
    addNotification('Reordered!', 'Items added to your bag.');
    setActivePage('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/50" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-serif">{user.name}</h1>
              {user.savoriaGoldMember && (
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase">
                  Gold VIP
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Wallet Balance</span>
            <span className="text-lg font-black text-amber-400 font-mono">${user.walletBalance.toFixed(2)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Gold Pass</span>
            <span className="text-lg font-black text-emerald-400 font-mono">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'orders', label: 'Order History', icon: ShoppingBag },
          { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          { id: 'wallet', label: 'Savoria Wallet', icon: Wallet },
          { id: 'wishlist', label: 'Saved Favorites', icon: Heart },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {tab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Past Orders</h2>
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{ord.restaurant.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {ord.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                  </p>
                  <span className="text-[10px] text-slate-400 block">{ord.createdAt}</span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-2 sm:pt-0">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base font-mono">${ord.totalAmount.toFixed(2)}</span>
                  <button
                    onClick={() => handleReorder(ord)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'addresses' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Saved Delivery Addresses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.savedAddresses.map((addr) => (
              <div key={addr.id} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>{addr.title}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{addr.street}, {addr.city}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'wallet' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Savoria Cash Wallet</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Instant 1-click checkout with zero payment failure rate.</p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Current Balance: ${user.walletBalance.toFixed(2)}</span>
            <button
              onClick={() => addNotification('Funds Added', '$50 added to your Savoria Wallet!')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Top Up $50
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
