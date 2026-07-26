import { create } from 'zustand';
import { INITIAL_USER, MOCK_COUPONS, MOCK_DRIVERS, MOCK_RESTAURANTS } from '../data/mockData';
import { Address, CartItem, Coupon, MenuItem, Order, Restaurant, User, UserRole } from '../types';

export type PageView =
  | 'landing'
  | 'home'
  | 'restaurants'
  | 'restaurant-detail'
  | 'categories'
  | 'offers'
  | 'collections'
  | 'checkout'
  | 'order-tracking'
  | 'user-dashboard'
  | 'admin-dashboard'
  | 'restaurant-owner-dashboard'
  | 'restaurant-dashboard'
  | 'delivery-partner-dashboard'
  | 'driver-dashboard'
  | 'search';

interface AppState {
  // User & Auth
  user: User;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // View Navigation
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedRestaurantId: string | null;
  setSelectedRestaurantId: (id: string | null) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  vegOnlyFilter: boolean;
  setVegOnlyFilter: (veg: boolean) => void;

  // Modals & Drawers
  selectedMenuItem: MenuItem | null;
  isFoodDetailOpen: boolean;
  openFoodDetail: (item: MenuItem) => void;
  closeFoodDetail: () => void;

  isCartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  isLocationModalOpen: boolean;
  setLocationModalOpen: (open: boolean) => void;

  isAIChefOpen: boolean;
  setAIChefOpen: (open: boolean) => void;

  // Location
  currentAddress: Address;
  setCurrentAddress: (address: Address) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Cart Management
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedOptions?: any[], specialInstructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  tipAmount: number;
  setTipAmount: (amount: number) => void;
  deliveryNotes: string;
  setDeliveryNotes: (notes: string) => void;

  // Wishlist / Favorites
  wishlist: string[];
  toggleWishlist: (restaurantId: string) => void;

  // Restaurants & Orders
  restaurants: Restaurant[];
  orders: Order[];
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  placeOrder: (paymentMethod: 'card' | 'upi' | 'wallet' | 'cod') => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Notifications
  notifications: { id: string; title: string; message: string; timestamp: string; read: boolean }[];
  addNotification: (title: string, message: string) => void;
  markNotificationsAsRead: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: INITIAL_USER,
  currentRole: 'customer',
  setRole: (role) => set({ currentRole: role }),
  isAuthModalOpen: false,
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),

  activePage: 'landing',
  setActivePage: (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    set({ activePage: page });
  },
  selectedRestaurantId: 'rest_1',
  setSelectedRestaurantId: (id) => set({ selectedRestaurantId: id }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: null,
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  vegOnlyFilter: false,
  setVegOnlyFilter: (veg) => set({ vegOnlyFilter: veg }),

  selectedMenuItem: null,
  isFoodDetailOpen: false,
  openFoodDetail: (item) => set({ selectedMenuItem: item, isFoodDetailOpen: true }),
  closeFoodDetail: () => set({ isFoodDetailOpen: false, selectedMenuItem: null }),

  isCartDrawerOpen: false,
  setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),

  isLocationModalOpen: false,
  setLocationModalOpen: (open) => set({ isLocationModalOpen: open }),

  isAIChefOpen: false,
  setAIChefOpen: (open) => set({ isAIChefOpen: open }),

  currentAddress: INITIAL_USER.savedAddresses[0],
  setCurrentAddress: (address) => set({ currentAddress: address }),

  darkMode: typeof window !== 'undefined' ? localStorage.getItem('savoria_theme') === 'dark' : false,
  toggleDarkMode: () => {
    const nextDark = !get().darkMode;
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('savoria_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('savoria_theme', 'light');
    }
    set({ darkMode: nextDark });
  },

  cart: [
    {
      id: 'cart_init_1',
      menuItem: MOCK_RESTAURANTS[0].menuItems[0],
      quantity: 1,
      selectedOptions: [
        { groupTitle: 'Doneness Level', optionName: 'Medium Rare (Recommended)', price: 0 },
        { groupTitle: 'Luxurious Add-ons', optionName: 'Extra Fresh Shaved Truffle (+5g)', price: 6.50 },
      ],
      specialInstructions: 'Extra napkins and sauce on the side please.',
      totalPrice: 31.49,
    },
  ],

  addToCart: (item, quantity = 1, selectedOptions = [], specialInstructions = '') => {
    const currentCart = get().cart;
    const basePrice = item.price;
    const optionsPrice = selectedOptions.reduce((acc, opt) => acc + (opt.price || 0), 0);
    const itemUnitPrice = basePrice + optionsPrice;

    // Generate unique key
    const instanceKey = `${item.id}-${JSON.stringify(selectedOptions)}`;
    const existingIndex = currentCart.findIndex((c) => c.id === instanceKey);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = currentCart.map((c, i) => {
        if (i === existingIndex) {
          const newQty = c.quantity + quantity;
          return {
            ...c,
            quantity: newQty,
            totalPrice: Number((newQty * itemUnitPrice).toFixed(2)),
          };
        }
        return c;
      });
    } else {
      updatedCart = [
        ...currentCart,
        {
          id: instanceKey,
          menuItem: item,
          quantity,
          selectedOptions,
          specialInstructions,
          totalPrice: Number((quantity * itemUnitPrice).toFixed(2)),
        },
      ];
    }

    set({ cart: updatedCart });
    get().addNotification('Added to Cart', `${quantity}x ${item.name} added to your gourmet bag.`);
  },

  removeFromCart: (cartItemId) => {
    set({ cart: get().cart.filter((c) => c.id !== cartItemId) });
  },

  updateQuantity: (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }
    set({
      cart: get().cart.map((c) => {
        if (c.id === cartItemId) {
          const unitPrice = c.totalPrice / c.quantity;
          return {
            ...c,
            quantity: newQuantity,
            totalPrice: Number((unitPrice * newQuantity).toFixed(2)),
          };
        }
        return c;
      }),
    });
  },

  clearCart: () => set({ cart: [], appliedCoupon: null, tipAmount: 3 }),

  appliedCoupon: MOCK_COUPONS[0],

  applyCoupon: (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = MOCK_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Please check and try again.' };
    }
    const cartSubtotal = get().cart.reduce((acc, i) => acc + i.totalPrice, 0);
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${found.code} is $${found.minOrderValue.toFixed(2)}.`,
      };
    }
    set({ appliedCoupon: found });
    get().addNotification('Coupon Applied!', `Promo code ${found.code} successfully applied.`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  },

  removeCoupon: () => set({ appliedCoupon: null }),

  tipAmount: 3.0,
  setTipAmount: (amount) => set({ tipAmount: amount }),

  deliveryNotes: '',
  setDeliveryNotes: (notes) => set({ deliveryNotes: notes }),

  wishlist: ['rest_1', 'rest_3'],
  toggleWishlist: (restaurantId) => {
    const current = get().wishlist;
    const exists = current.includes(restaurantId);
    if (exists) {
      set({ wishlist: current.filter((id) => id !== restaurantId) });
      get().addNotification('Saved', 'Restaurant removed from your wishlist.');
    } else {
      set({ wishlist: [...current, restaurantId] });
      get().addNotification('Saved', 'Restaurant added to your favorites!');
    }
  },

  restaurants: MOCK_RESTAURANTS,

  orders: [
    {
      id: 'ord_9841',
      userId: INITIAL_USER.id,
      restaurant: {
        id: MOCK_RESTAURANTS[0].id,
        name: MOCK_RESTAURANTS[0].name,
        address: MOCK_RESTAURANTS[0].address,
        logo: MOCK_RESTAURANTS[0].logo,
      },
      items: [
        {
          id: 'cart_ord_1',
          menuItem: MOCK_RESTAURANTS[0].menuItems[0],
          quantity: 2,
          selectedOptions: [],
          totalPrice: 49.98,
        },
      ],
      subtotal: 49.98,
      tax: 4.50,
      deliveryFee: 0,
      tip: 4.00,
      discount: 15.00,
      totalAmount: 43.48,
      status: 'out_for_delivery',
      deliveryAddress: INITIAL_USER.savedAddresses[0],
      paymentMethod: 'card',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrivalMinutes: 18,
      driver: MOCK_DRIVERS[0],
      deliveryRouteProgress: 65,
    },
  ],

  activeOrderId: 'ord_9841',
  setActiveOrderId: (id) => set({ activeOrderId: id }),

  placeOrder: (paymentMethod) => {
    const { cart, appliedCoupon, tipAmount, currentAddress, restaurants } = get();
    const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const tax = Number((subtotal * 0.08).toFixed(2));
    const deliveryFee = 2.99;

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = (subtotal * appliedCoupon.discountValue) / 100;
        if (appliedCoupon.maxDiscount) {
          discount = Math.min(discount, appliedCoupon.maxDiscount);
        }
      } else {
        discount = appliedCoupon.discountValue;
      }
    }

    const totalAmount = Math.max(0, Number((subtotal + tax + deliveryFee + tipAmount - discount).toFixed(2)));

    // First restaurant from cart item
    const targetRest = restaurants.find((r) => r.id === cart[0]?.menuItem.restaurantId) || restaurants[0];

    const newOrder: Order = {
      id: `ord_${Math.floor(1000 + Math.random() * 9000)}`,
      userId: INITIAL_USER.id,
      restaurant: {
        id: targetRest.id,
        name: targetRest.name,
        address: targetRest.address,
        logo: targetRest.logo,
      },
      items: [...cart],
      subtotal,
      tax,
      deliveryFee,
      tip: tipAmount,
      discount,
      totalAmount,
      status: 'confirmed',
      deliveryAddress: currentAddress,
      paymentMethod,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrivalMinutes: 24,
      driver: MOCK_DRIVERS[0],
      deliveryRouteProgress: 10,
    };

    set({
      orders: [newOrder, ...get().orders],
      activeOrderId: newOrder.id,
      cart: [],
      appliedCoupon: null,
      activePage: 'order-tracking',
    });

    get().addNotification('Order Confirmed!', `Order #${newOrder.id} placed successfully with ${targetRest.name}.`);

    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    set({
      orders: get().orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    });
  },

  notifications: [
    {
      id: 'notif_1',
      title: 'Welcome to Savoria',
      message: 'Claim 50% OFF your first order with code SAVORIA50!',
      timestamp: '5 min ago',
      read: false,
    },
  ],

  addNotification: (title, message) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
    };
    set({ notifications: [newNotif, ...get().notifications] });
  },

  markNotificationsAsRead: () => {
    set({
      notifications: get().notifications.map((n) => ({ ...n, read: true })),
    });
  },
}));
