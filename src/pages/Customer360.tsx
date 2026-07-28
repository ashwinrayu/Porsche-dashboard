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
  History 
} from 'lucide-react';
import { CountUp } from '../components/CountUp';

export default function Customer360() {
  const [activeClient, setActiveClient] = useState('luis');

  const clientData = {
    luis: {
      name: 'Luis Corripio',
      id: 'VIP-SD-001',
      phone: '+1 (809) 555-0192',
      email: 'l.corripio@corripio.com.do',
      location: 'Piantini, Santo Domingo',
      lifetimeValue: 980000,
      aiScore: 96,
      currentFleet: ['2023 Porsche 911 Turbo S', '2021 Porsche Cayenne GTS'],
      interestedIn: '911 GT3 RS (Weissach Package)',
      interactions: [
        { date: 'Jul 26, 2026', type: 'Configurator Studio', detail: 'Saved 911 GT3 RS in Guards Red' },
        { date: 'Jul 20, 2026', type: 'Service Visit', detail: 'Completed 10,000 km inspection on 911 Turbo S' },
        { date: 'Jun 12, 2026', type: 'Private Track Event', detail: 'Attended Porsche Track Experience Santo Domingo' },
      ],
    },
    maria: {
      name: 'María Vásquez',
      id: 'VIP-SD-002',
      phone: '+1 (809) 555-0482',
      email: 'm.vasquez@groupov.com.do',
      location: 'Naco, Santo Domingo',
      lifetimeValue: 420000,
      aiScore: 88,
      currentFleet: ['2022 Porsche Macan S'],
      interestedIn: 'Taycan Turbo GT',
      interactions: [
        { date: 'Jul 27, 2026', type: 'Test Drive Request', detail: 'Requested Taycan Turbo GT 800V test drive' },
        { date: 'Jul 15, 2026', type: 'AI Router Inquiry', detail: 'Inquired about home 11kW charger installation' },
      ],
    },
  };

  const client = activeClient === 'luis' ? clientData.luis : clientData.maria;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            VIP CRM Matrix
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Customer 360
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveClient('luis')}
            className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
              activeClient === 'luis'
                ? 'bg-porsche-red text-white shadow-glow-red'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            Luis Corripio
          </button>
          <button
            onClick={() => setActiveClient('maria')}
            className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
              activeClient === 'maria'
                ? 'bg-porsche-red text-white shadow-glow-red'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            María Vásquez
          </button>
        </div>
      </div>

      {/* Main VIP Profile Card */}
      <div className="porsche-card flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-porsche-red/5 to-transparent">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-2xl flex items-center justify-center shrink-0">
            {client.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-porsche-red uppercase font-mono">
              <ShieldCheck size={14} />
              {client.id} VIP Account
            </div>
            <h2 className="text-section-30 font-bold text-slate-900 dark:text-white mt-1">{client.name}</h2>
            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              {client.email} • {client.phone} • {client.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">Lifetime Value</p>
            <p className="text-section-30 font-bold text-slate-900 dark:text-white">
              <CountUp prefix="$" end={client.lifetimeValue} decimals={0} />
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">AI Lead Score</p>
            <p className="text-section-30 font-bold text-porsche-red">{client.aiScore} / 100</p>
          </div>
        </div>
      </div>

      {/* Garage Fleet & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Garage Fleet */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Current Porsche Garage</h3>
            <Car size={20} className="text-porsche-red" />
          </div>

          <div className="flex flex-col gap-3">
            {client.currentFleet.map((vehicle, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between"
              >
                <span className="text-body-16 font-bold text-slate-900 dark:text-white">{vehicle}</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                  Serviced & Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interaction History */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Interaction Log</h3>
            <History size={20} className="text-blue-500" />
          </div>

          <div className="flex flex-col gap-3">
            {client.interactions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-porsche-red">{item.type}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                </div>
                <p className="text-small-13 text-slate-700 dark:text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
