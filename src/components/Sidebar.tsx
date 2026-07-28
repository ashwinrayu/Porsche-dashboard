import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wrench, 
  Brain, 
  UserCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { PorscheLogo } from './PorscheLogo';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/sales', label: 'Sales & Conversion', icon: <TrendingUp size={18} /> },
    { to: '/logistics', label: 'Logistics & After-Sales', icon: <Wrench size={18} /> },
    { to: '/executive', label: 'Executive Intelligence', icon: <Brain size={18} /> },
    { to: '/profile', label: 'Profile & Settings', icon: <UserCircle size={18} /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-[260px] bg-white dark:bg-[#0B0D11] border-r border-[#ECECEC] dark:border-white/[0.08] flex flex-col justify-between py-6 px-4 theme-transition shrink-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex flex-col gap-6">
        {/* Porsche Command Center Brand Header */}
        <div className="flex items-center gap-3 px-2 pb-4 border-b border-[#ECECEC] dark:border-white/[0.08]">
          <PorscheLogo size={32} />
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wider text-slate-900 dark:text-white uppercase font-sans">
              PORSCHE
            </span>
            <span className="text-[9px] tracking-widest text-slate-500 dark:text-slate-400 font-semibold uppercase">
              COMMAND CENTER
            </span>
          </div>
        </div>

        {/* 5 Primary Navigation Items (52px height, 18px radius) */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to === '/' && location.pathname === '');
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={`h-[52px] rounded-[18px] flex items-center justify-between px-4 text-xs font-semibold theme-transition group relative ${
                  isActive
                    ? 'bg-porsche-red/10 text-porsche-red font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-porsche-red' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-tight text-xs font-bold">{item.label}</span>
                </div>

                {isActive && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-porsche-red shadow-glow-red" />
                    <ChevronRight size={14} className="text-porsche-red" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Snippet */}
      <div className="pt-4 border-t border-[#ECECEC] dark:border-white/[0.08] flex items-center justify-between gap-3">
        <Link
          to="/profile"
          className="flex items-center gap-3 min-w-0 p-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-porsche-red/15 border border-porsche-red/30 flex items-center justify-center text-porsche-red font-bold text-xs shrink-0">
              {api.auth.getCurrentUser()?.name?.charAt(0) || 'E'}
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {api.auth.getCurrentUser()?.name || 'Eduardo Bisonó'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              Senior Sales Advisor
            </span>
          </div>
        </Link>
        <button
          onClick={() => api.auth.logout()}
          title="Sign Out"
          className="p-2 rounded-xl border border-black/10 dark:border-white/10 text-slate-400 hover:text-porsche-red dark:hover:text-porsche-red hover:bg-porsche-red/10 transition-all shrink-0 cursor-pointer"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
