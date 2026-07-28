import React from 'react';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { VehicleImage } from '../components/VehicleImage';

export default function Executive() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Porsche Digital Intelligence
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Executive Intelligence
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-porsche-red bg-porsche-red/10 border border-porsche-red/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Brain size={14} />
            Porsche Neural Network v4.2
          </span>
        </div>
      </div>

      {/* 3 Executive Strategy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Q3 Projected Revenue
          </span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp prefix="$" end={14800000} decimals={0} />
          </div>
          <div className="flex items-center gap-1 text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ArrowUpRight size={14} />
            <span>+22.1% YoY Target</span>
          </div>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            E-Hybrid / EV Mix Ratio
          </span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp suffix="%" end={54.2} decimals={1} />
          </div>
          <p className="text-small-13 text-slate-500">Dominating Caribbean Luxury Market</p>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Auto Allocation Efficiency
          </span>
          <div className="text-section-30 font-bold text-porsche-red">
            <CountUp suffix="%" end={98.8} decimals={1} />
          </div>
          <p className="text-small-13 text-slate-500">Zero Inventory Idle Time</p>
        </div>
      </div>

      {/* Dual Vehicle Strategic Model Comparison (White Panamera in Light vs Black Panamera in Dark) */}
      <div className="porsche-card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold text-porsche-red uppercase tracking-widest bg-porsche-red/10 border border-porsche-red/20 px-3 py-1 rounded-full w-max">
            Strategic Demand Forecast — Panamera E-Hybrid
          </span>
          <h2 className="text-section-30 font-bold text-slate-900 dark:text-white">
            Automated Inventory Routing Protocol
          </h2>
          <p className="text-small-13 text-slate-600 dark:text-slate-300 leading-relaxed">
            Neural analysis of Santo Domingo luxury real estate acquisitions indicates a 40% surge in executive sedan demand. Recommending priority allocation for Panamera 4 E-Hybrid units.
          </p>

          <button className="w-max px-6 py-3 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition mt-2 cursor-pointer">
            Execute Priority Allocation
          </button>
        </div>

        <div className="w-full h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
          <VehicleImage
            lightSrc="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
            darkSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
            alt="Porsche Panamera"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
