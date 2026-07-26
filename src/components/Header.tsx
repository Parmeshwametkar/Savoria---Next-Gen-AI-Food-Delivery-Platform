import {
  Bell,
  Heart,
  MapPin,
  Moon,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  User as UserIcon,
  UtensilsCrossed,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    currentAddress,
    setLocationModalOpen,
    setAIChefOpen,
    cart,
    setCartDrawerOpen,
    darkMode,
    toggleDarkMode,
    notifications,
    markNotificationsAsRead,
    wishlist,
    user,
    setAuthModalOpen,
  } = useStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-8 z-40 px-4 sm:px-6 lg:px-8 py-2 max-w-7xl mx-auto">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/20 dark:shadow-none rounded-2xl px-4 py-2.5 flex items-center justify-between gap-3 transition-all duration-300">
        
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button
            id="brand_logo_btn"
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent font-serif">
                Savoria
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 -mt-1">
                Gourmet AI
              </span>
            </div>
          </button>

          {/* Location Selector */}
          <button
            id="header_location_btn"
            onClick={() => setLocationModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
            <div className="text-left max-w-[140px] lg:max-w-[180px] truncate">
              <span className="font-bold block text-slate-900 dark:text-white truncate">
                {currentAddress.title}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                {currentAddress.street}
              </span>
            </div>
          </button>
        </div>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-1 font-medium text-xs">
          {[
            { id: 'restaurants', label: 'Restaurants' },
            { id: 'categories', label: 'Categories' },
            { id: 'offers', label: 'Offers & Deals' },
            { id: 'collections', label: 'Collections' },
          ].map((nav) => {
            const isActive = activePage === nav.id;
            return (
              <button
                key={nav.id}
                id={`nav_link_${nav.id}`}
                onClick={() => setActivePage(nav.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {nav.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* AI Concierge Trigger */}
          <button
            id="ai_chef_btn"
            onClick={() => setAIChefOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-xs shadow-md shadow-amber-500/20 hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            <span className="hidden sm:inline">Ask AI Chef</span>
          </button>

          {/* Search Shortcut */}
          <button
            id="search_shortcut_btn"
            onClick={() => setActivePage('search')}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search dishes & restaurants"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark Mode */}
          <button
            id="dark_mode_toggle_btn"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              id="notif_bell_btn"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                if (unreadNotifs > 0) markNotificationsAsRead();
              }}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
                  <span className="text-[10px] text-slate-400">{notifications.length} updates</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</div>
                      <span className="text-[9px] text-slate-400 mt-1 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            id="wishlist_btn"
            onClick={() => setActivePage('user-dashboard')}
            className="hidden sm:flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="cart_trigger_btn"
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-extrabold">
              {cartCount}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              id="user_profile_btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-500/40"
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <Wallet className="w-3 h-3" />
                    <span>Savoria Cash: ${user.walletBalance.toFixed(2)}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    id="menu_user_dashboard"
                    onClick={() => {
                      setActivePage('user-dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-medium"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-amber-500" />
                    <span>My Profile & Orders</span>
                  </button>
                  <button
                    id="menu_open_auth"
                    onClick={() => {
                      setAuthModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-medium"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-blue-500" />
                    <span>Sign In / Switch Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
};
