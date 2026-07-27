import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wrench, 
  Brain, 
  Search, 
  Cpu, 
  ChevronRight, 
  Layers, 
  Milestone,
  ArrowUpRight
} from 'lucide-react';
import { api } from '../services/api';

export default function Overview() {
  const [metrics, setMetrics] = useState({
    activeLeadsToday: 24,
    logisticsTurnover: 94.2,
    unassignedDeals: 395
  });

  useEffect(() => {
    api.overview.getMetrics().then(setMetrics).catch(console.error);

    const interval = setInterval(() => {
      api.overview.getMetrics().then(setMetrics).catch(console.error);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pillars = [
    {
      title: 'Sales & Conversion',
      icon: <TrendingUp className="text-porsche-red" size={24} />,
      desc: 'AI Lead qualification and predictive configuration routing.',
      metricLabel: "Today's Active Leads",
      metricValue: `${metrics.activeLeadsToday}`,
      link: '/sales',
      color: 'border-porsche-red/10'
    },
    {
      title: 'Logistics & After-Sales',
      icon: <Wrench className="text-porsche-green" size={24} />,
      desc: 'Connected-fleet telematics tracking and predictive parts supply chain.',
      metricLabel: 'Parts Turnover Rate',
      metricValue: `${metrics.logisticsTurnover}%`,
      link: '/logistics',
      color: 'border-porsche-green/20'
    },
    {
      title: 'Executive Intelligence',
      icon: <Brain className="text-slate-800" size={24} />,
      desc: 'Deal classification tracking, idle warning queues, and operational flow.',
      metricLabel: 'Unassigned Deals',
      metricValue: `${metrics.unassignedDeals}`,
      link: '/executive',
      color: 'border-slate-200'
    }
  ];

  const kpis = [
    { label: 'Lead Conversion Rate', value: 28, target: '+28%', desc: 'AI-assisted showroom follow-up', color: 'from-porsche-red to-red-500 shadow-glow-red' },
    { label: 'After-Sales Retention', value: 22, target: '+22%', desc: 'Telematics-triggered diagnostic checkups', color: 'from-porsche-red to-red-500 shadow-glow-red' },
    { label: 'Parts Turnover Improvement', value: 35, target: '+35%', desc: 'DGA Customs integration & predictive stocking', color: 'from-porsche-green to-emerald-500 shadow-glow-green' },
    { label: 'Administrative Automation', value: 65, target: '+65%', desc: 'Auto-allocation & idle warnings queue', color: 'from-porsche-green to-emerald-500 shadow-glow-green' }
  ];

  const steps = [
    { 
      phase: '01', 
      title: 'Operational Audit', 
      icon: <Search className="text-porsche-red" size={20} />, 
      desc: 'Data mapping of Porsche Center Santo Domingo sales queues and customs pipelines.' 
    },
    { 
      phase: '02', 
      title: 'AI System Design', 
      icon: <Cpu className="text-porsche-green" size={20} />, 
      desc: 'Model training for lead configuration prediction & telematics wear thresholds.' 
    },
    { 
      phase: '03', 
      title: 'Integration Layer', 
      icon: <Layers className="text-slate-800" size={20} />, 
      desc: 'Connecting CRM databases, parts inventory warehouses, and service dispatch.' 
    },
    { 
      phase: '04', 
      title: 'Expansion (Porsche RD)', 
      icon: <Milestone className="text-porsche-red" size={20} />, 
      desc: 'Deploying custom dealer portals across secondary locations in northern provinces.' 
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3 max-w-4xl">
        <div className="flex items-center gap-2 text-porsche-red font-bold tracking-widest text-xs uppercase">
          <span>Deemsys.ai</span>
          <span>•</span>
          <span>Porsche Center Santo Domingo</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 leading-tight">
          Driving the Future of <br className="hidden sm:inline" />
          <span className="font-semibold bg-gradient-to-r from-slate-900 via-porsche-red to-porsche-red bg-clip-text text-transparent">
            Porsche RD Operations
          </span>
        </h1>
        <p className="text-porsche-muted text-base sm:text-lg leading-relaxed font-light">
          An intelligent operational command center orchestrating lead flow, predictive parts inventory, and connected car telematics to elevate dealer throughput.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => (
          <Link 
            key={idx} 
            to={pillar.link}
            className={`porsche-card-glow flex flex-col justify-between p-6 rounded-2xl border ${pillar.color} relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-porsche-cyan/0 to-porsche-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-slate-100 border border-porsche-border group-hover:border-porsche-cyan/30 transition-colors">
                  {pillar.icon}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-porsche-red tracking-wider font-semibold uppercase group-hover:translate-x-1 transition-transform">
                  Explore <ArrowUpRight size={14} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-porsche-muted font-light leading-relaxed">{pillar.desc}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-porsche-border/40 flex justify-between items-baseline">
              <span className="text-xs text-porsche-muted uppercase tracking-wider">{pillar.metricLabel}</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-porsche-red transition-colors">
                {pillar.metricValue}
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="porsche-card-glow p-6 sm:p-8 rounded-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 tracking-wide">Projected Operational Impact</h2>
          <p className="text-sm text-porsche-muted font-light mt-1">Expected optimization gains through Deemsys.ai system rollout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-800 tracking-wide flex items-center gap-2">
                  <span className="text-porsche-red font-bold text-xs">&gt;</span> {kpi.label}
                </span>
                <span className="text-sm font-bold text-porsche-red">{kpi.target}</span>
              </div>
              
              <div className="h-3 w-full bg-slate-100 rounded-full border border-porsche-border/60 overflow-hidden p-[2px]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${kpi.value}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${kpi.color}`}
                />
              </div>
              <span className="text-[11px] text-porsche-muted font-light">{kpi.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-wide">Implementation Timeline</h2>
          <p className="text-sm text-porsche-muted font-light mt-1">4-Phase integration map for Porsche Center Santo Domingo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="porsche-card-glow p-5 rounded-2xl flex flex-col gap-4 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest text-porsche-red/60 uppercase">Phase {step.phase}</span>
                <div className="p-2 rounded-lg bg-slate-50 border border-porsche-border">
                  {step.icon}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-porsche-muted font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 text-porsche-red">
                  <ChevronRight size={18} className="opacity-50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
