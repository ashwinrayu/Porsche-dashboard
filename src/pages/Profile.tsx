import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Award, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Car, 
  MessageSquare, 
  Activity, 
  ArrowUpRight, 
  ChevronRight 
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
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';

export default function Profile() {
  const { theme } = useTheme();
  const currentUser = api.auth.getCurrentUser() || {
    name: 'Eduardo Bisonó',
    role: 'Senior Executive Sales Advisor',
    email: 'eduardo.bisono@porsche.com.do',
  };

  const performanceHistory = [
    { month: 'Jan', sales: 2.8 },
    { month: 'Feb', sales: 3.2 },
    { month: 'Mar', sales: 3.9 },
    { month: 'Apr', sales: 3.5 },
    { month: 'May', sales: 4.2 },
    { month: 'Jun', sales: 4.8 },
  ];

  const badges = [
    { title: 'Porsche Master Certified', year: '2026', color: 'bg-porsche-red text-white' },
    { title: 'Top 1 Advisor — Latin America', year: '2025', color: 'bg-amber-500 text-white' },
    { title: 'Weissach Spec Specialist', year: '2026', color: 'bg-emerald-600 text-white' },
    { title: 'Taycan 800V Ambassador', year: '2026', color: 'bg-blue-600 text-white' },
  ];

  const salesHistory = [
    { id: 'DEL-901', client: 'Luis Corripio', vehicle: '911 GT3 RS', amount: '$341,200', date: 'Jul 26, 2026', status: 'Delivered' },
    { id: 'DEL-882', client: 'María Vásquez', vehicle: 'Taycan Turbo GT', amount: '$240,000', date: 'Jul 22, 2026', status: 'Delivered' },
    { id: 'DEL-840', client: 'Gustavo Tavares', vehicle: '718 Cayman GT4 RS', amount: '$190,000', date: 'Jul 15, 2026', status: 'Delivered' },
    { id: 'DEL-792', client: 'Alejandro Santelises', vehicle: 'Panamera 4 E-Hybrid', amount: '$145,000', date: 'Jul 04, 2026', status: 'Delivered' },
  ];

  const customerFeedback = [
    { client: 'Luis Corripio', rating: 5, comment: 'Eduardo provided an extraordinary white-glove experience configuring my 911 GT3 RS Weissach Package. Absolute precision.', date: 'Jul 26, 2026' },
    { client: 'María Vásquez', rating: 5, comment: 'Flawless guidance on Taycan 800V charging setup. Eduardo is the gold standard of luxury automotive advisors.', date: 'Jul 23, 2026' },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Award size={14} />
            Executive Advisor Profile
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {currentUser.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Rank #1 Advisor — Santo Domingo
          </span>
        </div>
      </div>

      {/* 1. LARGE PROFILE CARD */}
      <div className="porsche-card flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-porsche-red/10 via-transparent to-transparent">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Advisor Image / Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-4xl flex items-center justify-center shadow-glow-red border-4 border-porsche-red shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
              <CheckCircle2 size={14} />
            </span>
          </div>

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-porsche-red uppercase font-mono">
              <ShieldCheck size={14} />
              Porsche Certified Executive Advisor
            </div>
            <h2 className="text-title-48 font-bold text-slate-900 dark:text-white leading-tight">{currentUser.name}</h2>
            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              {currentUser.email} • Senior Sales Advisor • Santo Domingo Showroom
            </p>

            {/* Badges Pill Row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              {badges.map((b, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase font-mono shadow-sm ${b.color}`}>
                  {b.title} ({b.year})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Stats & Monthly Ranking */}
        <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-4 md:pt-0 md:pl-8">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Monthly Quota</p>
            <p className="text-section-30 font-bold text-porsche-red">142%</p>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">CSAT Score</p>
            <p className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400">4.98 / 5.0</p>
          </div>
        </div>
      </div>

      {/* 2. PERFORMANCE CHARTS & AI ASSISTANT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart (2 Columns) */}
        <div className="lg:col-span-2 porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Monthly Sales Volume ($M)</h3>
              <p className="text-small-13 text-slate-500">2026 Personal Revenue Growth Curve</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              YTD: $18.5M USD
            </span>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceHistory}>
                <defs>
                  <linearGradient id="advisorGrad" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="sales" stroke="#D5001C" strokeWidth={3} fillOpacity={1} fill="url(#advisorGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Advisor AI Assistant Panel (1 Column) */}
        <div className="porsche-card flex flex-col justify-between gap-6 bg-gradient-to-br from-porsche-red/5 to-transparent">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-porsche-red text-white shadow-glow-red">
                <Sparkles size={18} />
              </div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Advisor AI Assistant</h3>
            </div>

            <p className="text-small-13 text-slate-700 dark:text-slate-300 leading-relaxed">
              "Eduardo, 3 of your active VIP leads (Luis Corripio, María Vásquez, Gustavo Tavares) have high intent scores above 85%. Closing Luis's 911 GT3 RS today locks in your Q3 bonus."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
            <p className="text-[10px] text-porsche-red font-mono uppercase font-bold">Suggested AI Action</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Send Weissach Spec Proposal to Luis Corripio</p>
          </div>
        </div>
      </div>

      {/* 3. SALES HISTORY & CUSTOMER FEEDBACK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales History Table */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Recent Vehicle Deliveries</h3>
            <Car size={20} className="text-porsche-red" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono text-slate-400">
                  <th className="pb-3 px-2">Client</th>
                  <th className="pb-3 px-2">Vehicle</th>
                  <th className="pb-3 px-2">Amount</th>
                  <th className="pb-3 px-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {salesHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 theme-transition">
                    <td className="py-3 px-2 text-body-16 font-bold text-slate-900 dark:text-white">{item.client}</td>
                    <td className="py-3 px-2 text-small-13 text-slate-600 dark:text-slate-300 font-semibold">{item.vehicle}</td>
                    <td className="py-3 px-2 text-small-13 font-bold text-porsche-red">{item.amount}</td>
                    <td className="py-3 px-2 text-right text-[10px] text-slate-400 font-mono">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verified Customer Feedback */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">VIP Customer Testimonials</h3>
            <Star size={20} className="text-amber-500 fill-amber-500" />
          </div>

          <div className="flex flex-col gap-4">
            {customerFeedback.map((fb, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{fb.client}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-small-13 text-slate-600 dark:text-slate-300 italic">"{fb.comment}"</p>
                <span className="text-[9px] text-slate-400 font-mono text-right">{fb.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
