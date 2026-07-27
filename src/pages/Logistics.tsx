import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  Camera, 
  Sliders, 
  Wind, 
  Radio, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  Hourglass,
  Scan,
  ShoppingCart,
  X,
  Package,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import type { PartItem, Vehicle } from '../services/api';

interface PartOrder {
  partId: string;
  partName: string;
  qty: number;
  submitted: boolean;
}

export default function Logistics() {
  const [inventory, setInventory] = useState<PartItem[]>([]);
  const [fleet, setFleet] = useState<Vehicle[]>([]);
  const [scheduledVins, setScheduledVins] = useState<Record<string, boolean>>({});

  const [isScanning, setIsScanning] = useState(false);
  const [scanTarget, setScanTarget] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    partName: string;
    confidence: number;
    partNumber: string;
    compatibility: string;
  } | null>(null);

  const [orderModal, setOrderModal] = useState<PartItem | null>(null);
  const [orderQty, setOrderQty] = useState(10);
  const [submittedOrders, setSubmittedOrders] = useState<Record<string, PartOrder>>({});
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrderPart = async () => {
    if (!orderModal) return;
    setIsOrdering(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmittedOrders(prev => ({
      ...prev,
      [orderModal.id]: { partId: orderModal.id, partName: orderModal.name, qty: orderQty, submitted: true }
    }));
    setIsOrdering(false);
    setOrderModal(null);
  };

  useEffect(() => {
    const fetchData = () => {
      api.logistics.getInventory()
        .then(data => setInventory(data.inventory))
        .catch(console.error);

      api.logistics.getFleet()
        .then(data => {
          setFleet(data.fleet);
          setScheduledVins(data.scheduledVins);
        })
        .catch(console.error);
    };

    fetchData();
    const interval = setInterval(fetchData, 4500);
    return () => clearInterval(interval);
  }, []);

  const toggleSchedule = (vin: string) => {
    setScheduledVins(prev => ({
      ...prev,
      [vin]: !prev[vin]
    }));

    api.logistics.scheduleService(vin)
      .then(res => {
        setScheduledVins(prev => ({
          ...prev,
          [vin]: res.isScheduled
        }));
      })
      .catch(err => {
        console.error('Failed to schedule service:', err);
        setScheduledVins(prev => ({
          ...prev,
          [vin]: !prev[vin]
        }));
      });
  };

  const runAIScan = (target: string) => {
    setIsScanning(true);
    setScanTarget(target);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (target === 'brake') {
        setScanResult({
          partName: 'Porsche PCCB Ceramic Brake Disc (Front-Right)',
          confidence: 98.6,
          partNumber: 'OEM-992-351-408-H',
          compatibility: '911 Carrera GTS / GT3 RS (992)'
        });
      } else if (target === 'filter') {
        setScanResult({
          partName: 'Activated Carbon Fine Cabin Microfilter',
          confidence: 97.4,
          partNumber: 'OEM-Y1A-819-638-A',
          compatibility: 'Taycan (All electric variants) & Cayenne Hybrid'
        });
      } else if (target === 'port') {
        setScanResult({
          partName: 'HV High Voltage EV Charger Inlet Plug socket',
          confidence: 95.8,
          partNumber: 'OEM-MAC-825-915-K',
          compatibility: 'Macan EV & Taycan Cross Turismo'
        });
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Pillar 2: <span className="font-semibold text-porsche-green">Logistics & After-Sales</span></h1>
          <p className="text-sm text-porsche-muted font-light mt-1">Real-time connected fleet metrics, predictive parts replenishment, and DGA customs logistics.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 tracking-wide flex items-center gap-2">
              <Truck size={18} className="text-porsche-green" />
              Predictive Parts Inventory vs Demand
            </h2>
            <p className="text-xs text-porsche-muted font-light mt-0.5">Customs logistics mapping and warehouse depletion warnings.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventory}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barSize={16}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.03)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94A3B8" 
                  fontSize={10} 
                  tickLine={false}
                  tickFormatter={(val) => val.split(' ')[0]} 
                />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: 'rgba(15, 23, 42, 0.08)', 
                    borderRadius: '12px',
                    color: '#0F172A'
                  }}
                  itemStyle={{ fontSize: '12px' }}
                  labelStyle={{ fontSize: '11px', color: '#475569' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar name="Warehouse Stock" dataKey="stock" fill="#D5001C" radius={[4, 4, 0, 0]} />
                <Bar name="AI Predicted 30D Demand" dataKey="predictedDemand" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs text-porsche-muted uppercase tracking-wider font-semibold">Customs Clearance Pipeline (DGA)</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {inventory.map((item) => {
                const ordered = submittedOrders[item.id];
                return (
                  <div key={item.id} className="p-3 bg-slate-50 border border-porsche-border/65 rounded-xl flex flex-col gap-1.5 relative overflow-hidden group">
                    <span className="text-[10px] text-slate-800 font-medium truncate">{item.name}</span>
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold border ${
                        item.status === 'Critical' ? 'bg-porsche-rose/10 text-porsche-rose border-porsche-rose/20' :
                        item.status === 'Low' ? 'bg-porsche-gold/10 text-porsche-gold border-porsche-gold/20' :
                        'bg-porsche-emerald/10 text-porsche-emerald border-porsche-emerald/20'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-[9px] text-porsche-green font-semibold flex items-center gap-1 font-mono">
                        <Hourglass size={8} /> {item.customsEtaDays}d DGA
                      </span>
                    </div>
                    {ordered ? (
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] text-porsche-green font-bold">
                        <CheckCircle size={9} /> Ordered — {ordered.qty} units
                      </div>
                    ) : (
                      <button
                        onClick={() => { setOrderModal(item); setOrderQty(Math.max(5, item.predictedDemand - item.stock)); }}
                        className={`mt-0.5 w-full flex items-center justify-center gap-1 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                          item.status === 'Critical' 
                            ? 'bg-porsche-rose/10 border-porsche-rose/25 text-porsche-rose hover:bg-porsche-rose hover:text-white' 
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-porsche-red/10 hover:border-porsche-red/30 hover:text-porsche-red'
                        }`}
                      >
                        <ShoppingCart size={8} /> Order Parts
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 tracking-wide flex items-center gap-2">
              <Camera size={18} className="text-porsche-green" />
              Visual AI Parts Recognition
            </h2>
            <p className="text-xs text-porsche-muted font-light mt-0.5">Scan inbound shipment components using computer-vision mapping models.</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs text-porsche-muted uppercase tracking-wider font-semibold">Select Sample Parts Thumbnail</span>
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => runAIScan('brake')}
                disabled={isScanning}
                className={`p-4 bg-slate-50 border rounded-xl flex flex-col items-center gap-2 transition-all group ${
                  scanTarget === 'brake' ? 'border-porsche-red bg-porsche-red/5' : 'border-porsche-border hover:border-porsche-red'
                }`}
              >
                <div className="p-2 rounded-lg bg-porsche-red/10 text-porsche-red group-hover:scale-105 transition-transform">
                  <Radio size={20} />
                </div>
                <span className="text-[10px] text-slate-900 font-medium">Brake Disc</span>
              </button>

              <button 
                onClick={() => runAIScan('filter')}
                disabled={isScanning}
                className={`p-4 bg-slate-50 border rounded-xl flex flex-col items-center gap-2 transition-all group ${
                  scanTarget === 'filter' ? 'border-porsche-red bg-porsche-red/5' : 'border-porsche-border hover:border-porsche-red'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-900/5 text-slate-800 group-hover:scale-105 transition-transform">
                  <Wind size={20} />
                </div>
                <span className="text-[10px] text-slate-900 font-medium">Cabin Filter</span>
              </button>

              <button 
                onClick={() => runAIScan('port')}
                disabled={isScanning}
                className={`p-4 bg-slate-50 border rounded-xl flex flex-col items-center gap-2 transition-all group ${
                  scanTarget === 'port' ? 'border-porsche-green bg-porsche-green/5' : 'border-porsche-border hover:border-porsche-green'
                }`}
              >
                <div className="p-2 rounded-lg bg-porsche-green/10 text-porsche-green group-hover:scale-105 transition-transform">
                  <Zap size={20} />
                </div>
                <span className="text-[10px] text-slate-900 font-medium">Charging Port</span>
              </button>
            </div>

            <div className="relative border border-porsche-border rounded-xl bg-slate-100/40 h-44 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              {isScanning ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 z-10">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-porsche-red to-transparent absolute top-0 left-0 right-0 animate-[bounce_1.5s_infinite]" />
                  <Scan className="text-porsche-red animate-pulse mb-2" size={32} />
                  <span className="text-xs text-slate-900 font-medium tracking-widest animate-pulse uppercase">Scanning part...</span>
                </div>
              ) : null}

              <AnimatePresence mode="wait">
                {scanResult ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col gap-2.5 items-start text-left"
                  >
                    <div className="flex justify-between w-full items-baseline border-b border-porsche-border/40 pb-2">
                      <span className="text-xs font-semibold text-slate-900 tracking-wide">{scanResult.partName}</span>
                      <span className="text-xs font-bold text-porsche-red">{scanResult.confidence}% Conf</span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full text-xs">
                      <div>
                        <span className="text-[9px] text-porsche-muted uppercase block">Part OEM Number</span>
                        <span className="font-mono text-slate-800 text-[11px]">{scanResult.partNumber}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-porsche-muted uppercase block">Compatibility Mapping</span>
                        <span className="text-slate-800 text-[11px]">{scanResult.compatibility}</span>
                      </div>
                    </div>

                    <div className="w-full mt-2 py-1.5 px-3 bg-porsche-green/10 rounded-lg border border-porsche-green/20 text-[10px] text-slate-800">
                      AI verification successful: Stock record automatically cataloged.
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-porsche-muted">
                    <Camera size={26} className="opacity-40" />
                    <span className="text-xs">Click a part thumbnail above to run visual AI recognition diagnostic scan.</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="porsche-card-glow p-6 rounded-2xl flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 tracking-wide flex items-center gap-2">
            <Sliders size={18} className="text-porsche-green" />
            Connected Vehicle Telematics & Diagnosis Feed
          </h2>
          <p className="text-xs text-porsche-muted font-light mt-0.5">Predicted maintenance queues derived from real-time wear analysis.</p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-porsche-border text-[11px] uppercase tracking-wider text-porsche-muted font-semibold">
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Plate</th>
                <th className="py-3 px-4">Mileage</th>
                <th className="py-3 px-4">Brake Wear</th>
                <th className="py-3 px-4">Suspension Wear</th>
                <th className="py-3 px-4">Filter Wear</th>
                <th className="py-3 px-4">Predicted Service Need</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-porsche-border/40 text-xs">
              {fleet.map((car) => {
                const isScheduled = scheduledVins[car.vin];
                return (
                  <tr key={car.vin} className="hover:bg-slate-900/5 transition-colors group">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-porsche-red transition-colors">
                      <div className="flex flex-col">
                        <span>{car.model}</span>
                        <span className="text-[10px] text-porsche-muted font-mono font-normal uppercase">{car.vin}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">{car.plate}</td>
                    <td className="py-3.5 px-4 font-mono">{car.mileage.toLocaleString()} km</td>
                    
                    <td className="py-3.5 px-4 min-w-[100px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px]">{car.wearBrakes}%</span>
                        <div className="h-1.5 w-full bg-slate-100 border border-porsche-border rounded overflow-hidden">
                          <div className={`h-full rounded ${car.wearBrakes >= 80 ? 'bg-porsche-rose' : car.wearBrakes >= 55 ? 'bg-porsche-gold' : 'bg-porsche-green'}`} style={{ width: `${car.wearBrakes}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 min-w-[100px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px]">{car.wearSuspension}%</span>
                        <div className="h-1.5 w-full bg-slate-100 border border-porsche-border rounded overflow-hidden">
                          <div className={`h-full rounded ${car.wearSuspension >= 80 ? 'bg-porsche-rose' : car.wearSuspension >= 55 ? 'bg-porsche-gold' : 'bg-porsche-green'}`} style={{ width: `${car.wearSuspension}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 min-w-[100px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px]">{car.wearFilters}%</span>
                        <div className="h-1.5 w-full bg-slate-100 border border-porsche-border rounded overflow-hidden">
                          <div className={`h-full rounded ${car.wearFilters >= 80 ? 'bg-porsche-rose' : car.wearFilters >= 55 ? 'bg-porsche-gold' : 'bg-porsche-green'}`} style={{ width: `${car.wearFilters}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          {car.severity === 'Urgent' ? <AlertCircle className="text-porsche-rose shrink-0" size={12} /> : 
                           car.severity === 'Attention' ? <AlertCircle className="text-porsche-gold shrink-0" size={12} /> : 
                           <CheckCircle className="text-porsche-emerald shrink-0" size={12} />}
                          <span className={`font-medium ${
                            car.severity === 'Urgent' ? 'text-porsche-rose' : 
                            car.severity === 'Attention' ? 'text-porsche-gold' : 
                            'text-porsche-muted'
                          }`}>{car.predictedServiceNeeds}</span>
                        </div>
                        <span className="text-[9px] text-porsche-muted font-mono">Signal: {car.lastSignalTime}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleSchedule(car.vin)}
                        className={`px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all uppercase tracking-wider ${
                          isScheduled 
                            ? 'bg-porsche-emerald/10 border-porsche-emerald text-porsche-emerald' 
                            : 'bg-porsche-red/10 border-porsche-red text-porsche-red hover:bg-porsche-red hover:text-white hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isScheduled ? 'Scheduled' : 'Book Service'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <AnimatePresence>
        {orderModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderModal(null)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-[2px] z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-porsche-border z-50 p-6 flex flex-col gap-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-porsche-red/10 text-porsche-red">
                    <Package size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Restock Order</h3>
                    <p className="text-[10px] text-porsche-muted">Porsche Parts Network — Santo Domingo</p>
                  </div>
                </div>
                <button onClick={() => setOrderModal(null)} className="p-1 rounded-lg text-porsche-muted hover:text-slate-900 hover:bg-slate-100 transition-all">
                  <X size={15} />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-porsche-border">
                <p className="text-[10px] text-porsche-muted uppercase tracking-wider font-semibold">Part</p>
                <p className="text-sm font-semibold text-slate-900">{orderModal.name}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-[10px] text-porsche-muted">Current stock: <strong className="text-slate-800">{orderModal.stock}</strong></span>
                  <span className="text-[10px] text-porsche-muted">30D demand: <strong className="text-slate-800">{orderModal.predictedDemand}</strong></span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Order Quantity</label>
                  <span className="text-sm font-bold text-porsche-red font-mono">{orderQty} units</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={orderQty}
                  onChange={e => setOrderQty(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-porsche-red"
                />
                <div className="flex justify-between text-[9px] text-porsche-muted font-mono">
                  <span>1</span><span>50 max</span>
                </div>
              </div>

              <div className="p-3 bg-porsche-red/5 border border-porsche-red/15 rounded-xl text-[10px] text-slate-700 flex items-start gap-2">
                <ArrowRight size={11} className="text-porsche-red shrink-0 mt-0.5" />
                Order will be routed to Porsche AG Parts Logistics Europe and cleared through DGA Santo Domingo. Expected customs ETA: <strong>{orderModal.customsEtaDays + 2}–{orderModal.customsEtaDays + 5} days</strong>.
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setOrderModal(null)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrderPart}
                  disabled={isOrdering}
                  className="flex-1 py-2.5 bg-porsche-red text-white text-xs font-semibold rounded-xl hover:bg-red-700 hover:shadow-glow-red transition-all disabled:opacity-60 flex items-center justify-center gap-1.5"
                >
                  {isOrdering ? (
                    <><span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Submitting...</>
                  ) : (
                    <><ShoppingCart size={12} /> Submit Order</>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
