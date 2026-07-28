import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Lock, User } from 'lucide-react';
import { api } from '../services/api';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await api.auth.login(username, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center font-sans antialiased"
      style={{ backgroundImage: "url('/porsche_login_bg.png')" }}
    >
      {/* Dark overlay mask to isolate the center panel */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Main Glassmorphic Panel */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col gap-8 transition-all">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Official Porsche Crest */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-porsche-red/20 blur-xl scale-150 pointer-events-none" />
            <img
              src="/porsche-crest-logo.png"
              alt="Porsche Crest"
              className="relative w-20 h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(213,0,28,0.35)]"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-950 tracking-[0.25em] uppercase">Porsche</h1>
            <span className="text-[10px] tracking-widest text-porsche-red uppercase font-bold">Command Center</span>
          </div>
          <p className="text-xs text-slate-500 font-light -mt-1">
            AI Operations & Dealer Intelligence Platform
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-600 leading-relaxed">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Username</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <User size={16} />
              </span>
              <input 
                type="text" 
                placeholder="porsche-admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-porsche-red focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={16} />
              </span>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-porsche-red focus:bg-white transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-porsche-red text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 hover:shadow-glow-red hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>

        {/* Demo info hint */}
        <div className="pt-4 border-t border-slate-100 text-center flex flex-col gap-1">
          <span className="text-[9px] text-slate-400 font-mono">
            Demo credentials:
          </span>
          <span className="text-[10px] text-slate-700 font-mono font-medium">
            porsche-admin / porsche-password
          </span>
        </div>

      </div>
    </div>
  );
}
