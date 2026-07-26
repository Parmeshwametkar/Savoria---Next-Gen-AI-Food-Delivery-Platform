import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export const FloatingThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      <button
        id="floating_theme_toggle_btn"
        onClick={toggleDarkMode}
        aria-label="Toggle Light and Dark Mode"
        className="p-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-amber-400 border border-slate-200 dark:border-slate-800 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:ring-4 group-hover:ring-amber-500/20"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '15s' }} />
        ) : (
          <Moon className="w-5 h-5 text-slate-800" />
        )}
      </button>

      {/* Floating Tooltip */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </div>
    </div>
  );
};
