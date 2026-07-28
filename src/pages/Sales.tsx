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

  // Model-specific data dictionary for 100% dynamic filtering
  const modelData: Record<string, {
    configuratorName: string;
    colorName: string;
    colorHex: string;
    image: string;
    specs: string[];
    leads: { name: string; avatar: string; model: string; score: number; value: string; stage: string; advisor: string; activity: string }[];
    timeline: { time: string; label: string; detail: string }[];
    funnel: { label: string; val: number; width: string }[];
    winProb: string;
    avgValue: string;
  }> = {
    All: {
      configuratorName: '911 Carrera GTS (992.2)',
      colorName: 'Guards Red',
      colorHex: '#D5001C',
      image: '/porsche-911-dark.png',
      specs: ['20-Inch Forged Magnesium Wheels', 'Race-Tex Interior with Red Stitching', 'Sport Chrono Package with Mode Switch'],
      leads: [
        { name: 'María Vásquez', avatar: 'M', model: 'Macan Electric Turbo', score: 85, value: '$125,000', stage: 'Showroom', advisor: 'Eduardo B.', activity: '10m ago' },
        { name: 'Luis Corripio', avatar: 'L', model: '911 Carrera GTS', score: 78, value: '$185,000', stage: 'Configuration', advisor: 'Eduardo B.', activity: '25m ago' },
        { name: 'Gustavo Tavares', avatar: 'G', model: 'Cayenne Coupé E-Hybrid', score: 72, value: '$98,500', stage: 'Test Drive', advisor: 'Ramón G.', activity: '1h ago' },
      ],
      timeline: [
        { time: '09:15', label: 'Lead Created', detail: 'María Vásquez • Macan Electric' },
        { time: '09:40', label: 'WhatsApp', detail: 'Spec Inquiry Sent' },
        { time: '10:12', label: 'Configurator', detail: '911 Carrera GTS' },
        { time: '11:05', label: 'Dealer Visit', detail: 'Showroom Review' },
        { time: '12:30', label: 'AI Recommendation', detail: 'High Purchase Intent' },
      ],
      funnel: [
        { label: 'Leads', val: 328, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
        { label: 'Qualified', val: 184, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
        { label: 'Test Drive', val: 92, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
        { label: 'Proposal', val: 61, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
        { label: 'Closed', val: 41, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
      ],
      winProb: '$17.7M',
      avgValue: '$387,500',
    },
    '911': {
      configuratorName: '911 GT3 RS (Weissach Package)',
      colorName: 'GT Silver Metallic',
      colorHex: '#C0C0C0',
      image: '/porsche-911-dark.png',
      specs: ['Carbon Fiber Aerodynamic Rear Wing', 'PCCB Carbon Ceramic Brakes', 'Full Bucket Racing Seats with 6-Point Harness'],
      leads: [
        { name: 'Luis Corripio', avatar: 'L', model: '911 Carrera GTS', score: 96, value: '$241,300', stage: 'Finalizing Contract', advisor: 'Eduardo B.', activity: '2m ago' },
        { name: 'Carlos Llenas', avatar: 'C', model: '911 GT3 RS', score: 91, value: '$315,000', stage: 'Allocation Approved', advisor: 'Eduardo B.', activity: '15m ago' },
      ],
      timeline: [
        { time: '08:30', label: 'Allocation Assigned', detail: 'Luis Corripio • 911 GT3 RS Slot' },
        { time: '09:12', label: 'Track Telemetry', detail: 'Spec Review for Santo Domingo Hub' },
        { time: '11:45', label: 'Escrow Confirmed', detail: '$50,000 USD Deposit Received' },
      ],
      funnel: [
        { label: 'Leads', val: 84, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
        { label: 'Qualified', val: 62, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
        { label: 'Test Drive', val: 45, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
        { label: 'Proposal', val: 28, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
        { label: 'Closed', val: 19, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
      ],
      winProb: '$7.8M',
      avgValue: '$278,000',
    },
    Cayenne: {
      configuratorName: 'Cayenne Coupé Turbo E-Hybrid',
      colorName: 'Chromite Black Metallic',
      colorHex: '#111111',
      image: '/porsche-cayenne.png',
      specs: ['22-Inch RS Spyder Design Wheels', 'Club Leather Interior in Truffle Brown', 'Adaptive 3-Chamber Air Suspension'],
      leads: [
        { name: 'Gustavo Tavares', avatar: 'G', model: 'Cayenne Coupé E-Hybrid', score: 88, value: '$146,000', stage: 'Test Drive Scheduled', advisor: 'Ramón G.', activity: '5m ago' },
        { name: 'José Vicini', avatar: 'J', model: 'Cayenne Turbo GT', score: 84, value: '$198,000', stage: 'Trade-in Evaluation', advisor: 'Eduardo B.', activity: '40m ago' },
      ],
      timeline: [
        { time: '10:00', label: 'Showroom Visit', detail: 'Gustavo Tavares • Cayenne Review' },
        { time: '11:15', label: 'Trade-in Valued', detail: '2021 Cayenne S • $68,000 Equity' },
      ],
      funnel: [
        { label: 'Leads', val: 96, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
        { label: 'Qualified', val: 54, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
        { label: 'Test Drive', val: 32, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
        { label: 'Proposal', val: 18, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
        { label: 'Closed', val: 12, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
      ],
      winProb: '$4.2M',
      avgValue: '$162,000',
    },
    Macan: {
      configuratorName: 'Macan Electric Turbo (800V Architecture)',
      colorName: 'Frozen Blue Metallic',
      colorHex: '#4682B4',
      image: '/porsche-macan.png',
      specs: ['21-Inch Macan Offroad Design Wheels', 'Porsche Driver Experience Screen', '800V Fast Charging Station Bundle Included'],
      leads: [
        { name: 'María Vásquez', avatar: 'M', model: 'Macan Electric Turbo', score: 92, value: '$105,300', stage: 'Charging Audit Complete', advisor: 'Eduardo B.', activity: ' Just Now' },
        { name: 'Patricia Bermúdez', avatar: 'P', model: 'Macan GTS', score: 79, value: '$92,000', stage: 'Financing Approved', advisor: 'Ramón G.', activity: '2h ago' },
      ],
      timeline: [
        { time: '09:00', label: 'Wallbox Audit', detail: 'Home 11kW Charging Certified' },
        { time: '10:30', label: 'Test Drive', detail: '800V Launch Control Experience' },
      ],
      funnel: [
        { label: 'Leads', val: 112, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
        { label: 'Qualified', val: 78, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
        { label: 'Test Drive', val: 41, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
        { label: 'Proposal', val: 24, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
        { label: 'Closed', val: 16, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
      ],
      winProb: '$3.9M',
      avgValue: '$98,500',
    },
    Panamera: {
      configuratorName: 'Panamera 4 E-Hybrid Executive',
      colorName: 'Carrara White Metallic',
      colorHex: '#FAFAFA',
      image: '/porsche-panamera.png',
      specs: ['21-Inch Panamera SportDesign Wheels', 'Rear Seat Executive Comfort Package', 'Burmester 3D High-End Surround Sound'],
      leads: [
        { name: 'Fernando Rainieri', avatar: 'F', model: 'Panamera 4 E-Hybrid', score: 87, value: '$135,000', stage: 'Corporate Fleet Order', advisor: 'Eduardo B.', activity: '12m ago' },
        { name: 'Roberto Bonetti', avatar: 'R', model: 'Panamera GTS', score: 81, value: '$152,000', stage: 'Executive Approval', advisor: 'Ramón G.', activity: '1h ago' },
      ],
      timeline: [
        { time: '08:45', label: 'Fleet Order Request', detail: '4 Units Panamera E-Hybrid' },
        { time: '11:00', label: 'VIP Presentation', detail: 'Santo Domingo East Hub' },
      ],
      funnel: [
        { label: 'Leads', val: 42, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
        { label: 'Qualified', val: 29, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
        { label: 'Test Drive', val: 18, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
        { label: 'Proposal', val: 12, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
        { label: 'Closed', val: 8, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
      ],
      winProb: '$2.8M',
      avgValue: '$144,000',
    },
    Taycan: {
      configuratorName: 'Taycan Turbo GT (800V Performance)',
      colorName: 'Purple Sky Metallic',
      colorHex: '#4B0082',
      image: '/porsche-taycan.png',
      specs: ['1,019 HP Launch Control Boost', 'Porsche Active Ride Hydraulic Suspension', 'Full Carbon Weave Trim & Ceramic PCCB'],
      leads: [
        { name: 'Alejandro Corripio', avatar: 'A', model: 'Taycan Turbo GT', score: 94, value: '$230,000', stage: 'Contract Signed', advisor: 'Eduardo B.', activity: '4m ago' },
        { name: 'Isabela Pellerano', avatar: 'I', model: 'Taycan 4S Cross Turismo', score: 86, value: '$128,000', stage: 'Spec Review', advisor: 'Ramón G.', activity: '30m ago' },
      ],
      timeline: [
        { time: '09:30', label: '800V Launch Drive', detail: '0-60 mph in 2.1s Verified' },
        { time: '10:50', label: 'Solar Integration', detail: 'Home Microgrid Pairing' },
      ],
      funnel: [
        { label: 'Leads', val: 68, width: 'w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900' },
        { label: 'Qualified', val: 45, width: 'w-[75%] bg-porsche-red/20 border-porsche-red/30 text-porsche-red' },
        { label: 'Test Drive', val: 28, width: 'w-[55%] bg-porsche-red/40 border-porsche-red/50' },
        { label: 'Proposal', val: 19, width: 'w-[40%] bg-porsche-red/60 border-porsche-red/70' },
        { label: 'Closed', val: 14, width: 'w-[28%] bg-porsche-red border-porsche-red text-white' },
      ],
      winProb: '$5.4M',
      avgValue: '$182,000',
    },
  };

  const currentData = modelData[selectedFilter] || modelData['All'];

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
              {currentData.funnel.map((step) => (
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
              {currentData.timeline.map((step, idx) => (
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
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">
                TOP ACTIVE LEADS ({selectedFilter})
              </span>
              <button
                onClick={() => { window.location.hash = '#/customer-360'; }}
                className="text-xs font-bold text-porsche-red hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Leads</span>
                <ChevronRight size={14} />
              </button>
            </div>

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
                  {currentData.leads.map((lead, idx) => (
                    <tr
                      key={idx}
                      onClick={() => { window.location.hash = '#/customer-360'; }}
                      className="hover:bg-black/5 dark:hover:bg-white/5 theme-transition cursor-pointer group"
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center group-hover:bg-porsche-red group-hover:text-white transition-colors">
                            {lead.avatar}
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">{lead.name}</span>
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
            <div
              onClick={() => { window.location.hash = '#/analytics'; }}
              className="porsche-card flex flex-col justify-between gap-3 cursor-pointer hover:border-porsche-red/50 hover:shadow-lg transition-all"
            >
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Win Probability (Next 90 Days)</span>
              <div className="text-section-30 font-bold text-slate-900 dark:text-white">{currentData.winProb}</div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+12.4% vs last quarter</span>
            </div>

            <div
              onClick={() => { window.location.hash = '#/analytics'; }}
              className="porsche-card flex flex-col justify-between gap-3 cursor-pointer hover:border-porsche-red/50 hover:shadow-lg transition-all"
            >
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Avg Deal Value</span>
              <div className="text-section-30 font-bold text-slate-900 dark:text-white">{currentData.avgValue}</div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+5.2% vs last quarter</span>
            </div>
          </div>

          {/* Intelligent Configurator Card */}
          <div className="porsche-card flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">INTELLIGENT CONFIGURATOR</span>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{currentData.configuratorName}</h3>
            </div>

            {/* Configurator Photo */}
            <div
              onClick={() => { window.location.hash = '#/configurator'; }}
              className="w-full h-[220px] rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 cursor-pointer group"
            >
              <img
                src={currentData.image}
                alt={currentData.configuratorName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Spec Details & Swatch */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: currentData.colorHex }} />
                <span className="text-xs font-bold text-slate-900 dark:text-white">{currentData.colorName}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                <span className="font-bold text-slate-900 dark:text-white">Exterior</span>
                <span>Wheels</span>
                <span>Interior</span>
                <span>Packages</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-semibold flex flex-col gap-1">
                {currentData.specs.map((spec, i) => (
                  <p key={i}>• {spec}</p>
                ))}
              </div>
            </div>

            <button
              onClick={() => { window.location.hash = '#/configurator'; }}
              className="w-full py-3.5 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer uppercase"
            >
              VIEW FULL CONFIGURATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
