import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Zap, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  Scan, 
  UploadCloud, 
  ArrowRight, 
  Car 
} from 'lucide-react';
import { VehicleImage } from '../components/VehicleImage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Logistics() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [uploadedPart, setUploadedPart] = useState(true);

  const fleet = [
    {
      model: '911 Carrera GTS',
      health: '98%',
      mileage: '12,450 mi',
      lightImg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    },
    {
      model: 'Taycan 4S',
      health: '96%',
      mileage: '8,210 mi',
      lightImg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    },
    {
      model: 'Cayenne E-Hybrid',
      health: '92%',
      mileage: '18,320 mi',
      lightImg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    },
    {
      model: 'Macan Electric',
      health: '95%',
      mileage: '5,120 mi',
      lightImg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      darkImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const serviceAppointments = [
    { service: 'Brake Replacement', model: '911 Carrera GTS', status: 'Confirmed', statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    { service: 'Cabin Filter Flush', model: 'Macan Turbo S', status: 'Scheduled', statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    { service: 'Suspension Check', model: 'Cayenne E-Hybrid', status: 'Scheduled', statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  ];

  const tradeInOpportunities = [
    { client: 'Carlos Llenas', vehicle: '911 Carrera', tag: 'High Value', tagColor: 'bg-porsche-red text-white' },
    { client: 'Milo Espaillat', vehicle: 'Macan Turbo', tag: 'Renewal', tagColor: 'bg-blue-600 text-white' },
    { client: 'Juan Vich', vehicle: '2018 Cayenne E-Hybrid', tag: 'Medium', tagColor: 'bg-amber-500 text-white' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. TOP ROW: PARTS INVENTORY HEATMAP & AI PARTS RECOGNITION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parts Inventory Heatmap */}
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{t.partsHeatmap}</h3>
              <p className="text-small-13 text-slate-500">{t.logisticsSubtitle}</p>
            </div>
            <button
              onClick={() => { window.location.hash = '#/reports'; }}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-porsche-red cursor-pointer flex items-center gap-1.5"
            >
              <span>View Full Inventory Report</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Map Representation Container */}
          <div className="w-full h-[180px] rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-studio-grid opacity-40 pointer-events-none" />
            <div className="flex items-center gap-8 z-10">
              <div className="flex flex-col items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-porsche-red animate-ping" />
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white">Santo Domingo</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white">Santiago</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white">Punta Cana</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-porsche-red" /> High</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low</span>
          </div>
        </div>

        {/* AI Parts Recognition */}
        <div className="porsche-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">AI Parts Recognition</h3>
              <p className="text-small-13 text-slate-500">Upload or scan part for AI identification</p>
            </div>
            <Scan size={18} className="text-porsche-red" />
          </div>

          {/* Drag & Drop Upload Zone */}
          <div className="w-full h-[140px] rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-porsche-red theme-transition">
            <UploadCloud size={28} className="text-porsche-red mb-1" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">Drag & drop part image</p>
            <p className="text-[10px] text-slate-400 font-mono">or click to upload</p>
          </div>

          {/* Identified OEM Part Details Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 grid grid-cols-3 gap-2 text-xs font-mono">
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-mono block">OEM Part</span>
              <span className="font-bold text-porsche-red">911 007 001 01 (Brake Disc)</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-mono block">Availability</span>
              <span className="font-bold text-slate-900 dark:text-white">12 units (3 warehouses)</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-400 uppercase font-mono block">ETA</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: CONNECTED FLEET HEALTH (4 CARDS) */}
      <div className="porsche-card flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Connected Fleet Health</h3>
            <p className="text-small-13 text-slate-500">32 Vehicles Online</p>
          </div>
          <button className="text-xs font-bold text-porsche-red hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((car, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-3">
              <div className="w-full h-[120px] rounded-xl overflow-hidden shadow-md">
                <VehicleImage
                  lightSrc={car.lightImg}
                  darkSrc={car.darkImg}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-body-16 font-bold text-slate-900 dark:text-white">{car.model}</h4>

              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-black/5 dark:border-white/5">
                <div>
                  <span className="text-[9px] text-slate-400 block">Health</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{car.health}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block">Mileage</span>
                  <span className="font-bold text-slate-900 dark:text-white">{car.mileage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM ROW: SERVICE APPOINTMENTS & TRADE-IN OPPORTUNITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Appointments */}
        <div className="porsche-card flex flex-col gap-6">
          <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Service Appointments</h3>

          <div className="flex flex-col gap-3">
            {serviceAppointments.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{item.service}</p>
                  <p className="text-small-13 text-slate-500">{item.model}</p>
                </div>
                <span className={`text-xs font-bold uppercase font-mono px-3 py-1 rounded-full border ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-in & Renewal Opportunities */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Trade-in & Renewal Opportunities</h3>
            <button className="text-xs font-bold text-porsche-red hover:underline">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {tradeInOpportunities.map((opp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white">{opp.client}</p>
                  <p className="text-small-13 text-slate-500">{opp.vehicle}</p>
                </div>
                <span className={`text-xs font-bold uppercase font-mono px-3 py-1 rounded-full ${opp.tagColor}`}>
                  {opp.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
