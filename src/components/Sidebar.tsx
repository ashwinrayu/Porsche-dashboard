import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wrench, 
  Brain, 
  UserCircle, 
  Settings as SettingsIcon, 
  Bell, 
  Bot, 
  Sliders, 
  Users, 
  BarChart3, 
  FileText,
  Layers,
  LogOut,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();

  const navGroups = [
    {
      title: 'CORE OPERATIONS',
      items: [
        { to: '/', label: 'Overview', icon: <LayoutDashboard size={18} /> },
        { to: '/sales', label: 'Sales & Conversion', icon: <TrendingUp size={18} /> },
        { to: '/logistics', label: 'Logistics & After Sales', icon: <Wrench size={18} /> },
      ],
    },
    {
      title: 'INTELLIGENCE & AI',
      items: [
        { to: '/executive', label: 'Executive Intelligence', icon: <Brain size={18} /> },
        { to: '/ai-assistant', label: 'AI Assistant', icon: <Bot size={18} /> },
        { to: '/analytics', label: 'Analytics Telemetry', icon: <BarChart3 size={18} /> },
      ],
    },
    {
      title: 'COMMERCIAL & CLIENT',
      items: [
        { to: '/configurator', label: 'Vehicle Configurator', icon: <Sliders size={18} /> },
        { to: '/customer-360', label: 'Customer 360 CRM', icon: <Users size={18} /> },
        { to: '/reports', label: 'Reports & Export', icon: <FileText size={18} /> },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { to: '/profile', label: 'Advisor Profile', icon: <UserCircle size={18} /> },
        { to: '/notifications', label: 'Notification Center', icon: <Bell size={18} /> },
        { to: '/settings', label: 'System Settings', icon: <SettingsIcon size={18} /> },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-[320px] porsche-glass border-r border-black/[0.08] dark:border-white/[0.08] flex flex-col justify-between py-6 px-6 theme-transition shrink-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex flex-col gap-6 overflow-y-auto pr-1">
        {/* Porsche Header Brand Badge */}
        <div className="flex items-center gap-3.5 px-2 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-porsche-red to-red-700 flex items-center justify-center text-white shadow-glow-red shrink-0">
            <Layers size={22} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-slate-900 dark:text-white uppercase font-sans">
              PORSCHE
            </span>
            <span className="text-[10px] tracking-widest text-porsche-red font-bold uppercase">
              SANTO DOMINGO DIGITAL
            </span>
          </div>
        </div>

        {/* Grouped 12 Navigation Items */}
        <nav className="flex flex-col gap-6">
          {navGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase px-3">
                {group.title}
              </span>
              {group.items.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold theme-transition group relative ${
                      isActive
                        ? 'bg-porsche-red/10 text-porsche-red font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-porsche-red' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {item.icon}
                      </span>
                      <span className="tracking-tight text-sm">{item.label}</span>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-porsche-red shadow-glow-red" />
                        <ChevronRight size={14} className="text-porsche-red" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Profile Snippet */}
      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
        <Link
          to="/profile"
          className="flex items-center gap-3 min-w-0 p-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-porsche-red/15 border border-porsche-red/30 flex items-center justify-center text-porsche-red font-bold text-xs shrink-0">
            {api.auth.getCurrentUser()?.name?.charAt(0) || 'E'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {api.auth.getCurrentUser()?.name || 'Eduardo Bisonó'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
              <ShieldCheck size={10} className="text-porsche-red inline" />
              {api.auth.getCurrentUser()?.role || 'Senior Sales Advisor'}
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
