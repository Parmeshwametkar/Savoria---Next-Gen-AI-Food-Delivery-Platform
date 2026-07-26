import { Clock, Filter, Heart, Search, Star, Tag } from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const RestaurantListingPage: React.FC = () => {
  const { setSelectedRestaurantId, setActivePage, wishlist, toggleWishlist, vegOnlyFilter, setVegOnlyFilter } = useStore();

  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'distance'>('rating');

  const allCuisines = ['All', 'French Steakhouse', 'Japanese', 'Indian', 'Woodfired Pizza', 'Healthy', 'Vegan'];

  const filtered = MOCK_RESTAURANTS.filter((r) => {
    if (vegOnlyFilter && !r.isPureVeg) return false;
    if (selectedCuisine !== 'All' && !r.cuisines.some((c) => c.toLowerCase().includes(selectedCuisine.toLowerCase()))) return false;
    if (searchFilter && !r.name.toLowerCase().includes(searchFilter.toLowerCase()) && !r.cuisines.some((c) => c.toLowerCase().includes(searchFilter.toLowerCase()))) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black font-serif text-slate-900 dark:text-white">Artisanal Restaurants</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Discover Michelin-star dining and cloud kitchens in your city</p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by name or cuisine..."
              className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
              vegOnlyFilter
                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Pure Veg
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="distance">Sort by Distance</option>
            <option value="time">Fastest Delivery</option>
          </select>
        </div>
      </div>

      {/* Cuisine Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-amber-500 shrink-0" />
        {allCuisines.map((c) => {
          const isActive = selectedCuisine === c;
          return (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rest) => {
          const isSaved = wishlist.includes(rest.id);
          return (
            <div
              key={rest.id}
              onClick={() => {
                setSelectedRestaurantId(rest.id);
                setActivePage('restaurant-detail');
              }}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img src={rest.coverImage} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(rest.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                </button>

                {rest.offerText && (
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="truncate">{rest.offerText}</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif group-hover:text-amber-500 transition-colors">
                      {rest.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{rest.tagline}</p>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                    <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    <span>{rest.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {rest.cuisines.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{rest.deliveryTime}</span>
                  </div>
                  <span>•</span>
                  <span>${rest.priceForTwo} for two</span>
                  <span>•</span>
                  <span>{rest.distanceKm} km away</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
