import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Filter, 
  CheckCheck, 
  Zap 
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', type: 'alert', title: 'Fleet Service Overdue', body: '911 Carrera GTS (A981240) brake wear at 78.4% — urgent service recommended.', time: '4 mins ago', read: false },
  { id: 'n2', type: 'warning', title: 'Critical Parts Low', body: 'HV Charging Socket Plugs stock at 2 units — 3 days from stockout.', time: '12 mins ago', read: false },
  { id: 'n3', type: 'success', title: 'Config Saved — Luis Corripio', body: '718 GT4 RS: Guards Red / Weissach Package / Race-Tex Stitching.', time: '1 hr ago', read: false },
  { id: 'n4', type: 'info', title: 'New Lead Assigned', body: 'María Vásquez (Macan Electric) routed to María Laura Díaz.', time: '2 hrs ago', read: true },
  { id: 'n5', type: 'info', title: 'AI Router Update', body: 'Allocation efficiency increased to 98.4% — 3 unassigned leads auto-routed.', time: '3 hrs ago', read: true },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = notifications.filter(n => filterType === 'all' || n.type === filterType);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Real-Time Alert Feed
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

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'alert', 'warning', 'success', 'info'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize theme-transition cursor-pointer ${
              filterType === tab
                ? 'bg-porsche-red text-white shadow-glow-red'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="porsche-card flex flex-col gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border flex items-start gap-4 theme-transition ${
              !item.read
                ? 'bg-porsche-red/5 border-porsche-red/20'
                : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/5'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 shrink-0">
              {item.type === 'alert' && <AlertTriangle size={18} className="text-porsche-red" />}
              {item.type === 'warning' && <AlertTriangle size={18} className="text-amber-500" />}
              {item.type === 'success' && <CheckCircle2 size={18} className="text-emerald-500" />}
              {item.type === 'info' && <Info size={18} className="text-blue-500" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-body-16 font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
              </div>
              <p className="text-small-13 text-slate-600 dark:text-slate-300 mt-1">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
