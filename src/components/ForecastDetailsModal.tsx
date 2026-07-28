import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Zap, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  Building2, 
  CheckCircle2,
  Calendar,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { TakeActionModal, type ActionItem } from './TakeActionModal';

interface ForecastDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForecastDetailsModal: React.FC<ForecastDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [scenario, setScenario] = useState<'baseline' | 'optimistic' | 'conservative'>('baseline');
  const [exportedMsg, setExportedMsg] = useState<string | null>(null);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [actionItem, setActionItem] = useState<ActionItem | null>(null);

  if (!isOpen) return null;

  // Monthly dataset with scenario multipliers
  const multiplier = scenario === 'optimistic' ? 1.12 : scenario === 'conservative' ? 0.94 : 1.0;

  const monthlyForecast = [
    { month: 'Jan', actual: 3.2, forecast: Number((3.0 * multiplier).toFixed(1)), variance: '+0.2M', status: 'Exceeded', driver: '911 GTS Deliveries' },
    { month: 'Feb', actual: 3.6, forecast: Number((3.4 * multiplier).toFixed(1)), variance: '+0.2M', status: 'Exceeded', driver: 'Taycan Turbo GT Launch' },
    { month: 'Mar', actual: 4.1, forecast: Number((3.9 * multiplier).toFixed(1)), variance: '+0.2M', status: 'Exceeded', driver: 'Cayenne E-Hybrid Fleet' },
    { month: 'Apr', actual: 3.9, forecast: Number((4.1 * multiplier).toFixed(1)), variance: '-0.2M', status: 'Under', driver: 'Customs Clearance Delay' },
    { month: 'May', actual: 4.5, forecast: Number((4.3 * multiplier).toFixed(1)), variance: '+0.2M', status: 'Exceeded', driver: 'Macan EV Initial Batch' },
    { month: 'Jun', actual: 4.8, forecast: Number((4.6 * multiplier).toFixed(1)), variance: '+0.2M', status: 'Exceeded', driver: 'Q2 Executive Fleet Push' },
    { month: 'Jul', actual: 5.2, forecast: Number((5.0 * multiplier).toFixed(1)), variance: '+0.2M', status: 'Exceeded', driver: 'Punta Cana Resort Orders' },
    { month: 'Aug', actual: null, forecast: Number((5.4 * multiplier).toFixed(1)), variance: 'Target', status: 'Projected', driver: '718 Cayman GT4 RS Allocations' },
    { month: 'Sep', actual: null, forecast: Number((5.8 * multiplier).toFixed(1)), variance: 'Target', status: 'Projected', driver: '911 GT3 RS Weissach Deliveries' },
    { month: 'Oct', actual: null, forecast: Number((6.1 * multiplier).toFixed(1)), variance: 'Target', status: 'Projected', driver: 'Q4 Pre-Lease Renewals' },
    { month: 'Nov', actual: null, forecast: Number((6.5 * multiplier).toFixed(1)), variance: 'Target', status: 'Projected', driver: 'Panamera Turbo E-Hybrid' },
    { month: 'Dec', actual: null, forecast: Number((7.0 * multiplier).toFixed(1)), variance: 'Target', status: 'Projected', driver: 'Year-End Luxury Portfolio Rush' },
  ];

  const modelLines = [
    { name: 'Porsche 911 Series', ytdActual: '$14.2M', fullYearForecast: '$22.8M', target: '$21.0M', growth: '+18.4%', mix: '38.2%' },
    { name: 'Taycan EV Series', ytdActual: '$8.4M', fullYearForecast: '$15.2M', target: '$13.5M', growth: '+32.1%', mix: '25.5%' },
    { name: 'Cayenne Series', ytdActual: '$7.8M', fullYearForecast: '$12.9M', target: '$12.0M', growth: '+12.6%', mix: '21.6%' },
    { name: 'Macan Electric & ICE', ytdActual: '$5.2M', fullYearForecast: '$9.4M', target: '$8.5M', growth: '+24.0%', mix: '15.8%' },
    { name: 'Panamera & 718 Series', ytdActual: '$2.8M', fullYearForecast: '$4.5M', target: '$4.2M', growth: '+6.8%', mix: '7.5%' },
  ];

  const handleExport = (type: string) => {
    setExportedMsg(`Exported Full Revenue Forecast as ${type}`);
    setTimeout(() => setExportedMsg(null), 2500);
  };

  const handleAction = (title: string, target: string) => {
    setActionItem({ title, target });
    setIsActionOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-6xl bg-white dark:bg-[#121417] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Full Revenue Forecast & Financial Projection Details</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    AI Accuracy 98.2%
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">Porsche Dominican Republic Operations • FY 2026 Projections</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleExport('PDF Report')}
                className="px-3.5 py-1.5 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Download size={14} />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => handleExport('CSV Dataset')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-porsche-red flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <FileText size={14} />
                <span>Export CSV</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {exportedMsg && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold py-2 text-center">
              {exportedMsg}
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex flex-col gap-6">

            {/* Top Scenario Controls & KPI Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Card 1: Annual Forecast Target */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">2026 Full-Year Projection</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${(64.8 * multiplier).toFixed(1)}M
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ArrowUpRight size={14} /> +14.8%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1">Target: $58.0M (111.7% achieved)</span>
              </div>

              {/* Card 2: YTD Revenue Delivered */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">YTD Revenue (Jan - Jul)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-porsche-red">$29.3M</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ArrowUpRight size={14} /> +12.4% YoY
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1">7 Months Delivered • 102.4% vs Plan</span>
              </div>

              {/* Card 3: Highest Driver Segment */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Top Growth Driver</span>
                <div className="mt-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">911 GTS & Taycan GT</span>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+38.2% EV/E-Performance</p>
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1">Weissach Packages high margin</span>
              </div>

              {/* Card 4: Scenario Selection Selector */}
              <div className="p-4 rounded-2xl bg-porsche-red/5 border border-porsche-red/20 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-wider flex items-center gap-1">
                    <Sliders size={12} /> AI Scenario Model
                  </span>
                  <span className="w-2 h-2 rounded-full bg-porsche-red animate-ping" />
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  {[
                    { id: 'baseline', label: 'Baseline Plan', badge: 'Standard' },
                    { id: 'optimistic', label: 'Optimistic (+12%)', badge: 'High Growth' },
                    { id: 'conservative', label: 'Conservative (-6%)', badge: 'Risk Shield' },
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setScenario(sc.id as any)}
                      className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold font-mono text-left flex items-center justify-between transition-all cursor-pointer ${
                        scenario === sc.id
                          ? 'bg-porsche-red text-white shadow-glow-red'
                          : 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/20'
                      }`}
                    >
                      <span>{sc.label}</span>
                      <span className="text-[9px] uppercase opacity-80">{sc.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart: Bar Chart comparison */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Actual Revenue vs. AI Forecast Projection ($M)</h3>
                  <p className="text-xs text-slate-500 font-mono">Red bars indicate actual delivered revenue; Gray/Hatched bars indicate model forecast</p>
                </div>
                <span className="text-xs font-mono text-porsche-red font-bold uppercase">FY 2026 Timeline</span>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" stroke="#888" fontSize={11} />
                    <YAxis stroke="#888" fontSize={11} unit="M" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#14161B',
                        borderColor: '#D5001C',
                        borderRadius: '12px',
                        color: '#FFF',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="actual" name="Actual Revenue ($M)" fill="#D5001C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="forecast" name="AI Forecast ($M)" fill="#4B5563" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Breakdown Section: Model Line Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Table 1: Model Line Breakdown (7 Cols) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Model Line Revenue Forecast Contribution</h3>
                  <span className="text-xs font-mono text-slate-400">5 Porsche Model Families</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/10 dark:border-white/10 text-[10px] font-mono text-slate-400 uppercase">
                        <th className="py-2.5 px-3">Model Line</th>
                        <th className="py-2.5 px-3">YTD Actual</th>
                        <th className="py-2.5 px-3">FY Forecast</th>
                        <th className="py-2.5 px-3">Target</th>
                        <th className="py-2.5 px-3">YoY Growth</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs font-mono">
                      {modelLines.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-white/[0.02]">
                          <td className="py-3 px-3 font-bold text-slate-900 dark:text-white font-sans">{row.name}</td>
                          <td className="py-3 px-3 text-porsche-red font-bold">{row.ytdActual}</td>
                          <td className="py-3 px-3 text-slate-900 dark:text-white font-bold">{row.fullYearForecast}</td>
                          <td className="py-3 px-3 text-slate-400">{row.target}</td>
                          <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{row.growth}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleAction(`Forecast Optimization: ${row.name}`, `Target: ${row.target} | Forecast: ${row.fullYearForecast}`)}
                              className="px-2.5 py-1 rounded-lg bg-porsche-red text-white text-[10px] font-bold hover:bg-red-700 transition-colors shadow-glow-red"
                            >
                              Action
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monthly Drivers Table (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Key Drivers & Risk Factors</h3>
                  <span className="text-xs font-mono text-slate-400">12 Month Audit</span>
                </div>

                <div className="overflow-y-auto max-h-[260px] flex flex-col gap-2 pr-1">
                  {monthlyForecast.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold w-8 text-porsche-red">{m.month}</span>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{m.driver}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Forecast: ${m.forecast}M {m.actual !== null ? `• Delivered: $${m.actual}M` : ''}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${
                        m.status === 'Exceeded'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : m.status === 'Under'
                          ? 'bg-porsche-red/10 text-porsche-red border-porsche-red/20'
                          : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
            <span className="text-[10px] text-slate-400 font-mono">
              AI Forecast Engine v4.2 • Updated Daily via Real-time CRM & Logistics Telemetry
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer transition-colors"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>

      <TakeActionModal
        isOpen={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        actionItem={actionItem}
      />
    </AnimatePresence>
  );
};
