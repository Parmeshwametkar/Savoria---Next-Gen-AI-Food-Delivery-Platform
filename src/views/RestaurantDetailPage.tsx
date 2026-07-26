import {
  Clock,
  Heart,
  Image as ImageIcon,
  MapPin,
  Minus,
  Plus,
  Search,
  Star,
  Tag,
  Utensils
} from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_RESTAURANTS, MOCK_REVIEWS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const RestaurantDetailPage: React.FC = () => {
  const {
    selectedRestaurantId,
    openFoodDetail,
    cart,
    addToCart,
    updateQuantity,
    wishlist,
    toggleWishlist,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [menuVegOnly, setMenuVegOnly] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === selectedRestaurantId) || MOCK_RESTAURANTS[0];

  const isSaved = wishlist.includes(restaurant.id);

  const filteredMenuItems = restaurant.menuItems.filter((item) => {
    if (menuVegOnly && !item.isVeg) return false;
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (menuSearch && !item.name.toLowerCase().includes(menuSearch.toLowerCase()) && !item.description.toLowerCase().includes(menuSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Cover Banner */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-800">
        <img src={restaurant.coverImage} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Gallery Button */}
        <button
          onClick={() => setGalleryOpen(true)}
          className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 hover:bg-slate-950 transition-colors"
        >
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>Photos ({restaurant.gallery.length})</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(restaurant.id)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white hover:bg-slate-950 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        {/* Bottom Banner Stats */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                Michelin Certified
              </span>
              {restaurant.isGoldPartner && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  Savoria Gold Partner
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white font-serif">{restaurant.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">{restaurant.tagline}</p>
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{restaurant.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shrink-0 text-white">
            <div className="text-center px-2 border-r border-slate-800">
              <div className="flex items-center gap-1 font-black text-amber-400 text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-[10px] text-slate-400">{restaurant.reviewCount} Ratings</span>
            </div>
            <div className="text-center px-2">
              <div className="font-extrabold text-white text-sm">{restaurant.deliveryTime}</div>
              <span className="text-[10px] text-slate-400">{restaurant.distanceKm} km distance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Banner */}
      {restaurant.offerText && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
            <Tag className="w-4 h-4" />
            <span>Special Offer: {restaurant.offerText}</span>
          </div>
          <span className="text-[10px] text-slate-400">Applied automatically at checkout</span>
        </div>
      )}

      {/* Menu Filter Controls Bar */}
      <div className="sticky top-20 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Menu Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === 'All'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              All Menu
            </button>
            {restaurant.menuCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Veg Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search dish..."
                className="pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              onClick={() => setMenuVegOnly(!menuVegOnly)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                menuVegOnly ? 'bg-emerald-500 text-slate-950 border-emerald-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Veg Only
            </button>
          </div>

        </div>
      </div>

      {/* Menu Dish Cards List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
          <Utensils className="w-5 h-5 text-amber-500" />
          <span>{activeCategory === 'All' ? 'Complete Chef Menu' : activeCategory}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenuItems.map((item) => {
            // Check if already in cart
            const cartInstances = cart.filter((c) => c.menuItem.id === item.id);
            const totalQtyInCart = cartInstances.reduce((acc, c) => acc + c.quantity, 0);

            return (
              <div
                key={item.id}
                onClick={() => openFoodDetail(item)}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-start gap-4 cursor-pointer group"
              >
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase ${
                    item.isVeg ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                  }`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {item.name}
                      </h4>
                      {item.isBestseller && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] font-extrabold uppercase">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono">${item.price.toFixed(2)}</span>

                    {totalQtyInCart === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-amber-500/10 p-1 rounded-xl border border-amber-500/30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(cartInstances[0].id, cartInstances[0].quantity - 1);
                          }}
                          className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 dark:text-white px-1">{totalQtyInCart}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(cartInstances[0].id, cartInstances[0].quantity + 1);
                          }}
                          className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Customer Reviews & Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 space-y-4 relative">
            <button onClick={() => setGalleryOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              ✕
            </button>
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Gallery Photos</h3>
            <div className="grid grid-cols-2 gap-3">
              {restaurant.gallery.map((img, i) => (
                <img key={i} src={img} alt="Gallery" className="w-full h-40 object-cover rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
