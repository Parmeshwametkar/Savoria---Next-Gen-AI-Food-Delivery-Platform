import { Building2, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import React from 'react';
import { useStore } from '../store/useStore';
import { UserRole } from '../types';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, setRole, setActivePage } = useStore();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; defaultPage: any }[] = [
    { id: 'customer', label: 'Customer View', icon: <ShoppingBag className="w-3.5 h-3.5" />, defaultPage: 'landing' },
    { id: 'restaurant_owner', label: 'Kitchen / Restaurant', icon: <Building2 className="w-3.5 h-3.5" />, defaultPage: 'restaurant-owner-dashboard' },
    { id: 'delivery_partner', label: 'Delivery Partner', icon: <Truck className="w-3.5 h-3.5" />, defaultPage: 'delivery-partner-dashboard' },
    { id: 'admin', label: 'Admin Command', icon: <ShieldCheck className="w-3.5 h-3.5" />, defaultPage: 'admin-dashboard' },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 flex flex-wrap items-center justify-between gap-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold tracking-wide uppercase text-[10px] text-slate-400">Savoria Platform Simulator:</span>
        <span className="text-slate-300 hidden sm:inline">Switch views to preview full-stack role experience</span>
      </div>

      <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              id={`role_btn_${r.id}`}
              onClick={() => {
                setRole(r.id);
                setActivePage(r.defaultPage);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium text-[11px] ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
