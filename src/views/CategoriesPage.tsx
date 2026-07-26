import { Compass, Plus } from 'lucide-react';
import React from 'react';
import { MOCK_CATEGORIES, MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const CategoriesPage: React.FC = () => {
  const { openFoodDetail, addToCart } = useStore();

  const allDishes = MOCK_RESTAURANTS.flatMap((r) => r.menuItems);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-xs uppercase tracking-wider">
          Culinary Taxonomy
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
          Explore by Category
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          From dry-aged Wagyu burgers to Neapolitan sourdough pizzas and royal dum biryani.
        </p>
      </div>

      {/* Categories Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden group space-y-3 p-4"
          >
            <div className="relative h-44 w-full rounded-2xl overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-3 text-white font-serif font-bold text-lg">{cat.name}</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{cat.description}</p>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">{cat.dishCount} Curated Dishes Available</span>
          </div>
        ))}
      </div>

      {/* Popular Items Breakdown */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-500" />
          <span>Category Highlights</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openFoodDetail(dish)}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
            >
              <img src={dish.image} alt={dish.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold text-amber-500 uppercase">{dish.category}</span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{dish.name}</h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white font-mono">${dish.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(dish, 1);
                    }}
                    className="p-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
