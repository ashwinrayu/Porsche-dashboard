import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Check, 
  Calendar, 
  Share2, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function Reports() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const reportsList = [
    { id: 'rep-01', title: 'Q3 Executive Performance & Revenue Digest', date: 'July 2026', size: '4.2 MB', type: 'PDF' },
    { id: 'rep-02', title: 'Taycan 800V Infrastructure & Service Report', date: 'July 2026', size: '2.8 MB', type: 'PDF' },
    { id: 'rep-03', title: 'Santo Domingo VIP Customer Retention & CSAT', date: 'June 2026', size: '3.1 MB', type: 'PDF' },
    { id: 'rep-04', title: 'Automated AI Allocation Routing Analysis', date: 'June 2026', size: '1.9 MB', type: 'PDF' },
  ];

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1800);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-porsche-red font-bold mb-1">
            Executive Document Suite
          </div>
          <h1 className="text-title-48 font-bold text-slate-900 dark:text-white tracking-tight">
            Reports & Export
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDownload('rep-01')}
            className="px-5 py-2.5 rounded-full bg-porsche-red text-white text-xs font-bold hover:bg-red-700 shadow-glow-red theme-transition flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            <span>Export Latest Q3 Executive Digest</span>
          </button>
        </div>
      </div>

      {/* Available Reports List */}
      <div className="porsche-card flex flex-col gap-4">
        <h3 className="text-card-22 font-bold text-slate-900 dark:text-white mb-2">
          Generated Executive Briefings
        </h3>

        {reportsList.map((report) => (
          <div
            key={report.id}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-porsche-red/30 theme-transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-porsche-red/10 text-porsche-red shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <h4 className="text-body-16 font-bold text-slate-900 dark:text-white">{report.title}</h4>
                <p className="text-small-13 text-slate-500 dark:text-slate-400">
                  {report.date} • {report.size} • Format: {report.type}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload(report.id)}
              className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-porsche-red dark:hover:bg-porsche-red dark:hover:text-white theme-transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {downloadingId === report.id ? (
                <>
                  <Sparkles size={14} className="animate-spin text-porsche-red" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Download Briefing</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
