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
  Filter, 
  MessageSquare, 
  Globe, 
  Building2,
  X,
  Sliders,
  Check,
  Share2,
  Zap
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export interface LeadProspect {
  name: string;
  avatar: string;
  model: string;
  score: number;
  value: string;
  stage: string;
  advisor: string;
  activity: string;
  phone?: string;
  email?: string;
  source?: string;
  tradeIn?: string;
}

export default function Sales() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeSpecTab, setActiveSpecTab] = useState<'Exterior' | 'Wheels' | 'Interior' | 'Packages'>('Exterior');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [isAllLeadsOpen, setIsAllLeadsOpen] = useState(false);
  const [allLeadsFilter, setAllLeadsFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<LeadProspect | null>(null);
  const [leadActionConfirmed, setLeadActionConfirmed] = useState<string | null>(null);

  // Model-specific data dictionary for 100% dynamic filtering & tabbed specs
  const modelData: Record<string, {
    configuratorName: string;
    colorName: string;
    colorHex: string;
    image: string;
    hp: string;
    zeroToSixty: string;
    msrp: string;
    tabSpecs: Record<'Exterior' | 'Wheels' | 'Interior' | 'Packages', string[]>;
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
      hp: '532 HP',
      zeroToSixty: '2.9s',
      msrp: '$185,000 USD',
      tabSpecs: {
        Exterior: ['Guards Red Gloss Finish', 'SportDesign Aerodynamic Package', 'Matrix LED Headlights with Dynamic Light System Plus'],
        Wheels: ['20/21-Inch Carrera GTS Forged Wheels', 'Gloss Black Wheel Center Caps with Porsche Crest', 'High Performance Summer Tires'],
        Interior: ['Race-Tex Interior Package with Carmine Red Stitching', 'Adaptive Sports Seats Plus (18-Way Electric)', 'GT Sports Steering Wheel in Race-Tex'],
        Packages: ['Sport Chrono Package with Mode Switch', 'PASM Sport Suspension (-10mm)', 'Porsche Torque Vectoring Plus (PTV Plus)'],
      },
      leads: [
        { name: 'Gabriel Sterling', avatar: 'G', model: 'Macan Electric Turbo', score: 85, value: '$125,000', stage: 'Showroom', advisor: 'Eduardo B.', activity: '10m ago' },
        { name: 'Diego Mendoza', avatar: 'D', model: '911 Carrera GTS', score: 78, value: '$185,000', stage: 'Configuration', advisor: 'Eduardo B.', activity: '25m ago' },
        { name: 'Camila Bonilla', avatar: 'C', model: 'Cayenne Coupé E-Hybrid', score: 72, value: '$98,500', stage: 'Test Drive', advisor: 'Ramón G.', activity: '1h ago' },
      ],
      timeline: [
        { time: '09:15', label: 'Lead Created', detail: 'Gabriel Sterling • Macan Electric' },
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
      hp: '518 HP',
      zeroToSixty: '3.0s',
      msrp: '$241,300 USD',
      tabSpecs: {
        Exterior: ['GT Silver Metallic Paint', 'Exposed Carbon Fiber Aerodynamic Rear Wing', 'DRS Drag Reduction Active Aero Front Diffusers'],
        Wheels: ['20/21-Inch Forged Magnesium Lightweight Wheels', 'PCCB Yellow Brake Calipers', 'Michelin Pilot Sport Cup 2 R Tires'],
        Interior: ['Full Carbon Fiber Bucket Seats', '6-Point Racing Harness Safety Belt', 'Bolstered Race-Tex Interior in Black & Acid Green'],
        Packages: ['Weissach Performance Package', 'Front Axle Lift System', 'Porsche Ceramic Composite Brakes (PCCB)'],
      },
      leads: [
        { name: 'Diego Mendoza', avatar: 'D', model: '911 Carrera GTS', score: 96, value: '$241,300', stage: 'Finalizing Contract', advisor: 'Eduardo B.', activity: '2m ago' },
        { name: 'Sebastian Almonte', avatar: 'S', model: '911 GT3 RS', score: 91, value: '$315,000', stage: 'Allocation Approved', advisor: 'Eduardo B.', activity: '15m ago' },
      ],
      timeline: [
        { time: '08:30', label: 'Allocation Assigned', detail: 'Diego Mendoza • 911 GT3 RS Slot' },
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
      hp: '729 HP',
      zeroToSixty: '3.6s',
      msrp: '$146,000 USD',
      tabSpecs: {
        Exterior: ['Chromite Black Metallic Finish', 'SportDesign Front Fascia & Enlarged Air Intakes', 'Panoramic Fixed Glass Roof'],
        Wheels: ['22-Inch RS Spyder Design Wheels', 'Acid Green E-Hybrid Brake Calipers', 'All-Season Performance Tires'],
        Interior: ['Club Leather Interior in Truffle Brown', 'Massage & Ventilated 14-Way Comfort Front Seats', 'Ambient Lighting Package'],
        Packages: ['Adaptive 3-Chamber Air Suspension', 'Rear Axle Steering', 'Porsche Dynamic Chassis Control (PDCC)'],
      },
      leads: [
        { name: 'Camila Bonilla', avatar: 'C', model: 'Cayenne Coupé E-Hybrid', score: 88, value: '$146,000', stage: 'Test Drive Scheduled', advisor: 'Ramón G.', activity: '5m ago' },
        { name: 'Lucas Bermúdez', avatar: 'L', model: 'Cayenne Turbo GT', score: 84, value: '$198,000', stage: 'Trade-in Evaluation', advisor: 'Eduardo B.', activity: '40m ago' },
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
      hp: '630 HP',
      zeroToSixty: '3.1s',
      msrp: '$105,300 USD',
      tabSpecs: {
        Exterior: ['Frozen Blue Metallic Exterior', 'Aerodynamic Rear Spoiler & Active Air Intake Flaps', 'Matrix LED Headlight System'],
        Wheels: ['21-Inch Macan Offroad Design Wheels', 'High-Grip Electric Performance Tires', 'Regen Brake Systems'],
        Interior: ['Extended Leather Package in Black & Chalk', 'Porsche Driver Experience Triple Displays', 'Augmented Reality HUD'],
        Packages: ['800V Ultra-Fast Charging Hardware', 'Porsche Active Suspension Management (PASM)', 'Burmester 3D Surround Sound System'],
      },
      leads: [
        { name: 'Gabriel Sterling', avatar: 'G', model: 'Macan Electric Turbo', score: 92, value: '$105,300', stage: 'Charging Audit Complete', advisor: 'Eduardo B.', activity: ' Just Now' },
        { name: 'Valentina Gómez', avatar: 'V', model: 'Macan GTS', score: 79, value: '$92,000', stage: 'Financing Approved', advisor: 'Ramón G.', activity: '2h ago' },
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
      hp: '463 HP',
      zeroToSixty: '3.9s',
      msrp: '$115,500 USD',
      tabSpecs: {
        Exterior: ['Carrara White Metallic Paint', 'Extended Executive Wheelbase Trim', 'HD Matrix LED Headlights'],
        Wheels: ['21-Inch Panamera SportDesign Wheels', 'Acid Green Hybrid Brake Calipers', 'Noise-Insulated Glass'],
        Interior: ['Rear Seat Executive Comfort Package', 'Reclining Rear Seats with Massage', 'Soft-Close Executive Doors'],
        Packages: ['Porsche Active Ride Suspension', 'Burmester High-End 3D Surround System', 'Night Vision Assist'],
      },
      leads: [
        { name: 'Mateo Castellanos', avatar: 'M', model: 'Panamera 4 E-Hybrid', score: 87, value: '$135,000', stage: 'Corporate Fleet Order', advisor: 'Eduardo B.', activity: '12m ago' },
        { name: 'Adrian Pou', avatar: 'A', model: 'Panamera GTS', score: 81, value: '$152,000', stage: 'Executive Approval', advisor: 'Ramón G.', activity: '1h ago' },
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
      hp: '1,019 HP',
      zeroToSixty: '2.1s',
      msrp: '$230,000 USD',
      tabSpecs: {
        Exterior: ['Purple Sky Metallic Exterior', 'Carbon Fiber Aero Blades & Rear Spoiler', 'Matrix LED Headlights in Glacier Blue'],
        Wheels: ['21-Inch Lightweight Forged Taycan Wheels', 'PCCB Ceramic Brakes with Black Calipers', 'Ultra High Performance EV Tires'],
        Interior: ['Full Carbon Bucket Seats with GT Stitching', 'Race-Tex Multi-Function GT Steering Wheel', 'Weissach Package Badge'],
        Packages: ['Porsche Active Ride Hydraulic Suspension', 'Attack Mode Push-to-Pass Power Boost', '800V High-Speed DC Charging'],
      },
      leads: [
        { name: 'Isabella Cury', avatar: 'I', model: 'Taycan Turbo GT', score: 94, value: '$230,000', stage: 'Contract Signed', advisor: 'Eduardo B.', activity: '4m ago' },
        { name: 'Sofía Peynado', avatar: 'S', model: 'Taycan 4S Cross Turismo', score: 86, value: '$128,000', stage: 'Spec Review', advisor: 'Ramón G.', activity: '30m ago' },
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
  const currentTabSpecs = currentData.tabSpecs[activeSpecTab] || currentData.tabSpecs['Exterior'];

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
                onClick={() => setIsAllLeadsOpen(true)}
                className="text-xs font-bold text-porsche-red hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Leads</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono text-slate-400">
                    <th className="pb-3 px-3">Lead Prospect</th>
                    <th className="pb-3 px-3">Target Model</th>
                    <th className="pb-3 px-3">Lead Score</th>
                    <th className="pb-3 px-3">Est. Value</th>
                    <th className="pb-3 px-3">Conversion Stage</th>
                    <th className="pb-3 px-3 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {currentData.leads.map((lead, idx) => {
                    const slug = lead.name
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9]+/g, '-');
                    return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-black/5 dark:hover:bg-white/5 theme-transition cursor-pointer group"
                    >
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center group-hover:bg-porsche-red group-hover:text-white transition-colors shrink-0">
                            {lead.avatar}
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">{lead.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap">{lead.model}</td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="text-[11px] font-bold font-mono text-porsche-red bg-porsche-red/10 px-2.5 py-0.5 rounded-full border border-porsche-red/20 inline-block">
                          {lead.score} / 100
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-xs font-bold font-mono text-slate-900 dark:text-white whitespace-nowrap">{lead.value}</td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full border whitespace-nowrap inline-block ${
                          lead.score >= 80 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : 'bg-porsche-red/10 text-porsche-red border-porsche-red/20'
                        }`}>
                          {lead.stage} ({lead.score}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right text-[10px] text-slate-400 font-mono whitespace-nowrap">{lead.activity}</td>
                    </tr>
                    );
                  })}
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
          <div className="porsche-card flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">INTELLIGENT CONFIGURATOR</span>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{currentData.configuratorName}</h3>
            </div>

            {/* Configurator Photo */}
            <div
              onClick={() => setIsConfigModalOpen(true)}
              className="w-full h-[220px] rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 cursor-pointer group relative bg-black"
            >
              <img
                src={currentData.image}
                alt={currentData.configuratorName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1">
                  <Sliders size={14} className="text-porsche-red" /> Click to Inspect 360 Specs
                </span>
              </div>
            </div>

            {/* Spec Details & Tab Swatch */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: currentData.colorHex }} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{currentData.colorName}</span>
                </div>
                <span className="text-xs font-mono font-bold text-porsche-red">{currentData.msrp}</span>
              </div>

              {/* Interactive Spec Tabs */}
              <div className="flex items-center gap-2 text-xs font-mono border-b border-black/10 dark:border-white/10 pb-2">
                {(['Exterior', 'Wheels', 'Interior', 'Packages'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSpecTab(tab)}
                    className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeSpecTab === tab
                        ? 'bg-porsche-red text-white'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Spec List per Tab */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-semibold flex flex-col gap-1.5 min-h-[90px]">
                {currentTabSpecs.map((spec, i) => (
                  <p key={i} className="flex items-start gap-1.5">
                    <span className="text-porsche-red font-bold">•</span>
                    <span>{spec}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* View Full Configuration Trigger Button */}
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer uppercase flex items-center justify-center gap-2"
            >
              <Sliders size={16} />
              <span>VIEW FULL CONFIGURATION ({selectedFilter})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. FULL CONFIGURATION SPEC MODAL */}
      <AnimatePresence>
        {isConfigModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[88vh] rounded-3xl bg-white dark:bg-[#121417] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col relative overflow-hidden"
            >
              {/* Close Icon Button */}
              <button
                onClick={() => { setIsConfigModalOpen(false); setProposalSent(false); }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors z-20"
              >
                <X size={18} />
              </button>

              {/* Scrollable Body Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
                {/* Modal Header */}
                <div className="flex flex-col gap-1 pr-12">
                  <span className="text-[10px] font-mono text-porsche-red uppercase font-bold tracking-widest">
                    PORSCHE EXCLUSIVE MANUFAKTUR • EXECUTIVE SPEC SHEET
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                    {currentData.configuratorName}
                  </h2>
                </div>

                {/* Large Vehicle Display & Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 h-[190px] md:h-[260px] rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
                    <img
                      src={currentData.image}
                      alt={currentData.configuratorName}
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none" />
                  </div>

                  <div className="md:col-span-5 flex flex-col gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">MSRP Base Spec</span>
                      <span className="text-2xl font-bold text-porsche-red">{currentData.msrp}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        <span className="text-[9px] font-mono text-slate-400 uppercase block">Horsepower</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{currentData.hp}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        <span className="text-[9px] font-mono text-slate-400 uppercase block">0-60 MPH</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{currentData.zeroToSixty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Specs Grid Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
                    <span className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[10px] text-porsche-red">Exterior & Paint</span>
                    {currentData.tabSpecs.Exterior.map((s, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-300">• {s}</p>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
                    <span className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[10px] text-porsche-red">Wheels & Aerodynamics</span>
                    {currentData.tabSpecs.Wheels.map((s, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-300">• {s}</p>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
                    <span className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[10px] text-porsche-red">Interior & Comfort</span>
                    {currentData.tabSpecs.Interior.map((s, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-300">• {s}</p>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
                    <span className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[10px] text-porsche-red">Performance Packages</span>
                    {currentData.tabSpecs.Packages.map((s, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-300">• {s}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pinned Fixed Footer Bar (Outside body scroll container - guaranteed 0% overlap/bleed) */}
              <div className="bg-slate-50 dark:bg-[#0E1013] p-4 md:px-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-xl rounded-b-3xl">
                <button
                  onClick={() => { window.location.hash = '#/configurator'; }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 theme-transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sliders size={14} />
                  <span>Launch 3D Studio Configurator</span>
                </button>

                <button
                  onClick={() => {
                    setProposalSent(true);
                    setTimeout(() => {
                      setIsConfigModalOpen(false);
                      setProposalSent(false);
                    }, 1800);
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer flex items-center justify-center gap-2 uppercase"
                >
                  {proposalSent ? (
                    <>
                      <Check size={16} />
                      <span>Proposal Sent to Client!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={16} />
                      <span>Send Proposal Contract</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ALL LEADS FULL-PAGE MODAL ── */}
      <AnimatePresence>
        {isAllLeadsOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-porsche-bgDark/95 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full max-w-[1280px] mx-auto w-full p-6 md:p-10 gap-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-porsche-red uppercase font-bold tracking-widest">
                    PORSCHE COMMAND CENTER — LIVE PIPELINE
                  </span>
                  <h2 className="text-3xl font-bold text-white tracking-tight mt-0.5">
                    All Active Leads
                  </h2>
                </div>
                <button
                  onClick={() => setIsAllLeadsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-porsche-red transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Model Filter Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {['All', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAllLeadsFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      allLeadsFilter === f
                        ? 'bg-porsche-red text-white shadow-glow-red'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {f === 'All' ? 'All Models' : f}
                  </button>
                ))}
                <span className="ml-auto text-xs font-mono text-slate-400">
                  {
                    (allLeadsFilter === 'All'
                      ? Object.values(modelData).flatMap((m) => m.leads)
                      : modelData[allLeadsFilter]?.leads ?? []
                    ).length
                  } leads
                </span>
              </div>

              {/* Full Leads Table */}
              <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#0B0D11]/90 backdrop-blur z-10">
                    <tr className="border-b border-white/10 text-[10px] uppercase font-mono text-slate-400">
                      <th className="py-4 px-4">#</th>
                      <th className="py-4 px-4">Customer</th>
                      <th className="py-4 px-4">Model</th>
                      <th className="py-4 px-4">Score</th>
                      <th className="py-4 px-4">Value</th>
                      <th className="py-4 px-4">Stage</th>
                      <th className="py-4 px-4">Advisor</th>
                      <th className="py-4 px-4 text-right">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(
                      allLeadsFilter === 'All'
                        ? Object.entries(modelData).flatMap(([modelKey, m]) =>
                            m.leads.map((lead) => ({ ...lead, modelKey }))
                          )
                        : (modelData[allLeadsFilter]?.leads ?? []).map((lead) => ({ ...lead, modelKey: allLeadsFilter }))
                    ).map((lead, idx) => {
                      const slug = lead.name
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, '-');
                      return (
                        <tr
                          key={idx}
                          onClick={() => { setSelectedLead(lead); setIsAllLeadsOpen(false); }}
                          className="hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-4 text-[10px] font-mono text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center group-hover:bg-porsche-red transition-colors shrink-0">
                                {lead.avatar}
                              </div>
                              <span className="text-sm font-bold text-white group-hover:text-porsche-red transition-colors">{lead.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                                {lead.modelKey}
                              </span>
                              <span className="text-xs text-slate-300">{lead.model}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-sm font-bold text-porsche-red bg-porsche-red/10 px-3 py-1 rounded-full">
                              {lead.score}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-sm font-bold text-white">{lead.value}</td>
                          <td className="py-3.5 px-4">
                            <span className="text-[10px] font-bold uppercase font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-300">
                              {lead.stage}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400 font-semibold">{lead.advisor}</td>
                          <td className="py-3.5 px-4 text-right text-[10px] text-slate-400 font-mono">{lead.activity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. DEDICATED LEAD PROSPECT DOSSIER MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white dark:bg-[#121417] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col relative overflow-hidden p-6 gap-6"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => { setSelectedLead(null); setLeadActionConfirmed(null); }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors z-20"
              >
                <X size={18} />
              </button>

              {/* Prospect Header */}
              <div className="flex items-start gap-4 pr-10 border-b border-black/10 dark:border-white/10 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-porsche-red text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-glow-red">
                  {selectedLead.avatar}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full bg-porsche-red/10 text-porsche-red border border-porsche-red/20">
                      Sales Lead Prospect (Not Yet Owner)
                    </span>
                    <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {selectedLead.score}/100 Intent Score
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{selectedLead.name}</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedLead.email || `${selectedLead.name.toLowerCase().replace(' ', '.')}@prospect-mail.do`} • {selectedLead.phone || '+1 (809) 555-0182'} • Santo Domingo Hub
                  </p>
                </div>
              </div>

              {/* Lead Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Target Porsche Model</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedLead.model}</p>
                  <p className="text-xs font-mono text-porsche-red font-bold">{selectedLead.value} Est. Budget</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Conversion Stage &amp; Advisor</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedLead.stage}</p>
                  <p className="text-xs text-slate-500">Assigned Advisor: <span className="font-bold text-slate-900 dark:text-white">{selectedLead.advisor}</span></p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Acquisition Channel / Source</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{selectedLead.source || 'porsche.com.do Web Configurator'}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Last Touchpoint: {selectedLead.activity}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Trade-In Vehicle Appraisal</span>
                  <p className="text-xs font-bold text-amber-500">{selectedLead.tradeIn || '2021 BMW X5 M ($45,000 Equity)'}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Appraisal Status: Pre-Evaluated</p>
                </div>
              </div>

              {/* Prospect Engagement & Intent Log */}
              <div className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase text-porsche-red font-bold">Prospect AI Intent Signals</span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-porsche-red" />
                    Configured {selectedLead.model} in Guards Red with Sport Chrono package on web portal.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Requested 11kW Wallbox home installation feasibility audit for Santo Domingo residence.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Direct inquiry logged by sales advisor {selectedLead.advisor} — high purchase readiness.
                  </li>
                </ul>
              </div>

              {/* Lead Action CTAs */}
              <div className="flex flex-col gap-2 pt-2 border-t border-black/10 dark:border-white/10">
                {leadActionConfirmed && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center font-mono">
                    ✓ {leadActionConfirmed}
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setLeadActionConfirmed(`Test Drive Scheduled for ${selectedLead.name}`)}
                    className="py-2.5 px-3 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-glow-red cursor-pointer text-center"
                  >
                    Schedule Test Drive
                  </button>
                  <button
                    onClick={() => setLeadActionConfirmed(`Formal Quote Sent to ${selectedLead.email || 'prospect'}`)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer text-center"
                  >
                    Send Proposal
                  </button>
                  <button
                    onClick={() => setLeadActionConfirmed(`WhatsApp Spec Link Sent to ${selectedLead.phone || 'phone'}`)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer text-center"
                  >
                    WhatsApp Spec
                  </button>
                  <button
                    onClick={() => setLeadActionConfirmed(`${selectedLead.name} Converted & Escrow Contract Initiated!`)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer text-center"
                  >
                    Convert Lead
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
