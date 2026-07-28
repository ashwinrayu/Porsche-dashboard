import React, { useState } from 'react';
import { Wrench, Search, Filter, ArrowLeft, CheckCircle2, Clock, AlertTriangle, UserCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../i18n/translations';
import { TakeActionModal, type ActionItem } from '../components/TakeActionModal';

export default function ServiceAppointments() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState<ActionItem | null>(null);

  const triggerAction = (e: React.MouseEvent, item: ActionItem) => {
    e.stopPropagation();
    setSelectedActionItem(item);
    setIsActionModalOpen(true);
  };

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
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
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
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
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
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
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
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
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
      statusColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
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
      statusColor: 'bg-porsche-red/10 text-porsche-red border-porsche-red/20',
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
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      id: 's-8',
      service: 'Full PDK Transmission Fluid Change',
      model: '911 Targa 4S',
      client: 'José Vicini',
      customerId: 'jose-vicini',
      date: 'Aug 02 • 2:00 PM',
      tech: 'David Ortiz',
      bay: 'Bay 02',
      cost: '$640',
      status: 'Scheduled',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
      id: 's-9',
      service: 'Sportdesign Aero Kit Installation',
      model: 'Panamera GTS',
      client: 'Patricia Bermúdez',
      customerId: 'patricia-bermudez',
      date: 'Aug 03 • 9:30 AM',
      tech: 'Marcus Vance',
      bay: 'Bay 01',
      cost: '$4,100',
      status: 'Scheduled',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
      id: 's-10',
      service: 'OEM Wheel Alignment & Balancing',
      model: 'Cayenne Turbo GT',
      client: 'Frank Rainieri',
      customerId: 'frank-rainieri',
      date: 'Aug 04 • 11:00 AM',
      tech: 'Alex Ruiz',
      bay: 'Bay 03',
      cost: '$320',
      status: 'Confirmed',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      id: 's-11',
      service: 'PSM Sport Chassis Module Recalibration',
      model: 'Macan GTS',
      client: 'Roberto Bonetti',
      customerId: 'roberto-bonetti',
      date: 'Aug 05 • 10:00 AM',
      tech: 'Stefan Weiss',
      bay: 'Bay 05',
      cost: '$780',
      status: 'Scheduled',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
      id: 's-12',
      service: 'Taycan Sport Sound System Calibration',
      model: 'Taycan 4 Cross Turismo',
      client: 'Ana Vicini',
      customerId: 'ana-vicini',
      date: 'Aug 06 • 2:30 PM',
      tech: 'David Ortiz',
      bay: 'Bay 06',
      cost: '$190',
      status: 'Confirmed',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
  ];

  const filtered = serviceAppointments.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = item.service.toLowerCase().includes(q) ||
      item.client.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q) ||
      item.bay.toLowerCase().includes(q) ||
      item.tech.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || item.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchSearch && matchStatus;
  });

  const stats = {
    total: serviceAppointments.length,
    confirmed: serviceAppointments.filter(s => s.status === 'Confirmed').length,
    scheduled: serviceAppointments.filter(s => s.status === 'Scheduled').length,
    urgent: serviceAppointments.filter(s => s.status === 'Urgent').length,
    inProgress: serviceAppointments.filter(s => s.status === 'In Progress').length,
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <button
            onClick={() => { window.location.hash = '#/logistics'; }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-porsche-red cursor-pointer transition-colors mb-3"
          >
            <ArrowLeft size={13} /> Back to Logistics
          </button>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Wrench size={14} /> Workshop Management
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Service Appointments
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-mono">Full Workshop Queue — Porsche Santo Domingo Authorized Service Center</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 self-start sm:self-end">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          {stats.total} Appointments Loaded
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Total Queue</span>
          <span className="text-section-30 font-bold text-slate-900 dark:text-white">{stats.total}</span>
        </div>
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Confirmed</span>
          <span className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400">{stats.confirmed}</span>
        </div>
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">In Progress</span>
          <span className="text-section-30 font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</span>
        </div>
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Urgent</span>
          <span className="text-section-30 font-bold text-porsche-red">{stats.urgent}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="porsche-card flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service, client, vehicle, technician, or bay..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1D24] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-slate-400 shrink-0" />
          {(['all', 'confirmed', 'scheduled', 'urgent', 'in progress'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono capitalize border cursor-pointer transition-all ${
                statusFilter === f
                  ? 'bg-porsche-red text-white border-porsche-red'
                  : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="porsche-card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider grid grid-cols-12 gap-2">
          <span className="col-span-4">Service / Vehicle</span>
          <span className="col-span-2">Client</span>
          <span className="col-span-2">Date & Technician</span>
          <span className="col-span-1">Bay</span>
          <span className="col-span-1">Cost</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        <div className="divide-y divide-black/5 dark:divide-white/5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="px-6 py-4 grid grid-cols-12 gap-2 items-center hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group"
            >
              <div className="col-span-4 flex flex-col gap-0.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">{item.service}</span>
                <span className="text-xs font-mono text-slate-500">{item.model}</span>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border w-fit mt-0.5 ${item.statusColor}`}>{item.status}</span>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center shrink-0">
                  <UserCircle2 size={15} className="text-porsche-red" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.client}</span>
              </div>

              <div className="col-span-2 flex flex-col gap-0.5">
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{item.date}</span>
                <span className="text-[10px] text-slate-400 font-mono">Tech: {item.tech}</span>
              </div>

              <div className="col-span-1">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{item.bay}</span>
              </div>

              <div className="col-span-1">
                <span className="text-xs font-bold font-mono text-porsche-red">{item.cost}</span>
              </div>

              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => { window.location.hash = `#/customer-360/${item.customerId}`; }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 cursor-pointer transition-colors"
                >
                  Client 360
                </button>
                <button
                  onClick={(e) => triggerAction(e, { title: `Service: ${item.service}`, target: `${item.client} (${item.model})` })}
                  className="px-2.5 py-1.5 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition-colors shadow-glow-red"
                >
                  Action
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center text-slate-400 font-mono text-sm">
            No appointments found matching your criteria.
          </div>
        )}
      </div>

      <TakeActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        actionItem={selectedActionItem}
      />
    </div>
  );
}
