import {
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  RefreshCw,
  ShoppingBag,
  Store,
  ToggleLeft,
  ToggleRight,
  Utensils
} from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const RestaurantOwnerDashboard: React.FC = () => {
  const { addNotification } = useStore();
  const restaurant = MOCK_RESTAURANTS[0]; // L'Atelier du Truffle

  const [orders, setOrders] = useState([
    { id: 'ORD_982341', customer: 'Alexander Wright', items: '2x Truffle Wagyu Burger, 1x Rosemary Fries', total: 68.48, status: 'Kitchen Cooking', time: '5 mins ago' },
    { id: 'ORD_982342', customer: 'Sophia Chen', items: '1x Duck Confit Tagliatelle', total: 32.50, status: 'New Order', time: ' Just now' },
    { id: 'ORD_982340', customer: 'Marcus Vance', items: '1x Valrhona Chocolate Soufflé', total: 18.00, status: 'Ready for Pickup', time: '12 mins ago' },
  ]);

  const [menuItems, setMenuItems] = useState(restaurant.menuItems);

  const updateOrderStatus = (id: string, nextStatus: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: nextStatus } : o)));
    addNotification('Kitchen Order Status Updated', `Order #${id} is now ${nextStatus}`);
  };

  const toggleAvailability = (dishId: string) => {
    setMenuItems(
      menuItems.map((m) => (m.id === dishId ? { ...m, isAvailable: !m.isAvailable } : m))
    );
    addNotification('Stock Updated', 'Menu item availability status updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={restaurant.logo} alt={restaurant.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/50" />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-[10px] uppercase">
                Merchant Kitchen Console
              </span>
            </div>
            <h1 className="text-2xl font-black font-serif">{restaurant.name}</h1>
            <p className="text-xs text-slate-400">Live Kitchen KDS & Menu Availability Controls</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Kitchen Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Accepting Orders</span>
            </span>
          </div>
        </div>
      </div>

      {/* Live Order Pipeline Kanban Columns */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <span>Live Kitchen Display System (KDS)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: New Incoming */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-rose-500 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span>NEW INCOMING ({orders.filter((o) => o.status === 'New Order').length})</span>
            </div>

            {orders.filter((o) => o.status === 'New Order').map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900 dark:text-white">#{ord.id}</span>
                  <span className="text-slate-400 font-mono">${ord.total.toFixed(2)}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{ord.items}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Kitchen Cooking')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-[10px] shadow hover:bg-amber-400"
                  >
                    Start Cooking
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Kitchen Cooking */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-amber-500 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span>COOKING ON STOVE ({orders.filter((o) => o.status === 'Kitchen Cooking').length})</span>
            </div>

            {orders.filter((o) => o.status === 'Kitchen Cooking').map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900 dark:text-white">#{ord.id}</span>
                  <span className="text-amber-500 font-mono">${ord.total.toFixed(2)}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{ord.items}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Ready for Pickup')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-[10px] shadow hover:bg-emerald-400"
                  >
                    Mark Ready
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Ready for Rider */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-500 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span>READY FOR RIDER ({orders.filter((o) => o.status === 'Ready for Pickup').length})</span>
            </div>

            {orders.filter((o) => o.status === 'Ready for Pickup').map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-900 dark:text-white">#{ord.id}</span>
                  <span className="text-emerald-500 font-mono">${ord.total.toFixed(2)}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{ord.items}</p>
                <div className="pt-2 flex justify-end">
                  <span className="text-[10px] font-bold text-slate-400">Handed to Rider 🛵</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Menu Item In-Stock Toggles */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Menu Availability Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((dish) => (
            <div key={dish.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1">{dish.name}</h5>
                  <span className="font-mono text-amber-500 text-[10px]">${dish.price.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => toggleAvailability(dish.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-colors cursor-pointer ${
                  dish.isAvailable ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                }`}
              >
                {dish.isAvailable ? 'In Stock' : 'Sold Out'}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
