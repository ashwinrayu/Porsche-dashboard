import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  Building2, 
  AlertTriangle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { CountUp } from '../components/CountUp';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { PorscheLogo } from '../components/PorscheLogo';
import { TakeActionModal } from '../components/TakeActionModal';
import { ForecastDetailsModal } from '../components/ForecastDetailsModal';

export default function Executive() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);
  const [selectedSeasonModel, setSelectedSeasonModel] = useState<number>(0);

  const barData = [
    { month: 'Jan', actual: 3.2, forecast: 3.0 },
    { month: 'Feb', actual: 3.6, forecast: 3.4 },
    { month: 'Mar', actual: 4.1, forecast: 3.9 },
    { month: 'Apr', actual: 3.9, forecast: 4.1 },
    { month: 'May', actual: 4.5, forecast: 4.3 },
    { month: 'Jun', actual: 4.8, forecast: 4.6 },
    { month: 'Jul', actual: 5.2, forecast: 5.0 },
    { month: 'Aug', actual: null, forecast: 5.4 },
    { month: 'Sep', actual: null, forecast: 5.8 },
  ];

  const executiveKPIs = [
    { label: t.totalRevenue, val: '$28.4M', change: '+12.4%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Forecast (Q3)', val: '$17.7M', change: '+18.4%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: t.conversionRate, val: '68%', change: '+8.2%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: t.partsTurnover, val: '94.2%', change: '+15.1%', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'AI Accuracy', val: '96.8%', change: '+2.4%', color: 'text-emerald-600 dark:text-emerald-400' },
  ];

  const salesPredictions = [
    {
      name: '911 Carrera GTS',
      line: '911',
      color: '#D5001C',
      trendScore: 94,
      peakMonth: 'August',
      peakSeason: 'Summer Track Season',
      predictedUnits: 18,
      ytdUnits: 12,
      insight: 'GT allocation demand spikes in Q3 driven by track-day season and year-end incentives. Configure deposit pipeline now.',
      monthlyForecast: [62, 55, 68, 72, 80, 88, 94, 98, 85, 76, 70, 65],
      badge: '🔥 Trending',
      badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    },
    {
      name: 'Taycan Turbo GT',
      line: 'Taycan',
      color: '#3b82f6',
      trendScore: 91,
      peakMonth: 'September',
      peakSeason: 'Q3–Q4 EV Drive Season',
      predictedUnits: 14,
      ytdUnits: 9,
      insight: 'EV adoption accelerating. Corporate fleet orders and luxury EV incentives drive strong Q3–Q4 sales velocity.',
      monthlyForecast: [50, 52, 58, 63, 70, 76, 84, 90, 95, 88, 82, 74],
      badge: '⚡ EV Surge',
      badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    {
      name: 'Cayenne E-Hybrid',
      line: 'Cayenne',
      color: '#f59e0b',
      trendScore: 87,
      peakMonth: 'October',
      peakSeason: 'Pre-Holiday Season',
      predictedUnits: 22,
      ytdUnits: 16,
      insight: 'Family SUV demand peaks pre-holiday season. Hybrid powertrain positions strongly against luxury competitors.',
      monthlyForecast: [70, 72, 75, 78, 80, 82, 85, 87, 90, 95, 92, 88],
      badge: '📈 Peak Q4',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    },
    {
      name: 'Macan Electric Turbo',
      line: 'Macan',
      color: '#10b981',
      trendScore: 89,
      peakMonth: 'July–Aug',
      peakSeason: 'Summer Launch',
      predictedUnits: 20,
      ytdUnits: 11,
      insight: 'New model momentum strong. Summer launch promotions and Wallbox bundle incentives are accelerating buyers.',
      monthlyForecast: [45, 50, 60, 68, 74, 82, 90, 92, 85, 78, 70, 62],
      badge: '🌿 New Model',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    },
    {
      name: 'Panamera 4 E-Hybrid',
      line: 'Panamera',
      color: '#8b5cf6',
      trendScore: 82,
      peakMonth: 'November',
      peakSeason: 'Corporate Budget Q4',
      predictedUnits: 11,
      ytdUnits: 8,
      insight: 'Executive fleet and corporate orders dominate. High AOV deals close in Q4 driven by fleet budget cycles.',
      monthlyForecast: [55, 58, 60, 62, 65, 67, 70, 72, 75, 80, 88, 84],
      badge: '💼 Corporate',
      badgeColor: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIdx = new Date().getMonth();
  const currentActiveModel = salesPredictions[selectedSeasonModel];
  const maxVal = Math.max(...currentActiveModel.monthlyForecast);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
            {t.executiveSubtitle}
          </span>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.executiveTitle}
          </h1>
        </div>
      </div>

      {/* 1. TOP ROW: CAR SALES PREDICTIONS BY MODEL & SEASON (Left 7 Cols) & EXECUTIVE KPIS (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Car Sales Predictions by Model & Season (7 Cols) — REPLACED AI OPERATIONAL BRAIN */}
        <div className="lg:col-span-7 porsche-card flex flex-col justify-between gap-5 bg-gradient-to-br from-porsche-red/5 via-transparent to-transparent">
          
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-porsche-red font-bold mb-0.5">
                <Brain size={13} />
                AI Predictive Intelligence
              </div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">
                Car Sales Predictions by Model &amp; Season
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              96.8% Accuracy
            </span>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {salesPredictions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSeasonModel(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  selectedSeasonModel === idx
                    ? 'bg-porsche-red text-white border-porsche-red shadow-glow-red-sm'
                    : 'bg-slate-100 dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedSeasonModel === idx ? '#FFF' : item.color }} />
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Selected Model Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: currentActiveModel.color, boxShadow: `0 0 10px ${currentActiveModel.color}` }} />
                <div>
                  <h4 className="text-body-16 font-bold text-slate-900 dark:text-white">{currentActiveModel.name}</h4>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">{currentActiveModel.line} Line • Peak Season: {currentActiveModel.peakSeason}</p>
                </div>
                <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border ${currentActiveModel.badgeColor} ml-1`}>
                  {currentActiveModel.badge}
                </span>
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <div className="text-center">
                  <p className="text-[9px] text-slate-400 font-mono uppercase">AI Trend Score</p>
                  <p className="text-body-16 font-bold" style={{ color: currentActiveModel.color }}>{currentActiveModel.trendScore}/100</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Peak Month</p>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{currentActiveModel.peakMonth}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-slate-400 font-mono uppercase">Predicted Sales</p>
                  <p className="text-body-16 font-bold text-porsche-red">{currentActiveModel.predictedUnits} <span className="text-[9px] font-mono text-slate-400">units/mo</span></p>
                </div>
              </div>
            </div>

            {/* Monthly Seasonal Demand Heatmap Chart */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase">
                <span>Seasonal Demand Curve (Jan → Dec 2026)</span>
                <span>Peak: {currentActiveModel.peakMonth} ({currentActiveModel.predictedUnits} units)</span>
              </div>
              <div className="flex items-end gap-1.5 h-[65px] pt-2">
                {currentActiveModel.monthlyForecast.map((val, mIdx) => {
                  const heightPct = Math.round((val / maxVal) * 100);
                  const isCurrent = mIdx === currentMonthIdx;
                  return (
                    <div key={mIdx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Hover Tooltip */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                        {months[mIdx]}: {val} pts
                      </div>
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{
                          height: `${heightPct}%`,
                          backgroundColor: isCurrent
                            ? currentActiveModel.color
                            : mIdx > currentMonthIdx
                            ? `${currentActiveModel.color}55`
                            : `${currentActiveModel.color}99`,
                          boxShadow: isCurrent ? `0 0 10px ${currentActiveModel.color}` : 'none',
                        }}
                      />
                      <span className={`text-[8px] font-mono ${isCurrent ? 'font-bold text-porsche-red' : 'text-slate-400'}`}>
                        {months[mIdx]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Strategic Insight */}
            <div className="flex items-start gap-2 pt-2 border-t border-black/5 dark:border-white/5">
              <Sparkles size={13} className="mt-0.5 shrink-0 text-porsche-red" />
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {currentActiveModel.insight}
              </p>
            </div>
          </div>
        </div>

        {/* Executive KPIs Column (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Executive KPIs</span>
            <button
              onClick={() => { window.location.hash = '#/analytics'; }}
              className="text-xs font-bold text-porsche-red hover:underline cursor-pointer"
            >
              View Analytics
            </button>
          </div>

          <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
            {executiveKPIs.map((kpi, idx) => (
              <div
                key={idx}
                onClick={() => { window.location.hash = '#/analytics'; }}
                className="py-3 px-2 flex items-center justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors group"
              >
                <span className="text-small-13 text-slate-600 dark:text-slate-300 font-semibold group-hover:text-porsche-red transition-colors">{kpi.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-body-16 font-bold text-slate-900 dark:text-white">{kpi.val}</span>
                  <span className={`text-xs font-bold font-mono ${kpi.color}`}>{kpi.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: REVENUE PROJECTION & AI INSIGHTS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Projection Bar Chart (7 Cols) */}
        <div
          onClick={() => setIsForecastModalOpen(true)}
          className="lg:col-span-7 porsche-card flex flex-col gap-6 cursor-pointer hover:border-porsche-red/50 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Revenue Projection</h3>
              <p className="text-small-13 text-slate-500">USD in millions • Actual vs Forecast</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsForecastModalOpen(true); }}
              className="text-xs font-bold text-porsche-red hover:underline cursor-pointer"
            >
              View Forecast Details
            </button>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#666' : '#999'} fontSize={10} />
                <YAxis stroke={theme === 'dark' ? '#666' : '#999'} fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                    borderColor: '#D5001C',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="actual" fill="#D5001C" radius={[4, 4, 0, 0]} name="Actual" />
                <Bar dataKey="forecast" fill={theme === 'dark' ? '#333333' : '#CBD5E1'} radius={[4, 4, 0, 0]} name="Forecast" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Card & Dealership Health Score (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="porsche-card flex flex-col justify-between gap-4 bg-gradient-to-br from-porsche-red/5 to-transparent border-porsche-red/20">
            <div>
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold">AI INSIGHTS</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Today's Top Recommendation</p>
            </div>

            <div>
              <p className="text-body-16 font-bold text-slate-900 dark:text-white">Parts delay risk detected</p>
              <p className="text-small-13 text-slate-500">For Macan Electric brake system</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10">
              <div>
                <span className="text-[9px] text-slate-400 font-mono uppercase block">Potential Revenue Impact</span>
                <span className="text-card-22 font-bold text-porsche-red">$120,000</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 font-mono uppercase block">Confidence</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">92% (High)</span>
              </div>
            </div>

            <button
              onClick={() => setIsActionModalOpen(true)}
              className="w-full py-3 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer uppercase"
            >
              Take Action
            </button>
          </div>

          {/* Dealership Health Score Bar */}
          <div className="porsche-card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Dealership Health Score</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+5 vs last month</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-section-30 font-bold text-slate-900 dark:text-white">92</span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div className="bg-porsche-red h-full w-[92%]" />
            </div>
          </div>
        </div>
      </div>

      <ForecastDetailsModal
        isOpen={isForecastModalOpen}
        onClose={() => setIsForecastModalOpen(false)}
      />

      <TakeActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        actionItem={{ title: 'Parts Delay Risk: Macan Electric Brake System', target: 'Potential Revenue Impact: $120,000' }}
      />
    </div>
  );
}
