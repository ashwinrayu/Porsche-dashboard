import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Zap, 
  ArrowUpRight, 
  Download, 
  MapPin, 
  Sparkles, 
  Building2, 
  FileText 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { ForecastDetailsModal } from '../components/ForecastDetailsModal';

export default function Analytics() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);

  const monthlyData = [
    { month: 'Jan', revenue: 3.2, forecast: 3.1, ice: 1.8, ev: 1.4 },
    { month: 'Feb', revenue: 3.6, forecast: 3.5, ice: 2.0, ev: 1.6 },
    { month: 'Mar', revenue: 4.1, forecast: 4.0, ice: 2.1, ev: 2.0 },
    { month: 'Apr', revenue: 3.9, forecast: 4.2, ice: 1.9, ev: 2.0 },
    { month: 'May', revenue: 4.5, forecast: 4.4, ice: 2.2, ev: 2.3 },
    { month: 'Jun', revenue: 4.85, forecast: 4.7, ice: 2.3, ev: 2.55 },
    { month: 'Jul (Est)', revenue: 5.2, forecast: 5.1, ice: 2.4, ev: 2.8 },
  ];

  const regionalDealers = [
    { dealer: 'Santo Domingo Showroom', sales: '$18.5M', share: '54%', growth: '+18.4%', status: 'Flagship Peak' },
    { dealer: 'Santiago Luxury Hub', sales: '$8.2M', share: '24%', growth: '+14.2%', status: 'Nominal' },
    { dealer: 'Punta Cana Coastal Hub', sales: '$5.4M', share: '16%', growth: '+28.1%', status: 'High Growth' },
    { dealer: 'San Juan Executive Hub', sales: '$2.1M', share: '6%', growth: '+8.4%', status: 'Expanding' },
  ];

  const handleExport = (fmt: string) => {
    setExportedFormat(fmt);
    setTimeout(() => setExportedFormat(null), 2000);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <BarChart3 size={14} />
            {t.analyticsSubtitle}
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.analyticsTitle}
          </h1>
        </div>

        {/* Export Options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('PDF Executive Briefing')}
            className="px-4 py-2 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} />
            <span>{t.exportPdf}</span>
          </button>
          <button
            onClick={() => handleExport('CSV Datasets')}
            className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-porsche-red theme-transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileText size={14} />
            <span>{t.exportCsv}</span>
          </button>
        </div>
      </div>

      {exportedFormat && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center">
          Successfully generated & exported {exportedFormat}.
        </div>
      )}

      {/* 1. TOP EXECUTIVE TELEMETRY BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Gross YTD Sales Revenue
          </span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp prefix="$" end={34200000} decimals={0} />
          </div>
          <div className="flex items-center gap-1 text-small-13 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ArrowUpRight size={14} />
            <span>+18.4% vs 2025 benchmark</span>
          </div>
        </div>

        <div 
          onClick={() => setIsForecastModalOpen(true)}
          className="porsche-card flex flex-col justify-between gap-4 cursor-pointer hover:border-porsche-red/50 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Predictive Q3 Revenue Forecast
            </span>
            <button className="text-xs font-bold text-porsche-red hover:underline">View Forecast Details</button>
          </div>
          <div className="text-section-30 font-bold text-porsche-red">
            <CountUp prefix="$" end={14800000} decimals={0} />
          </div>
          <p className="text-small-13 text-slate-500">Confidence Interval: 98.4%</p>
        </div>

        <div className="porsche-card flex flex-col justify-between gap-4">
          <span className="text-small-13 text-slate-500 dark:text-slate-400 font-semibold uppercase">
            Customer Acquisition Cost
          </span>
          <div className="text-section-30 font-bold text-slate-900 dark:text-white">
            <CountUp prefix="$" end={1420} decimals={0} />
          </div>
          <p className="text-small-13 text-emerald-600 font-semibold">-14.2% optimized by Porsche AI</p>
        </div>
      </div>

      {/* 2. PREDICTIVE REVENUE & REGIONAL DEALER HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Minimal Revenue Area Chart */}
        <div 
          onClick={() => setIsForecastModalOpen(true)}
          className="porsche-card flex flex-col gap-6 cursor-pointer hover:border-porsche-red/50 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Predictive Revenue & Actuals ($M)</h3>
              <p className="text-small-13 text-slate-500">Comparison of actual vs neural forecast curve.</p>
            </div>
            <button className="text-xs font-bold text-porsche-red hover:underline">View Forecast Details</button>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="analyticsRedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D5001C" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#D5001C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#666' : '#999'} fontSize={12} />
                <YAxis stroke={theme === 'dark' ? '#666' : '#999'} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                    borderColor: '#D5001C',
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#FFF' : '#000',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D5001C" strokeWidth={3} fill="url(#analyticsRedGrad)" name="Actual Revenue" />
                <Area type="monotone" dataKey="forecast" stroke="#84CC16" strokeWidth={2} strokeDasharray="4 4" fill="none" name="AI Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Dealer Performance Heatmap */}
        <div className="porsche-card flex flex-col gap-6 justify-between">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Regional Dealer Comparison</h3>
            <p className="text-small-13 text-slate-500 mt-1">Santo Domingo vs Santiago vs Punta Cana vs San Juan</p>
          </div>

          <div className="flex flex-col gap-3">
            {regionalDealers.map((d, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-porsche-red" />
                  <div>
                    <p className="text-body-16 font-bold text-slate-900 dark:text-white">{d.dealer}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Market Share: {d.share} • {d.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{d.sales}</p>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{d.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AI GENERATED INSIGHTS CARD */}
      <div className="porsche-card flex flex-col gap-4 bg-gradient-to-br from-porsche-red/5 to-transparent border-porsche-red/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-porsche-red text-white shadow-glow-red">
            <Sparkles size={18} />
          </div>
          <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">AI-Generated Telemetry Insights</h3>
        </div>

        <p className="text-body-16 text-slate-700 dark:text-slate-300 leading-relaxed">
          "Punta Cana Coastal Hub is experiencing a +28.1% surge in Taycan Turbo GT demand driven by luxury resort fleet additions. Recommending a dedicated 800V mobile charging unit deployment."
        </p>
      </div>

      <ForecastDetailsModal
        isOpen={isForecastModalOpen}
        onClose={() => setIsForecastModalOpen(false)}
      />
    </div>
  );
}
