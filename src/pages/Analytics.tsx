import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';

export default function Analytics() {
  const { theme } = useTheme();

  const monthlyData = [
    { month: 'Jan', revenue: 3.2, ice: 1.8, ev: 1.4 },
    { month: 'Feb', revenue: 3.6, ice: 2.0, ev: 1.6 },
    { month: 'Mar', revenue: 4.1, ice: 2.1, ev: 2.0 },
    { month: 'Apr', revenue: 3.9, ice: 1.9, ev: 2.0 },
    { month: 'May', revenue: 4.5, ice: 2.2, ev: 2.3 },
    { month: 'Jun', revenue: 4.85, ice: 2.3, ev: 2.55 },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Data & Telemetry Engine
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Analytics Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
            Recharts Engine Active
          </span>
        </div>
      </div>

      {/* Analytics KPI Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Customer Acquisition Cost
          </span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp prefix="$" end={1420} decimals={0} />
          </div>
          <p className="text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">-14% vs industry avg</p>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Service Retention Rate
          </span>
          <div className="text-section-30 font-bold text-porsche-red">
            <CountUp suffix="%" end={96.4} decimals={1} />
          </div>
          <p className="text-small-13 text-slate-500">Top 1% in Porsche Latin America</p>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Average Time-to-Delivery
          </span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp suffix=" Days" end={14} />
          </div>
          <p className="text-small-13 text-slate-500">From Caucedo Port clearance</p>
        </div>
      </div>

      {/* Main Recharts Area & Bar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Volume Area Chart */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Monthly Sales Volume ($M)</h3>
            <span className="text-xs font-mono text-slate-400">2026 Telemetry</span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="porscheRedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D5001C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D5001C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#666' : '#999'} fontSize={12} />
                <YAxis stroke={theme === 'dark' ? '#666' : '#999'} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                    borderColor: '#D5001C',
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#FFF' : '#000',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D5001C" strokeWidth={3} fillOpacity={1} fill="url(#porscheRedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ICE vs Taycan EV Mix Bar Chart */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">ICE vs Taycan EV Mix ($M)</h3>
            <span className="text-xs font-mono text-slate-400">Model Revenue</span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#666' : '#999'} fontSize={12} />
                <YAxis stroke={theme === 'dark' ? '#666' : '#999'} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                    borderColor: '#D5001C',
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#FFF' : '#000',
                  }}
                />
                <Bar dataKey="ice" fill={theme === 'dark' ? '#333333' : '#CBD5E1'} radius={[6, 6, 0, 0]} name="ICE Engine" />
                <Bar dataKey="ev" fill="#D5001C" radius={[6, 6, 0, 0]} name="Taycan / E-Hybrid" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
