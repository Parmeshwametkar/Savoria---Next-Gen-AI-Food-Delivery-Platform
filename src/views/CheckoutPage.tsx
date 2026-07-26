import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PaymentMethod } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    currentAddress,
    user,
    appliedCoupon,
    tipAmount,
    placeOrder,
    setActivePage,
    addNotification,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [deliveryType, setDeliveryType] = useState<'instant' | 'scheduled'>('instant');
  const [scheduleTime, setScheduleTime] = useState('Today, 7:30 PM');
  const [driverNote, setDriverNote] = useState('Ring doorbell twice and leave on doorstep mat.');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const deliveryFee = 2.99;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount) discount = Math.min(discount, appliedCoupon.maxDiscount);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const grandTotal = Math.max(0, Number((subtotal + tax + deliveryFee + tipAmount - discount).toFixed(2)));

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      addNotification('Bag is Empty', 'Add items before checkout.');
      return;
    }

    setIsProcessing(true);
    addNotification('Processing Payment...', 'Verifying SSL token and dispatching rider...');

    setTimeout(() => {
      setIsProcessing(false);
      const validMethod = paymentMethod === 'applepay' ? 'card' : paymentMethod;
      const newOrder = placeOrder(validMethod);
      addNotification('Order Confirmed! 🎉', `Order #${newOrder.id} dispatched to kitchen.`);
      setActivePage('order-tracking');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-black font-serif text-slate-900 dark:text-white">Secure Checkout</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Encrypted 256-bit SSL transaction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Delivery Address */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold font-serif text-base text-slate-900 dark:text-white">Delivery Destination</h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{currentAddress.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{currentAddress.street}, {currentAddress.city}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase">Selected</span>
            </div>
          </div>

          {/* Step 2: Schedule Time */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold font-serif text-base text-slate-900 dark:text-white">Delivery Schedule</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryType('instant')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  deliveryType === 'instant'
                    ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Savoria Express (25 min)</span>
                </div>
                <p className="text-[10px] text-slate-500">Thermal insulated priority rider</p>
              </button>

              <button
                onClick={() => setDeliveryType('scheduled')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  deliveryType === 'scheduled'
                    ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Schedule for Later</span>
                </div>
                <p className="text-[10px] text-slate-500">{scheduleTime}</p>
              </button>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold font-serif text-base text-slate-900 dark:text-white">Payment Method</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'card', name: 'Credit / Debit', icon: CreditCard },
                { id: 'upi', name: 'UPI / Razorpay', icon: Wallet },
                { id: 'applepay', name: 'Apple Pay', icon: Wallet },
                { id: 'cod', name: 'Cash on Delivery', icon: CheckCircle2 },
              ].map((pm) => {
                const Icon = pm.icon;
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-amber-500' : ''}`} />
                    <span className="text-xs block">{pm.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Note for Driver */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rider Instruction Note</label>
              <input
                type="text"
                value={driverNote}
                onChange={(e) => setDriverNote(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Right Summary Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="font-bold font-serif text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <span>Order Breakdown</span>
            </h3>

            {/* Items Summary */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%)</span>
                <span className="font-mono text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Delivery Fee</span>
                <span className="font-mono text-slate-900 dark:text-white">${deliveryFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              {tipAmount > 0 && (
                <div className="flex justify-between">
                  <span>Rider Tip</span>
                  <span className="font-mono text-slate-900 dark:text-white">${tipAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount</span>
                <span className="text-amber-500 font-mono">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              id="pay_and_place_order_btn"
              onClick={handlePlaceOrder}
              disabled={isProcessing || cart.length === 0}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'Verifying SSL & Authorizing...' : `Pay $${grandTotal.toFixed(2)} & Track Live`}</span>
            </button>

            <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% On-Time Guarantee or Refund</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
