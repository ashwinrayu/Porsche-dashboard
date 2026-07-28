import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Bot, 
  X,
  Check,
  Camera,
  User,
  Building2,
  Save
} from 'lucide-react';
import { api } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Profile() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  // Profile state
  const [profile, setProfile] = useState({
    name: 'Eduardo Bisonó',
    role: 'Senior Sales Advisor',
    location: 'Porsche Center Santo Domingo',
    phone: '+1 (809) 555-0142',
    email: 'eduardo.bisono@porsche.com.do',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile photo — starts with generated asset, can be replaced from disk
  const [photoUrl, setPhotoUrl] = useState<string>('/profile-eduardo.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) setPhotoUrl(ev.target.result as string);
    };
    reader.readAsDataURL(file);
    // reset so same file can be picked again
    e.target.value = '';
  };

  const openEdit = () => {
    setEditForm({ ...profile });
    setSaveSuccess(false);
    setIsEditOpen(true);
  };

  const handleSave = () => {
    setProfile({ ...editForm });
    setSaveSuccess(true);
    setTimeout(() => {
      setIsEditOpen(false);
      setSaveSuccess(false);
    }, 1200);
  };

  const activities = [
    { text: 'Configured 911 Carrera GTS', detail: 'For Luis Corripio', time: '2m ago' },
    { text: 'Closed Deal', detail: '911 GTS — $415,000', time: '1h ago' },
    { text: 'New Lead Assigned', detail: 'María Vásquez — Macan Electric', time: '3h ago' },
    { text: 'Service Follow-up', detail: 'Cayenne — Brake Replacement', time: '5h ago' },
    { text: 'Trade-in Evaluation', detail: '2019 Cayenne — Carlos Llenas', time: '1d ago' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-widest">
            {t.profileSubtitle}
          </span>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            {t.profileTitle}
          </h1>
        </div>
      </div>

      {/* 1. TOP PROFILE HEADER & AI ASSISTANT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Advisor Profile Card (7 Cols) */}
        <div className="lg:col-span-7 porsche-card flex flex-col justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-porsche-red shadow-[0_0_20px_rgba(213,0,28,0.5)]">
                  <img
                    src={photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Online status dot */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-card-22 font-bold text-slate-900 dark:text-white">{profile.name}</h2>
                <span className="text-xs text-slate-500 font-semibold">{profile.role}</span>
              </div>
            </div>

            {/* Edit Profile Button — now wired up */}
            <button
              onClick={openEdit}
              className="px-5 py-2.5 rounded-full border border-porsche-red/40 text-xs font-bold text-porsche-red hover:bg-porsche-red hover:text-white shadow-glow-red-sm theme-transition cursor-pointer flex items-center gap-2"
            >
              <User size={13} />
              Edit Profile
            </button>
          </div>

          {/* Contact & Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 pt-4 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-porsche-red shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-porsche-red shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-porsche-red shrink-0" />
              <span className="truncate">{profile.email}</span>
            </div>
          </div>

          {/* Master Certified Badges */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full bg-porsche-red/10 text-porsche-red">
              Top Performer
            </span>
            <span className="text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              GT Specialist
            </span>
            <span className="text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              EV Certified
            </span>
          </div>
        </div>

        {/* AI Assistant Panel (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col justify-between gap-4 bg-gradient-to-br from-porsche-red/5 via-transparent to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">AI Assistant</h3>
              <p className="text-small-13 text-slate-500">Your AI-powered daily brief</p>
            </div>
            <Bot size={22} className="text-porsche-red" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div
              onClick={() => { window.location.hash = '#/sales'; }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 cursor-pointer hover:border-porsche-red/50 hover:shadow-sm transition-all"
            >
              <span className="text-card-22 font-bold text-porsche-red block">7</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Hot Leads</span>
            </div>
            <div
              onClick={() => { window.location.hash = '#/sales'; }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 cursor-pointer hover:border-amber-500/50 hover:shadow-sm transition-all"
            >
              <span className="text-card-22 font-bold text-amber-500 block">2</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Deals Expiring</span>
            </div>
            <div
              onClick={() => { window.location.hash = '#/logistics'; }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 cursor-pointer hover:border-blue-500/50 hover:shadow-sm transition-all"
            >
              <span className="text-card-22 font-bold text-blue-500 block">3</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Service Alerts</span>
            </div>
            <div
              onClick={() => { window.location.hash = '#/notifications'; }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 cursor-pointer hover:border-emerald-500/50 hover:shadow-sm transition-all"
            >
              <span className="text-card-22 font-bold text-emerald-500 block">1</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Executive Request</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM ROW: PERFORMANCE OVERVIEW & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Overview (7 Cols) */}
        <div className="lg:col-span-7 porsche-card flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Performance Overview</h3>
            <p className="text-small-13 text-slate-500">This Month</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: '73', label: 'Lead Score', color: 'border-porsche-red' },
              { val: '11.4', label: 'Avg. Days to Close', color: 'border-amber-500' },
              { val: '312', label: 'Closed Deals', color: 'border-emerald-500' },
              { val: '4.9★', label: 'Avg. Rating', color: 'border-blue-500' },
            ].map((m) => (
              <div
                key={m.label}
                onClick={() => { window.location.hash = '#/sales'; }}
                className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 cursor-pointer hover:border-porsche-red/50 transition-all"
              >
                <div className={`w-16 h-16 rounded-full border-4 ${m.color} flex items-center justify-center text-body-16 font-bold text-slate-900 dark:text-white font-mono`}>
                  {m.val}
                </div>
                <span className="text-[10px] text-slate-400 font-mono uppercase">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-around pt-4 border-t border-black/5 dark:border-white/5">
            {[1, 2, 3, 4].map((badge) => (
              <div key={badge} className="w-10 h-10 rounded-xl bg-porsche-red/10 text-porsche-red flex items-center justify-center border border-porsche-red/20 shadow-glow-red hover:scale-110 transition-transform cursor-pointer">
                <Award size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity List (5 Cols) */}
        <div className="lg:col-span-5 porsche-card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">{t.recentActivity}</h3>
            <button
              onClick={() => { window.location.hash = '#/sales'; }}
              className="text-xs font-bold text-porsche-red hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {activities.map((act, idx) => (
              <div
                key={idx}
                onClick={() => { window.location.hash = '#/sales'; }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-porsche-red/50 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-body-16 font-bold text-slate-900 dark:text-white group-hover:text-porsche-red transition-colors">{act.text}</p>
                  <p className="text-small-13 text-slate-500">{act.detail}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#121417] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-porsche-red uppercase font-bold tracking-widest">
                    PORSCHE COMMAND CENTER
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Edit Profile</h2>
                </div>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col gap-5">

                {/* Profile photo picker */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-porsche-red shadow-[0_0_16px_rgba(213,0,28,0.4)]">
                      <img
                        src={photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    {/* Camera button — opens file picker */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-porsche-red text-white flex items-center justify-center shadow cursor-pointer hover:bg-red-700 transition-colors"
                      title="Change profile photo"
                    >
                      <Camera size={11} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{editForm.name}</p>
                    <p className="text-xs text-slate-400">{editForm.role}</p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 gap-4">

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-porsche-red transition-colors"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Job Title</label>
                    <div className="relative">
                      <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-porsche-red transition-colors"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Location</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-porsche-red transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Phone</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-porsche-red transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">Email</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-porsche-red transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 bg-slate-50 dark:bg-[#0E1013]">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-2.5 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer flex items-center gap-2 uppercase"
                >
                  {saveSuccess ? (
                    <>
                      <Check size={14} />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
