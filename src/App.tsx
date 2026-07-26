import React, { useEffect } from 'react';
import { AIChefModal } from './components/AIChefModal';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingThemeToggle } from './components/FloatingThemeToggle';
import { FoodDetailModal } from './components/FoodDetailModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LocationModal } from './components/LocationModal';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { useStore } from './store/useStore';

// Views
import { AdminDashboard } from './views/AdminDashboard';
import { CategoriesPage } from './views/CategoriesPage';
import { CheckoutPage } from './views/CheckoutPage';
import { CollectionsPage } from './views/CollectionsPage';
import { DeliveryPartnerDashboard } from './views/DeliveryPartnerDashboard';
import { LandingPage } from './views/LandingPage';
import { OffersPage } from './views/OffersPage';
import { OrderTrackingPage } from './views/OrderTrackingPage';
import { RestaurantDetailPage } from './views/RestaurantDetailPage';
import { RestaurantListingPage } from './views/RestaurantListingPage';
import { RestaurantOwnerDashboard } from './views/RestaurantOwnerDashboard';
import { SearchPage } from './views/SearchPage';
import { UserDashboard } from './views/UserDashboard';

export function App() {
  const { activePage, darkMode, notifications, currentRole } = useStore();

  // Handle Dark mode class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderActivePage = () => {
    // If switched to Role dashboard
    if (currentRole === 'admin') return <AdminDashboard />;
    if (currentRole === 'restaurant_owner') return <RestaurantOwnerDashboard />;
    if (currentRole === 'delivery_partner') return <DeliveryPartnerDashboard />;

    // Customer navigation
    switch (activePage) {
      case 'home':
        return <LandingPage />;
      case 'restaurants':
        return <RestaurantListingPage />;
      case 'restaurant-detail':
        return <RestaurantDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'offers':
        return <OffersPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'search':
        return <SearchPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'restaurant-dashboard':
        return <RestaurantOwnerDashboard />;
      case 'driver-dashboard':
        return <DeliveryPartnerDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between transition-colors duration-300">
      
      {/* Top Banner & Header */}
      <div>
        <RoleSwitcherBar />
        <Header />

        {/* Main Content View */}
        <main className="pt-6">
          {renderActivePage()}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <FloatingThemeToggle />
      <CartDrawer />
      <LocationModal />
      <AIChefModal />
      <AuthModal />
      <FoodDetailModal />

      {/* Notification Toast Stack */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 border border-amber-500/40 text-white shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 flex items-start gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 animate-ping"></div>
            <div>
              <h5 className="font-bold text-xs text-amber-400">{n.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
