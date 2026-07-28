import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  MessageSquare, 
  Globe, 
  Building2, 
  Sliders, 
  FileText, 
  Award, 
  ShieldCheck, 
  Zap, 
  Check 
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';

interface Lead {
  id: string;
  name: string;
  avatar: string;
  vehicle: string;
  leadScore: number;
  purchaseIntent: 'High' | 'Very High' | 'Immediate' | 'Medium';
  timeline: string;
  probability: number;
  advisor: string;
  priority: 'Hot' | 'Warm' | 'Nurture';
  modelId: string;
  colorHex: string;
  colorName: string;
  wheels: string;
  interior: string;
  packages: string[];
  journey: {
    type: 'WhatsApp' | 'Website' | 'Dealer Visit' | 'Configurator' | 'Test Drive' | 'Proposal' | 'Sale';
    title: string;
    detail: string;
    time: string;
  }[];
}

const LEADS_DATA: Lead[] = [
  {
    id: 'L-1001',
    name: 'Luis Corripio',
    avatar: 'L',
    vehicle: '911 GT3 RS',
    leadScore: 96,
    purchaseIntent: 'Immediate',
    timeline: '48 Hours',
    probability: 96,
    advisor: 'Eduardo Bisonó',
    priority: 'Hot',
    modelId: '911-gt3rs',
    colorHex: '#D5001C',
    colorName: 'Guards Red',
    wheels: '20/21" GT3 RS Forged Lightweight Alloy',
    interior: 'Race-Tex Interior with Guards Red Stitching',
    packages: ['Weissach Package', 'Porsche Ceramic Composite Brakes (PCCB)'],
    journey: [
      { type: 'Website', title: 'Configured Vehicle', detail: 'Saved 911 GT3 RS spec on porsche.com.do', time: 'Jul 24, 10:14 AM' },
      { type: 'WhatsApp', title: 'Inquired Pricing', detail: 'Sent WhatsApp message regarding Weissach package delivery time', time: 'Jul 25, 02:30 PM' },
      { type: 'Dealer Visit', title: 'Santo Domingo Showroom', detail: 'Met Eduardo Bisonó at Luperón showroom for private consultation', time: 'Jul 26, 11:00 AM' },
      { type: 'Configurator', title: 'Finalized Spec', detail: 'Selected PCCB Brakes & Guards Red interior stitching', time: 'Jul 26, 04:15 PM' },
      { type: 'Test Drive', title: 'Highway Test Drive', detail: 'Completed 45-min highway track drive in 911 GTS', time: 'Jul 27, 09:30 AM' },
      { type: 'Proposal', title: 'Contract Sent', detail: 'Official deposit contract generated for $341,200 USD', time: 'Jul 27, 03:00 PM' },
    ],
  },
  {
    id: 'L-1002',
    name: 'María Vásquez',
    avatar: 'M',
    vehicle: 'Taycan Turbo GT',
    leadScore: 88,
    purchaseIntent: 'Very High',
    timeline: '7 Days',
    probability: 88,
    advisor: 'María Laura Díaz',
    priority: 'Hot',
    modelId: 'taycan-turbogt',
    colorHex: '#111111',
    colorName: 'Jet Black Metallic',
    wheels: '21" Taycan Exclusive Design Carbon Aeroblades',
    interior: 'Club Leather Olea in Basalt Black',
    packages: ['Sport Chrono Package', 'Burmester® High-End Sound'],
    journey: [
      { type: 'Website', title: 'EV Range Calculator', detail: 'Calculated 800V charging times for Santo Domingo - Punta Cana', time: 'Jul 22, 08:45 PM' },
      { type: 'WhatsApp', title: 'Home Charger Inquiry', detail: 'Asked about 11kW Wallbox installation requirements', time: 'Jul 24, 01:15 PM' },
      { type: 'Configurator', title: 'Saved Spec', detail: 'Configured Taycan Turbo GT in Jet Black', time: 'Jul 25, 06:00 PM' },
      { type: 'Test Drive', title: '800V Test Drive Scheduled', detail: 'Booked test drive for July 30 at 10:00 AM', time: 'Jul 27, 10:00 AM' },
    ],
  },
  {
    id: 'L-1003',
    name: 'Gustavo Tavares',
    avatar: 'G',
    vehicle: '718 Cayman GT4 RS',
    leadScore: 74,
    purchaseIntent: 'High',
    timeline: '14 Days',
    probability: 74,
    advisor: 'Eduardo Bisonó',
    priority: 'Warm',
    modelId: '718-gt4rs',
    colorHex: '#94A3B8',
    colorName: 'Crayon Grey',
    wheels: '20" 718 Cayman GT4 RS Forged Wheels',
    interior: 'Full Leather & Race-Tex Black/Deep Sea Blue',
    packages: ['Sport Chrono Package'],
    journey: [
      { type: 'Website', title: 'Browsed Pre-Orders', detail: 'Viewed 718 GT4 RS allocation availability', time: 'Jul 18, 04:20 PM' },
      { type: 'Dealer Visit', title: 'Coffee & Spec Review', detail: 'Discussed track alignment setup with Eduardo', time: 'Jul 21, 03:00 PM' },
      { type: 'Configurator', title: 'Saved Spec', detail: 'Selected Crayon Grey finish with titanium roll cage', time: 'Jul 23, 07:10 PM' },
    ],
  },
];

export default function Sales() {
  const { theme } = useTheme();
  const [selectedLead, setSelectedLead] = useState<Lead>(LEADS_DATA[0]);

  // Configurator transient state for selected lead
  const [configColor, setConfigColor] = useState(selectedLead.colorHex);
  const [configWheels, setConfigWheels] = useState(selectedLead.wheels);
  const [configPackages, setConfigPackages] = useState<string[]>(selectedLead.packages);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setConfigColor(lead.colorHex);
    setConfigWheels(lead.wheels);
    setConfigPackages(lead.packages);
  };

  const toggleConfigPackage = (pkgName: string) => {
    setConfigPackages(prev =>
      prev.includes(pkgName) ? prev.filter(p => p !== pkgName) : [...prev, pkgName]
    );
  };

  const modelImages = {
    '911-gt3rs': {
      light: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      dark: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    },
    'taycan-turbogt': {
      light: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      dark: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    },
    '718-gt4rs': {
      light: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      dark: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    },
  };

  const activeModelImg = modelImages[selectedLead.modelId as keyof typeof modelImages] || modelImages['911-gt3rs'];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Tesla-Style Luxury CRM Engine
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Lead Telemetry & Live Sales Matrix
          </h1>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          Live Telemetry Sync
        </span>
      </div>

      {/* 1. TOP: Live Sales Funnel, Win Probability, Pipeline & AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Live Sales Funnel */}
        <div className="porsche-card flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Live Sales Funnel
            </span>
            <TrendingUp size={18} className="text-porsche-red" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp end={42} suffix=" Deals" />
          </div>
          <div className="flex items-center gap-2 text-small-13 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-porsche-red" />
            <span>14 Test Drives • 8 Proposals</span>
          </div>
        </div>

        {/* Win Probability */}
        <div className="porsche-card flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Win Probability
            </span>
            <Award size={18} className="text-emerald-500" />
          </div>
          <div className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400">
            <CountUp suffix="%" end={94.8} decimals={1} />
          </div>
          <p className="text-small-13 text-slate-500">Hot Lead Target Benchmark</p>
        </div>

        {/* Lead Pipeline */}
        <div className="porsche-card flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Pipeline Value
            </span>
            <DollarSign size={18} className="text-blue-500" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp prefix="$" end={12400000} decimals={0} />
          </div>
          <p className="text-small-13 text-emerald-600 font-semibold">+24.8% vs last month</p>
        </div>

        {/* AI Recommendations */}
        <div className="porsche-card flex flex-col justify-between gap-3 bg-gradient-to-br from-porsche-red/10 to-transparent border-porsche-red/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">AI Recommendation</span>
            <Sparkles size={16} className="text-porsche-red" />
          </div>
          <p className="text-small-13 text-slate-800 dark:text-slate-200 font-semibold leading-snug">
            "Priority: Confirm Luis Corripio 911 GT3 RS Weissach allocation within 48h for 96% close probability."
          </p>
        </div>
      </div>

      {/* 2. CENTER & RIGHT SIDE: Luxury CRM Table (Left) + Live Porsche Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CENTER: Luxury CRM Table (7 Columns) */}
        <div className="lg:col-span-7 porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">VIP Customer Pipeline Matrix</h3>
              <p className="text-small-13 text-slate-500">Select a customer row to sync live configurator & journey timeline.</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Tesla CRM View</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono text-slate-400">
                  <th className="pb-3 px-2">Priority</th>
                  <th className="pb-3 px-2">Customer</th>
                  <th className="pb-3 px-2">Vehicle</th>
                  <th className="pb-3 px-2">Score</th>
                  <th className="pb-3 px-2">Intent</th>
                  <th className="pb-3 px-2">Timeline</th>
                  <th className="pb-3 px-2">Advisor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {LEADS_DATA.map((lead) => {
                  const isSelected = selectedLead.id === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => handleSelectLead(lead)}
                      className={`cursor-pointer theme-transition ${
                        isSelected
                          ? 'bg-porsche-red/10 border-l-4 border-l-porsche-red font-semibold'
                          : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {/* Priority Ring Indicator */}
                      <td className="py-4 px-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-lg ${
                            lead.priority === 'Hot' ? 'bg-porsche-red shadow-glow-red ring-2 ring-porsche-red/40 animate-pulse' :
                            lead.priority === 'Warm' ? 'bg-amber-500 ring-2 ring-amber-500/40' : 'bg-blue-500'
                          }`}
                        >
                          {lead.priority === 'Hot' ? 'H' : 'W'}
                        </div>
                      </td>

                      {/* Customer Avatar & Name */}
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center shrink-0">
                            {lead.avatar}
                          </div>
                          <div>
                            <p className="text-body-16 font-bold text-slate-900 dark:text-white leading-tight">{lead.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{lead.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td className="py-4 px-2 text-small-13 font-bold text-slate-800 dark:text-slate-200">
                        {lead.vehicle}
                      </td>

                      {/* Lead Score */}
                      <td className="py-4 px-2">
                        <span className="text-xs font-bold text-porsche-red bg-porsche-red/10 px-2.5 py-1 rounded-full">
                          {lead.leadScore}%
                        </span>
                      </td>

                      {/* Purchase Intent */}
                      <td className="py-4 px-2 text-small-13 text-slate-600 dark:text-slate-300 font-semibold">
                        {lead.purchaseIntent}
                      </td>

                      {/* Timeline */}
                      <td className="py-4 px-2 text-small-13 text-slate-500 font-mono">
                        {lead.timeline}
                      </td>

                      {/* Advisor */}
                      <td className="py-4 px-2 text-small-13 text-slate-500">
                        {lead.advisor}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE: Live Porsche Configurator Panel (5 Columns) */}
        <div className="lg:col-span-5 porsche-card flex flex-col gap-6 justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div>
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">Live Configurator Engine</span>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{selectedLead.vehicle}</h3>
            </div>
            <span className="text-xs font-mono font-bold text-porsche-red bg-porsche-red/10 px-3 py-1 rounded-full">
              Client: {selectedLead.name}
            </span>
          </div>

          {/* 3D Vehicle Preview Stage (Dual Asset Light/Dark Crossfade) */}
          <div className="w-full h-[220px] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
            <VehicleImage
              lightSrc={activeModelImg.light}
              darkSrc={activeModelImg.dark}
              alt={selectedLead.vehicle}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Colour Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase">Exterior Finish: {selectedLead.colorName}</label>
            <div className="flex items-center gap-3">
              {['#D5001C', '#111111', '#94A3B8', '#1E3A8A', '#F5F5F5'].map((color) => (
                <button
                  key={color}
                  onClick={() => setConfigColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    configColor === color ? 'border-porsche-red scale-110 shadow-glow-red' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Wheel Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase">Wheel Selection</label>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white">
              {configWheels}
            </div>
          </div>

          {/* Interior Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase">Interior Trim</label>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white">
              {selectedLead.interior}
            </div>
          </div>

          {/* Packages */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase">Configured Packages</label>
            <div className="flex flex-wrap gap-2">
              {configPackages.map((pkg, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-porsche-red/10 border border-porsche-red/20 text-[11px] font-bold text-porsche-red flex items-center gap-1"
                >
                  <Check size={10} />
                  {pkg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM: Customer Journey Timeline (WhatsApp, Website, Dealer Visit, Configurator, Test Drive, Proposal, Sale) */}
      <div className="porsche-card flex flex-col gap-6">
        <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">End-to-End VIP Touchpoints</span>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">
              Customer Journey Timeline — {selectedLead.name}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{selectedLead.journey.length} Recorded Touchpoints</span>
        </div>

        {/* Timeline Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {selectedLead.journey.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between gap-3 hover:border-porsche-red/30 theme-transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-porsche-red uppercase font-mono px-2 py-0.5 rounded-full bg-porsche-red/10">
                  {step.type}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">{step.time}</span>
              </div>

              <div>
                <p className="text-body-16 font-bold text-slate-900 dark:text-white leading-snug">{step.title}</p>
                <p className="text-small-13 text-slate-500 mt-1 leading-snug">{step.detail}</p>
              </div>

              <div className="w-full h-1 rounded-full bg-porsche-red/30 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
