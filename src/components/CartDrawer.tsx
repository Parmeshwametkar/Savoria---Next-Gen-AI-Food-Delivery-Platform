import { ArrowRight, Heart, Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setCartDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    tipAmount,
    setTipAmount,
    setActivePage,
    clearCart,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const deliveryFee = cart.length > 0 ? 2.99 : 0;

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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyCoupon(promoInput);
    setPromoMessage(res.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">Your Gourmet Bag</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{cart.length} unique culinary items</p>
            </div>
          </div>
          <button
            id="close_cart_drawer_btn"
            onClick={() => setCartDrawerOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base">Your Bag is Empty</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                Explore top Michelin-starred dishes or ask AI Chef for personalized recommendations!
              </p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  setActivePage('restaurants');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex gap-3 relative group"
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{item.menuItem.name}</h5>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-500 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.selectedOptions && item.selectedOptions.length > 0 && (
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                      {item.selectedOptions.map((o) => o.optionName).join(', ')}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 dark:text-white px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-xs text-amber-500 font-mono">${item.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <>
              {/* Promo Code Input */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Apply Coupon Code</span>
                  </span>
                  {appliedCoupon && (
                    <button onClick={removeCoupon} className="text-[10px] text-rose-500 font-bold hover:underline">
                      Remove
                    </button>
                  )}
                </div>

                {!appliedCoupon ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try SAVORIA50 or GOLDENPASS"
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs uppercase font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{appliedCoupon.code} Applied</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}

                {promoMessage && <p className="text-[10px] text-slate-500 dark:text-slate-400">{promoMessage}</p>}
              </div>

              {/* Delivery Partner Tip */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tip Delivery Partner</span>
                <div className="flex gap-2">
                  {[2, 3, 5, 8].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(amount)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        tipAmount === amount
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Taxes & Service GST (8%)</span>
                <span className="font-mono text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Express Thermal Delivery</span>
                <span className="font-mono text-slate-900 dark:text-white">${deliveryFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              {tipAmount > 0 && (
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Rider Tip</span>
                  <span className="font-mono text-slate-900 dark:text-white">${tipAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm font-extrabold pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                <span>Grand Total</span>
                <span className="text-amber-500 font-mono text-base">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              id="proceed_to_checkout_btn"
              onClick={() => {
                setCartDrawerOpen(false);
                setActivePage('checkout');
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity flex items-center justify-between cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <div className="flex items-center gap-1">
                <span className="font-mono">${grandTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
