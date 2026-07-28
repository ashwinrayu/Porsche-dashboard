import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Bot, 
  Bell, 
  Key, 
  Globe, 
  ShieldCheck, 
  Check, 
  Sun, 
  Moon 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [selectedAiModel, setSelectedAiModel] = useState('Porsche Intelligence v4.2');
  const [webhookUrl, setWebhookUrl] = useState('https://api.porsche.com.do/webhooks/v1/telemetry');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            System & Infrastructure Control
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            System Settings
          </h1>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 flex items-center gap-2">
            <Check size={14} />
            Preferences Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appearance & Dual Premium Theme Options */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-porsche-red/10 text-porsche-red">
              <Sliders size={20} />
            </div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">Default Theme</h3>
          </div>

          <p className="text-small-13 text-slate-500 dark:text-slate-400">
            Select the default executive theme configuration on startup.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-3 theme-transition cursor-pointer ${
                theme === 'light'
                  ? 'border-porsche-red bg-porsche-red/5 font-bold'
                  : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <Sun size={20} className="text-amber-500" />
              <div>
                <p className="text-body-16 font-bold text-slate-900 dark:text-white">Executive Studio</p>
                <p className="text-[10px] text-slate-400 font-mono">Light Mode (#F7F7F5)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-3 theme-transition cursor-pointer ${
                theme === 'dark'
                  ? 'border-porsche-red bg-porsche-red/10 font-bold'
                  : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <Moon size={20} className="text-porsche-red" />
              <div>
                <p className="text-body-16 font-bold text-slate-900 dark:text-white">Mission Control</p>
                <p className="text-[10px] text-slate-400 font-mono">Dark Mode (#090909)</p>
              </div>
            </button>
          </div>
        </div>

        {/* Porsche AI Model Config */}
        <div className="porsche-card flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Bot size={20} />
            </div>
            <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">AI Engine Model</h3>
          </div>

          <p className="text-small-13 text-slate-500 dark:text-slate-400">
            Configure neural network algorithms powering lead routing and inventory predictions.
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-mono text-slate-400">Model Architecture</label>
            <select
              value={selectedAiModel}
              onChange={(e) => setSelectedAiModel(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white font-semibold"
            >
              <option value="Porsche Intelligence v4.2">Porsche Intelligence v4.2 (Ultra Low Latency)</option>
              <option value="Porsche Intelligence v4.0">Porsche Intelligence v4.0 (Legacy)</option>
              <option value="Gemini 1.5 Pro Executive">Gemini 1.5 Pro Executive Enterprise</option>
            </select>
          </div>
        </div>

        {/* API & Integrations */}
        <div className="porsche-card flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Key size={20} />
              </div>
              <h3 className="text-card-22 font-bold text-slate-900 dark:text-white">API Telemetry</h3>
            </div>

            <p className="text-small-13 text-slate-500 dark:text-slate-400">
              Santo Domingo dealership webhook endpoint for real-time inventory updates.
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-mono text-slate-400">Webhook URL</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition cursor-pointer"
          >
            Save All Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
