import React, { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, Clock, Globe } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  unreadNotifCount: number;
  onOpenNotifications: () => void;
  onOpenAiAssistant?: () => void;
}

export function Header({ unreadNotifCount, onOpenNotifications, onOpenAiAssistant }: HeaderProps) {
  const { theme } = useTheme();
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Santo_Domingo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full px-8 py-4 porsche-glass border-b border-black/[0.06] dark:border-white/[0.08] theme-transition flex items-center justify-between gap-6">
      {/* Search Input Bar */}
      <div className="relative flex-1 max-w-lg">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search Santo Domingo fleet, leads, inventory, telemetry... (⌘K)"
          className="w-full pl-11 pr-12 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-porsche-red focus:ring-1 focus:ring-porsche-red theme-transition"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400">
          ⌘K
        </kbd>
      </div>

      {/* Right Action Items */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Santo Domingo Local Time Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
          <Globe size={13} className="text-porsche-red animate-pulse" />
          <span>Santo Domingo</span>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span className="font-bold">{timeString || '10:24 AM'}</span>
        </div>

        {/* AI Copilot Status Pill */}
        <button
          onClick={onOpenAiAssistant}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-porsche-red/10 border border-porsche-red/20 text-xs font-semibold text-porsche-red hover:bg-porsche-red/20 transition-all cursor-pointer group"
        >
          <Sparkles size={13} className="group-hover:rotate-12 transition-transform" />
          <span>Porsche Digital AI v4.2</span>
          <span className="w-1.5 h-1.5 rounded-full bg-porsche-red animate-ping" />
        </button>

        {/* Theme Switching Toggle (Executive Studio Light vs Mission Control Dark) */}
        <ThemeToggle />

        {/* English / Español Language Switcher Toggle */}
        <LanguageToggle />

        {/* Notification Launcher */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-porsche-red dark:hover:text-porsche-red hover:border-porsche-red/30 transition-all cursor-pointer"
          title="Notification Center"
        >
          <Bell size={16} />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-porsche-red text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
              {unreadNotifCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
