import React from 'react';
import { Sun, Moon, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${theme === 'light' ? 'Mission Control (Dark)' : 'Executive Studio (Light)'} Mode`}
      className="relative flex items-center p-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 cursor-pointer theme-transition group hover:scale-105 active:scale-95"
    >
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-600 ease-in-out ${
          theme === 'light'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'bg-porsche-red text-white shadow-glow-red'
        }`}
      >
        {theme === 'light' ? (
          <>
            <Sun size={14} className="text-amber-500 transition-transform duration-600 group-hover:rotate-45" />
            <span className="text-[11px] font-bold tracking-wide">Studio</span>
          </>
        ) : (
          <>
            <Moon size={14} className="text-white transition-transform duration-600 group-hover:-rotate-12" />
            <span className="text-[11px] font-bold tracking-wide">Mission Control</span>
          </>
        )}
      </div>

      <div className="flex items-center px-2 text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
        {theme === 'light' ? 'Dark' : 'Light'}
      </div>
    </button>
  );
}
