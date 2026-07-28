import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Building2, 
  AlertTriangle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { PorscheLogo } from '../components/PorscheLogo';

export default function Executive() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const barData = [
    { month: 'Jan', actual: 3.2, forecast: 3.0 },
    { month: 'Feb', actual: 3.6, forecast: 3.4 },
    { month: 'Mar', actual: 4.1, forecast: 3.9 },
    { month: 'Apr', actual: 3.9, forecast: 4.1 },
    { month: 'May', actual: 4.5, forecast: 4.3 },
    { month: 'Jun', actual: 4.8, forecast: 4.6 },
    { month: 'Jul', actual: 5.2, forecast: 5.0 },
    { month: 'Aug', actual: null, forecast: 5.4 },
    { month: 'Sep', actual: null, forecast: 5.8 },
  ];

  const executiveKPIs = [
    { label: t.totalRevenue, val: '$28.4M', change: '+12.4%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Forecast (Q3)', val: '$17.7M', change: '+18.4%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: t.conversionRate, val: '68%', change: '+8.2%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: t.partsTurnover, val: '94.2%', change: '+15.1%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'AI Accuracy', val: '96.8%', change: '+2.4%', color: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
            {t.executiveSubtitle}
          </span>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.executiveTitle}
          </h1>
        </div>
      </div>

      {/* 1. TOP ROW: AI OPERATIONAL BRAIN (Left 7 Cols) & EXECUTIVE KPIS (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* AI Operational Brain (7 Cols) */}
        <div className="lg:col-span-7 porsche-card flex flex-col items-center justify-between gap-6 relative overflow-hidden py-10 bg-gradient-to-b from-porsche-red/5 via-transparent to-transparent">
          <div className="flex flex-col gap-1 text-center">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{t.aiBrain}</h3>
            <p className="text-small-13 text-slate-500">{t.networkSubtitle}</p>
          </div>

          {/* Central Radial Neural Hub */}
          <div className="relative w-full max-w-md h-[260px] flex items-center justify-center">
            {/* Glowing Central Crest Node */}
            <div className="w-28 h-28 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col items-center justify-center shadow-glow-red z-20 border-4 border-porsche-red p-4">
              <PorscheLogo size={48} />
            </div>

            {/* 5 Surrounding Radiating Nodes */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <div className="flex flex-col gap-12">
                <div className="p-3 rounded-xl porsche-glass border border-black/10 dark:border-white/10 text-xs text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Sales</p>
                  <p className="text-[9px] text-emerald-500 font-mono">Optimizing</p>
                </div>
                <div className="p-3 rounded-xl porsche-glass border border-black/10 dark:border-white/10 text-xs text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Marketing</p>
                  <p className="text-[9px] text-blue-500 font-mono">Engaged</p>
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <div className="p-3 rounded-xl porsche-glass border border-black/10 dark:border-white/10 text-xs text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Inventory</p>
                  <p className="text-[9px] text-amber-500 font-mono">Balanced</p>
                </div>
                <div className="p-3 rounded-xl porsche-glass border border-black/10 dark:border-white/10 text-xs text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Service</p>
                  <p className="text-[9px] text-emerald-500 font-mono">Optimal</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 p-3 rounded-xl porsche-glass border border-black/10 dark:border-white/10 text-xs text-center">
              <p className="font-bold text-slate-900 dark:text-white">Finance</p>
              <p className="text-[9px] text-porsche-red font-mono">Healthy</p>
            </div>
          </div>
        </div>

        {/* Executive KPIs Column (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col justify-between gap-4">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Executive KPIs</span>

          <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
            {executiveKPIs.map((kpi, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="text-small-13 text-slate-600 dark:text-slate-300 font-semibold">{kpi.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-body-16 font-bold text-slate-900 dark:text-white">{kpi.val}</span>
                  <span className={`text-xs font-bold font-mono ${kpi.color}`}>{kpi.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: REVENUE PROJECTION & AI INSIGHTS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Projection Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 porsche-card flex flex-col gap-6">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Revenue Projection</h3>
            <p className="text-small-13 text-slate-500">USD in millions • Actual vs Forecast</p>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#666' : '#999'} fontSize={10} />
                <YAxis stroke={theme === 'dark' ? '#666' : '#999'} fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                    borderColor: '#D5001C',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="actual" fill="#D5001C" radius={[4, 4, 0, 0]} name="Actual" />
                <Bar dataKey="forecast" fill={theme === 'dark' ? '#333333' : '#CBD5E1'} radius={[4, 4, 0, 0]} name="Forecast" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Card & Dealership Health Score (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="porsche-card flex flex-col justify-between gap-4 bg-gradient-to-br from-porsche-red/5 to-transparent border-porsche-red/20">
            <div>
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">AI INSIGHTS</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Today's Top Recommendation</p>
            </div>

            <div>
              <p className="text-body-16 font-bold text-slate-900 dark:text-white">Parts delay risk detected</p>
              <p className="text-small-13 text-slate-500">For Macan Electric brake system</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10">
              <div>
                <span className="text-[9px] text-slate-400 font-mono uppercase block">Potential Revenue Impact</span>
                <span className="text-card-22 font-bold text-porsche-red">$120,000</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 font-mono uppercase block">Confidence</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">92% (High)</span>
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer uppercase">
              Take Action
            </button>
          </div>

          {/* Dealership Health Score Bar */}
          <div className="porsche-card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Dealership Health Score</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+5 vs last month</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-section-30 font-bold text-slate-900 dark:text-white">92</span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div className="bg-porsche-red h-full w-[92%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
