import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, Send, ShieldAlert, Wrench, ArrowRight, UserCheck, Clock } from 'lucide-react';

export interface ActionItem {
  title: string;
  category?: string;
  target?: string;
  details?: string;
}

interface TakeActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionItem?: ActionItem | null;
}

export const TakeActionModal: React.FC<TakeActionModalProps> = ({
  isOpen,
  onClose,
  actionItem,
}) => {
  const [selectedAction, setSelectedAction] = useState<string>('dispatch');
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Normal'>('High');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('Santo Domingo Concierge');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const defaultTitle = actionItem?.title || 'System Action Execution';
  const defaultTarget = actionItem?.target || actionItem?.details || 'Porsche Operations Command';

  const actionTypes = [
    { id: 'dispatch', label: 'Dispatch Technical Specialist', icon: Wrench, desc: 'Send mobile service unit or master tech to vehicle' },
    { id: 'tradein', label: 'Approve & Send Trade-in Valuation', icon: Send, desc: 'Generate official Porsche certified trade-in offer' },
    { id: 'parts', label: 'Reserve OEM Replacement Inventory', icon: Zap, desc: 'Lock component stock at nearest logistics hub' },
    { id: 'priority', label: 'Issue Executive Delivery Priority', icon: ShieldAlert, desc: 'Elevate order or appointment to VIP priority tier' },
    { id: 'service', label: 'Schedule Express Diagnostic', icon: Clock, desc: 'Book direct workshop appointment with customer' },
  ];

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#14161B] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red">
                <Zap size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Action Execution Hub</h2>
                <p className="text-xs text-slate-500 font-mono">Porsche Command & Control System</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex flex-col gap-6">
            {/* Target Item Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col gap-1">
              <span className="text-[10px] text-porsche-red font-mono uppercase font-bold tracking-wider">Target Objective</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{defaultTitle}</h3>
              <p className="text-xs text-slate-500 font-mono">{defaultTarget}</p>
            </div>

            {/* Success Overlay state */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Action Dispatched Successfully</h4>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    Logged to Porsche Enterprise CRM • Audit ID #{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Select Action Strategy */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider">
                    Select Action Strategy
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {actionTypes.map((act) => {
                      const Icon = act.icon;
                      const isSelected = selectedAction === act.id;
                      return (
                        <div
                          key={act.id}
                          onClick={() => setSelectedAction(act.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1 ${
                            isSelected
                              ? 'bg-porsche-red/10 border-porsche-red text-slate-900 dark:text-white shadow-sm'
                              : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold flex items-center gap-2">
                              <Icon size={15} className={isSelected ? 'text-porsche-red' : 'text-slate-400'} />
                              {act.label}
                            </span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-porsche-red" />}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">{act.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Parameters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Priority Pill Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider">
                      Execution Priority
                    </label>
                    <div className="flex gap-2">
                      {(['Critical', 'High', 'Normal'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono border cursor-pointer transition-all ${
                            priority === p
                              ? p === 'Critical'
                                ? 'bg-porsche-red text-white border-porsche-red'
                                : p === 'High'
                                ? 'bg-amber-500 text-white border-amber-500'
                                : 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-50 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Department / Manager */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider">
                      Assign Owner
                    </label>
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-[#1C1F26] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-porsche-red"
                    >
                      <option value="Santo Domingo Concierge">Santo Domingo Concierge Team</option>
                      <option value="Santiago Technical Center">Santiago Technical Center</option>
                      <option value="Punta Cana Experience Hub">Punta Cana Experience Hub</option>
                      <option value="Executive Management Direct">Executive Management Direct</option>
                    </select>
                  </div>
                </div>

                {/* Notes Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider">
                    Execution Directives / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter specific instructions or operational notes for the assigned team..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1C1F26] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-porsche-red resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
              <span className="text-[10px] text-slate-400 font-mono">
                Encrypted Operation • Instant Telemetry Sync
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="px-6 py-2.5 rounded-xl bg-porsche-red hover:bg-red-700 text-white text-xs font-bold shadow-glow-red flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <span>Execute Action</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
