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
  ShieldCheck, 
  Mic, 
  Search, 
  Users, 
  BarChart3, 
  Check, 
  Cpu 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  chartData?: { month: string; value: number }[];
  lookupCard?: {
    type: 'vehicle' | 'customer' | 'inventory';
    title: string;
    sub: string;
    details: { label: string; val: string }[];
  };
  time: string;
}

export default function AiAssistant() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Welcome to Porsche Digital AI Enterprise Copilot. How may I assist your Santo Domingo operations today? You can query vehicle telemetry, VIP customer CRM, inventory allocation, or generate revenue forecasts.',
      time: '10:30 AM',
    },
  ]);

  const suggestedPrompts = [
    { label: 'Vehicle Lookup: 911 GT3 RS', type: 'vehicle' },
    { label: 'Customer Lookup: Luis Corripio', type: 'customer' },
    { label: 'Inventory Lookup: Caucedo Port', type: 'inventory' },
    { label: 'Generate Q3 Revenue Chart', type: 'chart' },
  ];

  const handleSend = (queryText?: string) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = `Processing enterprise query: "${text}"...`;
      let chartData;
      let lookupCard;

      const lower = text.toLowerCase();

      if (lower.includes('vehicle') || lower.includes('911') || lower.includes('gt3')) {
        aiText = 'Vehicle Lookup complete for Porsche 911 GT3 RS (VIN-911-8902). All CAN-bus diagnostics nominal.';
        lookupCard = {
          type: 'vehicle' as const,
          title: 'Porsche 911 GT3 RS (Guards Red)',
          sub: 'VIN-911-8902 • Reserved for Luis Corripio',
          details: [
            { label: 'Engine', val: '518 hp 4.0L Flat-6' },
            { label: 'Brake Wear', val: '12% Wear (PCCB)' },
            { label: 'Status', val: 'Showroom Floor — Delivery Ready' },
          ],
        };
      } else if (lower.includes('customer') || lower.includes('luis')) {
        aiText = 'Customer CRM profile retrieved for Luis Corripio (VIP-SD-001). High purchase intent detected.';
        lookupCard = {
          type: 'customer' as const,
          title: 'Luis Corripio (VIP Account)',
          sub: 'Piantini, Santo Domingo • LTV: $980,000 USD',
          details: [
            { label: 'AI Score', val: '96 / 100 (Immediate)' },
            { label: 'Current Fleet', val: '2023 911 Turbo S & 2021 Cayenne GTS' },
            { label: 'Pending Proposal', val: '911 GT3 RS ($341,200 USD)' },
          ],
        };
      } else if (lower.includes('inventory') || lower.includes('caucedo')) {
        aiText = 'Caucedo Port inventory telemetry retrieved. 14 units cleared customs and are en route to showroom.';
        lookupCard = {
          type: 'inventory' as const,
          title: 'Caucedo Port Storage Hub',
          sub: '14 Porsche Vehicles • ETA 42 Mins',
          details: [
            { label: 'Capacity', val: '78% (Climate Controlled)' },
            { label: 'High Demand Units', val: '2 Taycan Turbo GTs' },
            { label: 'Logistics Status', val: 'Carrier #04 En Route' },
          ],
        };
      } else if (lower.includes('chart') || lower.includes('revenue') || lower.includes('forecast')) {
        aiText = 'Generated inline Q3 revenue forecast chart for Porsche Center Santo Domingo:';
        chartData = [
          { month: 'Apr', value: 3.9 },
          { month: 'May', value: 4.5 },
          { month: 'Jun', value: 4.85 },
          { month: 'Jul', value: 5.2 },
          { month: 'Aug (Est)', value: 5.6 },
        ];
      } else {
        aiText = 'Enterprise summary generated: Dealership conversion velocity is +18.4% above Q2 targets with 98.8% inventory allocation efficiency.';
      }

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        chartData,
        lookupCard,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleVoice = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTimeout(() => {
        setInputQuery('Vehicle lookup for Porsche 911 GT3 RS');
        setIsListening(false);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
      {/* ChatGPT Enterprise Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-porsche-red text-white flex items-center justify-center shadow-glow-red shrink-0">
            <Bot size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-porsche-red font-mono uppercase">
              <Cpu size={14} className="animate-pulse" />
              {t.aiAssistantTitle}
            </div>
            <h1 className="text-card-22 font-bold text-slate-900 dark:text-white">
              {t.aiAssistantSubtitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Neural Latency: 12ms • Connected
          </span>
        </div>
      </div>

      {/* ChatGPT Enterprise Main Conversation Panel */}
      <div className="flex-1 porsche-card flex flex-col justify-between overflow-hidden relative">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
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

              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <div
                  className={`p-5 rounded-2xl flex flex-col gap-3 text-body-16 ${
                    msg.sender === 'user'
                      ? 'bg-porsche-red text-white font-semibold'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-black/5 dark:border-white/10'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>

                  {/* Inline Recharts Chart Generation */}
                  {msg.chartData && (
                    <div className="mt-2 p-4 rounded-xl bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10">
                      <p className="text-xs font-bold text-porsche-red mb-2">Q3 Revenue Growth Curve ($M)</p>
                      <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={msg.chartData}>
                            <XAxis dataKey="month" stroke={theme === 'dark' ? '#666' : '#999'} fontSize={10} />
                            <YAxis stroke={theme === 'dark' ? '#666' : '#999'} fontSize={10} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: theme === 'dark' ? '#121417' : '#FFFFFF',
                                borderColor: '#D5001C',
                                borderRadius: '8px',
                              }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#D5001C" strokeWidth={2} fill="#D5001C" fillOpacity={0.2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Lookup Card Result */}
                  {msg.lookupCard && (
                    <div className="mt-2 p-4 rounded-xl bg-porsche-red/10 border border-porsche-red/20 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-porsche-red">{msg.lookupCard.title}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{msg.lookupCard.type}</span>
                      </div>
                      <p className="text-small-13 text-slate-700 dark:text-slate-300 font-semibold">{msg.lookupCard.sub}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1 pt-2 border-t border-porsche-red/20 text-xs">
                        {msg.lookupCard.details.map((d, i) => (
                          <div key={i}>
                            <span className="text-[9px] text-slate-400 uppercase font-mono block">{d.label}</span>
                            <span className="font-bold text-slate-900 dark:text-white">{d.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 font-mono px-2">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-9 h-9 rounded-full bg-porsche-red text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/10 text-xs font-mono text-slate-500 animate-pulse">
                Porsche Neural Network analyzing database...
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts & Voice Enabled Input Bar */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {suggestedPrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sp.label)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-porsche-red dark:hover:text-porsche-red hover:border-porsche-red/30 whitespace-nowrap cursor-pointer theme-transition flex items-center gap-1.5"
              >
                <Search size={12} className="text-porsche-red" />
                <span>{sp.label}</span>
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
            <button
              type="button"
              onClick={toggleVoice}
              title="Voice Input"
              className={`p-3.5 rounded-2xl border theme-transition cursor-pointer ${
                isListening
                  ? 'bg-porsche-red text-white border-porsche-red animate-pulse shadow-glow-red'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-black/10 dark:border-white/10 hover:text-porsche-red'
              }`}
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isListening ? 'Listening to voice query...' : 'Ask Enterprise AI about vehicles, VIP clients, inventory or revenue...'}
              className="flex-1 p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-porsche-red"
            />

            <button
              type="submit"
              className="p-3.5 rounded-2xl bg-porsche-red text-white hover:bg-red-700 shadow-glow-red cursor-pointer theme-transition"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
