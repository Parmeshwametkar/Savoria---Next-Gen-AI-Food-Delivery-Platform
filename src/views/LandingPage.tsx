import {
  ArrowRight,
  ChevronDown,
  Clock,
  Compass,
  Flame,
  Gift,
  Heart,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  UtensilsCrossed
} from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_CATEGORIES, MOCK_COLLECTIONS, MOCK_COUPONS, MOCK_RESTAURANTS, MOCK_REVIEWS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const LandingPage: React.FC = () => {
  const {
    setActivePage,
    setSelectedRestaurantId,
    openFoodDetail,
    setLocationModalOpen,
    setAIChefOpen,
    toggleWishlist,
    wishlist,
    addToCart,
    searchQuery,
    setSearchQuery,
    vegOnlyFilter,
    setVegOnlyFilter,
  } = useStore();

  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const popularRestaurants = MOCK_RESTAURANTS.filter((r) => r.isFeatured);
  const topDishes = MOCK_RESTAURANTS.flatMap((r) => r.menuItems).filter((m) => m.isBestseller);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('search');
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[580px] rounded-3xl overflow-hidden max-w-7xl mx-auto border border-slate-200/60 dark:border-slate-800 bg-slate-950 text-white flex items-center justify-center p-6 sm:p-12 lg:p-16 shadow-2xl">
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
            alt="Hero culinary background"
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-3xl text-center space-y-6 mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Next-Gen AI Food Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.1] text-white">
            Craving Perfection? <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Michelin Flavor Delivered Fast.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Order from top-tier restaurants, artisanal bakeries, and cloud kitchens with AI-driven menu pairings and real-time thermal tracking.
          </p>

          {/* Location & Search Bar Box */}
          <div className="p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2 max-w-2xl mx-auto">
            
            {/* Location Selector */}
            <button
              id="hero_location_btn"
              onClick={() => setLocationModalOpen(true)}
              className="w-full sm:w-auto flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs font-semibold text-white hover:bg-slate-800 transition-colors text-left"
            >
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="truncate max-w-[120px]">
                <span className="block text-slate-400 text-[9px] uppercase font-bold">Deliver To</span>
                <span className="truncate block">Downtown Metro</span>
              </div>
            </button>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Wagyu, Truffle Pasta, Sushi, Biryani..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-md hover:opacity-95 transition-opacity shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* AI Chef Quick Prompt CTA */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-400 font-medium">Or try AI Concierge:</span>
            <button
              onClick={() => setAIChefOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>"Recommend a high-protein dinner under $30"</span>
            </button>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TODAY'S OFFERS & COUPON CAROUSEL */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-6 h-6 text-amber-500" />
              <span>Today's Exclusive Savoria Deals</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Claim instant discount codes for your next order</p>
          </div>
          <button
            onClick={() => setActivePage('offers')}
            className="text-amber-600 dark:text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_COUPONS.map((coupon) => (
            <div
              key={coupon.code}
              className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-all"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>
              
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `$${coupon.discountValue} OFF`}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Min ${coupon.minOrderValue}</span>
                </div>

                <h3 className="text-sm font-extrabold text-white font-serif">{coupon.title}</h3>
                <p className="text-[11px] text-slate-400 leading-normal">{coupon.description}</p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="font-mono text-xs font-bold text-amber-400">{coupon.code}</span>
                  <button
                    onClick={() => {
                      setActivePage('restaurants');
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-[10px] font-bold transition-colors"
                  >
                    Claim Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* POPULAR CATEGORIES */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-500" />
              <span>Explore Cuisines & Categories</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Handcrafted dishes curated by culinary category</p>
          </div>
          <button
            onClick={() => setActivePage('categories')}
            className="text-amber-600 dark:text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>Browse All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActivePage('categories');
              }}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all text-center group cursor-pointer space-y-2"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 group-hover:scale-105 transition-transform">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block group-hover:text-amber-500 transition-colors line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 block">{cat.dishCount} Items</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TOP RATED FEATURED RESTAURANTS */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span>Top Rated Restaurants</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Award-winning kitchens with guaranteed thermal delivery</p>
          </div>

          {/* Veg / Non-Veg Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all ${
                vegOnlyFilter
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Pure Veg Mode</span>
            </button>

            <button
              onClick={() => setActivePage('restaurants')}
              className="text-amber-600 dark:text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
            >
              <span>See All Restaurants</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRestaurants
            .filter((r) => (!vegOnlyFilter ? true : r.isPureVeg))
            .map((rest) => {
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
                    <img
                      src={rest.coverImage}
                      alt={rest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(rest.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </button>

                    {/* Gold Partner Badge */}
                    {rest.isGoldPartner && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                        Gold Partner
                      </span>
                    )}

                    {/* Offer Text Overlay */}
                    {rest.offerText && (
                      <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="truncate">{rest.offerText}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
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
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                        >
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
      </section>

      {/* ---------------------------------------------------- */}
      {/* FEATURED CURATED COLLECTIONS */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Gift className="w-6 h-6 text-amber-500" />
              <span>Curated Collections</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Handpicked restaurant guides for every dining occasion</p>
          </div>
          <button
            onClick={() => setActivePage('collections')}
            className="text-amber-600 dark:text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>Explore All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => setActivePage('collections')}
              className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/30">
                  {col.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-lg font-bold text-white font-serif group-hover:text-amber-400 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">{col.subtitle}</p>
                <span className="text-[10px] font-bold text-amber-400 block pt-1">{col.restaurantCount} Places →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* POPULAR DISHES GRID */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-500" />
              <span>Trending & Bestselling Dishes</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Most ordered dishes near your current location</p>
          </div>
          <button
            onClick={() => setActivePage('search')}
            className="text-amber-600 dark:text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>Search Dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openFoodDetail(dish)}
              className="p-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group cursor-pointer space-y-3"
            >
              <div className="relative h-40 w-full rounded-2xl overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  dish.isVeg ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {dish.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-[10px]">
                  ⭐ {dish.rating}
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
      </section>

      {/* ---------------------------------------------------- */}
      {/* CUSTOMER REVIEWS */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white">Loved by Foodies Everywhere</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Over 250,000 gourmet orders delivered with 4.9★ rating</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{rev.userName}</h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FAQ ACCORDION */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black font-serif text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to know about Savoria</p>
        </div>

        <div className="space-y-3">
          {[
            { q: 'How fast is Savoria Express Thermal Delivery?', a: 'Our thermal insulated fleet delivers hot meals within an average of 22 to 30 minutes with real-time GPS tracking.' },
            { q: 'How does Chef Savoria AI recommendation work?', a: 'Powered by Gemini 3.6 Flash, our AI engine analyzes your cravings, dietary needs, budget, and calorie goals to recommend exact menu items.' },
            { q: 'What are Savoria Gold benefits?', a: 'Gold members get free delivery on all orders over $30, exclusive secret tasting discounts, and priority driver allocation.' },
            { q: 'Can I schedule orders for later?', a: 'Yes! During checkout, you can schedule delivery up to 7 days in advance.' },
          ].map((item, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div key={idx} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
