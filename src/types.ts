export type UserRole = 'customer' | 'admin' | 'restaurant_owner' | 'delivery_partner';

export type PaymentMethod = 'card' | 'upi' | 'applepay' | 'cod' | 'wallet';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  savedAddresses: Address[];
  walletBalance: number;
  savoriaGoldMember: boolean;
  wishlist: string[]; // Restaurant IDs
  favoriteDishes: string[]; // Dish IDs
}

export interface Address {
  id: string;
  title: string; // e.g. "Home", "Office", "Partner's Place"
  street: string;
  city: string;
  landmark?: string;
  pincode: string;
  lat: number;
  lng: number;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  dishCount: number;
  description: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  rating: number;
  reviewCount: number;
  calories?: number;
  prepTimeMinutes: number;
  tags: string[];
  nutrition?: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
  ingredients?: string[];
  customizationGroups?: CustomizationGroup[];
  isAvailable?: boolean;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  maxSelect?: number;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  coverImage: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  cuisines: string[];
  deliveryTime: string; // e.g., "20-30 min"
  distanceKm: number;
  priceForTwo: number;
  isPureVeg: boolean;
  isFeatured: boolean;
  isGoldPartner: boolean;
  isOpen: boolean;
  address: string;
  lat: number;
  lng: number;
  offerText?: string;
  menuCategories: string[];
  menuItems: MenuItem[];
}

export interface CartItem {
  id: string; // unique cart item instance key
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: {
    groupTitle: string;
    optionName: string;
    price: number;
  }[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Coupon {
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderValue: number;
  expiryDate: string;
  description: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  restaurantCount: number;
  restaurantIds: string[];
  badge?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  dishName?: string;
  likes: number;
  images?: string[];
}

export interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel?: string;
  licensePlate?: string;
  rating: number;
  totalDeliveries: number;
  currentLat: number;
  currentLng: number;
  status: 'available' | 'busy' | 'offline';
}

export type OrderStatus =
  | 'confirmed'
  | 'kitchen_prep'
  | 'driver_assigned'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  restaurant: {
    id: string;
    name: string;
    address: string;
    logo: string;
  };
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  tip: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  estimatedArrivalMinutes: number;
  driver?: DeliveryDriver;
  deliveryRouteProgress: number; // 0 to 100 percentage
}

export interface AIRecommendationRequest {
  prompt?: string;
  dietaryPreference?: string; // e.g. "veg", "keto", "high-protein"
  budgetMax?: number;
  mood?: string; // e.g. "comforting", "spicy", "light", "late-night"
  calorieLimit?: number;
}

export interface AIRecommendationResponse {
  summary: string;
  suggestedDishes: {
    dishName: string;
    restaurantName: string;
    reason: string;
    matchingCategory: string;
    estimatedPrice: number;
    healthTag: string;
  }[];
  chefTip: string;
}
