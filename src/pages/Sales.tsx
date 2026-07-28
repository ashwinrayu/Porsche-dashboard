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
  SlidersHorizontal,
  X
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { CountUp } from '../components/CountUp';
import { Link } from 'react-router-dom';

export default function Sales() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [tradeInValue, setTradeInValue] = useState<number>(45000);
  const [tradeInModel, setTradeInModel] = useState('2021 Macan GTS');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const leads = [
    { id: 'L-1001', name: 'Luis Corripio', model: '911 GT3 RS', score: 96, status: 'Hot', advisor: 'Eduardo Bisonó', budget: '$320,000' },
    { id: 'L-1002', name: 'María Vásquez', model: 'Taycan Turbo GT', score: 88, status: 'Hot', advisor: 'María Laura Díaz', budget: '$240,000' },
    { id: 'L-1003', name: 'Gustavo Tavares', model: '718 Cayman GT4 RS', score: 74, status: 'Warm', advisor: 'Eduardo Bisonó', budget: '$190,000' },
    { id: 'L-1004', name: 'Alejandro Santelises', model: 'Panamera 4 E-Hybrid', score: 62, status: 'Warm', advisor: 'Carlos Mendoza', budget: '$145,000' },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* 48px Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Commercial Pipeline
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Sales & Lead Conversion
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/configurator"
            className="px-5 py-2.5 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center gap-2 cursor-pointer"
          >
            <Car size={14} />
            <span>Open Configurator Studio</span>
          </Link>
        </div>
      </div>

      {/* Dual Vehicle Featured Model Showcase */}
      <div className="porsche-card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold text-porsche-red uppercase tracking-widest bg-porsche-red/10 border border-porsche-red/20 px-3 py-1 rounded-full w-max">
            High Demand Commercial Lead — 911 GT3 RS
          </span>
          <h2 className="text-section-30 font-bold text-slate-900 dark:text-white">
            VIP Lead Priority Matrix
          </h2>
          <p className="text-small-13 text-slate-600 dark:text-slate-300 leading-relaxed">
            Luis Corripio has configured a Guards Red 911 GT3 RS with Weissach Package. AI probability of close is 96% within 48 hours.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
              <p className="text-[10px] text-slate-400 font-mono uppercase">Target Price</p>
              <p className="text-body-16 font-bold text-slate-900 dark:text-white">$341,200</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
              <p className="text-[10px] text-slate-400 font-mono uppercase">AI Intent Score</p>
              <p className="text-body-16 font-bold text-porsche-red">96 / 100</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
              <p className="text-[10px] text-slate-400 font-mono uppercase">Trade-In Expected</p>
              <p className="text-body-16 font-bold text-emerald-600 dark:text-emerald-400">Yes</p>
            </div>
          </div>
        </div>

        {/* Dual GT3 Image (White GT3 in Light, Black GT3 in Dark) */}
        <div className="w-full h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
          <VehicleImage
            lightSrc="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
            darkSrc="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
            alt="Porsche 911 GT3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Pipeline Stage Matrix & VIP Customer Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads Table (2 Columns) */}
        <div className="lg:col-span-2 porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Active High-Intent VIP Leads</h3>
            <span className="text-xs text-slate-400 font-mono">4 Active Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono text-slate-400">
                  <th className="pb-3 px-2">Client</th>
                  <th className="pb-3 px-2">Target Vehicle</th>
                  <th className="pb-3 px-2">AI Score</th>
                  <th className="pb-3 px-2">Advisor</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-black/5 dark:hover:bg-white/5 theme-transition">
                    <td className="py-4 px-2">
                      <p className="text-body-16 font-bold text-slate-900 dark:text-white">{lead.name}</p>
                      <p className="text-small-13 text-slate-400">{lead.id}</p>
                    </td>
                    <td className="py-4 px-2 text-small-13 font-semibold text-slate-700 dark:text-slate-300">
                      {lead.model}
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-xs font-bold text-porsche-red bg-porsche-red/10 px-2.5 py-1 rounded-full">
                        {lead.score}% AI Score
                      </span>
                    </td>
                    <td className="py-4 px-2 text-small-13 text-slate-500 dark:text-slate-400">
                      {lead.advisor}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button
                        onClick={() => setSelectedLead(lead.id)}
                        className="px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-porsche-red dark:hover:bg-porsche-red dark:hover:text-white theme-transition cursor-pointer"
                      >
                        Schedule Test Drive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trade-In Value Estimator (1 Column) */}
        <div className="porsche-card flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Trade-In Estimator</h3>
              <DollarSign size={18} className="text-porsche-red" />
            </div>

            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              Calculate instant trade-in equity for client upgrade paths to Taycan Electric or 911 GT3.
            </p>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-mono text-slate-400">Select Client Trade Vehicle</label>
              <select
                value={tradeInModel}
                onChange={(e) => setTradeInModel(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white font-semibold"
              >
                <option value="2021 Macan GTS">2021 Macan GTS (32,000 km)</option>
                <option value="2020 Cayenne Coupé">2020 Cayenne Coupé (45,000 km)</option>
                <option value="2019 Panamera 4S">2019 Panamera 4S (50,000 km)</option>
              </select>

              <label className="text-[10px] uppercase font-mono text-slate-400 mt-2">Adjust Condition Rating</label>
              <input
                type="range"
                min={30000}
                max={75000}
                step={1000}
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
                className="w-full accent-porsche-red cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 text-center">
            <p className="text-[10px] text-porsche-red uppercase font-mono font-bold">Estimated Trade-In Equity</p>
            <p className="text-section-30 font-bold text-porsche-red mt-1">
              ${tradeInValue.toLocaleString()} USD
            </p>
          </div>
        </div>
      </div>

      {/* Test Drive Scheduling Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md porsche-card flex flex-col gap-6 relative"
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={18} />
              </button>

              <div>
                <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Schedule Test Drive</h3>
                <p className="text-small-13 text-slate-500 dark:text-slate-400">
                  Book a 45-minute highway slot at Porsche Center Santo Domingo.
                </p>
              </div>

              {!bookingSuccess ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSuccess(true);
                    setTimeout(() => {
                      setBookingSuccess(false);
                      setSelectedLead(null);
                    }, 2000);
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Preferred Date</label>
                    <input
                      type="date"
                      defaultValue="2026-07-30"
                      className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Time Slot</label>
                    <select className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white mt-1">
                      <option>10:00 AM — 10:45 AM</option>
                      <option>02:00 PM — 02:45 PM</option>
                      <option>04:30 PM — 05:15 PM</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition mt-2 cursor-pointer"
                  >
                    Confirm VIP Booking
                  </button>
                </form>
              ) : (
                <div className="py-8 flex flex-col items-center gap-3 text-center">
                  <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">VIP Test Drive Confirmed!</p>
                  <p className="text-small-13 text-slate-500">Confirmation SMS sent to client.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
