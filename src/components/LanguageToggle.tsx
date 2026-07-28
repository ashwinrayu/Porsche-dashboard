import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 theme-transition">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-mono font-bold theme-transition cursor-pointer flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-porsche-red text-white shadow-glow-red'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <span>EN</span>
      </button>

      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded-full text-xs font-mono font-bold theme-transition cursor-pointer flex items-center gap-1.5 ${
          language === 'es'
            ? 'bg-porsche-red text-white shadow-glow-red'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <span>ES</span>
      </button>
    </div>
  );
}
