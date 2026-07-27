import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Shield,
  Edit3,
  CheckCircle,
  Clock,
  Target,
  BarChart2
} from 'lucide-react';
import { api } from '../services/api';

const advisorStats = {
  leadsClosedThisMonth: 14,
  revenueThisMonth: 2_840_000,
  avgLeadScore: 73,
  satisfactionRating: 4.9,
  activePipeline: 5,
  conversionRate: 68,
  totalDealsAllTime: 312,
  avgDaysToClose: 11.4,
};

const recentActivity = [
  { action: 'Configured', lead: 'Luis Corripio', detail: '718 GT4 RS — Guards Red / Weissach', time: '2 mins ago', icon: '🛠️' },
  { action: 'Assigned', lead: 'María Vásquez', detail: 'Macan Electric → María Laura Díaz', time: '18 mins ago', icon: '👤' },
  { action: 'Closed Deal', lead: 'Alejandro Santana', detail: '911 GTS — $415,000', time: '1 hr ago', icon: '✅' },
  { action: 'Created Lead', lead: 'Ramón Gutiérrez', detail: 'Taycan Turbo S — Score: 85', time: '3 hrs ago', icon: '➕' },
  { action: 'Config Saved', lead: 'Clarissa Peynado', detail: 'Taycan Turbo S — Chalk / Mission E', time: '4 hrs ago', icon: '💾' },
];

const monthlyRevenue = [
  { month: 'Jan', value: 1.8 }, { month: 'Feb', value: 2.1 }, { month: 'Mar', value: 1.9 },
  { month: 'Apr', value: 2.4 }, { month: 'May', value: 2.2 }, { month: 'Jun', value: 2.6 },
  { month: 'Jul', value: 2.84 },
];

const maxRev = Math.max(...monthlyRevenue.map(d => d.value));

export default function Profile() {
  const user = api.auth.getCurrentUser();
  const [editMode, setEditMode] = useState(false);
  const [editPhone, setEditPhone] = useState('+1 (809) 555-0142');
  const [editEmail, setEditEmail] = useState('eduardo.bisono@autoeuropa.com.do');
  const [saved, setSaved] = useState(false);
  const [notifConfig, setNotifConfig] = useState(true);
  const [notifLead, setNotifLead] = useState(true);
  const [notifService, setNotifService] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'EB';

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">
            Advisor <span className="font-semibold text-porsche-red">Profile & Settings</span>
          </h1>
          <p className="text-sm text-porsche-muted font-light mt-1">
            Performance dashboard, contact details, and notification preferences.
          </p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-porsche-green/10 border border-porsche-green/25 text-porsche-green text-xs font-semibold rounded-xl"
          >
            <CheckCircle size={13} />
            Changes saved
          </motion.div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6">
          <div className="porsche-card-glow rounded-2xl overflow-hidden">
            <div className="px-6 pb-6 pt-6">
              <div className="flex justify-between items-end mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-porsche-red/20 shadow-lg flex items-center justify-center text-2xl font-bold text-porsche-red shrink-0">
                  {initials}
                </div>
                <button
                  onClick={() => editMode ? handleSave() : setEditMode(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all border shrink-0 ${editMode
                    ? 'bg-porsche-red text-white border-porsche-red hover:bg-red-700'
                    : 'bg-white border-porsche-border text-slate-700 hover:border-porsche-red/40 hover:text-porsche-red'
                  }`}
                >
                  {editMode ? <><CheckCircle size={12} /> Save</> : <><Edit3 size={12} /> Edit</>}
                </button>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{user?.name || 'Eduardo Bisonó'}</h2>
              <p className="text-xs text-porsche-red font-semibold uppercase tracking-widest mt-0.5">{user?.role || 'Senior Sales Advisor'}</p>

              <div className="mt-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <MapPin size={13} className="text-porsche-muted shrink-0" />
                  <span>Porsche Center Santo Domingo — {user?.showroom || 'Santo Domingo'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Phone size={13} className="text-porsche-muted shrink-0" />
                  {editMode
                    ? <input value={editPhone} onChange={e => setEditPhone(e.target.value)} className="flex-1 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-porsche-red bg-slate-50" />
                    : <span>{editPhone}</span>
                  }
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Mail size={13} className="text-porsche-muted shrink-0" />
                  {editMode
                    ? <input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="flex-1 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-porsche-red bg-slate-50" />
                    : <span className="truncate">{editEmail}</span>
                  }
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-porsche-red/5 border-porsche-red/20 text-porsche-red">Top Performer</span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-porsche-gold/5 border-porsche-gold/20 text-porsche-gold">GT Specialist</span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-slate-100 border-slate-200 text-slate-600">EV Certified</span>
              </div>
            </div>
          </div>

          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Shield size={15} className="text-porsche-red" />
              Notification Preferences
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Config Saves', sub: 'Alert when lead specs are updated', val: notifConfig, set: setNotifConfig },
                { label: 'New Lead Assignments', sub: 'Alert on new advisor routing', val: notifLead, set: setNotifLead },
                { label: 'Fleet Service Alerts', sub: 'Urgent vehicle maintenance', val: notifService, set: setNotifService },
              ].map(({ label, sub, val, set }) => (
                <div key={label} className="flex items-center justify-between gap-3 min-h-[2.5rem]">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-800">{label}</p>
                    <p className="text-[10px] text-porsche-muted">{sub}</p>
                  </div>
                  <button
                    onClick={() => set(!val)}
                    className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${val ? 'bg-porsche-red' : 'bg-slate-200'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${val ? 'translate-x-4' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Leads Closed', value: advisorStats.leadsClosedThisMonth, sub: 'this month', icon: <Target size={16} />, color: 'text-porsche-red' },
              { label: 'Revenue', value: `$${(advisorStats.revenueThisMonth / 1_000_000).toFixed(2)}M`, sub: 'this month', icon: <TrendingUp size={16} />, color: 'text-porsche-green' },
              { label: 'Conversion', value: `${advisorStats.conversionRate}%`, sub: 'close rate', icon: <BarChart2 size={16} />, color: 'text-porsche-gold' },
              { label: 'Satisfaction', value: `${advisorStats.satisfactionRating}★`, sub: 'avg rating', icon: <Star size={16} />, color: 'text-porsche-red' },
            ].map(({ label, value, sub, icon, color }) => (
              <div key={label} className="porsche-card-glow p-4 rounded-2xl flex flex-col gap-2 min-h-[7rem]">
                <div className={`${color}`}>{icon}</div>
                <span className="text-xl font-bold text-slate-900 font-mono tracking-tight">{value}</span>
                <div className="mt-auto">
                  <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-[9px] text-porsche-muted">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Monthly Revenue — 2026</h3>
                <p className="text-[10px] text-porsche-muted font-light mt-0.5">Personal sales pipeline value, in USD millions.</p>
              </div>
              <span className="text-xs font-bold text-porsche-green font-mono">+12.4% YTD</span>
            </div>
            <div className="flex items-end gap-1.5 h-32 px-0.5">
              {monthlyRevenue.map(({ month, value }) => {
                const pct = (value / maxRev) * 100;
                const isLatest = month === 'Jul';
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1 justify-end">
                    <span className="text-[8px] font-mono text-porsche-muted">{value.toFixed(1)}</span>
                    <div 
                      className="w-full rounded-t-lg relative overflow-hidden" 
                      style={{ height: `${Math.max(pct, 8)}%` }}
                    >
                      <div className={`absolute inset-0 ${isLatest ? 'bg-porsche-red' : 'bg-slate-200'} rounded-t-lg`} />
                      {isLatest && <div className="absolute inset-0 bg-gradient-to-t from-red-700/50 to-transparent rounded-t-lg" />}
                    </div>
                    <span className="text-[8px] text-porsche-muted font-medium">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Avg Lead Score', value: advisorStats.avgLeadScore, unit: '/100', icon: <Award size={14} /> },
              { label: 'Avg Days to Close', value: advisorStats.avgDaysToClose, unit: ' days', icon: <Clock size={14} /> },
              { label: 'All-Time Deals', value: advisorStats.totalDealsAllTime, unit: ' closed', icon: <CheckCircle size={14} /> },
            ].map(({ label, value, unit, icon }) => (
              <div key={label} className="porsche-card-glow p-4 rounded-2xl flex flex-col gap-2 min-h-[6rem]">
                <div className="text-porsche-red">{icon}</div>
                <span className="text-lg font-bold text-slate-900 font-mono">{value}<span className="text-xs font-normal text-porsche-muted">{unit}</span></span>
                <p className="text-[9px] text-porsche-muted uppercase tracking-wider font-semibold mt-auto">{label}</p>
              </div>
            ))}
          </div>

          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Calendar size={15} className="text-porsche-red" />
                Recent Activity
              </h3>
              <span className="text-[10px] text-porsche-muted">Today</span>
            </div>
            <div className="flex flex-col divide-y divide-porsche-border/40">
              {recentActivity.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-center gap-3 py-3"
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800 font-semibold truncate">
                      {item.action} — <span className="font-bold text-porsche-red">{item.lead}</span>
                    </p>
                    <p className="text-[10px] text-porsche-muted truncate">{item.detail}</p>
                  </div>
                  <span className="text-[9px] text-porsche-muted font-mono shrink-0 whitespace-nowrap">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
