import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { VehicleImage } from '../components/VehicleImage';

export default function Overview() {
  // Red sparkline datasets matching the reference image
  const sparklineData1 = [{ v: 12 }, { v: 15 }, { v: 14 }, { v: 18 }, { v: 22 }, { v: 28 }, { v: 34 }];
  const sparklineData2 = [{ v: 10 }, { v: 14 }, { v: 12 }, { v: 19 }, { v: 24 }, { v: 29 }, { v: 38 }];
  const sparklineData3 = [{ v: 15 }, { v: 18 }, { v: 16 }, { v: 22 }, { v: 28 }, { v: 32 }, { v: 40 }];
  const sparklineData4 = [{ v: 20 }, { v: 25 }, { v: 30 }, { v: 38 }, { v: 45 }, { v: 52 }, { v: 65 }];

  const roadmapSteps = [
    { num: '01', title: 'Operational Audit', status: 'Completed', completed: true },
    { num: '02', title: 'AI System Design', status: 'In Progress', active: true },
    { num: '03', title: 'Integration Layer', status: 'In Progress', upcoming: true },
    { num: '04', title: 'Expansion (Porsche RD)', status: 'Upcoming', upcoming: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8 pb-12"
    >
      {/* 1. TOP STATUS BAR (56px Height, 20px Rounded, Soft Red Border, 2% Opacity BG) */}
      <div className="h-[56px] rounded-[20px] bg-porsche-red/[0.02] border border-porsche-red/20 px-6 flex items-center justify-between text-xs font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-porsche-red animate-ping" />
          <span className="font-bold text-slate-900 dark:text-white">Connected to Porsche Center Santo Domingo</span>
          <span className="text-porsche-red font-bold uppercase">• LIVE</span>
        </div>

        <div className="hidden sm:flex items-center gap-8 text-slate-500 dark:text-slate-400">
          <span>Latency: <strong className="text-slate-900 dark:text-white font-bold">16ms</strong></span>
          <span>Vehicle Networks: <strong className="text-slate-900 dark:text-white font-bold">128</strong></span>
          <span>AI Engine: <strong className="text-porsche-red font-bold">Active</strong></span>
          <span>Last Sync: <strong className="text-slate-900 dark:text-white font-bold">10:24 AM</strong></span>
        </div>
      </div>

      {/* 2. MAIN HERO SECTION (Headline & Porsche 911 Vehicle) */}
      <div className="relative flex items-center justify-between gap-6 py-2">
        {/* Ambient Red Glow behind vehicle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-porsche-red/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Side Headline & Subtitle */}
        <div className="flex flex-col gap-3 max-w-[700px] z-10">
          <h1 className="text-[52px] leading-[1.05] font-bold text-slate-900 dark:text-white tracking-tight">
            Driving Porsche <br />
            <span className="text-porsche-red">Operations</span>
          </h1>
          <p className="text-[17px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Real-time intelligence. Smarter decisions. <br />
            Superior performance.
          </p>
        </div>

        {/* Right Side Vehicle Container */}
        <div className="hidden lg:block w-[520px] h-[240px] relative shrink-0 z-10 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-luxury-dark">
          <VehicleImage
            lightSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
            darkSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
            alt="Porsche Operations Vehicle"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. FIRST KPI ROW (4 Equal Cards with Red Sparkline Graphs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: TOTAL REVENUE (YTD) */}
        <div className="h-[140px] rounded-[24px] bg-white dark:bg-[#121417] p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">TOTAL REVENUE (YTD)</span>
          <span className="text-[38px] font-bold text-slate-900 dark:text-white leading-none">$28.4M</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight size={14} /> +12.4% vs last year
          </span>

          {/* Red Sparkline Graph */}
          <div className="absolute bottom-2 right-4 w-24 h-10 pointer-events-none opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData1}>
                <Area type="monotone" dataKey="v" stroke="#D5001C" strokeWidth={2} fill="#D5001C" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: ACTIVE LEADS */}
        <div className="h-[140px] rounded-[24px] bg-white dark:bg-[#121417] p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">ACTIVE LEADS</span>
          <span className="text-[38px] font-bold text-slate-900 dark:text-white leading-none">328</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight size={14} /> +18.6% vs last month
          </span>

          {/* Red Sparkline Graph */}
          <div className="absolute bottom-2 right-4 w-24 h-10 pointer-events-none opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData2}>
                <Area type="monotone" dataKey="v" stroke="#D5001C" strokeWidth={2} fill="#D5001C" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: CONVERSION RATE */}
        <div className="h-[140px] rounded-[24px] bg-white dark:bg-[#121417] p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">CONVERSION RATE</span>
          <span className="text-[38px] font-bold text-slate-900 dark:text-white leading-none">68%</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight size={14} /> +8.2% vs last month
          </span>

          {/* Red Sparkline Graph */}
          <div className="absolute bottom-2 right-4 w-24 h-10 pointer-events-none opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData3}>
                <Area type="monotone" dataKey="v" stroke="#D5001C" strokeWidth={2} fill="#D5001C" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: DEALER HEALTH SCORE */}
        <div className="h-[140px] rounded-[24px] bg-white dark:bg-[#121417] p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5 relative">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">DEALER HEALTH SCORE</span>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[38px] font-bold text-slate-900 dark:text-white leading-none">92</span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>

            {/* Glowing Red Radial Progress Ring */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" className="text-slate-200 dark:text-slate-800" fill="none" />
                <circle cx="24" cy="24" r="18" stroke="#D5001C" strokeWidth="3" strokeDasharray="113" strokeDashoffset="10" fill="none" className="filter drop-shadow-[0_0_8px_rgba(213,0,28,0.6)]" />
              </svg>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Excellent</span>
        </div>
      </div>

      {/* 4. SECOND ROW (Operational Impact - 4 Metrics with Red Sparkline Graphs) */}
      <div className="rounded-[28px] bg-white dark:bg-[#121417] p-8 flex flex-col gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5">
        <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
          OPERATIONAL IMPACT (AI OPTIMIZED)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between gap-3">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Lead Conversion</span>
            <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">+28%</div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>vs last month</span>
              <div className="w-16 h-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData1}>
                    <Area type="monotone" dataKey="v" stroke="#D5001C" fill="#D5001C" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between gap-3">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">After-Sales Retention</span>
            <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">+22%</div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>vs last month</span>
              <div className="w-16 h-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData2}>
                    <Area type="monotone" dataKey="v" stroke="#D5001C" fill="#D5001C" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between gap-3">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Parts Turnover</span>
            <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">+35%</div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>vs last month</span>
              <div className="w-16 h-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData3}>
                    <Area type="monotone" dataKey="v" stroke="#D5001C" fill="#D5001C" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between gap-3">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Admin Automation</span>
            <div className="text-[32px] font-bold text-slate-900 dark:text-white leading-none">+65%</div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>vs last month</span>
              <div className="w-16 h-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData4}>
                    <Area type="monotone" dataKey="v" stroke="#D5001C" fill="#D5001C" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. THIRD ROW (Implementation Roadmap - Stepper with Glowing Red Active Node) */}
      <div className="rounded-[28px] bg-white dark:bg-[#121417] p-8 flex flex-col gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5">
        <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">
          IMPLEMENTATION ROADMAP
        </span>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Thin Horizontal Stepper Connecting Line */}
          <div className="hidden lg:block absolute top-[24px] left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-white/10 z-0" />

          {roadmapSteps.map((step) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center text-center gap-3">
              {/* Phase Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                  step.active
                    ? 'bg-porsche-red text-white shadow-glow-red scale-110'
                    : step.completed
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/20 text-slate-400'
                }`}
              >
                {step.num}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-body-16 font-bold text-slate-900 dark:text-white">{step.title}</p>
                <span className="text-[10px] font-bold uppercase font-mono text-slate-400">
                  {step.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
