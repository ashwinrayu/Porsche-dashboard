import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  Car, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { VehicleImage } from '../components/VehicleImage';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Overview() {
  const { theme } = useTheme();

  const trendChartData = [
    { month: 'Jan', revenue: 3.2, efficiency: 88 },
    { month: 'Feb', revenue: 3.6, efficiency: 91 },
    { month: 'Mar', revenue: 4.1, efficiency: 93 },
    { month: 'Apr', revenue: 3.9, efficiency: 92 },
    { month: 'May', revenue: 4.5, efficiency: 96 },
    { month: 'Jun', revenue: 4.85, efficiency: 98.8 },
  ];

  const roadmapSteps = [
    { phase: 'Phase 1', title: 'AI Fleet Telemetry', status: 'Completed', detail: 'Real-time Caucedo Port & showroom tracking live.' },
    { phase: 'Phase 2', title: 'VIP Lead Matrix', status: 'Active', detail: 'Neural conversion probability scoring deployed.' },
    { phase: 'Phase 3', title: '800V Charger Network', status: 'In Progress', detail: 'Taycan 320 kW ultra-fast grid integration.' },
    { phase: 'Phase 4', title: 'Autonomous Routing', status: 'Scheduled Q4', detail: 'Cross-dealership inventory allocation algorithm.' },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* 1. Large Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        {/* Left Column: Heading & Subtitle */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-porsche-red font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-porsche-red animate-ping" />
            Porsche Digital Executive Platform
          </div>

          <h1 className="text-hero-64 font-bold text-slate-900 dark:text-white tracking-tight">
            Driving Porsche <br />
            <span className="text-porsche-red">Operations</span>
          </h1>

          <p className="text-body-16 text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            The next-generation AI Command Center powering dealership operations, fleet logistics, inventory routing, and VIP client conversion for Porsche Center Santo Domingo.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/configurator"
              className="px-8 py-4 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red hover:scale-105 active:scale-95 theme-transition flex items-center gap-2 cursor-pointer"
            >
              <Car size={16} />
              <span>Launch Customization Studio</span>
            </Link>
            <Link
              to="/executive"
              className="px-8 py-4 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 theme-transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} className="text-porsche-red" />
              <span>View Executive Intelligence</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Porsche 911 Image with Soft Lighting */}
        <div className="lg:col-span-5 w-full h-[380px] rounded-3xl overflow-hidden shadow-luxury-dark border border-black/10 dark:border-white/10 relative">
          <VehicleImage
            lightSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
            darkSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
            alt="Porsche 911 Flagship Operations"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 p-4 porsche-glass rounded-2xl border border-white/20 dark:border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-porsche-red font-mono uppercase font-bold">Flagship Vehicle</p>
              <p className="text-body-16 font-bold text-slate-900 dark:text-white">Porsche 911 GT3 RS</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              98.4% Demand
            </span>
          </div>
        </div>
      </div>

      {/* 2. Large KPI Cards Section (6 Key Metrics) */}
      <div className="flex flex-col gap-4">
        <h2 className="text-section-30 font-bold text-slate-900 dark:text-white">
          Key Operational Telemetry
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="porsche-card flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Monthly Revenue
              </span>
              <div className="p-2.5 rounded-xl bg-porsche-red/10 text-porsche-red">
                <DollarSign size={18} />
              </div>
            </div>
            <div className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp prefix="$" end={4850000} decimals={0} />
            </div>
            <div className="flex items-center gap-1.5 text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ArrowUpRight size={14} />
              <span>+18.4% vs last month</span>
            </div>
          </motion.div>

          {/* Conversion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="porsche-card flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Conversion Rate
              </span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp suffix="%" end={94.8} decimals={1} />
            </div>
            <div className="flex items-center gap-1.5 text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ArrowUpRight size={14} />
              <span>+5.2% vs target</span>
            </div>
          </motion.div>

          {/* Lead Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="porsche-card flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Lead Health Index
              </span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Users size={18} />
              </div>
            </div>
            <div className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp suffix=" / 100" end={96} />
            </div>
            <div className="flex items-center gap-1.5 text-small-13 text-porsche-red font-semibold">
              <Sparkles size={14} />
              <span>142 Active High-Intent Leads</span>
            </div>
          </motion.div>

          {/* Dealer Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="porsche-card flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Dealer Performance
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Activity size={18} />
              </div>
            </div>
            <div className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp suffix="%" end={98.8} decimals={1} />
            </div>
            <div className="flex items-center gap-1.5 text-small-13 text-slate-500 font-semibold">
              <ShieldCheck size={14} />
              <span>Optimal Showroom Speed</span>
            </div>
          </motion.div>

          {/* Vehicle Deliveries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="porsche-card flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Vehicle Deliveries
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Car size={18} />
              </div>
            </div>
            <div className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp suffix=" Units" end={14} />
            </div>
            <div className="flex items-center gap-1.5 text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Clock size={14} />
              <span>En Route from Caucedo Port</span>
            </div>
          </motion.div>

          {/* Customer Satisfaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="porsche-card flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                Customer CSAT Score
              </span>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Award size={18} />
              </div>
            </div>
            <div className="text-section-30 font-bold text-slate-900 dark:text-white">
              4.98 / 5.0
            </div>
            <div className="flex items-center gap-1.5 text-small-13 text-porsche-red font-semibold">
              <Sparkles size={14} />
              <span>Rank 1 in Porsche Latin America</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Operational Impact Section */}
      <div className="flex flex-col gap-8 pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
        <div className="flex flex-col">
          <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
            Strategic Optimization
          </span>
          <h2 className="text-section-30 font-bold text-slate-900 dark:text-white">
            Operational Impact & Insights
          </h2>
        </div>

        {/* Grid 1: Animated Trend Chart & Implementation Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Animated Trend Chart */}
          <div className="porsche-card flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">
                  Efficiency & Revenue Trend
                </h3>
                <p className="text-small-13 text-slate-500">6-Month Operational Growth Telemetry</p>
              </div>
              <span className="text-xs font-mono text-porsche-red font-bold">+18.4% YoY</span>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendChartData}>
                  <defs>
                    <linearGradient id="heroRedGrad" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="revenue" stroke="#D5001C" strokeWidth={3} fillOpacity={1} fill="url(#heroRedGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="porsche-card flex flex-col gap-6">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">
                AI Command Roadmap
              </h3>
              <p className="text-small-13 text-slate-500">Porsche Center Santo Domingo Digital Deployment</p>
            </div>

            <div className="flex flex-col gap-4">
              {roadmapSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-porsche-red bg-porsche-red/10 px-2.5 py-1 rounded-full shrink-0">
                      {step.phase}
                    </span>
                    <div>
                      <p className="text-body-16 font-bold text-slate-900 dark:text-white">{step.title}</p>
                      <p className="text-small-13 text-slate-500">{step.detail}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full shrink-0 ${
                    step.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    step.status === 'Active' ? 'bg-porsche-red/10 text-porsche-red' :
                    'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                  }`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid 2: Executive AI Summary, Recent Activity & Daily Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Executive AI Summary (1 Column) */}
          <div className="porsche-card flex flex-col justify-between gap-6 bg-gradient-to-br from-porsche-red/5 to-transparent">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-porsche-red text-white shadow-glow-red">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Executive AI Summary</h3>
              </div>
              <p className="text-small-13 text-slate-700 dark:text-slate-300 leading-relaxed">
                "Demand for Macan Electric and 911 GT3 RS is at an all-time peak. Reallocating 4 units from Santiago warehouse resolves potential 3-week delivery bottlenecks."
              </p>
            </div>

            <Link
              to="/executive"
              className="w-full py-3.5 rounded-2xl bg-porsche-red text-white text-xs font-bold text-center hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer"
            >
              Review AI Strategic Actions
            </Link>
          </div>

          {/* Recent Activity (1 Column) */}
          <div className="porsche-card flex flex-col gap-6">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Config Saved — Luis Corripio', detail: '911 GT3 RS Weissach Package', time: '10m ago' },
                { title: 'Caucedo Port Clearance', detail: 'Taycan Turbo GT VIN-TYC-4410', time: '42m ago' },
                { title: 'VIP Test Drive Booked', detail: 'María Vásquez — Taycan 800V', time: '1h ago' },
              ].map((act, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{act.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>{act.detail}</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Insights (1 Column) */}
          <div className="porsche-card flex flex-col gap-6">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Daily Insights</h3>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Peak Showroom Energy</p>
                <p className="text-small-13 text-slate-600 dark:text-slate-300 mt-1">
                  800V Taycan station operating at 320 kW peak efficiency. Zero queue latency.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Inventory Alert</p>
                <p className="text-small-13 text-slate-600 dark:text-slate-300 mt-1">
                  High-Voltage charging socket plugs low at 2 units. Reorder auto-triggered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
