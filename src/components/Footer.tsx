import {
  Apple,
  Award,
  ChevronRight,
  Globe,
  Instagram,
  Mail,
  Play,
  ShieldCheck,
  Twitter,
  UtensilsCrossed,
  Youtube
} from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const { setActivePage, addNotification } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addNotification('Subscribed!', 'Welcome to Savoria Inner Circle. Check your inbox for exclusive secret tasting passes!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-serif">
                Savoria
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Billion-dollar startup grade culinary delivery platform. Connecting food lovers with Michelin-star chefs, local artisanal kitchens, and ultra-fast thermal delivery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">Discover Savoria</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActivePage('restaurants')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Top Rated Restaurants</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('categories')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Artisanal Cuisines</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('offers')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Savoria Gold Deals</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('collections')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Michelin Selections</span>
                </button>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">Partner & Roles</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActivePage('restaurant-owner-dashboard')} className="hover:text-amber-400 transition-colors">
                  Add Your Restaurant
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('delivery-partner-dashboard')} className="hover:text-amber-400 transition-colors">
                  Sign Up as Delivery Fleet
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('admin-dashboard')} className="hover:text-amber-400 transition-colors">
                  Enterprise Admin Access
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Corporate Catering Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & App Download */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-serif">VIP Tasting Club</h4>
            <p className="text-xs text-slate-400">
              Subscribe for secret chef pop-ups & 50% discount drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition-opacity"
              >
                Join Inner Circle
              </button>
            </form>

            <div className="pt-2 flex items-center gap-2">
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 flex-1">
                <Apple className="w-4 h-4 text-white" />
                <div className="text-[9px]">
                  <span className="block text-slate-400">Download on</span>
                  <span className="font-bold text-white">App Store</span>
                </div>
              </div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 flex-1">
                <Play className="w-4 h-4 text-amber-400" />
                <div className="text-[9px]">
                  <span className="block text-slate-400">Get it on</span>
                  <span className="font-bold text-white">Google Play</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted SSL Checkout | Guaranteed Thermal Insulation Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>© 2026 Savoria Technologies Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
