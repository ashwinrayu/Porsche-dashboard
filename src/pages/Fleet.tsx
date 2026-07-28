import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Search, 
  Filter, 
  Zap, 
  Wrench, 
  ShieldAlert, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Gauge, 
  ExternalLink,
  Sliders,
  Sparkles
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { TakeActionModal, type ActionItem } from '../components/TakeActionModal';

export default function Fleet() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState<ActionItem | null>(null);

  const triggerAction = (e: React.MouseEvent, title: string, target: string) => {
    e.stopPropagation();
    setSelectedActionItem({ title, target });
    setIsActionModalOpen(true);
  };

  const fleetData = [
    {
      id: 'f-101',
      model: '911 Carrera GTS',
      health: '98%',
      healthVal: 98,
      mileage: '12,450 mi',
      owner: 'Carlos Llenas',
      customerId: 'carlos-llenas',
      location: 'Santo Domingo East',
      vin: 'WP0ZZZ99ZTS102381',
      batteryFuel: '92% Fuel',
      lightImg: '/porsche-911-light.png',
      darkImg: '/porsche-911-dark.png',
      status: 'Optimal',
      series: '911',
      lastSync: '2 mins ago',
    },
    {
      id: 'f-102',
      model: 'Taycan Turbo GT',
      health: '96%',
      healthVal: 96,
      mileage: '8,210 mi',
      owner: 'María Vásquez',
      customerId: 'maria-vasquez',
      location: 'Santiago Hub',
      vin: 'WP0ZZZY1ZMSA91823',
      batteryFuel: '88% Battery (800V)',
      lightImg: '/porsche-taycan.png',
      darkImg: '/porsche-taycan.png',
      status: 'Optimal',
      series: 'Taycan',
      lastSync: 'Just Now',
    },
    {
      id: 'f-103',
      model: 'Cayenne E-Hybrid',
      health: '92%',
      healthVal: 92,
      mileage: '18,320 mi',
      owner: 'Juan Vich',
      customerId: 'juan-vich',
      location: 'Punta Cana Depot',
      vin: 'WP1AA2AY2PDA19231',
      batteryFuel: '95% Hybrid',
      lightImg: '/porsche-cayenne.png',
      darkImg: '/porsche-cayenne.png',
      status: 'Service Due',
      series: 'Cayenne',
      lastSync: '14 mins ago',
    },
    {
      id: 'f-104',
      model: 'Macan Electric Turbo',
      health: '95%',
      healthVal: 95,
      mileage: '5,120 mi',
      owner: 'Milo Espaillat',
      customerId: 'milo-espaillat',
      location: 'Santo Domingo Main',
      vin: 'WP1AA2A58RDA88219',
      batteryFuel: '90% EV',
      lightImg: '/porsche-macan.png',
      darkImg: '/porsche-macan.png',
      status: 'Optimal',
      series: 'Macan',
      lastSync: '5 mins ago',
    },
    {
      id: 'f-105',
      model: 'Panamera 4 E-Hybrid',
      health: '99%',
      healthVal: 99,
      mileage: '3,400 mi',
      owner: 'Eduardo Najri',
      customerId: 'eduardo-najri',
      location: 'Santo Domingo Main',
      vin: 'WP0AA2A79PSA11204',
      batteryFuel: '97% Hybrid',
      lightImg: '/porsche-panamera.png',
      darkImg: '/porsche-panamera.png',
      status: 'Optimal',
      series: 'Panamera',
      lastSync: '1 min ago',
    },
    {
      id: 'f-106',
      model: '718 Cayman GT4 RS',
      health: '88%',
      healthVal: 88,
      mileage: '14,800 mi',
      owner: 'Gustavo Tavares',
      customerId: 'gustavo-tavares',
      location: 'Santiago Hub',
      vin: 'WP0AC2A81RSA99210',
      batteryFuel: '82% Fuel',
      lightImg: '/porsche-911-light.png',
      darkImg: '/porsche-911-dark.png',
      status: 'Telemetry Alert',
      series: '718',
      lastSync: '8 mins ago',
    },
    {
      id: 'f-107',
      model: '911 GT3 RS Weissach',
      health: '97%',
      healthVal: 97,
      mileage: '4,100 mi',
      owner: 'Luis Corripio',
      customerId: 'luis-corripio',
      location: 'Santo Domingo Main',
      vin: 'WP0ZZZ99ZPS99102',
      batteryFuel: '91% High-Octane',
      lightImg: '/porsche-911-light.png',
      darkImg: '/porsche-911-dark.png',
      status: 'Optimal',
      series: '911',
      lastSync: '3 mins ago',
    },
    {
      id: 'f-108',
      model: 'Taycan 4 Cross Turismo',
      health: '94%',
      healthVal: 94,
      mileage: '11,200 mi',
      owner: 'Ana Vicini',
      customerId: 'ana-vicini',
      location: 'Punta Cana Depot',
      vin: 'WP0ZZZY1ZNSA20194',
      batteryFuel: '84% Battery',
      lightImg: '/porsche-taycan.png',
      darkImg: '/porsche-taycan.png',
      status: 'Optimal',
      series: 'Taycan',
      lastSync: '12 mins ago',
    },
    {
      id: 'f-109',
      model: 'Macan GTS',
      health: '91%',
      healthVal: 91,
      mileage: '22,100 mi',
      owner: 'Roberto Bonetti',
      customerId: 'roberto-bonetti',
      location: 'Santiago Hub',
      vin: 'WP1AA2A54PDA12903',
      batteryFuel: '79% Fuel',
      lightImg: '/porsche-macan.png',
      darkImg: '/porsche-macan.png',
      status: 'Service Due',
      series: 'Macan',
      lastSync: '20 mins ago',
    },
    {
      id: 'f-110',
      model: 'Cayenne Turbo GT',
      health: '95%',
      healthVal: 95,
      mileage: '9,800 mi',
      owner: 'Frank Rainieri',
      customerId: 'frank-rainieri',
      location: 'Punta Cana Depot',
      vin: 'WP1AA2AY5RDA90124',
      batteryFuel: '89% Fuel',
      lightImg: '/porsche-cayenne.png',
      darkImg: '/porsche-cayenne.png',
      status: 'Optimal',
      series: 'Cayenne',
      lastSync: '4 mins ago',
    },
    {
      id: 'f-111',
      model: '911 Targa 4S',
      health: '96%',
      healthVal: 96,
      mileage: '6,400 mi',
      owner: 'José Vicini',
      customerId: 'jose-vicini',
      location: 'Santo Domingo East',
      vin: 'WP0ZZZ99ZNS44019',
      batteryFuel: '94% Fuel',
      lightImg: '/porsche-911-light.png',
      darkImg: '/porsche-911-dark.png',
      status: 'Optimal',
      series: '911',
      lastSync: '6 mins ago',
    },
    {
      id: 'f-112',
      model: 'Panamera GTS',
      health: '93%',
      healthVal: 93,
      mileage: '15,900 mi',
      owner: 'Patricia Bermúdez',
      customerId: 'patricia-bermudez',
      location: 'Santo Domingo Main',
      vin: 'WP0AA2A74MSA91023',
      batteryFuel: '86% Fuel',
      lightImg: '/porsche-panamera.png',
      darkImg: '/porsche-panamera.png',
      status: 'Optimal',
      series: 'Panamera',
      lastSync: '10 mins ago',
    },
  ];

  const filteredFleet = fleetData.filter((car) => {
    const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || car.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesModel = modelFilter === 'all' || car.series === modelFilter;
    return matchesSearch && matchesStatus && matchesModel;
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Car size={14} />
            Porsche Telemetry & Fleet Management
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Connected Fleet Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            32 Telemetry Nodes Online
          </span>
        </div>
      </div>

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="porsche-card flex flex-col justify-between gap-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Total Active Fleet</span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">32 Vehicles</div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">100% GPS Operational</span>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Fleet Health Index</span>
          <div className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400">96.4%</div>
          <span className="text-xs font-mono text-slate-400 font-bold">+1.2% vs last month</span>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Total Fleet Mileage</span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">482,100 mi</div>
          <span className="text-xs font-mono text-slate-400 font-bold">Average 15,065 mi/vehicle</span>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Maintenance Queue</span>
          <div className="text-section-30 font-bold text-porsche-red">3 Vehicles</div>
          <span className="text-xs font-mono text-porsche-red font-bold">Priority Workshop Slots Locked</span>
        </div>
      </div>

      {/* Filters & Search Controls Bar */}
      <div className="porsche-card flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, owner, VIN, or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1D24] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red"
          />
        </div>

        {/* Model Series Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', '911', 'Taycan', 'Cayenne', 'Macan', 'Panamera', '718'].map((m) => (
            <button
              key={m}
              onClick={() => setModelFilter(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono uppercase cursor-pointer transition-all ${
                modelFilter === m
                  ? 'bg-porsche-red text-white shadow-glow-red'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m === 'all' ? 'All Models' : m}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          {(['all', 'optimal', 'service', 'alert'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono capitalize border cursor-pointer transition-all ${
                statusFilter === s
                  ? 'bg-porsche-red text-white border-porsche-red'
                  : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Vehicles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFleet.map((car) => (
          <div
            key={car.id}
            className="porsche-card flex flex-col gap-4 hover:border-porsche-red/50 hover:shadow-xl transition-all group relative"
          >
            <div className="w-full h-[150px] rounded-2xl overflow-hidden shadow-md relative bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
              <VehicleImage
                lightSrc={car.lightImg}
                darkSrc={car.darkImg}
                alt={car.model}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono bg-black/70 backdrop-blur-md text-white border border-white/20">
                {car.location}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">
                  {car.model}
                </h3>
                <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full border ${
                  car.healthVal >= 95
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : car.healthVal >= 90
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    : 'bg-porsche-red/10 text-porsche-red border-porsche-red/20'
                }`}>
                  {car.health}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Owner: <strong className="text-slate-800 dark:text-slate-200">{car.owner}</strong>
              </p>
              <p className="text-[10px] text-slate-400 font-mono">VIN: {car.vin}</p>
            </div>

            <div className="pt-2 border-t border-black/5 dark:border-white/5 grid grid-cols-2 gap-2 text-xs font-mono text-slate-500">
              <div>
                <span className="text-[9px] text-slate-400 block">Mileage</span>
                <span className="font-bold text-slate-900 dark:text-white">{car.mileage}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block">Battery / Fuel</span>
                <span className="font-bold text-slate-900 dark:text-white">{car.batteryFuel}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => { window.location.hash = `#/customer-360/${car.customerId}`; }}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 cursor-pointer transition-colors text-center"
              >
                Customer 360
              </button>
              <button
                type="button"
                onClick={(e) => triggerAction(e, `Fleet Telemetry: ${car.model}`, `Owner: ${car.owner} (${car.vin})`)}
                className="flex-1 py-2 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition-colors text-center shadow-glow-red"
              >
                Take Action
              </button>
            </div>
          </div>
        ))}
      </div>

      <TakeActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        actionItem={selectedActionItem}
      />
    </div>
  );
}
