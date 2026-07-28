import React from 'react';
import { 
  Wrench, 
  Zap, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Layers 
} from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { VehicleImage } from '../components/VehicleImage';

export default function Logistics() {
  return (
    <div className="flex flex-col gap-10">
      {/* 48px Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Showroom & Service Engineering
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Logistics & After-Sales
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <Zap size={13} />
            Showroom 800V Charger Nominal
          </span>
        </div>
      </div>

      {/* Workshop & Charging Telemetry Grid (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Active Service Bays
            </span>
            <Wrench size={18} className="text-porsche-red" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp end={8} suffix=" / 10 Active" />
          </div>
          <p className="text-small-13 text-slate-500">80% Capacity Utilized</p>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Taycan 800V High Voltage Grid
            </span>
            <Zap size={18} className="text-amber-500" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp end={320} suffix=" kW Peak" />
          </div>
          <p className="text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
            Ultra-Fast DC Charging Active
          </p>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              PDI Transit Pipeline
            </span>
            <Truck size={18} className="text-blue-500" />
          </div>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp end={14} suffix=" Vehicles" />
          </div>
          <p className="text-small-13 text-slate-500">En route from Caucedo Port</p>
        </div>
      </div>

      {/* Workshop Bay Status & Taycan Vehicle Dual Image Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workshop Bays (2 Columns) */}
        <div className="lg:col-span-2 porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">
              Workshop Bay Live Telemetry
            </h3>
            <span className="text-xs text-slate-400 font-mono">Porsche Certified Technicians</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { bay: 'Bay 01', vehicle: 'Taycan Cross Turismo', Tech: 'R. Fernández', service: 'High Voltage Battery Check', status: 'In Progress', color: 'text-amber-500' },
              { bay: 'Bay 02', vehicle: '911 GT3 RS', Tech: 'M. Gomez', service: 'Carbon Ceramic Brake Bedding', status: 'Ready for QC', color: 'text-emerald-500' },
              { bay: 'Bay 03', vehicle: 'Cayenne Turbo E-Hybrid', Tech: 'A. Ramirez', service: 'Suspension Calibration', status: 'In Progress', color: 'text-amber-500' },
              { bay: 'Bay 04', vehicle: '718 Cayman GT4', Tech: 'J. Santos', service: 'Track Alignment Setup', status: 'Complete', color: 'text-blue-500' },
            ].map((item) => (
              <div
                key={item.bay}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-2 hover:border-porsche-red/30 theme-transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-porsche-red">{item.bay}</span>
                  <span className={`text-[10px] font-bold uppercase ${item.color}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-body-16 font-bold text-slate-900 dark:text-white">{item.vehicle}</p>
                <div className="flex items-center justify-between text-small-13 text-slate-500 mt-1 pt-2 border-t border-black/5 dark:border-white/5">
                  <span>Tech: {item.Tech}</span>
                  <span className="font-semibold">{item.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Taycan Image (White Taycan in Light, Black Taycan in Dark) */}
        <div className="porsche-card flex flex-col gap-6 justify-between">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Taycan E-Performance Station</h3>
            <p className="text-small-13 text-slate-500 dark:text-slate-400 mt-1">
              Santo Domingo flagship 800V charging station monitor.
            </p>
          </div>

          <div className="w-full h-[200px] rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
            <VehicleImage
              lightSrc="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80"
              darkSrc="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
              alt="Porsche Taycan"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-mono font-bold">Active Charger Output</p>
            <p className="text-card-22 font-bold text-amber-600 dark:text-amber-400 mt-0.5">320 kW Peak • 800V</p>
          </div>
        </div>
      </div>
    </div>
  );
}
