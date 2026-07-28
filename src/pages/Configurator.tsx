import React, { useState } from 'react';
import { 
  Sliders, 
  Car, 
  Check, 
  Download, 
  Share2, 
  Sparkles, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { useTheme } from '../context/ThemeContext';

interface PorscheModel {
  id: string;
  name: string;
  basePrice: number;
  lightImg: string;
  darkImg: string;
  hp: string;
  zeroToSixty: string;
}

const PORSCHE_MODELS: PorscheModel[] = [
  {
    id: '911-gt3rs',
    name: '911 GT3 RS',
    basePrice: 241300,
    lightImg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    hp: '518 hp',
    zeroToSixty: '3.0s',
  },
  {
    id: 'taycan-turbogt',
    name: 'Taycan Turbo GT',
    basePrice: 230000,
    lightImg: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    darkImg: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    hp: '1,019 hp',
    zeroToSixty: '2.1s',
  },
  {
    id: 'panamera-ehybrid',
    name: 'Panamera 4 E-Hybrid',
    basePrice: 115500,
    lightImg: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    darkImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    hp: '463 hp',
    zeroToSixty: '3.9s',
  },
];

const PAINTS = [
  { name: 'Guards Red', price: 0, hex: '#D5001C' },
  { name: 'Carrara White Metallic', price: 840, hex: '#F5F5F5' },
  { name: 'Jet Black Metallic', price: 840, hex: '#111111' },
  { name: 'Gentian Blue Metallic', price: 840, hex: '#1E3A8A' },
  { name: 'Crayon Grey', price: 3270, hex: '#94A3B8' },
];

const PACKAGES = [
  { id: 'weissach', name: 'Weissach Package (Carbon Roof & Aero)', price: 33520 },
  { id: 'pccb', name: 'Porsche Ceramic Composite Brakes (PCCB)', price: 10110 },
  { id: 'chrono', name: 'Sport Chrono Package with Mode Switch', price: 1350 },
  { id: 'burmester', name: 'Burmester® High-End Surround Sound', price: 5810 },
];

export default function Configurator() {
  const { theme } = useTheme();
  const [selectedModel, setSelectedModel] = useState<PorscheModel>(PORSCHE_MODELS[0]);
  const [selectedPaint, setSelectedPaint] = useState(PAINTS[0]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(['weissach', 'pccb']);
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const packageTotal = selectedPackages.reduce((acc, pkgId) => {
    const pkg = PACKAGES.find(p => p.id === pkgId);
    return acc + (pkg ? pkg.price : 0);
  }, 0);

  const totalPrice = selectedModel.basePrice + selectedPaint.price + packageTotal;

  const togglePackage = (id: string) => {
    setSelectedPackages(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Porsche Exclusive Manufaktur
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Vehicle Configurator Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuoteGenerated(true)}
            className="px-5 py-2.5 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            <span>Generate Executive PDF Quote</span>
          </button>
        </div>
      </div>

      {/* Model Selection Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PORSCHE_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-2 theme-transition cursor-pointer ${
              selectedModel.id === model.id
                ? 'border-porsche-red bg-porsche-red/10 shadow-glow-red-sm font-bold'
                : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
            }`}
          >
            <span className="text-body-16 font-bold text-slate-900 dark:text-white">{model.name}</span>
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono mt-1">
              <span>{model.hp} • {model.zeroToSixty}</span>
              <span className="font-bold text-porsche-red">${model.basePrice.toLocaleString()} USD</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Studio Viewport (Dual Vehicle Asset Engine) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Vehicle Preview Stage (2 Columns) */}
        <div className="lg:col-span-2 porsche-card flex flex-col gap-6 relative justify-between">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-porsche-red uppercase font-mono font-bold">Live Configurator Stage</span>
              <h2 className="text-section-30 font-bold text-slate-900 dark:text-white">{selectedModel.name}</h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              Paint: {selectedPaint.name}
            </span>
          </div>

          {/* Dual Vehicle Asset Display (Swaps White <-> Black based on theme) */}
          <div className="w-full h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
            <VehicleImage
              lightSrc={selectedModel.lightImg}
              darkSrc={selectedModel.darkImg}
              alt={selectedModel.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span>Engine: {selectedModel.hp}</span>
              <span>•</span>
              <span>0-60 mph: {selectedModel.zeroToSixty}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Total Estimated Build</span>
              <p className="text-section-30 font-bold text-porsche-red">
                ${totalPrice.toLocaleString()} USD
              </p>
            </div>
          </div>
        </div>

        {/* Paint & Option Selection Panel (1 Column) */}
        <div className="porsche-card flex flex-col gap-6">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Customization Options</h3>
            <p className="text-small-13 text-slate-500 dark:text-slate-400 mt-1">
              Select exterior paint & Weissach performance packages.
            </p>
          </div>

          {/* Paint Swatches */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-mono text-slate-400 uppercase">Exterior Paint Finish</label>
            <div className="flex items-center gap-3">
              {PAINTS.map((paint) => (
                <button
                  key={paint.name}
                  onClick={() => setSelectedPaint(paint)}
                  title={paint.name}
                  style={{ backgroundColor: paint.hex }}
                  className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                    selectedPaint.name === paint.name ? 'border-porsche-red scale-110 shadow-glow-red' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-mono text-slate-400 uppercase">Performance Packages</label>
            {PACKAGES.map((pkg) => {
              const isChecked = selectedPackages.includes(pkg.id);
              return (
                <button
                  key={pkg.id}
                  onClick={() => togglePackage(pkg.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs theme-transition cursor-pointer ${
                    isChecked
                      ? 'border-porsche-red bg-porsche-red/10 text-slate-900 dark:text-white font-bold'
                      : 'border-black/10 dark:border-white/10 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-porsche-red border-porsche-red text-white' : 'border-slate-400'}`}>
                      {isChecked && <Check size={10} />}
                    </div>
                    <span>{pkg.name}</span>
                  </div>
                  <span className="font-mono text-porsche-red">+${pkg.price.toLocaleString()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
