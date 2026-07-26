import { Camera, Mic, Plus, Search, Sparkles, Star } from 'lucide-react';
import React from 'react';
import { MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const SearchPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setAIChefOpen,
    openFoodDetail,
    addToCart,
    setSelectedRestaurantId,
    setActivePage,
  } = useStore();

  const allDishes = MOCK_RESTAURANTS.flatMap((r) => r.menuItems);

  const matchedDishes = allDishes.filter((dish) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return dish.name.toLowerCase().includes(q) || dish.description.toLowerCase().includes(q) || dish.category.toLowerCase().includes(q);
  });

  const matchedRestaurants = MOCK_RESTAURANTS.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.cuisines.some((c) => c.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Search Bar Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Wagyu, Truffle Pasta, Sushi, Biryani, Vegan Bowl..."
            className="w-full pl-12 pr-28 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
            <button
              onClick={() => setAIChefOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Search</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Trending Searches:</span>
          {['Truffle', 'Wagyu', 'Ramen', 'Neapolitan Pizza', 'Keto Salmon', 'Dum Biryani'].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500/20 hover:text-amber-500 font-semibold transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
          SearchResults for "{searchQuery || 'All Gourmet Choices'}"
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          {matchedDishes.length} Dishes • {matchedRestaurants.length} Restaurants
        </span>
      </div>

      {/* Matched Dishes Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Dishes Matching Craving</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchedDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openFoodDetail(dish)}
              className="p-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-pointer space-y-3"
            >
              <div className="relative h-40 w-full rounded-2xl overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  dish.isVeg ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {dish.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                  {dish.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{dish.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono">${dish.price.toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(dish, 1);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
