import { 
  AreaChart, 
  Area, 
  RadialBarChart, 
  RadialBar, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  PieChart, 
  Info,
  Calendar,
  Filter,
  DollarSign
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Executive() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = () => {
      api.exec.getRadialData()
        .then(setData)
        .catch(console.error);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-sm text-porsche-muted animate-pulse font-medium">Loading executive diagnostics...</span>
      </div>
    );
  }

  const sparklineData = data.queueVolumeHistory.slice(-10).map((d: any, index: number) => ({
    index,
    value: d.value + (index === 9 ? (data.unassignedDeals % 20) - 10 : 0)
  }));

  const longestIdleSparkline = [
    { v: 110 }, { v: 112 }, { v: 115 }, { v: 118 }, { v: 120 },
    { v: 122 }, { v: 123 }, { v: 121 }, { v: 123 }, { v: data.longestIdleHours }
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Pillar 3: <span className="font-semibold text-porsche-red">Executive Intelligence</span></h1>
          <p className="text-sm text-porsche-muted font-light mt-1">Holistic operations oversight, wait-time queues, conversion analytics, and live deal flow dynamics.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col justify-between h-48 relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
              <div>
                <h3 className="text-xs text-porsche-muted uppercase tracking-wider font-semibold">Total Deals Unassigned</h3>
                <span className="text-4xl font-bold text-slate-900 tracking-tight block mt-2 font-mono">
                  {data.unassignedDeals}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
                data.unassignedChangePct >= 0 
                  ? 'bg-porsche-rose/10 border-porsche-rose/25 text-porsche-rose' 
                  : 'bg-porsche-emerald/10 border-porsche-emerald/25 text-porsche-emerald'
              }`}>
                {data.unassignedChangePct >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span className="font-bold">{data.unassignedChangePct >= 0 ? `+${data.unassignedChangePct}%` : `${data.unassignedChangePct}%`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mt-4 z-10">
              <span className="text-[10px] text-porsche-muted font-light">Jitter-active real-time sync</span>
              <div className="w-28 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#D5001C" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-porsche-red/5 rounded-full blur-xl group-hover:bg-porsche-red/10 transition-colors pointer-events-none" />
          </div>

          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-4">
            <div>
              <h3 className="text-xs text-porsche-muted uppercase tracking-wider font-semibold">Average Idle Time Range</h3>
              <p className="text-[10px] text-porsche-muted font-light mt-0.5">Calculated delay between lead configuration and sales routing.</p>
            </div>

            <div className="relative pt-6 pb-2">
              <div className="flex justify-between text-[9px] text-porsche-muted font-semibold uppercase tracking-wider mb-2">
                <span>3 Hrs</span>
                <span>12 Hrs</span>
                <span>1 Day</span>
                <span>2 Days</span>
                <span>3 Days</span>
                <span>5+ Days</span>
              </div>

              <div className="h-2 w-full bg-slate-100 rounded-full border border-porsche-border/40 relative">
                <div className="absolute top-0 bottom-0 left-[55%] right-[25%] bg-gradient-to-r from-porsche-red to-porsche-green rounded-full shadow-glow opacity-90" />
                
                <div className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-porsche-green border-2 border-white pulse-glow-green" />
              </div>

              <div className="absolute top-[-5px] left-[52%] px-2 py-0.5 bg-white border border-porsche-green/40 rounded text-[9px] font-bold text-porsche-green uppercase tracking-wider shadow-glow flex items-center gap-1">
                <Clock size={8} />
                {data.averageIdleRange.count} sets: {data.averageIdleRange.minDays}D – {data.averageIdleRange.maxDays}D Avg
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="porsche-card-glow p-4 rounded-2xl flex flex-col justify-between h-32 relative group">
              <div>
                <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-semibold">Longest Idle Time</span>
                <span className="text-2xl font-bold text-porsche-red block mt-1.5 font-mono">{data.longestIdleHours} hrs</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[9px] text-porsche-muted font-mono">{data.longestIdleChangePct}% vs yesterday</span>
                <div className="w-16 h-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={longestIdleSparkline}>
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        stroke="#D5001C" 
                        strokeWidth={1.5} 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="porsche-card-glow p-4 rounded-2xl flex flex-col justify-between h-32 bg-slate-100/30">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-semibold">Router Diagnostics</span>
                <span className="w-2 h-2 rounded-full bg-porsche-green animate-pulse" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-900 font-medium">Automatic Allocator</span>
                <span className="text-[9px] text-porsche-green font-semibold">Efficiency: 98.4%</span>
              </div>
              <p className="text-[9px] text-porsche-muted font-light leading-snug">
                Avg routing decision completes in 1.4s under Dominican grid load.
              </p>
            </div>
          </div>

          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs text-porsche-muted uppercase tracking-wider font-semibold">Deal Queue Volume</h3>
                <p className="text-[10px] text-porsche-muted font-light mt-0.5">Rolling volume of active deals mapped over 30 days.</p>
              </div>
              <Calendar size={14} className="text-porsche-red" />
            </div>

            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.queueVolumeHistory}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="queueColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D5001C" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#D5001C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderColor: 'rgba(15, 23, 42, 0.08)', 
                      borderRadius: '8px',
                      color: '#0F172A',
                      fontSize: '11px'
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#D5001C" strokeWidth={2} fillOpacity={1} fill="url(#queueColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <div className="lg:col-span-7 porsche-card-glow p-6 sm:p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden">
          
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 tracking-wide flex items-center gap-2">
                <PieChart size={18} className="text-porsche-red" />
                Deal Category Distribution
              </h2>
              <p className="text-xs text-porsche-muted font-light mt-0.5">Automated queue mapping categorized by model configurations & sales hubs.</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-100 border border-porsche-border text-porsche-red">
              <Brain size={18} />
            </div>
          </div>

          <div className="flex-1 min-h-[350px] flex items-center justify-center relative">
            
            <div className="absolute flex flex-col items-center justify-center text-center z-10 pointer-events-none">
              <span className="text-[10px] text-porsche-muted uppercase tracking-widest font-semibold">AutoEuropa RD</span>
              <span className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">Operational Matrix</span>
              <span className="text-[9px] text-porsche-green font-medium mt-1 uppercase bg-porsche-green/15 px-2 py-0.5 rounded border border-porsche-green/20">
                10 active nodes
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="25%" 
                outerRadius="95%" 
                barSize={7} 
                data={data.radialCategories}
                startAngle={90}
                endAngle={450}
              >
                <RadialBar
                  background={{ fill: 'rgba(15, 23, 42, 0.03)' }}
                  dataKey="value"
                  cornerRadius={4}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: 'rgba(15, 23, 42, 0.08)', 
                    borderRadius: '12px',
                    color: '#0F172A',
                    fontSize: '11px'
                  }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-porsche-border/40 grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-[10px]">
            {data.radialCategories.map((cat: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.fill }} />
                  <span className="text-slate-800 font-medium truncate">{cat.name.split(' ')[0]}</span>
                </div>
                <span className="font-mono text-porsche-muted pl-3">{cat.value} deals</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-porsche-red/5 rounded-xl border border-porsche-red/15 text-[10px] text-porsche-muted leading-relaxed flex items-start gap-2">
            <Info size={12} className="text-porsche-red shrink-0 mt-0.5" />
            <p>
              This radial layout visualizes distribution density across municipal networks. Value fluctuations reflect immediate allocation adjustments simulated at 3.0s query cycles.
            </p>
          </div>

        </div>

      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Filter size={15} className="text-porsche-red" />
                Sales Conversion Funnel
              </h2>
              <p className="text-[10px] text-porsche-muted font-light mt-0.5">Pipeline stage conversion rates — Santo Domingo showroom.</p>
            </div>
            <span className="text-[10px] font-bold text-porsche-green bg-porsche-green/10 px-2 py-0.5 rounded border border-porsche-green/20">Live pipeline</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {[
              { stage: 'Web Inquiries & Campaigns', count: 412, pct: 100, color: '#94A3B8' },
              { stage: 'Qualified Leads (Score 40+)', count: 284, pct: 69, color: '#F59E0B' },
              { stage: 'Showroom / Test Drive', count: 158, pct: 38, color: '#1E3A8A' },
              { stage: 'Configurator Built', count: 94, pct: 23, color: '#D5001C' },
              { stage: 'Deal Closed', count: 61, pct: 15, color: '#10B981' },
            ].map(({ stage, count, pct, color }) => (
              <div key={stage} className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold text-slate-700">{stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">{count}</span>
                    <span className="text-[9px] font-bold" style={{ color }}>{pct}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-porsche-border/40 flex justify-between text-[10px] text-porsche-muted">
            <span>Overall conversion: <strong className="text-slate-800">14.8%</strong></span>
            <span>Avg. deal value: <strong className="text-slate-800">$387,500</strong></span>
          </div>
        </div>

        <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <DollarSign size={15} className="text-porsche-red" />
                Revenue Projection — Q3 2026
              </h2>
              <p className="text-[10px] text-porsche-muted font-light mt-0.5">Actual vs. projected monthly revenue in USD millions.</p>
            </div>
            <span className="text-[10px] font-bold text-porsche-red bg-porsche-red/10 px-2 py-0.5 rounded border border-porsche-red/20">+18.4% YTD</span>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { month: 'Jan', actual: 4.2, projected: 3.8 },
                  { month: 'Feb', actual: 3.9, projected: 4.0 },
                  { month: 'Mar', actual: 5.1, projected: 4.5 },
                  { month: 'Apr', actual: 4.7, projected: 4.8 },
                  { month: 'May', actual: 5.4, projected: 5.0 },
                  { month: 'Jun', actual: 5.8, projected: 5.3 },
                  { month: 'Jul', actual: 4.1, projected: 5.6 },
                  { month: 'Aug', actual: null, projected: 5.9 },
                  { month: 'Sep', actual: null, projected: 6.2 },
                ]}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                barSize={12}
              >
                <XAxis dataKey="month" fontSize={10} tickLine={false} stroke="#94A3B8" />
                <YAxis fontSize={10} tickLine={false} stroke="#94A3B8" tickFormatter={v => `$${v}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: 'rgba(15,23,42,0.08)', borderRadius: '10px', fontSize: '11px' }}
                  formatter={(val: any, name: any) => [`$${val}M`, name === 'actual' ? 'Actual' : 'Projected'] as any}
                />
                <Bar dataKey="actual" name="actual" radius={[4,4,0,0]} fill="#D5001C" />
                <Bar dataKey="projected" name="projected" radius={[4,4,0,0]} fill="#94A3B8" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-porsche-border/40 text-[10px]">
            <div className="text-center">
              <p className="text-porsche-muted">H1 Actual</p>
              <p className="font-bold text-slate-900 font-mono text-sm mt-0.5">$29.2M</p>
            </div>
            <div className="text-center">
              <p className="text-porsche-muted">Q3 Projection</p>
              <p className="font-bold text-porsche-red font-mono text-sm mt-0.5">$17.7M</p>
            </div>
            <div className="text-center">
              <p className="text-porsche-muted">FY Target</p>
              <p className="font-bold text-slate-900 font-mono text-sm mt-0.5">$62.0M</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
