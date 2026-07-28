import React, { useState } from 'react';
import {
  FileText,
  Download,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  MapPin,
  Filter,
  ArrowUpDown,
  Wrench,
  Zap,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';

type RiskLevel = 'Critical' | 'Low Stock' | 'Adequate' | 'Overstocked';
type Location = 'Santo Domingo' | 'Santiago' | 'Punta Cana';

interface PartRow {
  partNo: string;
  description: string;
  category: string;
  models: string[];
  sdStock: number;
  stgStock: number;
  pcaStock: number;
  reorderPoint: number;
  unitCost: number;
  risk: RiskLevel;
  eta: string;
}

const PARTS: PartRow[] = [
  { partNo: '911-007-001-01', description: 'PCCB Front Brake Disc Set', category: 'Brakes', models: ['911 GT3', '911 GTS', 'Cayenne Turbo'], sdStock: 2, stgStock: 1, pcaStock: 0, reorderPoint: 4, unitCost: 3800, risk: 'Critical', eta: '24h' },
  { partNo: '9Y0-615-301-C', description: 'Cayenne Rear Brake Caliper Assembly', category: 'Brakes', models: ['Cayenne', 'Cayenne E-Hybrid', 'Cayenne Turbo GT'], sdStock: 4, stgStock: 2, pcaStock: 3, reorderPoint: 6, unitCost: 1420, risk: 'Low Stock', eta: '48h' },
  { partNo: 'J1-251-103-92', description: 'PDK Transmission Fluid (6L Kit)', category: 'Fluids', models: ['911', '718', 'Panamera', 'Cayenne'], sdStock: 18, stgStock: 9, pcaStock: 6, reorderPoint: 12, unitCost: 185, risk: 'Adequate', eta: '—' },
  { partNo: '9Y0-407-257-A', description: 'Taycan Front Air Spring Module', category: 'Suspension', models: ['Taycan', 'Taycan Cross Turismo'], sdStock: 1, stgStock: 0, pcaStock: 0, reorderPoint: 3, unitCost: 2950, risk: 'Critical', eta: '72h' },
  { partNo: '9Y3-698-451-F', description: 'Macan Electric Brake Pad Kit (Front)', category: 'Brakes', models: ['Macan Electric', 'Macan GTS'], sdStock: 12, stgStock: 6, pcaStock: 4, reorderPoint: 8, unitCost: 340, risk: 'Adequate', eta: '—' },
  { partNo: '992-343-045-XX', description: '911 GT3 RS Rear Wing Carbon Fiber', category: 'Body', models: ['911 GT3 RS'], sdStock: 0, stgStock: 0, pcaStock: 0, reorderPoint: 1, unitCost: 8200, risk: 'Critical', eta: 'On Order' },
  { partNo: '9Y0-121-070-B', description: 'Cayenne E-Hybrid Coolant Pump', category: 'Hybrid', models: ['Cayenne E-Hybrid', 'Panamera E-Hybrid'], sdStock: 3, stgStock: 1, pcaStock: 2, reorderPoint: 4, unitCost: 920, risk: 'Low Stock', eta: '36h' },
  { partNo: 'J1-803-421-00', description: 'Taycan 800V HV Battery Seal Kit', category: 'EV', models: ['Taycan', 'Taycan Turbo GT', 'Taycan Turbo S'], sdStock: 5, stgStock: 2, pcaStock: 1, reorderPoint: 4, unitCost: 1750, risk: 'Adequate', eta: '—' },
  { partNo: '992-045-921-A', description: '911 Carrera GTS Sport Exhaust Valve', category: 'Exhaust', models: ['911 Carrera GTS', '911 S/T'], sdStock: 6, stgStock: 2, pcaStock: 0, reorderPoint: 4, unitCost: 620, risk: 'Adequate', eta: '—' },
  { partNo: '9Y0-505-435-H', description: 'Panamera Rear Axle Steering Actuator', category: 'Steering', models: ['Panamera 4', 'Panamera GTS', 'Panamera Turbo'], sdStock: 2, stgStock: 1, pcaStock: 1, reorderPoint: 3, unitCost: 3200, risk: 'Low Stock', eta: '48h' },
  { partNo: '982-422-803-F', description: '718 Boxster GTS Clutch Kit', category: 'Drivetrain', models: ['718 Boxster GTS', '718 Cayman GT4'], sdStock: 7, stgStock: 3, pcaStock: 2, reorderPoint: 5, unitCost: 1840, risk: 'Adequate', eta: '—' },
  { partNo: '9Y0-807-103-GRV', description: 'Cayenne Turbo GT Front Bumper Trim', category: 'Body', models: ['Cayenne Turbo GT'], sdStock: 14, stgStock: 6, pcaStock: 8, reorderPoint: 6, unitCost: 2100, risk: 'Overstocked', eta: '—' },
  { partNo: 'J1-953-502-A', description: 'Taycan OBC 22kW On-Board Charger Unit', category: 'EV', models: ['Taycan', 'Taycan Cross Turismo'], sdStock: 2, stgStock: 0, pcaStock: 1, reorderPoint: 3, unitCost: 4800, risk: 'Critical', eta: '5 days' },
  { partNo: '9Y3-513-031-E', description: 'Macan Electric Front Damper Strut', category: 'Suspension', models: ['Macan Electric Turbo'], sdStock: 8, stgStock: 4, pcaStock: 3, reorderPoint: 6, unitCost: 1120, risk: 'Adequate', eta: '—' },
  { partNo: '992-109-087-B', description: '911 Turbo S Timing Chain Tensioner', category: 'Engine', models: ['911 Turbo S', '911 GT2 RS'], sdStock: 3, stgStock: 1, pcaStock: 0, reorderPoint: 4, unitCost: 680, risk: 'Low Stock', eta: '36h' },
];

const riskConfig: Record<RiskLevel, { color: string; bg: string; icon: React.ReactNode }> = {
  Critical:    { color: 'text-red-600 dark:text-red-400',    bg: 'bg-red-500/10 border-red-500/20',      icon: <AlertTriangle size={11} /> },
  'Low Stock': { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20',  icon: <Clock size={11} /> },
  Adequate:    { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 size={11} /> },
  Overstocked: { color: 'text-blue-500',                      bg: 'bg-blue-500/10 border-blue-500/20',    icon: <ArrowUpDown size={11} /> },
};

const RISK_FILTERS: ('All' | RiskLevel)[] = ['All', 'Critical', 'Low Stock', 'Adequate', 'Overstocked'];
const CATEGORY_FILTERS = ['All', 'Brakes', 'EV', 'Suspension', 'Hybrid', 'Fluids', 'Exhaust', 'Body', 'Engine', 'Drivetrain', 'Steering'];

export default function Reports() {
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'reports'>('inventory');

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 1800);
  };

  const filtered = PARTS.filter((p) => {
    if (riskFilter !== 'All' && p.risk !== riskFilter) return false;
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    return true;
  });

  const totalStock = PARTS.reduce((s, p) => s + p.sdStock + p.stgStock + p.pcaStock, 0);
  const criticalCount = PARTS.filter((p) => p.risk === 'Critical').length;
  const lowCount = PARTS.filter((p) => p.risk === 'Low Stock').length;
  const totalValue = PARTS.reduce((s, p) => s + (p.sdStock + p.stgStock + p.pcaStock) * p.unitCost, 0);

  const reportsList = [
    { id: 'rep-01', title: 'Q3 Executive Performance & Revenue Digest', date: 'July 2026', size: '4.2 MB', type: 'PDF' },
    { id: 'rep-02', title: 'Taycan 800V Infrastructure & Service Report', date: 'July 2026', size: '2.8 MB', type: 'PDF' },
    { id: 'rep-03', title: 'Santo Domingo VIP Customer Retention & CSAT', date: 'June 2026', size: '3.1 MB', type: 'PDF' },
    { id: 'rep-04', title: 'Automated AI Allocation Routing Analysis', date: 'June 2026', size: '1.9 MB', type: 'PDF' },
    { id: 'rep-05', title: 'Full Parts Inventory Snapshot — All Locations', date: 'July 2026', size: '3.8 MB', type: 'PDF' },
    { id: 'rep-06', title: 'EV Fleet Charging Infrastructure Audit', date: 'July 2026', size: '2.2 MB', type: 'PDF' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Mission Control — Parts & Logistics
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Inventory & Reports
          </h1>
        </div>
        <button
          onClick={() => handleDownload('rep-05')}
          className="px-5 py-2.5 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center gap-2 cursor-pointer"
        >
          {downloadingId === 'rep-05' ? <><Sparkles size={14} className="animate-spin" /><span>Generating...</span></> : <><Download size={14} /><span>Export Full Inventory PDF</span></>}
        </button>
      </div>

      {/* Tab Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-white/5 w-fit border border-black/5 dark:border-white/5">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'inventory' ? 'bg-porsche-red text-white shadow-glow-red' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
        >
          Parts Inventory
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'reports' ? 'bg-porsche-red text-white shadow-glow-red' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
        >
          Reports & Export
        </button>
      </div>

      {activeTab === 'inventory' && (
        <>
          {/* KPI Summary Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Parts in Stock', value: totalStock.toLocaleString(), color: 'text-slate-900 dark:text-white', sub: 'Across 3 locations' },
              { label: 'Critical Shortages', value: criticalCount.toString(), color: 'text-red-500', sub: 'Immediate action needed' },
              { label: 'Low Stock Alerts', value: lowCount.toString(), color: 'text-amber-500', sub: 'Reorder within 48h' },
              { label: 'Total Inventory Value', value: `$${(totalValue / 1000).toFixed(0)}K`, color: 'text-porsche-red', sub: 'USD across all warehouses' },
            ].map((kpi) => (
              <div key={kpi.label} className="porsche-card flex flex-col gap-1">
                <p className="text-[10px] text-slate-400 font-mono uppercase">{kpi.label}</p>
                <p className={`text-section-30 font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-[10px] text-slate-500">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Location Stock Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { loc: 'Santo Domingo', flag: '🔴', risk: 'High Risk', parts: PARTS.reduce((s, p) => s + p.sdStock, 0), color: 'border-red-500/40 bg-red-500/5' },
              { loc: 'Santiago', flag: '🟡', risk: 'Medium Risk', parts: PARTS.reduce((s, p) => s + p.stgStock, 0), color: 'border-amber-500/40 bg-amber-500/5' },
              { loc: 'Punta Cana', flag: '🟢', risk: 'Low Risk', parts: PARTS.reduce((s, p) => s + p.pcaStock, 0), color: 'border-emerald-500/40 bg-emerald-500/5' },
            ].map((loc) => (
              <div key={loc.loc} className={`porsche-card flex items-center justify-between border-l-4 ${loc.color}`}>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-porsche-red shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{loc.loc}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{loc.risk}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-section-30 font-bold text-slate-900 dark:text-white">{loc.parts}</p>
                  <p className="text-[10px] text-slate-400 font-mono">units</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Risk:</span>
              {RISK_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setRiskFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase font-mono cursor-pointer transition-all ${
                    riskFilter === f ? 'bg-porsche-red text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Category:</span>
              {CATEGORY_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setCategoryFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                    categoryFilter === f ? 'bg-porsche-red text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="ml-auto text-[10px] font-mono text-slate-400">{filtered.length} parts</span>
          </div>

          {/* Full Inventory Table */}
          <div className="porsche-card overflow-x-auto p-0">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase font-mono text-slate-400 bg-slate-50 dark:bg-white/5">
                  <th className="py-3.5 px-4">Part No.</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">SD Stock</th>
                  <th className="py-3.5 px-4 text-center">STG Stock</th>
                  <th className="py-3.5 px-4 text-center">PCA Stock</th>
                  <th className="py-3.5 px-4 text-center">Reorder Pt.</th>
                  <th className="py-3.5 px-4 text-right">Unit Cost</th>
                  <th className="py-3.5 px-4 text-center">ETA</th>
                  <th className="py-3.5 px-4 text-center">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {filtered.map((part) => {
                  const risk = riskConfig[part.risk];
                  const totalPart = part.sdStock + part.stgStock + part.pcaStock;
                  const isCritical = part.risk === 'Critical';
                  return (
                    <tr key={part.partNo} className={`hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${isCritical ? 'bg-red-500/5' : ''}`}>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[10px]">{part.partNo}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900 dark:text-white">{part.description}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{part.models.join(' · ')}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                          {part.category}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-center font-bold ${part.sdStock <= part.reorderPoint / 2 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                        {part.sdStock}
                      </td>
                      <td className={`py-3 px-4 text-center font-bold ${part.stgStock <= part.reorderPoint / 3 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
                        {part.stgStock}
                      </td>
                      <td className={`py-3 px-4 text-center font-bold ${part.pcaStock <= part.reorderPoint / 4 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
                        {part.pcaStock}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-400 font-mono">{part.reorderPoint}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">${part.unitCost.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold font-mono ${part.eta === '—' ? 'text-emerald-500' : 'text-amber-500'}`}>{part.eta}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase font-mono px-2.5 py-1 rounded-full border ${risk.bg} ${risk.color}`}>
                          {risk.icon}
                          {part.risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'reports' && (
        <div className="porsche-card flex flex-col gap-4">
          <h3 className="text-card-22 font-bold text-slate-900 dark:text-white mb-2">
            Generated Executive Briefings
          </h3>
          {reportsList.map((report) => (
            <div
              key={report.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-porsche-red/30 theme-transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-porsche-red/10 text-porsche-red shrink-0">
                  <FileText size={22} />
                </div>
                <div>
                  <h4 className="text-body-16 font-bold text-slate-900 dark:text-white">{report.title}</h4>
                  <p className="text-small-13 text-slate-500 dark:text-slate-400">
                    {report.date} • {report.size} • Format: {report.type}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(report.id)}
                className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-porsche-red dark:hover:bg-porsche-red dark:hover:text-white theme-transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {downloadingId === report.id ? (
                  <><Sparkles size={14} className="animate-spin text-porsche-red" /><span>Generating PDF...</span></>
                ) : (
                  <><Download size={14} /><span>Download Briefing</span></>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
