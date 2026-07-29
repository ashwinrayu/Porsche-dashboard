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
  MapPin,
  Scan,
  UploadCloud,
  ArrowRight,
  Car,
  Search,
  Filter,
  X,
  User,
  UserCheck,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Brain,
  Gauge,
  Droplets,
  Wind,
  Battery,
  CircleDot,
  Thermometer
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { TakeActionModal, type ActionItem } from '../components/TakeActionModal';

export default function Logistics() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  // Action Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState<ActionItem | null>(null);

  // Dedicated View All Modals State
  const [isAllFleetOpen, setIsAllFleetOpen] = useState(false);
  const [isAllServiceOpen, setIsAllServiceOpen] = useState(false);
  const [isAllTradeInOpen, setIsAllTradeInOpen] = useState(false);

  // Search & Filter States
  const [fleetSearch, setFleetSearch] = useState('');
  const [fleetFilter, setFleetFilter] = useState('all');

  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  const [tradeInSearch, setTradeInSearch] = useState('');
  const [tradeInFilter, setTradeInFilter] = useState('all');

  // AI Dropdown state
  const [expandedAiCard, setExpandedAiCard] = useState<string | null>(null);

  // Trigger Action Modal helper
  const triggerAction = (e: React.MouseEvent, item: ActionItem) => {
    e.stopPropagation();
    setSelectedActionItem(item);
    setIsActionModalOpen(true);
  };

  const toggleAiCard = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedAiCard(prev => prev === id ? null : id);
  };

  // AI Insights per car
  const aiInsightsMap: Record<string, { urgency: 'critical' | 'warning' | 'info'; label: string; detail: string; costEst: string; icon: React.ReactNode; dueIn: string }[]> = {
    'c-101': [
      { urgency: 'info', label: 'PCCB Brake Pads', detail: 'Front pads at 38% wear — schedule within 3,000 mi. Rear pads nominal at 71%.', costEst: '$1,240', icon: <CircleDot size={13} />, dueIn: '~3,000 mi' },
      { urgency: 'info', label: 'Engine Air Filter', detail: 'Particulate saturation at 64%. Replacement advised at next service interval.', costEst: '$185', icon: <Wind size={13} />, dueIn: '~2,500 mi' },
      { urgency: 'info', label: 'Tire Tread Depth', detail: 'All four Pirelli P Zero tires within spec (6.2 mm avg). Monitor rear axle.', costEst: '—', icon: <Gauge size={13} />, dueIn: 'Next check' },
    ],
    'c-102': [
      { urgency: 'warning', label: 'Battery Cooling Pump', detail: 'AI detects elevated coolant pump load (+18% above baseline). Inspect before next long run.', costEst: '$920', icon: <Battery size={13} />, dueIn: 'Within 14 days' },
      { urgency: 'info', label: 'Brake Fluid Hygroscopicity', detail: 'Moisture content at 1.9% — borderline. Flush recommended at next annual service.', costEst: '$310', icon: <Droplets size={13} />, dueIn: '~1,500 mi' },
      { urgency: 'info', label: 'Cabin Air Filter', detail: 'HEPA cabin filter at 55% capacity. No immediate action required.', costEst: '$145', icon: <Wind size={13} />, dueIn: '~4,000 mi' },
    ],
    'c-103': [
      { urgency: 'critical', label: 'PASM Air Suspension', detail: 'Rear-right air strut shows 7 PSI pressure loss vs nominal. Immediate inspection required.', costEst: '$2,800', icon: <ShieldAlert size={13} />, dueIn: 'URGENT' },
      { urgency: 'warning', label: 'Hybrid Battery SOH', detail: 'State-of-health degraded to 91% — below 95% threshold. Schedule battery diagnostic.', costEst: '$1,100', icon: <Battery size={13} />, dueIn: 'Within 7 days' },
      { urgency: 'info', label: 'Front Brake Discs', detail: 'Rotor thickness at 24.1 mm vs 22 mm min. Serviceable for ~8,000 mi more.', costEst: '$1,950', icon: <CircleDot size={13} />, dueIn: '~8,000 mi' },
    ],
    'c-104': [
      { urgency: 'info', label: 'EV Drive Unit Oil', detail: 'Synthetic drive unit oil due for change at 15,000 mi. Currently 5,120 mi.', costEst: '$480', icon: <Droplets size={13} />, dueIn: '~9,880 mi' },
      { urgency: 'info', label: 'Regenerative Brake Pads', detail: 'Pads in excellent condition (82% remaining). AI predicts no action needed for 18 months.', costEst: '—', icon: <CircleDot size={13} />, dueIn: '~12,000 mi' },
      { urgency: 'info', label: 'Thermal Management System', detail: 'All coolant loops nominal. Battery inlet temperature steady at 23°C.', costEst: '—', icon: <Thermometer size={13} />, dueIn: 'Monitoring' },
    ],
  };

  const aiConfidenceMap: Record<string, number> = {
    'c-101': 96, 'c-102': 91, 'c-103': 98, 'c-104': 94,
  };

  // Comprehensive Datasets
  const fleetData = [
    {
      id: 'c-101',
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
    },
    {
      id: 'c-102',
      model: 'Taycan Turbo GT',
      health: '96%',
      healthVal: 96,
      mileage: '8,210 mi',
      owner: 'María Vásquez',
      customerId: 'maria-vasquez',
      location: 'Santiago Hub',
      vin: 'WP0ZZZY1ZMSA91823',
      batteryFuel: '88% Battery (800V)',
      lightImg: '/porsche-taycan-light.png',
      darkImg: '/porsche-taycan.png',
      status: 'Optimal',
    },
    {
      id: 'c-103',
      model: 'Cayenne E-Hybrid',
      health: '92%',
      healthVal: 92,
      mileage: '18,320 mi',
      owner: 'Juan Vich',
      customerId: 'juan-vich',
      location: 'Punta Cana Depot',
      vin: 'WP1AA2AY2PDA19231',
      batteryFuel: '95% Hybrid',
      lightImg: '/porsche-cayenne-light.png',
      darkImg: '/porsche-cayenne.png',
      status: 'Service Due',
    },
    {
      id: 'c-104',
      model: 'Macan Electric',
      health: '95%',
      healthVal: 95,
      mileage: '5,120 mi',
      owner: 'Milo Espaillat',
      customerId: 'milo-espaillat',
      location: 'Santo Domingo Main',
      vin: 'WP1AA2A58RDA88219',
      batteryFuel: '90% EV',
      lightImg: '/porsche-macan-light.png',
      darkImg: '/porsche-macan.png',
      status: 'Optimal',
    },
    {
      id: 'c-105',
      model: 'Panamera 4 E-Hybrid',
      health: '99%',
      healthVal: 99,
      mileage: '3,400 mi',
      owner: 'Eduardo Najri',
      customerId: 'eduardo-najri',
      location: 'Santo Domingo Main',
      vin: 'WP0AA2A79PSA11204',
      batteryFuel: '97% Hybrid',
      lightImg: '/porsche-panamera-light.png',
      darkImg: '/porsche-panamera.png',
      status: 'Optimal',
    },
    {
      id: 'c-106',
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
    },
    {
      id: 'c-107',
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
    },
    {
      id: 'c-108',
      model: 'Taycan 4 Cross Turismo',
      health: '94%',
      healthVal: 94,
      mileage: '11,200 mi',
      owner: 'Ana Vicini',
      customerId: 'ana-vicini',
      location: 'Punta Cana Depot',
      vin: 'WP0ZZZY1ZNSA20194',
      batteryFuel: '84% Battery',
      lightImg: '/porsche-taycan-light.png',
      darkImg: '/porsche-taycan.png',
      status: 'Optimal',
    },
    {
      id: 'c-109',
      model: 'Macan GTS',
      health: '91%',
      healthVal: 91,
      mileage: '22,100 mi',
      owner: 'Roberto Bonetti',
      customerId: 'roberto-bonetti',
      location: 'Santiago Hub',
      vin: 'WP1AA2A54PDA12903',
      batteryFuel: '79% Fuel',
      lightImg: '/porsche-macan-light.png',
      darkImg: '/porsche-macan.png',
      status: 'Service Due',
    },
    {
      id: 'c-110',
      model: 'Cayenne Turbo GT',
      health: '95%',
      healthVal: 95,
      mileage: '9,800 mi',
      owner: 'Frank Rainieri',
      customerId: 'frank-rainieri',
      location: 'Punta Cana Depot',
      vin: 'WP1AA2AY5RDA90124',
      batteryFuel: '89% Fuel',
      lightImg: '/porsche-cayenne-light.png',
      darkImg: '/porsche-cayenne.png',
      status: 'Optimal',
    },
  ];

  const serviceAppointments = [
    {
      id: 's-1',
      service: 'Brake Replacement (PCCB Rotors)',
      model: '911 Carrera GTS',
      client: 'Carlos Llenas',
      customerId: 'carlos-llenas',
      date: 'Today • 2:30 PM',
      tech: 'Marcus Vance',
      bay: 'Bay 04',
      cost: '$2,450',
      status: 'Confirmed',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      id: 's-2',
      service: 'Cabin Filter & HEPA Air Flush',
      model: 'Macan Turbo S',
      client: 'Milo Espaillat',
      customerId: 'milo-espaillat',
      date: 'Tomorrow • 10:00 AM',
      tech: 'Alex Ruiz',
      bay: 'Bay 02',
      cost: '$480',
      status: 'Scheduled',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 's-3',
      service: 'PASM Air Suspension Calibration',
      model: 'Cayenne E-Hybrid',
      client: 'Juan Vich',
      customerId: 'juan-vich',
      date: 'July 30 • 11:30 AM',
      tech: 'David Ortiz',
      bay: 'Bay 01',
      cost: '$1,200',
      status: 'Scheduled',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 's-4',
      service: '800V High-Voltage Battery Diagnostic',
      model: 'Taycan Turbo GT',
      client: 'María Vásquez',
      customerId: 'maria-vasquez',
      date: 'July 30 • 3:00 PM',
      tech: 'Stefan Weiss',
      bay: 'Bay 05',
      cost: '$850',
      status: 'Confirmed',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      id: 's-5',
      service: 'PDK 8-Speed Gearbox Service',
      model: 'Panamera 4 E-Hybrid',
      client: 'Eduardo Najri',
      customerId: 'eduardo-najri',
      date: 'July 31 • 9:00 AM',
      tech: 'Marcus Vance',
      bay: 'Bay 03',
      cost: '$1,890',
      status: 'In Progress',
      statusColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      id: 's-6',
      service: 'Carbon Ceramic Rotor Inspection',
      model: '718 Cayman GT4 RS',
      client: 'Gustavo Tavares',
      customerId: 'gustavo-tavares',
      date: 'Aug 01 • 1:00 PM',
      tech: 'Stefan Weiss',
      bay: 'Bay 06',
      cost: '$3,200',
      status: 'Urgent',
      statusColor: 'bg-porsche-red/10 text-porsche-red border-porsche-red/20'
    },
    {
      id: 's-7',
      service: 'ECU Telemetry Firmware Update',
      model: '911 GT3 RS',
      client: 'Luis Corripio',
      customerId: 'luis-corripio',
      date: 'Aug 02 • 10:30 AM',
      tech: 'Alex Ruiz',
      bay: 'Bay 04',
      cost: '$350',
      status: 'Confirmed',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
  ];

  const tradeInOpportunities = [
    {
      id: 't-1',
      client: 'Carlos Llenas',
      customerId: 'carlos-llenas',
      vehicle: '2021 911 Carrera S',
      appraisal: '$118,000',
      upgradeTarget: '911 Carrera GTS',
      expiry: '1 month remaining',
      tag: 'High Value',
      tagColor: 'bg-porsche-red text-white'
    },
    {
      id: 't-2',
      client: 'Milo Espaillat',
      customerId: 'milo-espaillat',
      vehicle: '2020 Macan Turbo',
      appraisal: '$62,000',
      upgradeTarget: 'Macan Electric',
      expiry: '2 weeks remaining',
      tag: 'Renewal',
      tagColor: 'bg-blue-600 text-white'
    },
    {
      id: 't-3',
      client: 'Juan Vich',
      customerId: 'juan-vich',
      vehicle: '2018 Cayenne E-Hybrid',
      appraisal: '$54,000',
      upgradeTarget: 'Cayenne Turbo GT',
      expiry: '3 months remaining',
      tag: 'Medium',
      tagColor: 'bg-amber-500 text-white'
    },
    {
      id: 't-4',
      client: 'María Vásquez',
      customerId: 'maria-vasquez',
      vehicle: '2022 Taycan 4S',
      appraisal: '$85,000',
      upgradeTarget: 'Taycan Turbo GT',
      expiry: '1 week remaining',
      tag: 'High Value',
      tagColor: 'bg-porsche-red text-white'
    },
    {
      id: 't-5',
      client: 'Gustavo Tavares',
      customerId: 'gustavo-tavares',
      vehicle: '2019 718 Cayman S',
      appraisal: '$48,000',
      upgradeTarget: '718 Cayman GT4 RS',
      expiry: 'Immediate',
      tag: 'Upgrade Eligible',
      tagColor: 'bg-emerald-600 text-white'
    },
    {
      id: 't-6',
      client: 'Eduardo Najri',
      customerId: 'eduardo-najri',
      vehicle: '2021 Panamera GTS',
      appraisal: '$92,000',
      upgradeTarget: 'Panamera Turbo E-Hybrid',
      expiry: '1 month remaining',
      tag: 'Renewal',
      tagColor: 'bg-blue-600 text-white'
    },
  ];

  // Filters for Modals
  const filteredFleet = fleetData.filter((car) => {
    const matchesSearch = car.model.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      car.owner.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      car.vin.toLowerCase().includes(fleetSearch.toLowerCase());
    const matchesFilter = fleetFilter === 'all' || car.status.toLowerCase().includes(fleetFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const filteredService = serviceAppointments.filter((item) => {
    const matchesSearch = item.service.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      item.client.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      item.model.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesFilter = serviceFilter === 'all' || item.status.toLowerCase().includes(serviceFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const filteredTradeIn = tradeInOpportunities.filter((opp) => {
    const matchesSearch = opp.client.toLowerCase().includes(tradeInSearch.toLowerCase()) ||
      opp.vehicle.toLowerCase().includes(tradeInSearch.toLowerCase()) ||
      opp.upgradeTarget.toLowerCase().includes(tradeInSearch.toLowerCase());
    const matchesFilter = tradeInFilter === 'all' || opp.tag.toLowerCase().includes(tradeInFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* 1. TOP ROW: PARTS INVENTORY HEATMAP & AI PARTS RECOGNITION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parts Inventory Heatmap */}
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{t.partsHeatmap}</h3>
              <p className="text-small-13 text-slate-500">{t.logisticsSubtitle}</p>
            </div>
            <button
              onClick={() => { window.location.hash = '#/reports'; }}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-porsche-red cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <span>View Full Inventory Report</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Map Representation Container */}
          <div className="w-full h-[180px] rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-studio-grid opacity-40 pointer-events-none" />
            <div className="flex items-center gap-8 z-10">
              <div className="flex flex-col items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-porsche-red animate-ping" />
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white">Santo Domingo</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white">Santiago</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white">Punta Cana</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-porsche-red" /> High</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low</span>
          </div>
        </div>

        {/* AI Parts Recognition */}
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">AI Parts Recognition</h3>
              <p className="text-small-13 text-slate-500">Upload or scan part for AI identification</p>
            </div>
            <Scan size={18} className="text-porsche-red" />
          </div>

          {/* Drag & Drop Upload Zone */}
          <div className="w-full h-[140px] rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-porsche-red theme-transition">
            <UploadCloud size={28} className="text-porsche-red mb-1" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">Drag & drop part image</p>
            <p className="text-[10px] text-slate-400 font-mono">or click to upload</p>
          </div>

          {/* Identified OEM Part Details Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 grid grid-cols-3 gap-2 text-xs font-mono">
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-mono block">OEM Part</span>
              <span className="font-bold text-porsche-red">911 007 001 01 (Brake Disc)</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-mono block">Availability</span>
              <span className="font-bold text-slate-900 dark:text-white">12 units (3 warehouses)</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 uppercase font-mono block">ETA</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: CONNECTED FLEET HEALTH */}
      <div className="porsche-card flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{t.connectedFleet}</h3>
            <p className="text-small-13 text-slate-500">32 Porsche Telemetry Nodes Online</p>
          </div>
          <button
            onClick={() => { window.location.hash = '#/fleet'; }}
            className="px-4 py-2 rounded-xl bg-porsche-red/10 border border-porsche-red/20 text-xs font-bold text-porsche-red hover:bg-porsche-red hover:text-white cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>View All Fleet</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetData.slice(0, 4).map((car) => {
            const aiItems = aiInsightsMap[car.id] || [];
            const aiConfidence = aiConfidenceMap[car.id] || 90;
            const isExpanded = expandedAiCard === car.id;
            const hasCritical = aiItems.some(i => i.urgency === 'critical');
            const hasWarning = aiItems.some(i => i.urgency === 'warning');

            return (
              <div
                key={car.id}
                className="rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col overflow-hidden hover:border-porsche-red/40 hover:shadow-lg transition-all group"
              >
                {/* Card Top — clickable to Customer 360 */}
                <div
                  onClick={() => { window.location.hash = `#/customer-360/${car.customerId}`; }}
                  className="p-4 flex flex-col gap-3 cursor-pointer"
                >
                  <div className="w-full h-[140px] rounded-xl overflow-hidden shadow-sm relative bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center">
                    <VehicleImage
                      lightSrc={car.lightImg}
                      darkSrc={car.darkImg}
                      alt={car.model}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-body-16 font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors leading-tight">
                        {car.model}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <User size={12} className="text-porsche-red shrink-0" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-sans">
                          {car.owner}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => triggerAction(e, { title: `Fleet Telemetry Action: ${car.model}`, target: `Owner: ${car.owner} (${car.vin})` })}
                      className="px-2.5 py-1 rounded-lg bg-porsche-red text-white text-[10px] font-bold hover:bg-red-700 transition-colors shadow-glow-red shrink-0 cursor-pointer"
                    >
                      Take Action
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-black/5 dark:border-white/5">
                    <div>
                      <span className="text-[9px] text-slate-400 block">Health</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{car.health}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block">Mileage</span>
                      <span className="font-bold text-slate-900 dark:text-white">{car.mileage}</span>
                    </div>
                  </div>
                </div>

                {/* AI Service Intervention Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => toggleAiCard(e, car.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 border-t text-[11px] font-bold transition-all cursor-pointer ${isExpanded
                      ? 'bg-porsche-red/10 border-porsche-red/30 text-porsche-red'
                      : hasCritical
                        ? 'bg-red-500/10 border-red-500/20 text-red-500 dark:text-red-400'
                        : hasWarning
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                          : 'bg-emerald-500/5 border-black/5 dark:border-white/5 text-emerald-600 dark:text-emerald-400'
                    }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Brain size={12} />
                    AI Service Intel
                    {hasCritical && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold">CRITICAL</span>}
                    {!hasCritical && hasWarning && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold">WARN</span>}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* AI Expandable Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key={`ai-${car.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pt-3 pb-4 flex flex-col gap-3 bg-slate-900/[0.03] dark:bg-black/20">
                        {/* AI Confidence Badge */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono uppercase text-slate-400 tracking-widest">Porsche AI · Telemetry Analysis</span>
                          <span className="text-[10px] font-bold font-mono text-porsche-red">{aiConfidence}% confidence</span>
                        </div>

                        {/* Service Items */}
                        <div className="flex flex-col gap-2">
                          {aiItems.map((item, idx) => (
                            <div
                              key={idx}
                              className={`rounded-xl p-3 border flex flex-col gap-1.5 ${item.urgency === 'critical'
                                  ? 'bg-red-500/10 border-red-500/20'
                                  : item.urgency === 'warning'
                                    ? 'bg-amber-500/10 border-amber-500/20'
                                    : 'bg-slate-100 dark:bg-white/5 border-black/5 dark:border-white/5'
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className={`flex items-center gap-1.5 text-[11px] font-bold ${item.urgency === 'critical' ? 'text-red-500' :
                                    item.urgency === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                                      'text-slate-900 dark:text-white'
                                  }`}>
                                  {item.icon}
                                  {item.label}
                                </div>
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${item.urgency === 'critical' ? 'bg-red-500 text-white' :
                                    item.urgency === 'warning' ? 'bg-amber-500 text-white' :
                                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  }`}>
                                  {item.urgency === 'critical' ? 'URGENT' : item.urgency === 'warning' ? 'SOON' : 'OK'}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.detail}</p>
                              <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5">
                                <span className="text-[9px] font-mono text-slate-400">Due: {item.dueIn}</span>
                                <span className="text-[10px] font-bold font-mono text-porsche-red">{item.costEst}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Book Service CTA */}
                        <button
                          type="button"
                          onClick={(e) => triggerAction(e, { title: `Schedule AI-Advised Service: ${car.model}`, target: `Owner: ${car.owner} · ${aiItems.length} item(s) flagged` })}
                          className="w-full mt-1 py-2 rounded-xl bg-porsche-red text-white text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-red-700 transition-colors shadow-glow-red cursor-pointer"
                        >
                          <Wrench size={11} />
                          Schedule AI Service
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM ROW: SERVICE APPOINTMENTS & TRADE-IN OPPORTUNITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Appointments */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{t.scheduledServiceAppointments}</h3>
            <button
              onClick={() => { window.location.hash = '#/service-appointments'; }}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-porsche-red hover:border-porsche-red cursor-pointer flex items-center gap-1 transition-all"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {serviceAppointments.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => { window.location.hash = `#/customer-360/${item.customerId}`; }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-porsche-red/50 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">{item.service}</p>
                  <p className="text-small-13 text-slate-500">{item.model} • {item.client}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase font-mono px-3 py-1 rounded-full border ${item.statusColor}`}>
                    {item.status}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => triggerAction(e, { title: `Service Action: ${item.service}`, target: `${item.client} (${item.model})` })}
                    className="px-2.5 py-1 rounded-lg bg-porsche-red text-white text-[10px] font-bold hover:bg-red-700 transition-colors shadow-glow-red"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-in & Renewal Opportunities */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Trade-in & Renewal Opportunities</h3>
            <button
              onClick={() => { window.location.hash = '#/trade-in-opportunities'; }}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-porsche-red hover:border-porsche-red cursor-pointer flex items-center gap-1 transition-all"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {tradeInOpportunities.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                onClick={() => { window.location.hash = `#/customer-360/${opp.customerId}`; }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-porsche-red/50 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">{opp.client}</p>
                  <p className="text-small-13 text-slate-500">{opp.vehicle} ➔ <strong className="text-slate-700 dark:text-slate-300">{opp.upgradeTarget}</strong></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase font-mono px-3 py-1 rounded-full ${opp.tagColor}`}>
                    {opp.tag}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => triggerAction(e, { title: `Trade-in Proposal: ${opp.client}`, target: `Trade ${opp.vehicle} for ${opp.upgradeTarget} (${opp.appraisal})` })}
                    className="px-2.5 py-1 rounded-lg bg-porsche-red text-white text-[10px] font-bold hover:bg-red-700 transition-colors shadow-glow-red"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL 1: VIEW ALL FLEET FULL OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAllFleetOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-5xl bg-white dark:bg-[#121417] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red">
                    <Car size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Connected Fleet Management</h2>
                    <p className="text-xs text-slate-500 font-mono">32 Active Porsche Vehicle Telemetry Streams</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAllFleetOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Filters Bar */}
              <div className="px-6 py-3 border-b border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-100/50 dark:bg-white/[0.01]">
                <div className="relative flex-1 min-w-[240px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    placeholder="Search by model, owner, or VIN..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#1A1D24] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-slate-400" />
                  {(['all', 'optimal', 'service', 'alert'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFleetFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono capitalize border cursor-pointer transition-all ${fleetFilter === f
                          ? 'bg-porsche-red text-white border-porsche-red'
                          : 'bg-white dark:bg-[#1A1D24] border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Grid */}
              <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFleet.map((car) => (
                  <div
                    key={car.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-3 hover:border-porsche-red/50 transition-all"
                  >
                    <div className="w-full h-[140px] rounded-xl overflow-hidden shadow-sm relative bg-slate-900/10 dark:bg-white/5 flex items-center justify-center">
                      <VehicleImage
                        lightSrc={car.lightImg}
                        darkSrc={car.darkImg}
                        alt={car.model}
                        className="w-full h-full object-contain p-2"
                      />
                      <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {car.location}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-body-16 font-bold text-slate-900 dark:text-white">{car.model}</h4>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">{car.health}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Owner: <strong className="text-slate-700 dark:text-slate-300">{car.owner}</strong></p>
                      <p className="text-[10px] text-slate-400 font-mono">VIN: {car.vin}</p>
                    </div>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">{car.mileage}</span>
                      <span className="text-slate-500">{car.batteryFuel}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setIsAllFleetOpen(false);
                          window.location.hash = `#/customer-360/${car.customerId}`;
                        }}
                        className="flex-1 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors text-center"
                      >
                        Profile
                      </button>
                      <button
                        onClick={(e) => triggerAction(e, { title: `Fleet Telemetry: ${car.model}`, target: `Owner: ${car.owner} (${car.vin})` })}
                        className="flex-1 py-1.5 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition-colors text-center shadow-glow-red"
                      >
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. MODAL 2: VIEW ALL SERVICE APPOINTMENTS OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAllServiceOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#121417] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Scheduled Workshop Appointments</h2>
                    <p className="text-xs text-slate-500 font-mono">Porsche Authorized Workshop Queue</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAllServiceOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Filters */}
              <div className="px-6 py-3 border-b border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-100/50 dark:bg-white/[0.01]">
                <div className="relative flex-1 min-w-[240px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    placeholder="Search by service, client, or vehicle..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#1A1D24] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-slate-400" />
                  {(['all', 'confirmed', 'scheduled', 'urgent'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setServiceFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono capitalize border cursor-pointer transition-all ${serviceFilter === f
                          ? 'bg-porsche-red text-white border-porsche-red'
                          : 'bg-white dark:bg-[#1A1D24] border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service List */}
              <div className="p-6 overflow-y-auto flex flex-col gap-3">
                {filteredService.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-porsche-red/50 transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.service}</h4>
                        <span className={`text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full border ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        Vehicle: <strong className="text-slate-700 dark:text-slate-300">{item.model}</strong> • Client: <strong className="text-slate-700 dark:text-slate-300">{item.client}</strong>
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono mt-1">
                        <span>{item.date}</span>
                        <span>{item.bay}</span>
                        <span>Tech: {item.tech}</span>
                        <span className="text-porsche-red font-bold">{item.cost}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsAllServiceOpen(false);
                          window.location.hash = `#/customer-360/${item.customerId}`;
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors"
                      >
                        Client 360
                      </button>
                      <button
                        onClick={(e) => triggerAction(e, { title: `Service Booking: ${item.service}`, target: `${item.client} (${item.model})` })}
                        className="px-4 py-2 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition-colors shadow-glow-red"
                      >
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. MODAL 3: VIEW ALL TRADE-IN OPPORTUNITIES OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAllTradeInOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#121417] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Trade-in & Renewal Matrix</h2>
                    <p className="text-xs text-slate-500 font-mono">High Revenue Upgrade Opportunities</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAllTradeInOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Filters */}
              <div className="px-6 py-3 border-b border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-100/50 dark:bg-white/[0.01]">
                <div className="relative flex-1 min-w-[240px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={tradeInSearch}
                    onChange={(e) => setTradeInSearch(e.target.value)}
                    placeholder="Search by client or vehicle..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#1A1D24] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-slate-400" />
                  {(['all', 'high value', 'renewal', 'upgrade'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTradeInFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono capitalize border cursor-pointer transition-all ${tradeInFilter === f
                          ? 'bg-porsche-red text-white border-porsche-red'
                          : 'bg-white dark:bg-[#1A1D24] border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trade In Opportunities List */}
              <div className="p-6 overflow-y-auto flex flex-col gap-3">
                {filteredTradeIn.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-porsche-red/50 transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{opp.client}</h4>
                        <span className={`text-[10px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full ${opp.tagColor}`}>
                          {opp.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        Current: <strong className="text-slate-700 dark:text-slate-300">{opp.vehicle}</strong> ➔ Target: <strong className="text-porsche-red">{opp.upgradeTarget}</strong>
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono mt-1">
                        <span>Appraisal Value: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{opp.appraisal}</strong></span>
                        <span>Timeline: {opp.expiry}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsAllTradeInOpen(false);
                          window.location.hash = `#/customer-360/${opp.customerId}`;
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors"
                      >
                        Client Profile
                      </button>
                      <button
                        onClick={(e) => triggerAction(e, { title: `Trade-in Proposal: ${opp.client}`, target: `Trade ${opp.vehicle} for ${opp.upgradeTarget}` })}
                        className="px-4 py-2 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition-colors shadow-glow-red"
                      >
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Universal Action Execution Modal */}
      <TakeActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        actionItem={selectedActionItem}
      />
    </div>
  );
}
