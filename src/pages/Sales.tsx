import { useState, useEffect } from 'react';
import { 
  ArrowUpDown, 
  Sparkles, 
  Send,
  X,
  Clock,
  Car,
  CalendarCheck,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import type { Lead } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const LEAD_TIMELINES: Record<string, Array<{ event: string; detail: string; time: string; type: 'contact' | 'config' | 'visit' | 'note' }>> = {
  'L-1000': [
    { event: 'Showroom Visit', detail: 'Test drive — 911 GTS in Guards Red', time: '2 days ago', type: 'visit' },
    { event: 'Config Updated', detail: 'Paint: Guards Red • Weissach Package added', time: '3 hrs ago', type: 'config' },
    { event: 'Follow-up Call', detail: 'Advisor discussed delivery timeline & financing', time: '1 day ago', type: 'contact' },
    { event: 'Quotation Sent', detail: '$415,000 — Sport Chrono + Race-Tex', time: '5 days ago', type: 'note' },
  ],
  'L-1001': [
    { event: 'Web Inquiry', detail: 'Taycan Turbo S — online configurator submission', time: '1 week ago', type: 'contact' },
    { event: 'Config Updated', detail: 'Paint: Chalk • Mission E Wheels', time: '2 days ago', type: 'config' },
    { event: 'Email Follow-up', detail: 'Sent Taycan EV charging guide & incentives', time: '3 days ago', type: 'note' },
  ],
  'L-1002': [
    { event: 'VIP Event', detail: 'Casa de Campo Golf Tournament attendance', time: '2 weeks ago', type: 'visit' },
    { event: 'Initial Contact', detail: 'Cayenne E-Hybrid expressed strong interest', time: '10 days ago', type: 'contact' },
    { event: 'Config Updated', detail: 'Jet Black • RS Spyder Wheels • Truffle Brown', time: '4 days ago', type: 'config' },
  ],
  'L-1003': [
    { event: 'Instagram Lead', detail: 'Responded to Macan Electric campaign ad', time: '5 days ago', type: 'contact' },
    { event: 'Config Updated', detail: 'Mamba Green • Macan Design Wheels', time: '1 day ago', type: 'config' },
  ],
  'L-1004': [
    { event: 'Referral Intake', detail: 'Referred by Luis Pellerano (existing GT3 owner)', time: '3 weeks ago', type: 'visit' },
    { event: 'Test Drive Booked', detail: '718 GT4 RS — Porsche Track Day experience', time: '2 weeks ago', type: 'visit' },
    { event: 'Config Updated', detail: 'Guards Red • Weissach • Forged Magnesium Wheels', time: '6 hrs ago', type: 'config' },
    { event: 'Negotiation Ongoing', detail: 'Customer requested extended warranty package', time: '1 day ago', type: 'note' },
  ],
};

const TEST_DRIVE_SLOTS = [
  'Tomorrow — 10:00 AM', 'Tomorrow — 2:00 PM', 'Sat — 9:00 AM', 'Sat — 11:00 AM', 'Mon — 10:00 AM',
];

export default function Sales() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadModel, setNewLeadModel] = useState('911 Carrera GTS (992.2)');
  const [newLeadSource, setNewLeadSource] = useState('Showroom Santo Domingo');
  const [newLeadScore, setNewLeadScore] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [configPaint, setConfigPaint] = useState('');
  const [configWheels, setConfigWheels] = useState('');
  const [configInterior, setConfigInterior] = useState('');
  const [configPackages, setConfigPackages] = useState<string[]>([]);
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [selectedDriveSlot, setSelectedDriveSlot] = useState<string | null>(null);
  const [driveBooked, setDriveBooked] = useState<Record<string, string>>({});

  const handleBookDrive = () => {
    if (!detailLead || !selectedDriveSlot) return;
    setDriveBooked(prev => ({ ...prev, [detailLead.id]: selectedDriveSlot }));
    setSelectedDriveSlot(null);
  };

  const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const openConfigurator = (lead: Lead) => {
    setConfigPaint(lead.specs?.paint || 'GT Silver Metallic');
    setConfigWheels(lead.specs?.wheels || '20/21-inch Carrera S Wheels');
    setConfigInterior(lead.specs?.interior || 'Standard Interior in Black');
    setConfigPackages(lead.specs?.packages || ['Sport Chrono Package']);
    setIsConfiguratorOpen(true);
  };

  useEffect(() => {
    const fetchLeads = () => {
      api.sales.getLeads()
        .then(data => {
          setLeads(data.leads);
          setSelectedLeadId(prev => prev || data.leads[0]?.id || null);
        })
        .catch(console.error);
    };

    fetchLeads();
    const interval = setInterval(fetchLeads, 3000);
    return () => clearInterval(interval);
  }, []);

  const sortedLeads = [...leads].sort((a, b) => {
    return sortAsc ? a.score - b.score : b.score - a.score;
  });

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  const handleAssignAdvisor = (leadId: string, advisorName: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => lead.id === leadId ? { ...lead, assignedAdvisor: advisorName } : lead)
    );
    api.sales.assignLeadAdvisor(leadId, advisorName)
      .catch(err => {
        console.error('Failed to assign advisor:', err);
        api.sales.getLeads().then(data => setLeads(data.leads));
      });
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    setIsSubmitting(true);
    try {
      await api.sales.createLead(newLeadName, newLeadModel, newLeadSource, newLeadScore);
      const data = await api.sales.getLeads();
      setLeads(data.leads);
      setNewLeadName('');
      setNewLeadScore(60);
      setIsDrawerOpen(false);
    } catch (err) {
      console.error('Failed to create lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead) return;

    setIsSavingConfig(true);
    const specs = {
      paint: configPaint,
      wheels: configWheels,
      interior: configInterior,
      packages: configPackages
    };

    try {
      await api.sales.updateConfig(activeLead.id, specs);
      setLeads(prevLeads => 
        prevLeads.map(lead => lead.id === activeLead.id ? { ...lead, specs } : lead)
      );
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Configuration updated! ${activeLead.name} has finalized their spec: ${configPaint} with ${configWheels} and ${configInterior}. The order has been submitted to the production planning desk.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsConfiguratorOpen(false);
    } catch (err) {
      console.error('Failed to save config:', err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([]);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    if (activeLead) {
      setMessages([
        { 
          sender: 'ai', 
          text: `Analyzing active lead: ${activeLead.name}. Order profile is a ${activeLead.model} in ${activeLead.specs?.paint || 'GT Silver Metallic'} with ${activeLead.specs?.wheels || 'Carrera S Wheels'}. Ask me about logistics status or parts availability.`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeadId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setInputVal('');

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "";

      if (lower.includes('test drive') || lower.includes('manejo') || lower.includes('probar')) {
        reply = "We'd love to schedule a private test drive at Porsche Center Santo Domingo. We currently have the new Taycan 4S and Cayenne Coupe available. Please specify your preferred date, and our sales desk will finalize the booking.";
      } else if (lower.includes('financing') || lower.includes('financia') || lower.includes('popular') || lower.includes('bhd')) {
        reply = "AutoEuropa provides customized financing packages through local Dominican banks like Banco Popular and BHD. We currently offer promotional interest rates starting at 8.5% fixed for 12 months. Would you like a financial calculator quote sent to your email?";
      } else if (lower.includes('taycan') || lower.includes('electric') || lower.includes('cargador') || lower.includes('charge')) {
        reply = "For all Taycan and Macan EV allocations, AutoEuropa includes a complimentary Porsche Home Charger installation, engineered for the Dominican grid. We also offer access to the Evergo fast-charging network across the island.";
      } else if (lower.includes('location') || lower.includes('direcc') || lower.includes('donde') || lower.includes('kennedy')) {
        reply = "Our showroom is located at Av. John F. Kennedy Esq. Abraham Lincoln, Santo Domingo, Dominican Republic. We are open Monday to Friday from 9:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 1:00 PM.";
      } else {
        reply = "Thank you for your message. I've noted your interest. Our lead scoring AI has routed this conversation to our senior advisor, Eduardo Bisonó, who will follow up with you shortly.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply, time: now }]);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Pillar 1: <span className="font-semibold text-porsche-red">Sales & Conversion</span></h1>
          <p className="text-sm text-porsche-muted font-light mt-1">Lead intelligence, customer persona configuration, and virtual showroom routing.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="porsche-card-glow p-5 rounded-2xl border border-porsche-red/10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold tracking-wider bg-porsche-red/5 text-porsche-red px-2 py-0.5 rounded border border-porsche-red/15 uppercase">SUV Line</span>
            <span className="text-[10px] text-porsche-emerald font-semibold uppercase">Active campaign</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">Cayenne & Macan Trade-In Alerts</h3>
          <p className="text-xs text-porsche-muted font-light leading-relaxed">
            Automatic triggers target previous-generation Cayenne owners whose lease terms are nearing completion. Dynamic valuation reports are generated in the background for showroom advisors.
          </p>
        </div>

        <div className="porsche-card-glow p-5 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold tracking-wider bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 uppercase">Sports Cars</span>
            <span className="text-[10px] text-porsche-gold font-semibold uppercase">Allocation manager</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">911 & 718 Allocation Queue</h3>
          <p className="text-xs text-porsche-muted font-light leading-relaxed">
            Predictive assignment score ranks clients based on loyalty index, track day participation, and prior GT acquisitions, reducing manual negotiation bottlenecks for 911 GT3 models.
          </p>
        </div>

        <div className="porsche-card-glow p-5 rounded-2xl border border-porsche-green/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold tracking-wider bg-porsche-green/10 text-porsche-green px-2 py-0.5 rounded border border-porsche-green/25 uppercase">Sedans / EV</span>
            <span className="text-[10px] text-porsche-green font-semibold uppercase">Acquisition campaigns</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">Taycan Electric Acquisition</h3>
          <p className="text-xs text-porsche-muted font-light leading-relaxed">
            Geofenced social campaigns target high-income corporate districts (Naco, Piantini). Automated calculators present solar panel offset and fuel savings projections for potential buyers.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 porsche-card-glow p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 tracking-wide">Intelligent Lead Scoring</h2>
              <p className="text-xs text-porsche-muted font-light mt-0.5">Real-time engagement scoring and advisor routing.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-porsche-red text-white hover:bg-red-700 hover:shadow-glow-red rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-wider"
              >
                Create Lead
              </button>
              <button 
                onClick={toggleSort}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-porsche-border rounded-xl text-porsche-red hover:bg-porsche-red/5 transition-colors"
              >
                <ArrowUpDown size={14} />
                Sort ({sortAsc ? 'Asc' : 'Desc'})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full -mx-6 px-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-porsche-border text-[11px] uppercase tracking-wider text-porsche-muted font-semibold">
                  <th className="py-3 pr-4">Lead ID</th>
                  <th className="py-3 pr-4">Customer</th>
                  <th className="py-3 pr-4">Model of Interest</th>
                  <th className="py-3 pr-4">Source</th>
                  <th className="py-3 pr-4">AI Score</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Advisor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-porsche-border/40 text-sm">
                {sortedLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLeadId(lead.id)}
                    onDoubleClick={() => setDetailLead(lead)}
                    className={`hover:bg-slate-900/5 transition-colors duration-150 group cursor-pointer ${
                      activeLead?.id === lead.id ? 'bg-slate-100 border-l-[3px] border-l-porsche-red' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-4 font-mono text-xs text-porsche-muted">{lead.id}</td>
                    <td className="py-3.5 pr-4 font-medium text-slate-900 group-hover:text-porsche-red transition-colors">{lead.name}</td>
                    <td className="py-3.5 pr-4 text-slate-800">{lead.model}</td>
                    <td className="py-3.5 pr-4 text-porsche-muted text-xs">{lead.source}</td>
                    <td className="py-3.5 pr-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          lead.score >= 80 ? 'bg-porsche-red shadow-glow-red' : 
                          lead.score >= 50 ? 'bg-porsche-gold' : 'bg-porsche-muted'
                        }`} />
                        {lead.score}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        lead.status === 'Hot' ? 'bg-porsche-red/10 text-porsche-red border-porsche-red/20' :
                        lead.status === 'Warm' ? 'bg-porsche-gold/10 text-porsche-gold border-porsche-gold/20' :
                        'bg-porsche-muted/10 text-porsche-muted border-porsche-border'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <select 
                          value={lead.assignedAdvisor}
                          onChange={(e) => handleAssignAdvisor(lead.id, e.target.value)}
                          onClick={e => e.stopPropagation()}
                          className="bg-transparent border border-slate-200 hover:border-porsche-red/40 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-porsche-red cursor-pointer transition-all"
                        >
                          <option value="Unassigned">Unassigned</option>
                          <option value="Eduardo Bisonó">Eduardo Bisonó</option>
                          <option value="Claudia Peynado">Claudia Peynado</option>
                          <option value="Rafael Santana">Rafael Santana</option>
                          <option value="María Laura Díaz">María Laura Díaz</option>
                        </select>
                        <button
                          onClick={e => { e.stopPropagation(); setDetailLead(lead); }}
                          className="p-1 rounded-lg border border-porsche-border text-porsche-muted hover:text-porsche-red hover:border-porsche-red/40 transition-all opacity-0 group-hover:opacity-100"
                          title="View Lead Profile"
                        >
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-porsche-red" />
                <h2 className="text-base font-semibold text-slate-900 tracking-wide">Intelligent Configurator</h2>
              </div>
              <span className="text-[10px] text-porsche-red font-mono uppercase tracking-widest font-bold bg-porsche-red/10 px-2 py-0.5 rounded border border-porsche-red/20">
                AI Match
              </span>
            </div>

            {activeLead ? (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-950 leading-snug">{activeLead.name}</h3>
                  <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-semibold">{activeLead.model}</span>
                </div>

                <div className="pt-3 border-t border-porsche-border/40 flex flex-col gap-2.5 text-xs text-slate-800">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-medium">Paint Finish</span>
                    <span className="font-semibold text-slate-900">{activeLead.specs?.paint || 'GT Silver Metallic'}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-medium">Wheels</span>
                    <span className="font-semibold text-slate-900">{activeLead.specs?.wheels || 'Carrera S Wheels'}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-medium">Interior</span>
                    <span className="font-semibold text-slate-900">{activeLead.specs?.interior || 'Standard Interior in Black'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-porsche-muted uppercase tracking-wider font-bold">Equipment Packages</span>
                  <ul className="flex flex-wrap gap-1.5">
                    {activeLead.specs?.packages && activeLead.specs.packages.length > 0 ? (
                      activeLead.specs.packages.map((pkg, idx) => (
                        <li key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-50 border border-porsche-border text-slate-700 font-medium">
                          {pkg}
                        </li>
                      ))
                    ) : (
                      <li className="text-[10px] text-porsche-muted font-light italic">No custom packages selected</li>
                    )}
                  </ul>
                </div>

                <button 
                  onClick={() => openConfigurator(activeLead)}
                  className="w-full mt-2 py-2.5 bg-porsche-red text-white text-xs font-semibold rounded-xl hover:bg-red-700 hover:shadow-glow-red hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-wider"
                >
                  Configure Specifications
                </button>
              </div>
            ) : (
              <div className="py-8 text-center flex flex-col gap-2 justify-center items-center">
                <span className="text-xs text-porsche-muted italic">Select a customer lead in the CRM table to launch build customization.</span>
              </div>
            )}
          </div>

          <div className="porsche-card-glow p-6 rounded-2xl flex flex-col h-[380px]">
            <div className="flex items-center justify-between pb-3 border-b border-porsche-border/40 shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-porsche-green animate-pulse shadow-glow-green" />
                <h2 className="text-sm font-semibold text-slate-900 tracking-wide">24/7 Virtual Concierge</h2>
              </div>
              <span className="text-[10px] text-porsche-muted uppercase font-mono">Live Demo</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-porsche-red/5 text-slate-800 rounded-br-none border border-porsche-red/20' 
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-porsche-muted/70 mt-1 font-mono">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-porsche-border/40 shrink-0">
              <input 
                type="text" 
                placeholder="Ask about test drive, financing..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-white border border-porsche-border text-xs rounded-xl px-3 py-2 text-slate-800 placeholder-porsche-muted/50 focus:outline-none focus:border-porsche-red"
              />
              <button 
                type="submit"
                className="p-2 rounded-xl bg-porsche-red/10 border border-porsche-red/20 text-porsche-red hover:bg-porsche-red/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Create Lead Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-50 pointer-events-auto"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-porsche-border z-50 shadow-2xl p-8 flex flex-col gap-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-porsche-border">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">Create New CRM Lead</h3>
                  <p className="text-xs text-porsche-muted font-light mt-0.5">Add a prospective buyer for Santo Domingo Center.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg border border-porsche-border text-porsche-muted hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="flex flex-col gap-5 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Customer Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jean-Pierre Bellerose"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-porsche-red focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Model of Interest</label>
                  <select 
                    value={newLeadModel}
                    onChange={(e) => setNewLeadModel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-porsche-red focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="911 Carrera GTS (992.2)">911 Carrera GTS (992.2)</option>
                    <option value="Taycan Turbo S">Taycan Turbo S</option>
                    <option value="Cayenne Coupe E-Hybrid">Cayenne Coupe E-Hybrid</option>
                    <option value="Macan Electric Turbo">Macan Electric Turbo</option>
                    <option value="718 Cayman GT4 RS">718 Cayman GT4 RS</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Lead Source</label>
                  <select 
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-porsche-red focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Showroom Santo Domingo">Showroom Santo Domingo</option>
                    <option value="Web Configurator RD">Web Configurator RD</option>
                    <option value="VIP Tournament Casa de Campo">VIP Tournament Casa de Campo</option>
                    <option value="Instagram Campaign">Instagram Campaign</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                    <span>Initial Engagement Score</span>
                    <span className="font-mono text-xs text-porsche-red font-semibold">{newLeadScore}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="99"
                    value={newLeadScore}
                    onChange={(e) => setNewLeadScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-porsche-red focus:outline-none"
                  />
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-porsche-red text-white text-xs font-semibold rounded-xl hover:bg-red-700 hover:shadow-glow-red hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Lead'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Visual Configurator Drawer */}
      <AnimatePresence>
        {isConfiguratorOpen && activeLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfiguratorOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-50 pointer-events-auto"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-porsche-border z-50 shadow-2xl p-8 flex flex-col gap-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-porsche-border shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">Porsche Build Configurator</h3>
                  <p className="text-xs text-porsche-muted font-light mt-0.5">Customize order specification for {activeLead.name}.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsConfiguratorOpen(false)}
                  className="p-1.5 rounded-lg border border-porsche-border text-porsche-muted hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="rounded-2xl border border-porsche-border overflow-hidden relative p-4 flex flex-col gap-2 shadow-sm shrink-0 bg-slate-50">
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${
                      configPaint === 'Guards Red' ? '#D5001C' :
                      configPaint === 'Racing Yellow' ? '#F59E0B' :
                      configPaint === 'Gentian Blue Metallic' ? '#1E3A8A' :
                      configPaint === 'Mamba Green Metallic' ? '#10B981' :
                      configPaint === 'Chalk' ? '#E2E8F0' :
                      configPaint === 'Jet Black Metallic' ? '#0F172A' : '#94A3B8'
                    } 0%, transparent 100%)` 
                  }} 
                />
                <div className="flex justify-between items-start z-10">
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-slate-200/60 text-slate-800 px-2 py-0.5 rounded border border-slate-300">Active Spec Review</span>
                  <span className="text-xs font-bold text-slate-950 font-mono">{activeLead.id}</span>
                </div>
                <div className="mt-2 z-10 flex flex-col">
                  <span className="text-base font-bold text-slate-950">{activeLead.model}</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-porsche-muted font-mono font-medium">
                    <span>🎨 {configPaint}</span>
                    <span>🛞 {configWheels}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveConfig} className="flex flex-col gap-5 flex-1 overflow-y-auto pr-1 scrollbar-thin">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Paint Finish Swatch</label>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { name: 'Guards Red', color: '#D5001C' },
                      { name: 'Racing Yellow', color: '#F59E0B' },
                      { name: 'Gentian Blue Metallic', color: '#1E3A8A' },
                      { name: 'Mamba Green Metallic', color: '#10B981' },
                      { name: 'Chalk', color: '#E2E8F0' },
                      { name: 'Jet Black Metallic', color: '#0F172A' },
                      { name: 'GT Silver Metallic', color: '#94A3B8' }
                    ].map((swatch) => (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => setConfigPaint(swatch.name)}
                        title={swatch.name}
                        className={`w-10 h-10 rounded-full border relative transition-all hover:scale-105 active:scale-95 ${
                          configPaint === swatch.name 
                            ? 'border-porsche-red ring-2 ring-porsche-red/20 scale-105' 
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                        style={{ backgroundColor: swatch.color }}
                      >
                        {configPaint === swatch.name && (
                          <span className="absolute inset-0.5 rounded-full border border-white opacity-40" />
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Selected Finish: <strong className="text-slate-800 font-semibold">{configPaint}</strong></span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Wheel Selection</label>
                  <select 
                    value={configWheels}
                    onChange={(e) => setConfigWheels(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-porsche-red focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="20/21-inch Carrera S Wheels">20/21-inch Carrera S Wheels</option>
                    <option value="21-inch Mission E Wheels">21-inch Mission E Wheels</option>
                    <option value="22-inch RS Spyder Design Wheels">22-inch RS Spyder Design Wheels</option>
                    <option value="21-inch Macan Design Wheels">21-inch Macan Design Wheels</option>
                    <option value="20-inch Forged Magnesium Wheels">20-inch Forged Magnesium Wheels</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Cabin Trim Interior</label>
                  <select 
                    value={configInterior}
                    onChange={(e) => setConfigInterior(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-porsche-red focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Standard Interior in Black">Standard Interior in Black</option>
                    <option value="Leather Interior in Black">Leather Interior in Black</option>
                    <option value="Club Leather Interior in Truffle Brown">Club Leather Interior in Truffle Brown</option>
                    <option value="Race-Tex Interior in Black">Race-Tex Interior in Black</option>
                    <option value="Race-Tex Interior with Red Stitching">Race-Tex Interior with Red Stitching</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Optional Equipment Packages</label>
                  <div className="flex flex-col gap-2">
                    {[
                      'Sport Chrono Package',
                      'Weissach Package',
                      'Front Axle Lift System',
                      'Adaptive Air Suspension',
                      'Rear Axle Steering',
                      'Performance Battery Plus'
                    ].map((pkg) => {
                      const isChecked = configPackages.includes(pkg);
                      return (
                        <label 
                          key={pkg} 
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                            isChecked 
                              ? 'border-porsche-red/35 bg-porsche-red/5 text-slate-900' 
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => {
                              setConfigPackages(prev => 
                                prev.includes(pkg) ? prev.filter(p => p !== pkg) : [...prev, pkg]
                              );
                            }}
                            className="w-4 h-4 accent-porsche-red"
                          />
                          <span className="text-xs font-semibold">{pkg}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsConfiguratorOpen(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSavingConfig}
                    className="flex-1 py-3 bg-porsche-red text-white text-xs font-semibold rounded-xl hover:bg-red-700 hover:shadow-glow-red hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingConfig ? 'Saving...' : 'Save Configuration'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {detailLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailLead(null)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-[2px] z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white border-l border-porsche-border z-50 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-porsche-border bg-slate-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red font-bold text-sm">
                    {detailLead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{detailLead.name}</h3>
                    <p className="text-[10px] text-porsche-muted uppercase tracking-wider">{detailLead.id} · {detailLead.source}</p>
                  </div>
                </div>
                <button onClick={() => setDetailLead(null)} className="p-1.5 rounded-lg border border-porsche-border text-porsche-muted hover:text-slate-900 hover:bg-slate-100 transition-all">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-porsche-border text-center">
                    <p className="text-[9px] text-porsche-muted uppercase tracking-wider font-semibold">AI Score</p>
                    <p className="text-lg font-bold text-porsche-red font-mono mt-0.5">{detailLead.score}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-porsche-border text-center">
                    <p className="text-[9px] text-porsche-muted uppercase tracking-wider font-semibold">Status</p>
                    <p className={`text-sm font-bold mt-0.5 ${
                      detailLead.status === 'Hot' ? 'text-porsche-red' :
                      detailLead.status === 'Warm' ? 'text-porsche-gold' : 'text-slate-400'
                    }`}>{detailLead.status}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-porsche-border text-center">
                    <p className="text-[9px] text-porsche-muted uppercase tracking-wider font-semibold">Advisor</p>
                    <p className="text-[10px] font-bold text-slate-800 mt-0.5 leading-snug">{detailLead.assignedAdvisor}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-porsche-border bg-slate-50 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Car size={14} className="text-porsche-red" />
                    <span className="text-xs font-bold text-slate-900">{detailLead.model}</span>
                  </div>
                  {detailLead.specs && (
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div><span className="text-porsche-muted">Paint:</span> <span className="font-semibold text-slate-800">{detailLead.specs.paint}</span></div>
                      <div><span className="text-porsche-muted">Wheels:</span> <span className="font-semibold text-slate-800">{detailLead.specs.wheels}</span></div>
                      <div><span className="text-porsche-muted">Interior:</span> <span className="font-semibold text-slate-800">{detailLead.specs.interior}</span></div>
                      <div><span className="text-porsche-muted">Packages:</span> <span className="font-semibold text-slate-800">{detailLead.specs.packages?.join(', ') || '—'}</span></div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <CalendarCheck size={14} className="text-porsche-red" />
                    <span className="text-xs font-bold text-slate-900">Test Drive Scheduler</span>
                  </div>
                  {driveBooked[detailLead.id] ? (
                    <div className="p-3 bg-porsche-green/10 border border-porsche-green/25 rounded-xl text-xs text-porsche-green font-semibold flex items-center gap-2">
                      <CalendarCheck size={13} />
                      Booked: {driveBooked[detailLead.id]}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        {TEST_DRIVE_SLOTS.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedDriveSlot(slot)}
                            className={`py-2 px-3 rounded-xl border text-[10px] font-semibold text-left transition-all ${
                              selectedDriveSlot === slot
                                ? 'border-porsche-red bg-porsche-red/5 text-porsche-red'
                                : 'border-slate-200 text-slate-700 hover:border-porsche-red/40 hover:text-porsche-red'
                            }`}
                          >
                            <Clock size={9} className="inline mr-1" />
                            {slot}
                          </button>
                        ))}
                      </div>
                      {selectedDriveSlot && (
                        <button
                          onClick={handleBookDrive}
                          className="w-full py-2.5 bg-porsche-red text-white text-xs font-semibold rounded-xl hover:bg-red-700 hover:shadow-glow-red transition-all"
                        >
                          Confirm — {selectedDriveSlot}
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-porsche-red" />
                    <span className="text-xs font-bold text-slate-900">Engagement Timeline</span>
                  </div>
                  <div className="relative pl-4 border-l-2 border-porsche-border/40 flex flex-col gap-4">
                    {(LEAD_TIMELINES[detailLead.id] || []).map((event, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className="relative"
                      >
                        <span className={`absolute -left-[21px] w-3 h-3 rounded-full border-2 border-white ${
                          event.type === 'config' ? 'bg-porsche-red' :
                          event.type === 'visit' ? 'bg-porsche-green' :
                          event.type === 'contact' ? 'bg-porsche-gold' : 'bg-slate-300'
                        }`} />
                        <p className="text-xs font-semibold text-slate-900">{event.event}</p>
                        <p className="text-[10px] text-porsche-muted">{event.detail}</p>
                        <p className="text-[9px] text-porsche-muted/60 font-mono mt-0.5">{event.time}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-porsche-border bg-slate-50 shrink-0">
                <button
                  onClick={() => { setSelectedLeadId(detailLead.id); openConfigurator(detailLead); setDetailLead(null); }}
                  className="w-full py-2.5 bg-porsche-red text-white text-xs font-semibold rounded-xl hover:bg-red-700 hover:shadow-glow-red transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={13} />
                  Open Vehicle Configurator
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
