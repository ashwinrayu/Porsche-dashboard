import React, { useState } from 'react';
import { 
  User, 
  Award, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { api } from '../services/api';

export default function Profile() {
  const currentUser = api.auth.getCurrentUser() || {
    name: 'Eduardo Bisonó',
    role: 'Senior Executive Sales Advisor',
    email: 'eduardo.bisono@porsche.com.do',
  };

  const [commissionRate, setCommissionRate] = useState(2.5);
  const [salesVolume, setSalesVolume] = useState(1850000);

  const calculatedCommission = (salesVolume * (commissionRate / 100));

  return (
    <div className="flex flex-col gap-10">
      {/* Header Profile Banner */}
      <div className="porsche-card flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-porsche-red/10 via-transparent to-transparent">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-porsche-red text-white font-bold text-2xl flex items-center justify-center shadow-glow-red border-2 border-white dark:border-slate-800">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-porsche-red uppercase font-mono">
              <ShieldCheck size={14} />
              Porsche Certified Senior Advisor
            </div>
            <h1 className="text-title-48 font-bold text-slate-900 dark:text-white mt-1">
              {currentUser.name}
            </h1>
            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              {currentUser.email} • Santo Domingo Showroom
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Monthly Quota Attainment</p>
            <p className="text-card-22 font-bold text-porsche-red">142%</p>
          </div>
        </div>
      </div>

      {/* Advisor Performance Matrix & Commission Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Advisor Stats (2 Columns) */}
        <div className="lg:col-span-2 porsche-card flex flex-col gap-6">
          <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">
            Q3 Performance Metrics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[10px] text-slate-400 font-mono uppercase">Total Vehicles Sold</p>
              <p className="text-section-30 font-bold text-slate-900 dark:text-white mt-1">
                <CountUp end={18} suffix=" Units" />
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[10px] text-slate-400 font-mono uppercase">Gross Sales Revenue</p>
              <p className="text-section-30 font-bold text-porsche-red mt-1">
                <CountUp prefix="$" end={SalesVolume => salesVolume} decimals={0} />
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <p className="text-[10px] text-slate-400 font-mono uppercase">CSAT Client Score</p>
              <p className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                4.98 / 5.0
              </p>
            </div>
          </div>
        </div>

        {/* Live Commission Calculator (1 Column) */}
        <div className="porsche-card flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-4">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Commission Simulator</h3>
            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              Simulate monthly earnings based on closing volume and Weissach package bonuses.
            </p>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase font-mono text-slate-400">Commission Rate (%): {commissionRate}%</label>
              <input
                type="range"
                min={1.5}
                max={4.0}
                step={0.1}
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full accent-porsche-red cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 text-center">
            <p className="text-[10px] text-porsche-red uppercase font-mono font-bold">Estimated Monthly Payout</p>
            <p className="text-section-30 font-bold text-porsche-red mt-1">
              ${calculatedCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })} USD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
