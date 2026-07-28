import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Car, 
  Calendar, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Filter, 
  MessageSquare, 
  Globe, 
  Building2 
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Sales() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState('All');

  const funnelStages = [
    { label: 'Leads', val: 328, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
    { label: 'Qualified', val: 184, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
    { label: 'Test Drive', val: 92, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
    { label: 'Proposal', val: 61, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
    { label: 'Closed', val: 41, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
  ];

  const timelineSteps = [
    { time: '09:15', label: 'Lead Created', detail: 'María Vásquez • Macan Electric' },
    { time: '09:40', label: 'WhatsApp', detail: 'Message Sent' },
    { time: '10:12', label: 'Configurator', detail: '911 Carrera GTS' },
    { time: '11:05', label: 'Dealer Visit', detail: 'Showroom' },
    { time: '12:30', label: 'AI Recommendation', detail: 'High Purchase Intent' },
  ];

  const topActiveLeads = [
    { name: 'María Vásquez', avatar: 'M', model: 'Macan Electric Turbo', score: 85, value: '$125,000', stage: 'Showroom', advisor: 'Eduardo B.', activity: '10m ago' },
    { name: 'Luis Corripio', avatar: 'L', model: '911 Carrera GTS', score: 78, value: '$185,000', stage: 'Configuration', advisor: 'Eduardo B.', activity: '25m ago' },
    { name: 'Gustavo Tavares', avatar: 'G', model: 'Cayenne Coupé E-Hybrid', score: 72, value: '$98,500', stage: 'Test Drive', advisor: 'Ramón G.', activity: '1h ago' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. TOP HEADER & MODEL FILTER PILLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
            {t.salesSubtitle}
          </span>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.salesTitle}
          </h1>
        </div>

        {/* Model Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-porsche-red text-white shadow-glow-red'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:border-porsche-red">
            <Filter size={13} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN GRID (LEFT: Funnel, Timeline, Table | RIGHT: Configurator & Win Probability) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Sales Funnel Pyramid */}
          <div className="porsche-card flex flex-col items-center gap-3 py-8">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest self-start">
              CONVERSION FUNNEL
            </span>

            <div className="w-full max-w-md flex flex-col items-center gap-2">
              {funnelData.map((step) => (
                <div
                  key={step.label}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold theme-transition ${step.width}`}
                >
                  <span className="truncate">{step.label}</span>
                  <span className="font-mono">{step.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PIPELINE INTELLIGENCE (Horizontal Stepper) */}
          <div className="porsche-card flex flex-col gap-4">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">
              PIPELINE INTELLIGENCE
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-porsche-red font-bold">{step.time}</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{step.label}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TOP ACTIVE LEADS TABLE */}
          <div className="porsche-card flex flex-col gap-4">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">
              TOP ACTIVE LEADS
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono text-slate-400">
                    <th className="pb-3 px-2">Customer</th>
                    <th className="pb-3 px-2">Model</th>
                    <th className="pb-3 px-2">Score</th>
                    <th className="pb-3 px-2">Value</th>
                    <th className="pb-3 px-2">Stage</th>
                    <th className="pb-3 px-2 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {topActiveLeads.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 theme-transition">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center">
                            {lead.avatar}
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{lead.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-xs text-slate-600 dark:text-slate-300 font-semibold">{lead.model}</td>
                      <td className="py-3 px-2">
                        <span className="text-[11px] font-bold text-porsche-red bg-porsche-red/10 px-2 py-0.5 rounded-full">
                          {lead.score}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-xs font-bold text-slate-900 dark:text-white">{lead.value}</td>
                      <td className="py-3 px-2">
                        <span className="text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                          {lead.stage}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-[10px] text-slate-400 font-mono">{lead.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Win Probability & Avg Deal Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="porsche-card flex flex-col justify-between gap-3">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Win Probability (Next 90 Days)</span>
              <div className="text-section-30 font-bold text-slate-900 dark:text-white">$17.7M</div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+12.4% vs last quarter</span>
            </div>

            <div className="porsche-card flex flex-col justify-between gap-3">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Avg Deal Value</span>
              <div className="text-section-30 font-bold text-slate-900 dark:text-white">$387,500</div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+5.2% vs last quarter</span>
            </div>
          </div>

          {/* Intelligent Configurator Card */}
          <div className="porsche-card flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">INTELLIGENT CONFIGURATOR</span>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">911 Carrera GTS (992.2)</h3>
            </div>

            {/* Configurator Photo */}
            <div className="w-full h-[220px] rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
              <VehicleImage
                lightSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                darkSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="911 Carrera GTS"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Spec Details & Swatch */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-porsche-red" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Guards Red</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                <span className="font-bold text-slate-900 dark:text-white">Exterior</span>
                <span>Wheels</span>
                <span>Interior</span>
                <span>Packages</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-semibold flex flex-col gap-1">
                <p>• 20-Inch Forged Magnesium Wheels</p>
                <p>• Race-Tex Interior with Red Stitching</p>
                <p>• Sport Chrono Package</p>
              </div>
            </div>

            <button className="w-full py-3.5 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer uppercase">
              VIEW FULL CONFIGURATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
