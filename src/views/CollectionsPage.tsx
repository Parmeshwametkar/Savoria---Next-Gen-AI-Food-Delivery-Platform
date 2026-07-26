import { ArrowRight, Gift } from 'lucide-react';
import React from 'react';
import { MOCK_COLLECTIONS, MOCK_RESTAURANTS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const CollectionsPage: React.FC = () => {
  const { setSelectedRestaurantId, setActivePage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-xs uppercase tracking-wider">
          Editorial Guides
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
          Curated Food Collections
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Handpicked guides curated by Michelin food critics and culinary historians.
        </p>
      </div>

      {/* Collections Guides Grid */}
      <div className="space-y-12">
        {MOCK_COLLECTIONS.map((col) => {
          const matchedRestaurants = MOCK_RESTAURANTS.filter((r) => col.restaurantIds.includes(r.id));
          return (
            <div key={col.id} className="space-y-4">
              
              {/* Collection Banner */}
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    {col.badge}
                  </span>
                  <h2 className="text-2xl font-black font-serif pt-1">{col.title}</h2>
                  <p className="text-xs text-slate-300 max-w-xl">{col.subtitle}</p>
                </div>
              </div>

              {/* Matched Places Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedRestaurants.map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => {
                      setSelectedRestaurantId(rest.id);
                      setActivePage('restaurant-detail');
                    }}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={rest.logo} alt={rest.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                          {rest.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 block">{rest.cuisines.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
