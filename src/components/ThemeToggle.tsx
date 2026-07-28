import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${theme === 'light' ? 'Mission Control (Dark)' : 'Executive Studio (Light)'} Mode`}
      className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 cursor-pointer theme-transition hover:scale-105 active:scale-95 shadow-sm"
    >
      <div
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'light'
            ? 'bg-porsche-red text-white shadow-glow-red scale-105'
            : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Sun size={16} />
      </div>

      <div
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-porsche-red text-white shadow-glow-red scale-105'
            : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Moon size={16} />
      </div>
    </button>
  );
}
