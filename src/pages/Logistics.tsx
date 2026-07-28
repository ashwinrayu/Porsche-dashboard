import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Zap, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Layers, 
  Activity, 
  MapPin, 
  Scan, 
  Battery, 
  Disc, 
  Gauge, 
  Cpu, 
  RefreshCw, 
  ArrowUpRight 
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';

interface ConnectedVehicle {
  vin: string;
  model: string;
  client: string;
  mileage: string;
  healthScore: number;
  batterySoc: string;
  brakeWear: string;
  tyresCondition: string;
  warrantyStatus: string;
  riskScore: number;
  lightImg: string;
  darkImg: string;
  tradeInEquity: string;
  predictiveAlert?: string;
}

const FLEET_VEHICLES: ConnectedVehicle[] = [
  {
    vin: 'VIN-911-8902',
    model: 'Porsche 911 GT3 RS',
    client: 'Luis Corripio',
    mileage: '4,200 km',
    healthScore: 98,
    batterySoc: '12.8V Lithium Starter',
    brakeWear: '12% Wear (PCCB Brakes)',
    tyresCondition: '7.8 mm (Michelin Pilot Sport Cup 2 R)',
    warrantyStatus: 'Porsche Approved (2029)',
    riskScore: 4,
    lightImg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tradeInEquity: '$290,000 USD',
  },
  {
    vin: 'VIN-TYC-4410',
    model: 'Porsche Taycan Turbo GT',
    client: 'María Vásquez',
    mileage: '12,800 km',
    healthScore: 94,
    batterySoc: '92% SOC (800V Ultra-Fast)',
    brakeWear: '18% Wear',
    tyresCondition: '6.5 mm (Pirelli P Zero Elect)',
    warrantyStatus: '8-Year EV Battery Warranty (2032)',
    riskScore: 12,
    lightImg: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
    darkImg: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    tradeInEquity: '$185,000 USD',
    predictiveAlert: 'Recommending 15,000 km HV coolant flush in 14 days.',
  },
  {
    vin: 'VIN-718-1192',
    model: 'Porsche 718 Cayman GT4 RS',
    client: 'Gustavo Tavares',
    mileage: '18,400 km',
    healthScore: 84,
    batterySoc: '12.4V AGM',
    brakeWear: '78% Wear — Urgent Service',
    tyresCondition: '3.2 mm (Low Tread Warning)',
    warrantyStatus: 'Factory Warranty (2027)',
    riskScore: 78,
    lightImg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    darkImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    tradeInEquity: '$142,000 USD',
    predictiveAlert: 'Brake pad wear threshold reached (78%). Service appointment suggested.',
  },
  {
    vin: 'VIN-PAN-9021',
    model: 'Porsche Panamera 4 E-Hybrid',
    client: 'Alejandro Santelises',
    mileage: '32,100 km',
    healthScore: 92,
    batterySoc: '86% High Voltage Hybrid SOC',
    brakeWear: '24% Wear',
    tyresCondition: '5.9 mm (Good Condition)',
    warrantyStatus: 'Porsche Approved (2028)',
    riskScore: 16,
    lightImg: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tradeInEquity: '$98,000 USD',
  },
];

export default function Logistics() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'all' | 'high-risk' | 'trade-in'>('all');
  const [scannedPart, setScannedPart] = useState<string | null>(null);

  const filteredVehicles = FLEET_VEHICLES.filter((v) => {
    if (selectedTab === 'high-risk') return v.riskScore > 40;
    if (selectedTab === 'trade-in') return true;
    return true;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Cpu size={14} className="animate-pulse" />
            Mission Control Operations
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Logistics & Fleet Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Showroom 800V Grid Nominal
          </span>
        </div>
      </div>

      {/* 1. TOP TELEMETRY: Warehouse Heatmap, Fleet Tracking & Parts Recognition AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Warehouse Heatmap (1 Column) */}
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Warehouse Heatmap</h3>
            <Layers size={18} className="text-porsche-red" />
          </div>

          <div className="flex flex-col gap-3">
            {[
              { location: 'Caucedo Port Storage', capacity: '78% Capacity', temp: '24°C Climate Regulated', color: 'bg-emerald-500' },
              { location: 'Santo Domingo Showroom', capacity: '92% Capacity', temp: '21°C Studio Lighting', color: 'bg-amber-500' },
              { location: 'Santiago Auxiliary Hub', capacity: '45% Capacity', temp: '23°C Storage', color: 'bg-blue-500' },
            ].map((wh) => (
              <div key={wh.location} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${wh.color} animate-pulse`} />
                  <div>
                    <p className="text-body-16 font-bold text-slate-900 dark:text-white">{wh.location}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{wh.temp}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-porsche-red">{wh.capacity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Tracking GPS Feed (1 Column) */}
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Live Fleet GPS Tracking</h3>
            <MapPin size={18} className="text-blue-500" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Carrier #04 (14 Porsche Vehicles)</span>
              <span className="text-[10px] text-emerald-600 font-mono font-bold">ETA: 42 Mins</span>
            </div>
            <p className="text-small-13 text-slate-500">Route: Highway 3 East $\rightarrow$ Santo Domingo Showroom</p>
            <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-porsche-red h-full w-[78%] animate-pulse" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2">
            <span>Coordinates: 18.4861° N, 69.9312° W</span>
            <span className="text-porsche-red font-bold">Signal: Strong</span>
          </div>
        </div>

        {/* Parts Recognition AI (1 Column) */}
        <div className="porsche-card flex flex-col justify-between gap-4 bg-gradient-to-br from-porsche-red/5 to-transparent">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Parts Recognition AI</h3>
            <Scan size={18} className="text-porsche-red" />
          </div>

          <p className="text-small-13 text-slate-500">
            Computer vision neural scanner identifies genuine Porsche component codes & stock levels.
          </p>

          <button
            onClick={() => {
              setScannedPart('HV Charging Socket Plug (Part #9J1-915-684-A)');
              setTimeout(() => setScannedPart(null), 3000);
            }}
            className="w-full py-3 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Scan size={14} />
            <span>{scannedPart ? 'Scanning AI Vision...' : 'Scan Component Barcode'}</span>
          </button>

          {scannedPart && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-fade-in">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{scannedPart}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Verified OEM Genuine • Stock: 2 Units</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. CENTER: Filter Tabs & Interactive Connected Vehicle Health Cards */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-section-30 font-bold text-slate-900 dark:text-white">
              Connected Vehicle Health & Live Diagnostics
            </h2>
            <p className="text-small-13 text-slate-500">Real-time CAN-bus telemetry, battery SOC, brake wear & predictive maintenance.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
                selectedTab === 'all'
                  ? 'bg-porsche-red text-white shadow-glow-red'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              All Vehicles ({FLEET_VEHICLES.length})
            </button>
            <button
              onClick={() => setSelectedTab('high-risk')}
              className={`px-4 py-2 rounded-full text-xs font-bold theme-transition cursor-pointer ${
                selectedTab === 'high-risk'
                  ? 'bg-porsche-red text-white shadow-glow-red'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              Predictive Alerts
            </button>
          </div>
        </div>

        {/* 4 Interactive Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVehicles.map((v) => (
            <div key={v.vin} className="porsche-card flex flex-col justify-between gap-6 hover:border-porsche-red/40 theme-transition">
              {/* Header: Photo + VIN + Client */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-[220px] h-[140px] rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 shrink-0">
                  <VehicleImage
                    lightSrc={v.lightImg}
                    darkSrc={v.darkImg}
                    alt={v.model}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-porsche-red font-mono font-bold uppercase">{v.vin}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      v.riskScore > 40 ? 'bg-porsche-red text-white animate-pulse' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      Risk Score: {v.riskScore} / 100
                    </span>
                  </div>
                  <h3 className="text-card-22 font-bold text-slate-900 dark:text-white leading-snug">{v.model}</h3>
                  <p className="text-small-13 text-slate-500">Client: {v.client} • Mileage: {v.mileage}</p>
                </div>
              </div>

              {/* Vehicle Health Metrics Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
                  <Battery size={14} className="text-amber-500 mx-auto mb-1" />
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Battery / SOC</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{v.batterySoc}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
                  <Disc size={14} className="text-porsche-red mx-auto mb-1" />
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Brake Wear</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{v.brakeWear}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
                  <Gauge size={14} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Tyres Tread</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{v.tyresCondition}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
                  <ShieldAlert size={14} className="text-emerald-500 mx-auto mb-1" />
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Warranty</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{v.warrantyStatus}</p>
                </div>
              </div>

              {/* Predictive Maintenance & Trade-in Opportunity Banner */}
              <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10 text-xs">
                {v.predictiveAlert ? (
                  <span className="text-porsche-red font-semibold flex items-center gap-1.5">
                    <AlertTriangle size={13} />
                    {v.predictiveAlert}
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    All Systems Nominal
                  </span>
                )}
                <span className="font-mono text-slate-400">Trade-In Value: {v.tradeInEquity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
