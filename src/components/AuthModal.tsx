import { CheckCircle2, Lock, Mail, Phone, ShieldCheck, X } from 'lucide-react';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, addNotification } = useStore();
  const [method, setMethod] = useState<'otp' | 'email'>('otp');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '0']);

  if (!isAuthModalOpen) return null;

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
    addNotification('OTP Sent', `4-digit verification code sent to ${phone}`);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthModalOpen(false);
    setOtpStep(false);
    addNotification('Login Successful!', 'Welcome back Alexander, your Savoria Gold pass is active.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          id="close_auth_modal_btn"
          onClick={() => setAuthModalOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 mx-auto flex items-center justify-center font-serif text-xl font-extrabold shadow-lg shadow-amber-500/20">
            S
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-serif pt-2">
            Welcome to Savoria
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to unlock free delivery, Savoria Gold & rewards
          </p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleVerifyOTP({ preventDefault: () => {} } as any)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => handleVerifyOTP({ preventDefault: () => {} } as any)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 rounded-2xl text-xs font-bold transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.86-1.01 2.96 1.08.08 2.18-.56 2.84-1.36z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
          <span className="bg-white dark:bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold absolute">
            Or continue with
          </span>
        </div>

        {/* Form */}
        {!otpStep ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                Phone Number (OTP Verification)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity cursor-pointer"
            >
              Get 4-Digit OTP Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4 animate-in fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Enter code sent to <strong className="text-slate-900 dark:text-white">{phone}</strong>
              </span>
              <div className="flex justify-center gap-2 pt-2">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otpCode];
                      next[i] = e.target.value;
                      setOtpCode(next);
                    }}
                    className="w-12 h-12 text-center text-lg font-extrabold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Sign In</span>
            </button>
          </form>
        )}

        <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Protected by Savoria Zero-Trust Identity Encryption</span>
        </div>

      </div>
    </div>
  );
};
