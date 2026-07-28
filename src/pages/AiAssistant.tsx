import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  User, 
  Car, 
  TrendingUp, 
  Zap, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  tableData?: { model: string; demand: string; status: string }[];
  actionLabel?: string;
}

export default function AiAssistant() {
  const { theme } = useTheme();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Greetings Executive. I am Porsche Digital Intelligence v4.2 calibrated for Porsche Center Santo Domingo. How may I optimize your fleet telemetry, inventory routing, or sales conversion today?',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Summarize Taycan inventory bottlenecks in Santo Domingo',
    'Predict Q3 conversion rate for 911 GT3 RS',
    'Calculate trade-in value trend for Cayenne Coupé',
    'Recommend optimal lead routing for Luis Corripio',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = `Analyzing query: "${query}" across Santo Domingo database...`;
      let tableData;
      let actionLabel;

      if (query.toLowerCase().includes('taycan')) {
        aiText = 'Taycan Electric inventory in Santo Domingo shows 94% allocation speed. Ultra-fast 800V charging station load is optimal.';
        tableData = [
          { model: 'Taycan Turbo GT', demand: 'High (32 leads)', status: 'In Transit' },
          { model: 'Taycan 4 Cross Turismo', demand: 'Moderate (14 leads)', status: 'Showroom Floor' },
        ];
        actionLabel = 'Reroute Caucedo Port Shipment';
      } else if (query.toLowerCase().includes('911')) {
        aiText = '911 GT3 RS Weissach Package demand is at record highs. AI conversion probability for top 5 leads is 96.2%.';
        tableData = [
          { model: '911 GT3 RS (Guards Red)', demand: 'Extreme', status: 'Reserved' },
          { model: '911 Carrera GTS', demand: 'High', status: 'Available' },
        ];
        actionLabel = 'View Lead Scoring Matrix';
      } else {
        aiText = 'Executive summary generated: Dealership conversion velocity is +18.4% above Q2 targets with 98.8% inventory allocation efficiency.';
      }

      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        tableData,
        actionLabel,
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08] shrink-0">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1 flex items-center gap-1.5">
            <Sparkles size={14} className="animate-spin" />
            Porsche Digital AI Copilot
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            AI Assistant
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-porsche-red bg-porsche-red/10 border border-porsche-red/20 px-3 py-1 rounded-full">
            Neural Latency: 12ms
          </span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 porsche-card flex flex-col justify-between overflow-hidden relative">
        {/* Dark Mode Red Holographic Glow Backdrop Effect */}
        {theme === 'dark' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-porsche-red/10 blur-[120px] pointer-events-none" />
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-porsche-red text-white shadow-glow-red'
                }`}
              >
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div
                className={`p-5 rounded-2xl flex flex-col gap-3 text-body-16 ${
                  msg.sender === 'user'
                    ? 'bg-porsche-red text-white font-semibold'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-black/5 dark:border-white/10'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>

                {msg.tableData && (
                  <div className="mt-2 overflow-x-auto rounded-xl bg-black/10 dark:bg-black/30 p-3">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/20 text-slate-400 font-mono">
                          <th className="pb-2">Model</th>
                          <th className="pb-2">Demand</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {msg.tableData.map((row, i) => (
                          <tr key={i}>
                            <td className="py-2 font-bold">{row.model}</td>
                            <td className="py-2">{row.demand}</td>
                            <td className="py-2 text-porsche-red font-bold">{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {msg.actionLabel && (
                  <button className="w-max px-4 py-2 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red mt-1 cursor-pointer">
                    {msg.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-9 h-9 rounded-full bg-porsche-red text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/10 text-xs font-mono text-slate-500 animate-pulse">
                Processing neural telemetry...
              </div>
            </div>
          )}
        </div>

        {/* Prompt Templates & Input Bar */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300 hover:text-porsche-red dark:hover:text-porsche-red hover:border-porsche-red/30 whitespace-nowrap cursor-pointer theme-transition"
              >
                {p}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Porsche AI anything about Santo Domingo inventory, VIP leads, or forecasts..."
              className="flex-1 p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-porsche-red"
            />
            <button
              type="submit"
              className="p-3.5 rounded-2xl bg-porsche-red text-white hover:bg-red-700 shadow-glow-red cursor-pointer theme-transition"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
