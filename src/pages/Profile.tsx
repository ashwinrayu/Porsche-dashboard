import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Activity, 
  ShieldCheck, 
  Bot, 
  Star 
} from 'lucide-react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Profile() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const activities = [
    { text: 'Configured 911 Carrera GTS', detail: 'For Luis Corripio', time: '2m ago' },
    { text: 'Closed Deal', detail: '911 GTS — $415,000', time: '1h ago' },
    { text: 'New Lead Assigned', detail: 'María Vásquez — Macan Electric', time: '3h ago' },
    { text: 'Service Follow-up', detail: 'Cayenne — Brake Replacement', time: '5h ago' },
    { text: 'Trade-in Evaluation', detail: '2019 Cayenne — Carlos Llenas', time: '1d ago' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
            {t.profileSubtitle}
          </span>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.profileTitle}
          </h1>
        </div>
      </div>

      {/* 1. TOP PROFILE HEADER & AI ASSISTANT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Advisor Profile Card (7 Cols) */}
        <div className="lg:col-span-7 porsche-card flex flex-col justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-2xl flex items-center justify-center shrink-0 border-2 border-porsche-red shadow-glow-red">
                EB
              </div>
              <div className="flex flex-col">
                <h2 className="text-card-22 font-bold text-slate-900 dark:text-white">Eduardo Bisonó</h2>
                <span className="text-xs text-slate-500 font-semibold">Senior Sales Advisor</span>
              </div>
            </div>

            <button className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-porsche-red theme-transition">
              Edit Profile
            </button>
          </div>

          {/* Contact & Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 pt-4 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-porsche-red" />
              <span>Porsche Center Santo Domingo</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-porsche-red" />
              <span>+1 (809) 555-0142</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-porsche-red" />
              <span>eduardo.bisono@porsche.com.do</span>
            </div>
          </div>

          {/* Master Certified Badges */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full bg-porsche-red/10 text-porsche-red">
              Top Performer
            </span>
            <span className="text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              GT Specialist
            </span>
            <span className="text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              EV Certified
            </span>
          </div>
        </div>

        {/* AI Assistant Panel (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col justify-between gap-4 bg-gradient-to-br from-porsche-red/5 via-transparent to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">AI Assistant</h3>
              <p className="text-small-13 text-slate-500">Your AI-powered daily brief</p>
            </div>
            <Bot size={22} className="text-porsche-red" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-card-22 font-bold text-porsche-red block">7</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Hot Leads</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-card-22 font-bold text-amber-500 block">2</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Deals Expiring</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-card-22 font-bold text-blue-500 block">3</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Service Alerts</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-card-22 font-bold text-emerald-500 block">1</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Executive Request</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: PERFORMANCE OVERVIEW (4 DIALS & BADGES) & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Overview (7 Cols) */}
        <div className="lg:col-span-7 porsche-card flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Performance Overview</h3>
            <p className="text-small-13 text-slate-500">This Month</p>
          </div>

          {/* 4 Metric Radial Circles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="w-16 h-16 rounded-full border-4 border-porsche-red flex items-center justify-center text-body-16 font-bold text-slate-900 dark:text-white font-mono">
                73
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Lead Score</span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center text-body-16 font-bold text-slate-900 dark:text-white font-mono">
                11.4
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Avg. Days to Close</span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-body-16 font-bold text-slate-900 dark:text-white font-mono">
                312
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Closed Deals</span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center text-body-16 font-bold text-slate-900 dark:text-white font-mono">
                4.9★
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">Avg. Rating</span>
            </div>
          </div>

          {/* Porsche Crest Badges Row */}
          <div className="flex items-center justify-around pt-4 border-t border-black/5 dark:border-white/5">
            {[1, 2, 3, 4].map((badge) => (
              <div key={badge} className="w-10 h-10 rounded-xl bg-porsche-red/10 text-porsche-red flex items-center justify-center border border-porsche-red/20 shadow-glow-red">
                <Award size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity List (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <button className="text-xs font-bold text-porsche-red hover:underline">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {activities.map((act, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{act.text}</p>
                  <p className="text-small-13 text-slate-500">{act.detail}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
