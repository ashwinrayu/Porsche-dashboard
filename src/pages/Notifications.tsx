import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Filter, 
  CheckCheck, 
  Zap, 
  Car, 
  Users, 
  Wrench, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const [notifications, setNotifications] = useState<ExecutiveNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = notifications.filter(
    (n) => activeCategory === 'all' || n.category === activeCategory
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAction = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, approved: true, read: true } : n))
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Bell size={14} className="animate-pulse" />
            Live Priority Stream
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Notification Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
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

      {/* Timeline Style Grouped Cards Feed */}
      <div className="relative pl-6 border-l-2 border-porsche-red/30 flex flex-col gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Glowing Node Marker */}
            <span
              className={`absolute -left-[31px] top-6 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 theme-transition ${
                item.priority === 'Critical'
                  ? 'bg-porsche-red shadow-glow-red animate-pulse'
                  : item.priority === 'High'
                  ? 'bg-amber-500'
                  : 'bg-blue-500'
              }`}
            />

            {/* Beautiful Grouped Notification Card */}
            <div
              className={`porsche-card flex flex-col gap-4 theme-transition ${
                !item.read
                  ? 'border-porsche-red/40 bg-porsche-red/[0.02] shadow-luxury-dark'
                  : 'opacity-90'
              }`}
            >
              {/* Card Header: Category Badge + Priority Pill + Time */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full ${
                      item.priority === 'Critical'
                        ? 'bg-porsche-red/10 text-porsche-red'
                        : item.priority === 'High'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400">{item.time}</span>
              </div>

              {/* Title & Detail Content */}
              <div>
                <h3 className="text-card-22 font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-body-16 text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.body}
                </p>
              </div>

              {/* Executive Action Button / Status */}
              {item.actionRequired && (
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  {item.approved ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <Check size={14} />
                      Action Approved & Dispatched
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAction(item.id)}
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
        ))}
      </div>
    </div>
  );
}
