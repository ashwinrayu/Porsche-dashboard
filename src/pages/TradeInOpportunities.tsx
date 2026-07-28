import React, { useState } from 'react';
import { Zap, Search, Filter, ArrowLeft, ArrowRight, UserCircle2, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { TakeActionModal, type ActionItem } from '../components/TakeActionModal';

export default function TradeInOpportunities() {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState<ActionItem | null>(null);

  const triggerAction = (e: React.MouseEvent, item: ActionItem) => {
    e.stopPropagation();
    setSelectedActionItem(item);
    setIsActionModalOpen(true);
  };

  const tradeInOpportunities = [
    {
      id: 't-1',
      client: 'Carlos Llenas',
      customerId: 'carlos-llenas',
      vehicle: '2021 911 Carrera S',
      appraisal: '$118,000',
      upgradeTarget: '911 Carrera GTS',
      upgradePrice: '$138,500',
      delta: '+$20,500',
      expiry: '1 month remaining',
      tag: 'High Value',
      tagColor: 'bg-porsche-red text-white',
      advisor: 'Marcus Vance',
    },
    {
      id: 't-2',
      client: 'Milo Espaillat',
      customerId: 'milo-espaillat',
      vehicle: '2020 Macan Turbo',
      appraisal: '$62,000',
      upgradeTarget: 'Macan Electric',
      upgradePrice: '$89,000',
      delta: '+$27,000',
      expiry: '2 weeks remaining',
      tag: 'Renewal',
      tagColor: 'bg-blue-600 text-white',
      advisor: 'Alex Ruiz',
    },
    {
      id: 't-3',
      client: 'Juan Vich',
      customerId: 'juan-vich',
      vehicle: '2018 Cayenne E-Hybrid',
      appraisal: '$54,000',
      upgradeTarget: 'Cayenne Turbo GT',
      upgradePrice: '$162,000',
      delta: '+$108,000',
      expiry: '3 months remaining',
      tag: 'Medium',
      tagColor: 'bg-amber-500 text-white',
      advisor: 'Stefan Weiss',
    },
    {
      id: 't-4',
      client: 'María Vásquez',
      customerId: 'maria-vasquez',
      vehicle: '2022 Taycan 4S',
      appraisal: '$85,000',
      upgradeTarget: 'Taycan Turbo GT',
      upgradePrice: '$210,000',
      delta: '+$125,000',
      expiry: '1 week remaining',
      tag: 'High Value',
      tagColor: 'bg-porsche-red text-white',
      advisor: 'Marcus Vance',
    },
    {
      id: 't-5',
      client: 'Gustavo Tavares',
      customerId: 'gustavo-tavares',
      vehicle: '2019 718 Cayman S',
      appraisal: '$48,000',
      upgradeTarget: '718 Cayman GT4 RS',
      upgradePrice: '$160,000',
      delta: '+$112,000',
      expiry: 'Immediate',
      tag: 'Upgrade Eligible',
      tagColor: 'bg-emerald-600 text-white',
      advisor: 'David Ortiz',
    },
    {
      id: 't-6',
      client: 'Eduardo Najri',
      customerId: 'eduardo-najri',
      vehicle: '2021 Panamera GTS',
      appraisal: '$92,000',
      upgradeTarget: 'Panamera Turbo E-Hybrid',
      upgradePrice: '$202,000',
      delta: '+$110,000',
      expiry: '1 month remaining',
      tag: 'Renewal',
      tagColor: 'bg-blue-600 text-white',
      advisor: 'Stefan Weiss',
    },
    {
      id: 't-7',
      client: 'Luis Corripio',
      customerId: 'luis-corripio',
      vehicle: '2020 911 GT3',
      appraisal: '$145,000',
      upgradeTarget: '911 GT3 RS Weissach',
      upgradePrice: '$280,000',
      delta: '+$135,000',
      expiry: 'Active Negotiation',
      tag: 'High Value',
      tagColor: 'bg-porsche-red text-white',
      advisor: 'Alex Ruiz',
    },
    {
      id: 't-8',
      client: 'Ana Vicini',
      customerId: 'ana-vicini',
      vehicle: '2020 Taycan 4',
      appraisal: '$72,000',
      upgradeTarget: 'Taycan 4 Cross Turismo',
      upgradePrice: '$132,000',
      delta: '+$60,000',
      expiry: '6 weeks remaining',
      tag: 'Renewal',
      tagColor: 'bg-blue-600 text-white',
      advisor: 'David Ortiz',
    },
    {
      id: 't-9',
      client: 'Frank Rainieri',
      customerId: 'frank-rainieri',
      vehicle: '2019 Cayenne S',
      appraisal: '$61,000',
      upgradeTarget: 'Cayenne Turbo GT',
      upgradePrice: '$162,000',
      delta: '+$101,000',
      expiry: '2 months remaining',
      tag: 'Medium',
      tagColor: 'bg-amber-500 text-white',
      advisor: 'Marcus Vance',
    },
    {
      id: 't-10',
      client: 'Roberto Bonetti',
      customerId: 'roberto-bonetti',
      vehicle: '2018 Macan S',
      appraisal: '$38,000',
      upgradeTarget: 'Macan GTS',
      upgradePrice: '$79,000',
      delta: '+$41,000',
      expiry: 'Expires Soon',
      tag: 'Upgrade Eligible',
      tagColor: 'bg-emerald-600 text-white',
      advisor: 'Alex Ruiz',
    },
  ];

  const filtered = tradeInOpportunities.filter((opp) => {
    const q = search.toLowerCase();
    const matchSearch =
      opp.client.toLowerCase().includes(q) ||
      opp.vehicle.toLowerCase().includes(q) ||
      opp.upgradeTarget.toLowerCase().includes(q) ||
      opp.advisor.toLowerCase().includes(q);
    const matchTag = tagFilter === 'all' || opp.tag.toLowerCase().includes(tagFilter.toLowerCase());
    return matchSearch && matchTag;
  });

  const totalAppraisalValue = tradeInOpportunities.reduce((sum, o) => {
    return sum + parseInt(o.appraisal.replace(/[$,]/g, ''));
  }, 0);

  const formatM = (v: number) => `$${(v / 1000).toFixed(0)}K`;

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
            <Zap size={14} /> Revenue Opportunities
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Trade-in & Renewal Matrix
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-mono">Full Upgrade Opportunity Pipeline — Porsche Santo Domingo</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-porsche-red/10 border border-porsche-red/20 text-xs font-mono font-bold text-porsche-red flex items-center gap-2 self-start sm:self-end">
          <TrendingUp size={12} />
          {tradeInOpportunities.length} Active Opportunities
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Total Opportunities</span>
          <span className="text-section-30 font-bold text-slate-900 dark:text-white">{tradeInOpportunities.length}</span>
        </div>
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">High Value</span>
          <span className="text-section-30 font-bold text-porsche-red">{tradeInOpportunities.filter(o => o.tag === 'High Value').length}</span>
        </div>
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Total Appraisal Pool</span>
          <span className="text-section-30 font-bold text-emerald-600 dark:text-emerald-400">{formatM(totalAppraisalValue)}</span>
        </div>
        <div className="porsche-card flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Expiring Soon</span>
          <span className="text-section-30 font-bold text-amber-600 dark:text-amber-400">{tradeInOpportunities.filter(o => o.expiry.toLowerCase().includes('week') || o.expiry === 'Immediate' || o.expiry === 'Expires Soon').length}</span>
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
            placeholder="Search by client, vehicle, upgrade target, or advisor..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1D24] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter size={14} className="text-slate-400 shrink-0" />
          {(['all', 'high value', 'renewal', 'upgrade', 'medium'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setTagFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono capitalize border cursor-pointer transition-all ${
                tagFilter === f
                  ? 'bg-porsche-red text-white border-porsche-red'
                  : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="porsche-card p-0 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider grid grid-cols-12 gap-2 bg-slate-50/50 dark:bg-white/[0.02]">
          <span className="col-span-2">Client</span>
          <span className="col-span-3">Current Vehicle</span>
          <span className="col-span-3">Upgrade Target</span>
          <span className="col-span-1">Appraisal</span>
          <span className="col-span-1">Timeline</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="px-6 py-5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group"
            >
              {/* Client */}
              <div className="col-span-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center shrink-0">
                  <UserCircle2 size={16} className="text-porsche-red" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-porsche-red transition-colors">{opp.client}</span>
                  <span className="text-[10px] text-slate-400 font-mono truncate">{opp.advisor}</span>
                </div>
              </div>

              {/* Current Vehicle */}
              <div className="col-span-3 flex flex-col gap-0.5">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{opp.vehicle}</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{opp.appraisal} trade-in</span>
              </div>

              {/* Upgrade Target */}
              <div className="col-span-3 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-porsche-red shrink-0" />
                  <span className="text-sm font-bold text-porsche-red">{opp.upgradeTarget}</span>
                </div>
                <span className="text-xs font-mono text-slate-500">{opp.upgradePrice} MSRP</span>
              </div>

              {/* Appraisal Delta */}
              <div className="col-span-1">
                <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">{opp.delta}</span>
              </div>

              {/* Expiry / Tag */}
              <div className="col-span-1 flex flex-col gap-1">
                <span className={`text-[9px] font-bold uppercase font-mono px-2 py-0.5 rounded-full w-fit ${opp.tagColor}`}>{opp.tag}</span>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock size={9} />{opp.expiry}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => { window.location.hash = `#/customer-360/${opp.customerId}`; }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 cursor-pointer transition-colors whitespace-nowrap"
                >
                  Client 360
                </button>
                <button
                  onClick={(e) => triggerAction(e, { title: `Trade-in Proposal: ${opp.client}`, target: `Trade ${opp.vehicle} → ${opp.upgradeTarget} (${opp.appraisal})` })}
                  className="px-2.5 py-1.5 rounded-xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 cursor-pointer transition-colors shadow-glow-red whitespace-nowrap"
                >
                  Take Action
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center text-slate-400 font-mono text-sm">
            No opportunities found matching your criteria.
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
