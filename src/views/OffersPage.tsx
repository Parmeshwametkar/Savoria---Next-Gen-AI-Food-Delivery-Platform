import { Check, Gift, Sparkles, Tag, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_COUPONS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const OffersPage: React.FC = () => {
  const { applyCoupon, setActivePage, addNotification } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      setIsSpinning(false);
      const rewards = ['SAVORIA50', 'GOLDENPASS', 'FIRSTCRUNCH', 'HEALTHY20'];
      const won = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(won);
      applyCoupon(won);
      addNotification('Wheel Reward Claimed!', `You won promo code ${won}! Discount applied to your bag.`);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-xs uppercase tracking-wider">
          Savoria Gold Privilege
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
          Offers & Tasting Deals
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Claim promotional discounts, daily spins, and VIP partner passes.
        </p>
      </div>

      {/* Interactive Spin The Wheel Daily Reward Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-400 font-black text-[10px] uppercase">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>Daily Mystery Scratch & Spin</span>
          </div>
          <h2 className="text-2xl font-black font-serif">Spin for Up to $25 Instant Cash Discount!</h2>
          <p className="text-xs font-medium text-slate-900/80">
            Every user gets 1 daily lucky spin. Guaranteed win on every turn!
          </p>
        </div>

        <div className="text-center space-y-3 shrink-0">
          <button
            id="spin_wheel_btn"
            onClick={handleSpinWheel}
            disabled={isSpinning}
            className={`px-8 py-4 rounded-2xl bg-slate-950 text-amber-400 font-black text-sm shadow-2xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer ${
              isSpinning ? 'animate-pulse' : ''
            }`}
          >
            <Sparkles className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Spinning Lucky Wheel...' : 'Spin Daily Wheel'}</span>
          </button>

          {spinResult && (
            <div className="p-2 rounded-xl bg-slate-950 text-emerald-400 text-xs font-bold animate-in fade-in">
              🎉 Congratulations! Code <strong>{spinResult}</strong> Applied!
            </div>
          )}
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4 relative overflow-hidden group hover:border-amber-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 font-bold">
                <Tag className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Min Order ${coupon.minOrderValue}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">{coupon.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{coupon.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs font-extrabold text-amber-500">
                {coupon.code}
              </div>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 transition-colors flex items-center gap-1"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied</span>
                  </>
                ) : (
                  <span>Claim</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
