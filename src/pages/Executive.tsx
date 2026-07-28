import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  Radio, 
  Users, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  Globe 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart as RePieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';

export default function Executive() {
  const { theme } = useTheme();
  const [activeNodeId, setActiveNodeId] = useState<string>('revenue');

  const radialData = [
    { name: '911 Series', value: 42, color: '#D5001C' },
    { name: 'Taycan EV', value: 34, color: '#84CC16' },
    { name: 'Cayenne SUV', value: 16, color: '#0EA5E9' },
    { name: 'Panamera Sedan', value: 8, color: '#D97706' },
  ];

  const nodes = [
    { 
      id: 'revenue', 
      label: 'Live Revenue', 
      metric: '$4.85M', 
      icon: <DollarSign size={18} />, 
      color: 'text-porsche-red',
      detail: 'Monthly Gross Sales +18.4% YoY',
      breakdown: [
        { label: 'New Vehicles', value: '$3.82M' },
        { label: 'After-Sales & Parts', value: '$680K' },
        { label: 'Tequipment & Accessories', value: '$350K' }
      ]
    },
    { 
      id: 'sales', 
      label: 'Sales Velocity', 
      metric: '94.8%', 
      icon: <TrendingUp size={18} />, 
      color: 'text-emerald-500',
      detail: 'VIP Deal Close Rate',
      breakdown: [
        { label: 'Hot Leads', value: '14 Accounts' },
        { label: 'Avg Close Speed', value: '3.2 Days' },
        { label: 'Configurator Conversion', value: '88%' }
      ]
    },
    { 
      id: 'inventory', 
      label: 'Inventory Telemetry', 
      metric: '98.8%', 
      icon: <Layers size={18} />, 
      color: 'text-blue-500',
      detail: 'Zero Idle Inventory',
      breakdown: [
        { label: 'Caucedo Port Units', value: '14 In Transit' },
        { label: 'Showroom Stock', value: '18 Units' },
        { label: 'Turnaround Days', value: '12 Days' }
      ]
    },
    { 
      id: 'marketing', 
      label: 'Marketing ROI', 
      metric: '$1,420 CAC', 
      icon: <Users size={18} />, 
      color: 'text-purple-500',
      detail: 'Low Acquisition Cost',
      breakdown: [
        { label: 'Digital ROAS', value: '6.4x' },
        { label: 'Social Engagements', value: '42.8K' },
        { label: 'VIP Referrals', value: '34%' }
      ]
    },
    { 
      id: 'service', 
      label: 'Service Grid', 
      metric: '320 kW Grid', 
      icon: <Zap size={18} />, 
      color: 'text-amber-500',
      detail: '800V E-Performance',
      breakdown: [
        { label: 'Active Service Bays', value: '8 / 10' },
        { label: 'Taycan Peak Output', value: '320 kW' },
        { label: 'First-Time Fix Rate', value: '99.1%' }
      ]
    },
    { 
      id: 'finance', 
      label: 'Finance Telemetry', 
      metric: '$14.8M Q3', 
      icon: <Building2 size={18} />, 
      color: 'text-rose-500',
      detail: 'Projected EBITDA',
      breakdown: [
        { label: 'Gross Margin', value: '28.4%' },
        { label: 'Lease Renewal Equity', value: '$2.4M' },
        { label: 'Credit Approvals', value: '96%' }
      ]
    },
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <div className="flex flex-col gap-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Radio size={14} className="animate-pulse" />
            Neural AI Central Core
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Executive AI Operations Brain
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-porsche-red bg-porsche-red/10 border border-porsche-red/20 px-4 py-2 rounded-full flex items-center gap-2">
            <Brain size={16} />
            Porsche Neural Core v4.2 Connected
          </span>
        </div>
      </div>

      {/* 1. LARGE FUTURISTIC AI OPERATIONS BRAIN & INTERACTIVE NETWORK */}
      <div className="porsche-card relative overflow-hidden flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-b from-porsche-red/5 via-transparent to-transparent">
        {/* Ambient Grid Overlay */}
        <div className="absolute inset-0 bg-studio-grid opacity-60 pointer-events-none" />

        <div className="text-center mb-6 z-10">
          <span className="text-[10px] font-bold text-porsche-red uppercase font-mono tracking-widest bg-porsche-red/10 border border-porsche-red/20 px-3 py-1 rounded-full">
            Autonomous Dealership Operations Hub
          </span>
          <h2 className="text-hero-64 font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
            Connected Operations Brain
          </h2>
          <p className="text-body-16 text-slate-500 max-w-2xl mx-auto mt-1">
            Real-time neural interconnection linking Revenue, Sales, Inventory, Marketing, Service, and Finance across Santo Domingo.
          </p>
        </div>

        {/* Central Brain Node & Interactive Radiating Nodes */}
        <div className="relative w-full max-w-5xl h-[460px] flex items-center justify-center z-10">
          {/* Animated Connecting Neural Circuit Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <line x1="50%" y1="50%" x2="16%" y2="22%" stroke="#D5001C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="50%" y2="12%" stroke="#D5001C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="84%" y2="22%" stroke="#D5001C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="16%" y2="78%" stroke="#D5001C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="50%" y2="88%" stroke="#D5001C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="84%" y2="78%" stroke="#D5001C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
          </svg>

          {/* Central AI Brain Node */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-44 h-44 rounded-full bg-gradient-to-tr from-porsche-red to-red-700 text-white flex flex-col items-center justify-center shadow-glow-red z-20 cursor-pointer border-4 border-white dark:border-slate-900"
          >
            <Brain size={48} className="animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-widest uppercase mt-1">PORSCHE AI</span>
            <span className="text-[9px] text-white/80 font-mono">Neural Brain v4.2</span>
          </motion.div>

          {/* 6 Connected Nodes */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-6 items-center justify-between p-2 pointer-events-auto">
            {nodes.map((node) => {
              const isSelected = activeNodeId === node.id;
              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-5 rounded-2xl border text-left flex flex-col gap-1.5 theme-transition cursor-pointer porsche-glass ${
                    isSelected
                      ? 'border-porsche-red bg-porsche-red/10 shadow-glow-red font-bold ring-2 ring-porsche-red/40 scale-105'
                      : 'border-black/10 dark:border-white/10 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${node.color}`}>
                      {node.icon}
                      {node.label}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-porsche-red animate-ping" />
                  </div>
                  <p className="text-section-30 font-bold text-slate-900 dark:text-white mt-1">{node.metric}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{node.detail}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Telemetry Detail Drawer */}
        <div className="w-full max-w-4xl mt-6 p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
          <div>
            <span className="text-[10px] text-porsche-red uppercase font-mono font-bold">Selected Node Telemetry</span>
            <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">{activeNode.label} Breakdown</h4>
          </div>

          <div className="flex items-center gap-6">
            {activeNode.breakdown.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-[10px] text-slate-400 font-mono uppercase">{item.label}</p>
                <p className="text-body-16 font-bold text-slate-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. LARGE EXECUTIVE KPIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="porsche-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Q3 Revenue Forecast
            </span>
            <DollarSign size={18} className="text-porsche-red" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp prefix="$" end={14800000} decimals={0} />
          </div>
          <div className="flex items-center gap-1.5 text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ArrowUpRight size={14} />
            <span>+22.1% YoY Target</span>
          </div>
        </div>

        <div className="porsche-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Operational Risk Index
            </span>
            <ShieldCheck size={18} className="text-emerald-500" />
          </div>
          <div className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400">
            <CountUp suffix="%" end={2.4} decimals={1} />
          </div>
          <p className="text-small-13 text-slate-500">Ultra-Low Risk Matrix</p>
        </div>

        <div className="porsche-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Dealer Health Index
            </span>
            <Activity size={18} className="text-blue-500" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp suffix=" / 100" end={98.8} decimals={1} />
          </div>
          <p className="text-small-13 text-slate-500">Optimal Showroom Telemetry</p>
        </div>

        <div className="porsche-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              AI Operational Score
            </span>
            <Sparkles size={18} className="text-porsche-red" />
          </div>
          <div className="text-section-30 font-bold text-porsche-red">
            <CountUp suffix="%" end={99.2} decimals={1} />
          </div>
          <p className="text-small-13 text-emerald-600 font-semibold">Zero Process Latency</p>
        </div>
      </div>

      {/* 3. AI RECOMMENDATIONS & INTERACTIVE CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radial Model Revenue Mix */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Model Revenue Distribution</h3>
              <p className="text-small-13 text-slate-500">Interactive Radial Model Telemetry</p>
            </div>
            <PieChart size={20} className="text-porsche-red" />
          </div>

          <div className="h-[260px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={radialData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {radialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                    borderColor: '#D5001C',
                    borderRadius: '12px',
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {radialData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-bold text-slate-900 dark:text-white">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Strategic Actions */}
        <div className="porsche-card flex flex-col justify-between gap-6 bg-gradient-to-br from-porsche-red/5 to-transparent">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-porsche-red text-white shadow-glow-red">
                <Sparkles size={18} />
              </div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Porsche AI Strategic Actions</h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <p className="text-xs font-bold text-porsche-red">Action 1: Inventory Reallocation</p>
                <p className="text-small-13 text-slate-700 dark:text-slate-300 mt-1">
                  "Reallocate 4 Panamera 4 E-Hybrid units to Santo Domingo East to capture +$460,000 Q3 revenue."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Action 2: 800V Charger Load Balancing</p>
                <p className="text-small-13 text-slate-700 dark:text-slate-300 mt-1">
                  "Trigger automated 320 kW load balancing during peak 2:00 PM showroom traffic."
                </p>
              </div>
            </div>
          </div>

          <button className="w-full py-3.5 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer">
            Execute All Recommended Actions
          </button>
        </div>
      </div>
    </div>
  );
}
