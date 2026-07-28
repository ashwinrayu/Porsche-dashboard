import React, { useState } from 'react';
import { 
  Users, 
  Car, 
  Calendar, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  History, 
  DollarSign, 
  Wrench, 
  RefreshCw, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { CountUp } from '../components/CountUp';

export default function Customer360() {
  const [activeClientKey, setActiveClientKey] = useState<'luis' | 'maria'>('luis');

  const clients = {
    luis: {
      name: 'Luis Corripio',
      id: 'VIP-SD-001',
      phone: '+1 (809) 555-0192',
      email: 'l.corripio@corripio.com.do',
      location: 'Piantini, Santo Domingo',
      lifetimeValue: 980000,
      aiPurchaseScore: 96,
      financialProfile: {
        preferredPayment: 'Wire Transfer / Direct Escrow',
        creditTier: 'Tier 1 Executive Ultra',
        approvedEquity: '$450,000 USD',
      },
      currentFleet: [
        { model: '2023 Porsche 911 Turbo S', mileage: '12,400 km', status: 'Active Garage' },
        { model: '2021 Porsche Cayenne GTS', mileage: '34,100 km', status: 'Active Garage' },
      ],
      purchaseHistory: [
        { vehicle: '2023 Porsche 911 Turbo S', price: '$275,000 USD', date: 'Mar 2023' },
        { vehicle: '2021 Porsche Cayenne GTS', price: '$142,000 USD', date: 'Nov 2021' },
      ],
      serviceHistory: [
        { date: 'Jul 20, 2026', service: '10,000 km Inspection & Oil Service', cost: '$1,200', status: 'Completed' },
        { date: 'Jan 14, 2026', service: 'PCCB Brake Fluid Flush', cost: '$850', status: 'Completed' },
      ],
      tradeInHistory: [
        { vehicle: '2019 Porsche Panamera 4S', tradeVal: '$78,000 USD', appliedTo: '2023 911 Turbo S' },
      ],
      journeyTimeline: [
        { type: 'Website', text: 'Configured 911 GT3 RS Weissach Package on porsche.com.do', time: 'Jul 24, 2026' },
        { type: 'WhatsApp', text: 'Inquired delivery time for Guards Red exterior finish', time: 'Jul 25, 2026' },
        { type: 'Showroom Visit', text: 'Met Eduardo Bisonó for private spec review', time: 'Jul 26, 2026' },
        { type: 'Test Drive', text: 'Completed 45-min highway track drive in 911 GTS', time: 'Jul 27, 2026' },
        { type: 'Proposal Sent', text: 'Official contract generated for $341,200 USD', time: 'Jul 27, 2026' },
      ],
    },
    maria: {
      name: 'María Vásquez',
      id: 'VIP-SD-002',
      phone: '+1 (809) 555-0482',
      email: 'm.vasquez@groupov.com.do',
      location: 'Naco, Santo Domingo',
      lifetimeValue: 420000,
      aiPurchaseScore: 88,
      financialProfile: {
        preferredPayment: 'Porsche Financial Lease',
        creditTier: 'Tier 1 Corporate',
        approvedEquity: '$210,000 USD',
      },
      currentFleet: [
        { model: '2022 Porsche Macan S', mileage: '28,900 km', status: 'Active Garage' },
      ],
      purchaseHistory: [
        { vehicle: '2022 Porsche Macan S', price: '$89,000 USD', date: 'Jun 2022' },
      ],
      serviceHistory: [
        { date: 'May 12, 2026', service: '20,000 km Annual Inspection', cost: '$950', status: 'Completed' },
      ],
      tradeInHistory: [
        { vehicle: '2018 Macan Base', tradeVal: '$42,000 USD', appliedTo: '2022 Macan S' },
      ],
      journeyTimeline: [
        { type: 'Website', text: 'Calculated 800V Taycan charging range', time: 'Jul 22, 2026' },
        { type: 'WhatsApp', text: 'Inquired about home 11kW Wallbox installation', time: 'Jul 24, 2026' },
        { type: 'Test Drive Booked', text: 'Scheduled 800V Taycan Turbo GT test drive', time: 'Jul 27, 2026' },
      ],
    },
  };

  const client = clients[activeClientKey];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Complete Executive CRM Suite
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Customer 360 Profile
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveClientKey('luis')}
            className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
              activeClientKey === 'luis'
                ? 'bg-porsche-red text-white shadow-glow-red'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            Luis Corripio
          </button>
          <button
            onClick={() => setActiveClientKey('maria')}
            className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
              activeClientKey === 'maria'
                ? 'bg-porsche-red text-white shadow-glow-red'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            María Vásquez
          </button>
        </div>
      </div>

      {/* 1. LUXURY EXECUTIVE VIP HEADER CARD */}
      <div className="porsche-card flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-porsche-red/10 via-transparent to-transparent">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-3xl flex items-center justify-center shrink-0 border-2 border-porsche-red shadow-glow-red">
            {client.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-porsche-red uppercase font-mono">
              <ShieldCheck size={14} />
              {client.id} VIP Account
            </div>
            <h2 className="text-title-48 font-bold text-slate-900 dark:text-white leading-tight">{client.name}</h2>
            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              {client.email} • {client.phone} • {client.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8 shrink-0 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-4 md:pt-0 md:pl-8">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Lifetime Value</p>
            <p className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp prefix="$" end={client.lifetimeValue} decimals={0} />
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">AI Purchase Score</p>
            <p className="text-section-30 font-bold text-porsche-red">{client.aiPurchaseScore} / 100</p>
          </div>
        </div>
      </div>

      {/* 2. FINANCIAL PROFILE & GARAGE FLEET */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Financial Profile */}
        <div className="porsche-card flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Financial Profile & Credit Tier</h3>
            <DollarSign size={20} className="text-porsche-red" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[9px] text-slate-400 font-mono uppercase">Payment Preference</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{client.financialProfile.preferredPayment}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[9px] text-slate-400 font-mono uppercase">Credit Classification</p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">{client.financialProfile.creditTier}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[9px] text-slate-400 font-mono uppercase">Pre-Approved Equity</p>
              <p className="text-xs font-bold text-porsche-red mt-1">{client.financialProfile.approvedEquity}</p>
            </div>
          </div>
        </div>

        {/* Current Garage Fleet */}
        <div className="porsche-card flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Active Porsche Garage Fleet</h3>
            <Car size={20} className="text-blue-500" />
          </div>

          <div className="flex flex-col gap-3">
            {client.currentFleet.map((v, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{v.model}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Mileage: {v.mileage}</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PURCHASE, SERVICE & TRADE-IN HISTORY TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Purchase History */}
        <div className="porsche-card flex flex-col gap-4">
          <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">Purchase History</h4>
          <div className="flex flex-col gap-2">
            {client.purchaseHistory.map((ph, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{ph.vehicle}</p>
                  <p className="text-[9px] text-slate-400 font-mono">{ph.date}</p>
                </div>
                <span className="font-bold text-porsche-red">{ph.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service History */}
        <div className="porsche-card flex flex-col gap-4">
          <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">Service History</h4>
          <div className="flex flex-col gap-2">
            {client.serviceHistory.map((sh, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{sh.service}</p>
                  <p className="text-[9px] text-slate-400 font-mono">{sh.date}</p>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{sh.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-in History */}
        <div className="porsche-card flex flex-col gap-4">
          <h4 className="text-card-22 font-bold text-slate-900 dark:text-white">Trade-In History</h4>
          <div className="flex flex-col gap-2">
            {client.tradeInHistory.map((th, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{th.vehicle}</p>
                  <p className="text-[9px] text-slate-400 font-mono">Applied to: {th.appliedTo}</p>
                </div>
                <span className="font-bold text-amber-500">{th.tradeVal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RELATIONSHIP JOURNEY TIMELINE */}
      <div className="porsche-card flex flex-col gap-6">
        <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
          <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Relationship Journey Timeline</h3>
          <span className="text-xs font-mono text-slate-400">{client.journeyTimeline.length} Connected Interactions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {client.journeyTimeline.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-porsche-red uppercase font-mono px-2 py-0.5 rounded-full bg-porsche-red/10">
                  {step.type}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">{step.time}</span>
              </div>
              <p className="text-small-13 text-slate-700 dark:text-slate-300 font-semibold leading-snug mt-1">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
