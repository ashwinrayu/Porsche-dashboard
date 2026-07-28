import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 theme-transition shadow-sm">
      <div className="pl-2 pr-1 text-slate-400">
        <Globe size={15} />
      </div>

      <button
        onClick={() => setLanguage('en')}
        type="button"
        title="English"
        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
          language === 'en'
            ? 'bg-porsche-red text-white shadow-glow-red scale-105'
            : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        EN
      </button>

      <button
        onClick={() => setLanguage('es')}
        type="button"
        title="Español"
        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
          language === 'es'
            ? 'bg-porsche-red text-white shadow-glow-red scale-105'
            : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  );
}
