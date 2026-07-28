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

          {/* Central Radial Neural Hub — SVG Animated Connection Engine */}
          <div className="relative w-full max-w-[420px] h-[300px] flex items-center justify-center select-none">

            {/* CSS keyframes injected for travel animation */}
            <style>{`
              @keyframes dashFlow {
                0%   { stroke-dashoffset: 200; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes travelDot {
                0%   { offset-distance: 0%; opacity: 0; }
                5%   { opacity: 1; }
                95%  { opacity: 1; }
                100% { offset-distance: 100%; opacity: 0; }
              }
              @keyframes orbitSpin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
              @keyframes centerPulse {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50%       { opacity: 0.05; transform: scale(1.6); }
              }
              @keyframes nodeGlow {
                0%, 100% { box-shadow: 0 0 8px 2px var(--ng); }
                50%       { box-shadow: 0 0 18px 6px var(--ng); }
              }
              .travel-dot {
                animation: travelDot 2.4s linear infinite;
              }
            `}</style>

            {/* SVG layer — connection lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 420 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow filter */}
                <filter id="lineGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {/* Line gradients */}
                <linearGradient id="gradLeft1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="gradLeft2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="gradRight1" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="gradRight2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="gradBottom" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#D5001C" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#D5001C" stopOpacity="0.9"/>
                </linearGradient>

                {/* Motion paths for travelling dots */}
                <path id="pathLeft1"  d="M 82 105 L 210 150" />
                <path id="pathLeft2"  d="M 82 200 L 210 150" />
                <path id="pathRight1" d="M 338 105 L 210 150" />
                <path id="pathRight2" d="M 338 200 L 210 150" />
                <path id="pathBottom" d="M 210 275 L 210 150" />
              </defs>

              {/* Orbit ring */}
              <circle
                cx="210" cy="150" r="80"
                stroke="#D5001C" strokeWidth="0.8"
                strokeDasharray="8 12"
                strokeOpacity="0.25"
                style={{ transformOrigin: '210px 150px', animation: 'orbitSpin 12s linear infinite' }}
              />

              {/* ── Connection Lines ── */}
              {/* Sales (left-top) */}
              <line x1="82" y1="105" x2="210" y2="150" stroke="url(#gradLeft1)" strokeWidth="1.5"
                filter="url(#lineGlow)"
                strokeDasharray="6 5"
                style={{ animation: 'dashFlow 2s linear infinite' }} />
              {/* Marketing (left-bottom) */}
              <line x1="82" y1="200" x2="210" y2="150" stroke="url(#gradLeft2)" strokeWidth="1.5"
                filter="url(#lineGlow)"
                strokeDasharray="6 5"
                style={{ animation: 'dashFlow 2.4s linear infinite reverse' }} />
              {/* Inventory (right-top) */}
              <line x1="338" y1="105" x2="210" y2="150" stroke="url(#gradRight1)" strokeWidth="1.5"
                filter="url(#lineGlow)"
                strokeDasharray="6 5"
                style={{ animation: 'dashFlow 2.2s linear infinite' }} />
              {/* Service (right-bottom) */}
              <line x1="338" y1="200" x2="210" y2="150" stroke="url(#gradRight2)" strokeWidth="1.5"
                filter="url(#lineGlow)"
                strokeDasharray="6 5"
                style={{ animation: 'dashFlow 2.6s linear infinite reverse' }} />
              {/* Finance (bottom) */}
              <line x1="210" y1="275" x2="210" y2="150" stroke="url(#gradBottom)" strokeWidth="1.5"
                filter="url(#lineGlow)"
                strokeDasharray="6 5"
                style={{ animation: 'dashFlow 1.8s linear infinite' }} />

              {/* ── Travelling Data Pulse Dots ── */}
              <circle r="4" fill="#10b981" filter="url(#dotGlow)">
                <animateMotion dur="2s" repeatCount="indefinite" keyTimes="0;1" keySplines="0.4 0 0.6 1">
                  <mpath href="#pathLeft1" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#3b82f6" filter="url(#dotGlow)">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.8s">
                  <mpath href="#pathLeft2" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
              </circle>
              <circle r="4" fill="#f59e0b" filter="url(#dotGlow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.4s">
                  <mpath href="#pathRight1" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
              </circle>
              <circle r="4" fill="#10b981" filter="url(#dotGlow)">
                <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.2s">
                  <mpath href="#pathRight2" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" repeatCount="indefinite" begin="1.2s" />
              </circle>
              <circle r="4" fill="#D5001C" filter="url(#dotGlow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.3s">
                  <mpath href="#pathBottom" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
              </circle>
            </svg>

            {/* ── Center Porsche Crest ── */}
            <div className="relative z-20 flex items-center justify-center">
              {/* Pulsing ring layers */}
              <span className="absolute w-32 h-32 rounded-full border-2 border-porsche-red/60 animate-ping" style={{ animationDuration: '1.6s' }} />
              <span className="absolute w-40 h-40 rounded-full border border-porsche-red/20 animate-ping" style={{ animationDuration: '2.4s', animationDelay: '0.4s' }} />
              <span className="absolute w-48 h-48 rounded-full border border-porsche-red/10 animate-ping" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />
              {/* Crest disc */}
              <div className="relative w-28 h-28 rounded-full bg-slate-900 dark:bg-[#111] flex items-center justify-center shadow-[0_0_40px_rgba(213,0,28,0.6)] border-4 border-porsche-red z-10 p-3">
                <PorscheLogo size={52} />
              </div>
            </div>

            {/* ── Satellite Nodes ── */}
            {/* Sales — left top */}
            <div
              onClick={() => { window.location.hash = '#/sales'; }}
              className="absolute top-[70px] left-[20px] p-3 w-[96px] rounded-xl porsche-glass border border-emerald-500/30 text-xs text-center cursor-pointer hover:scale-110 hover:border-emerald-400 transition-all z-10"
              style={{ boxShadow: '0 0 12px 2px rgba(16,185,129,0.2)' }}
            >
              <p className="font-bold text-slate-900 dark:text-white text-xs">Sales</p>
              <p className="text-[9px] text-emerald-500 font-mono mt-0.5">Optimizing</p>
            </div>

            {/* Marketing — left bottom */}
            <div
              onClick={() => { window.location.hash = '#/sales'; }}
              className="absolute bottom-[60px] left-[20px] p-3 w-[96px] rounded-xl porsche-glass border border-blue-500/30 text-xs text-center cursor-pointer hover:scale-110 hover:border-blue-400 transition-all z-10"
              style={{ boxShadow: '0 0 12px 2px rgba(59,130,246,0.2)' }}
            >
              <p className="font-bold text-slate-900 dark:text-white text-xs">Marketing</p>
              <p className="text-[9px] text-blue-500 font-mono mt-0.5">Engaged</p>
            </div>

            {/* Inventory — right top */}
            <div
              onClick={() => { window.location.hash = '#/logistics'; }}
              className="absolute top-[70px] right-[20px] p-3 w-[96px] rounded-xl porsche-glass border border-amber-500/30 text-xs text-center cursor-pointer hover:scale-110 hover:border-amber-400 transition-all z-10"
              style={{ boxShadow: '0 0 12px 2px rgba(245,158,11,0.2)' }}
            >
              <p className="font-bold text-slate-900 dark:text-white text-xs">Inventory</p>
              <p className="text-[9px] text-amber-500 font-mono mt-0.5">Balanced</p>
            </div>

            {/* Service — right bottom */}
            <div
              onClick={() => { window.location.hash = '#/logistics'; }}
              className="absolute bottom-[60px] right-[20px] p-3 w-[96px] rounded-xl porsche-glass border border-emerald-500/30 text-xs text-center cursor-pointer hover:scale-110 hover:border-emerald-400 transition-all z-10"
              style={{ boxShadow: '0 0 12px 2px rgba(16,185,129,0.2)' }}
            >
              <p className="font-bold text-slate-900 dark:text-white text-xs">Service</p>
              <p className="text-[9px] text-emerald-500 font-mono mt-0.5">Optimal</p>
            </div>

            {/* Finance — bottom center */}
            <div
              onClick={() => { window.location.hash = '#/analytics'; }}
              className="absolute bottom-[8px] left-1/2 -translate-x-1/2 p-3 w-[96px] rounded-xl porsche-glass border border-porsche-red/30 text-xs text-center cursor-pointer hover:scale-110 hover:border-porsche-red transition-all z-10"
              style={{ boxShadow: '0 0 12px 2px rgba(213,0,28,0.2)' }}
            >
              <p className="font-bold text-slate-900 dark:text-white text-xs">Finance</p>
              <p className="text-[9px] text-porsche-red font-mono mt-0.5">Healthy</p>
            </div>
          </div>
        </div>


        {/* Executive KPIs Column (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Executive KPIs</span>
            <button
              onClick={() => { window.location.hash = '#/analytics'; }}
              className="text-xs font-bold text-porsche-red hover:underline cursor-pointer"
            >
              View Analytics
            </button>
          </div>

          <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
            {executiveKPIs.map((kpi, idx) => (
              <div
                key={idx}
                onClick={() => { window.location.hash = '#/analytics'; }}
                className="py-3 px-2 flex items-center justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors group"
              >
                <span className="text-small-13 text-slate-600 dark:text-slate-300 font-semibold group-hover:text-porsche-red transition-colors">{kpi.label}</span>
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
        <div
          onClick={() => { window.location.hash = '#/analytics'; }}
          className="lg:col-span-7 porsche-card flex flex-col gap-6 cursor-pointer hover:border-porsche-red/50 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Revenue Projection</h3>
              <p className="text-small-13 text-slate-500">USD in millions • Actual vs Forecast</p>
            </div>
            <button className="text-xs font-bold text-porsche-red hover:underline">View Forecast Details</button>
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

            <button
              onClick={() => { window.location.hash = '#/logistics'; }}
              className="w-full py-3 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer uppercase"
            >
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
