import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Zap, 
  Users, 
  Wrench, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface ExecutiveNotification {
  id: string;
  category: 'inventory' | 'lead' | 'service' | 'approval';
  priority: 'Critical' | 'High' | 'Normal';
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
  actionLabel?: string;
  approved?: boolean;
}

const INITIAL_NOTIFICATIONS: ExecutiveNotification[] = [
  {
    id: 'n-101',
    category: 'approval',
    priority: 'Critical',
    title: 'Executive Approval Required: Panamera Allocation',
    body: 'Reallocate 4 Panamera 4 E-Hybrid units from Santiago auxiliary hub to Santo Domingo East to capture +$460,000 Q3 revenue.',
    time: 'Just Now',
    read: false,
    actionRequired: true,
    actionLabel: 'Approve Reallocation',
  },
  {
    id: 'n-102',
    category: 'lead',
    priority: 'High',
    title: 'VIP Lead Intent Spike — Luis Corripio',
    body: 'Luis Corripio AI conversion probability jumped to 96% after configuring 911 GT3 RS Weissach Package. Deposit contract ready.',
    time: '12 mins ago',
    read: false,
    actionRequired: true,
    actionLabel: 'Send VIP Contract',
  },
  {
    id: 'n-103',
    category: 'inventory',
    priority: 'Critical',
    title: 'Stockout Warning: 800V HV Charging Plugs',
    body: 'High-Voltage Charging Socket Plugs (Part #9J1-915-684-A) stock down to 2 units — 3 days from complete workshop stockout.',
    time: '34 mins ago',
    read: false,
    actionRequired: true,
    actionLabel: 'Auto-Order OEM Replacements',
  },
  {
    id: 'n-104',
    category: 'service',
    priority: 'High',
    title: 'Predictive Brake Wear Alert — 718 Cayman GT4 RS',
    body: 'Vehicle VIN-718-1192 (Gustavo Tavares) CAN-bus telemetry reports 78% carbon brake rotor wear. Priority service appointment recommended.',
    time: '1 hr ago',
    read: false,
    actionRequired: true,
    actionLabel: 'Schedule Priority Service',
  },
  {
    id: 'n-105',
    category: 'inventory',
    priority: 'Normal',
    title: 'Caucedo Port Transport Cleared',
    body: '14 Porsche units (including 2 Taycan Turbo GTs) successfully cleared customs at Caucedo Port and are en route to showroom.',
    time: '2 hrs ago',
    read: true,
  },
  {
    id: 'n-106',
    category: 'lead',
    priority: 'Normal',
    title: 'Test Drive Scheduled — María Vásquez',
    body: 'María Vásquez confirmed 800V Taycan Turbo GT test drive for July 30 at 10:00 AM at Santo Domingo showroom.',
    time: '3 hrs ago',
    read: true,
  },
];

export default function Notifications() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const [notifications, setNotifications] = useState<ExecutiveNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = notifications.filter(
    (n) => activeCategory === 'all' || n.category === activeCategory
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleExpand = (id: string) => {
    // Mark as read when opened
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleAction = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent collapse when clicking action button
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, approved: true, read: true } : n))
    );
  };

  const priorityDot = (priority: ExecutiveNotification['priority']) => {
    if (priority === 'Critical') return 'bg-porsche-red shadow-glow-red animate-pulse';
    if (priority === 'High') return 'bg-amber-500';
    return 'bg-blue-500';
  };

  const priorityBadge = (priority: ExecutiveNotification['priority']) => {
    if (priority === 'Critical') return 'bg-porsche-red/10 text-porsche-red';
    if (priority === 'High') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Bell size={14} className="animate-pulse" />
            {t.notificationsSubtitle}
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.notificationsTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            {notifications.filter((n) => !n.read).length} unread
          </span>
          <button
            onClick={markAllRead}
            className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold hover:bg-porsche-red hover:text-white theme-transition flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck size={14} />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Alerts', icon: <Bell size={14} /> },
          { id: 'approval', label: 'Executive Approvals', icon: <Sparkles size={14} /> },
          { id: 'inventory', label: 'Inventory Alerts', icon: <Zap size={14} /> },
          { id: 'lead', label: 'Lead Alerts', icon: <Users size={14} /> },
          { id: 'service', label: 'Service Alerts', icon: <Wrench size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-porsche-red text-white shadow-glow-red'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Accordion Notification Feed */}
      <div className="relative pl-6 border-l-2 border-porsche-red/30 flex flex-col gap-4">
        {filtered.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Dot */}
              <span
                className={`absolute -left-[31px] top-5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 theme-transition ${priorityDot(item.priority)}`}
              />

              {/* Accordion Card */}
              <div
                className={`porsche-card overflow-hidden theme-transition cursor-pointer select-none ${
                  !item.read
                    ? 'border-porsche-red/40 bg-porsche-red/[0.02]'
                    : 'opacity-90 hover:opacity-100'
                } ${isOpen ? 'shadow-luxury-dark' : ''}`}
                onClick={() => toggleExpand(item.id)}
              >
                {/* ── Always-Visible Header Row ── */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Unread indicator dot */}
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-porsche-red shrink-0" />
                    )}

                    {/* Category badge */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 shrink-0">
                      {item.category}
                    </span>

                    {/* Priority badge */}
                    <span
                      className={`text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full shrink-0 ${priorityBadge(item.priority)}`}
                    >
                      {item.priority}
                    </span>

                    {/* Title — truncated when collapsed */}
                    <h3
                      className={`text-sm font-bold text-slate-900 dark:text-white leading-snug transition-all duration-300 ${
                        isOpen ? '' : 'truncate'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-slate-400 hidden sm:block">{item.time}</span>

                    {/* Chevron toggle icon */}
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-porsche-red' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* ── Expandable Body (smooth height animation via max-height trick) ── */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                  style={{
                    transitionProperty: 'max-height, opacity, margin-top',
                    transitionDuration: '350ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Time on mobile */}
                  <p className="text-[10px] font-mono text-slate-400 mb-2 sm:hidden">{item.time}</p>

                  {/* Body text */}
                  <p className="text-body-16 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.body}
                  </p>

                  {/* Action Button / Approved Status */}
                  {item.actionRequired && (
                    <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                      {item.approved ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                          <Check size={14} />
                          Action Approved &amp; Dispatched
                        </span>
                      ) : (
                        <button
                          onClick={(e) => handleAction(e, item.id)}
                          className="px-5 py-2.5 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center gap-2 cursor-pointer"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="porsche-card flex flex-col items-center gap-3 py-16 text-center opacity-60">
            <Bell size={36} className="text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No alerts in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
