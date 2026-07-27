import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Brain, 
  Wrench, 
  Menu, 
  X, 
  Layers,
  Bell,
  UserCircle,
  CheckCheck,
  AlertTriangle,
  Info,
  Zap,
  LogOut
} from 'lucide-react';

import Overview from './pages/Overview';
import Sales from './pages/Sales';
import Logistics from './pages/Logistics';
import Executive from './pages/Executive';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { api } from './services/api';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'alert',
    title: 'Fleet Service Overdue',
    body: '911 Carrera GTS (A981240) brake wear at 78.4% — urgent service recommended.',
    time: '4 mins ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'warning',
    title: 'Critical Parts Low',
    body: 'HV Charging Socket Plugs stock at 2 units — 3 days from stockout.',
    time: '12 mins ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'success',
    title: 'Config Saved — Luis Corripio',
    body: '718 GT4 RS: Guards Red / Weissach Package / Race-Tex Stitching.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 'n4',
    type: 'info',
    title: 'New Lead Assigned',
    body: 'María Vásquez (Macan Electric) routed to María Laura Díaz.',
    time: '2 hrs ago',
    read: true,
  },
  {
    id: 'n5',
    type: 'info',
    title: 'AI Router Update',
    body: 'Allocation efficiency increased to 98.4% — 3 unassigned leads auto-routed.',
    time: '3 hrs ago',
    read: true,
  },
];

function NotifIcon({ type }: { type: Notification['type'] }) {
  if (type === 'alert') return <AlertTriangle size={13} className="text-porsche-red shrink-0 mt-0.5" />;
  if (type === 'warning') return <AlertTriangle size={13} className="text-porsche-gold shrink-0 mt-0.5" />;
  if (type === 'success') return <CheckCheck size={13} className="text-porsche-green shrink-0 mt-0.5" />;
  return <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, icon, label, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/' && location.pathname === '');

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${
        isActive 
          ? 'text-porsche-red bg-porsche-red/5 font-semibold' 
          : 'text-porsche-muted hover:text-slate-900 hover:bg-slate-900/5'
      }`}
    >
      <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-porsche-red' : 'text-porsche-muted group-hover:text-porsche-red'}`}>
        {icon}
      </div>
      <span className="text-sm tracking-wide">{label}</span>
      {isActive && (
        <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-porsche-red shadow-glow-red" />
      )}
    </Link>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClose: () => void;
}

function NotificationsPanel({ notifications, onMarkAllRead, onClose }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
      />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-[18rem] top-20 w-96 bg-white border border-porsche-border rounded-2xl shadow-2xl z-[60] overflow-hidden"
        style={{ maxHeight: '70vh' }}
      >
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-porsche-border/60 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <Bell size={14} className="text-porsche-red" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-[9px] font-bold text-white bg-porsche-red rounded-full px-1.5 py-0.5">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={onMarkAllRead} className="text-[10px] text-porsche-red font-semibold hover:underline">
              Mark all read
            </button>
          )}
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 48px)' }}>
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-porsche-muted">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex gap-3 px-5 py-3.5 border-b border-porsche-border/30 last:border-0 ${!n.read ? 'bg-porsche-red/[0.02]' : ''}`}
              >
                <NotifIcon type={n.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs font-semibold leading-snug ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</p>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-porsche-red shrink-0 mt-1" />}
                  </div>
                  <p className="text-[10px] text-porsche-muted leading-snug mt-0.5">{n.body}</p>
                  <p className="text-[9px] text-porsche-muted/60 mt-1 font-mono">{n.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => [
        {
          id: `n-${Date.now()}`,
          type: 'warning',
          title: 'Score Update — Lead L-1003',
          body: 'María Vásquez AI score jumped to 72 — consider escalating to Hot status.',
          time: 'just now',
          read: false,
        },
        ...prev,
      ]);
    }, 25000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { to: '/sales', icon: <TrendingUp size={20} />, label: 'Sales & Conversion' },
    { to: '/logistics', icon: <Wrench size={20} />, label: 'Logistics & After-Sales' },
    { to: '/executive', icon: <Brain size={20} />, label: 'Executive Intelligence' },
    { to: '/profile', icon: <UserCircle size={20} />, label: 'Profile & Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 bg-grid-overlay flex flex-col md:flex-row relative overflow-x-hidden">
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-porsche-red/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-porsche-green/5 blur-[120px] pointer-events-none" />

      <div className="md:hidden w-full flex items-center justify-between px-5 py-4 bg-white border-b border-porsche-border z-40 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-porsche-red/20 to-porsche-green/20 border border-porsche-red/30">
            <Layers size={18} className="text-porsche-red animate-pulse" />
          </div>
          <span className="font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-porsche-red to-porsche-red">
            AutoEuropa
          </span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg border border-porsche-border text-porsche-red hover:bg-porsche-red/10 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-porsche-border h-screen sticky top-0 py-6 px-5 z-30 shrink-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-porsche-red/20 to-porsche-green/20 border border-porsche-red/30 shadow-glow-red">
              <Layers size={22} className="text-porsche-red" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-slate-900">AutoEuropa</span>
              <span className="text-[10px] tracking-widest text-porsche-red/80 uppercase font-semibold">Command Center</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavItem 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <div className="relative">
            <button
              onClick={() => setNotifOpen(o => !o)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-porsche-border hover:bg-slate-50 hover:border-porsche-red/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Bell size={16} className="text-porsche-muted group-hover:text-porsche-red transition-colors" />
                <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="text-[9px] font-bold text-white bg-porsche-red rounded-full px-1.5 py-0.5 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <NotificationsPanel
                  notifications={notifications}
                  onMarkAllRead={markAllRead}
                  onClose={() => setNotifOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-porsche-border flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Link to="/profile" className="w-8 h-8 rounded-full bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red text-xs font-bold shrink-0 uppercase hover:bg-porsche-red/20 transition-colors">
                {api.auth.getCurrentUser()?.name?.charAt(0) || 'E'}
              </Link>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-950 truncate leading-snug">{api.auth.getCurrentUser()?.name || 'Eduardo Bisonó'}</span>
                <span className="text-[9px] text-porsche-muted uppercase tracking-wider font-semibold truncate leading-none mt-0.5">{api.auth.getCurrentUser()?.role || 'Senior Sales Advisor'}</span>
              </div>
            </div>
            <button 
              onClick={() => api.auth.logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg border border-porsche-border text-porsche-muted hover:text-porsche-red hover:bg-porsche-red/5 transition-all shrink-0"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-porsche-border flex flex-col justify-between py-6 px-4 z-50 md:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2.5">
                    <Layers size={20} className="text-porsche-red" />
                    <span className="font-bold text-slate-900 tracking-wider">AutoEuropa</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-900/5 text-porsche-muted hover:text-slate-900"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <NavItem 
                      key={item.to} 
                      to={item.to} 
                      icon={item.icon} 
                      label={item.label} 
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
                </nav>
              </div>

              <div className="mt-auto p-3.5 rounded-xl bg-slate-50 border border-porsche-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-porsche-red/10 border border-porsche-red/20 flex items-center justify-center text-porsche-red text-xs font-bold shrink-0 uppercase">
                    {api.auth.getCurrentUser()?.name?.charAt(0) || 'E'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-slate-950 truncate leading-snug">{api.auth.getCurrentUser()?.name || 'Eduardo Bisonó'}</span>
                    <span className="text-[8px] text-porsche-muted uppercase tracking-wider font-semibold truncate leading-none mt-0.5">{api.auth.getCurrentUser()?.role || 'Advisor'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => api.auth.logout()}
                  className="p-1 rounded-lg border border-porsche-border text-porsche-muted hover:text-porsche-red hover:bg-porsche-red/5 transition-all shrink-0"
                >
                  <LogOut size={12} />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full relative min-w-0">
        <div className="h-full p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3.5 rounded-xl bg-porsche-red/5 border border-porsche-red/15 overflow-visible">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-porsche-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-porsche-red" />
              </span>
              <p className="text-xs text-porsche-muted tracking-wide leading-relaxed">
                <strong className="text-slate-900">Live System:</strong> AutoEuropa Command Center — Porsche Center Santo Domingo. All data persisted to database.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-porsche-green bg-porsche-green/10 px-2.5 py-1 rounded border border-porsche-green/25 uppercase tracking-widest shrink-0 flex items-center gap-1.5 whitespace-nowrap">
              <Zap size={9} />
              Live Persistence
            </span>
          </div>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Overview /></PageWrapper>} />
              <Route path="/sales" element={<PageWrapper><Sales /></PageWrapper>} />
              <Route path="/logistics" element={<PageWrapper><Logistics /></PageWrapper>} />
              <Route path="/executive" element={<PageWrapper><Executive /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(api.auth.isAuthenticated());

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  );
}
