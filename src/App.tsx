import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Bell } from 'lucide-react';

import Overview from './pages/Overview';
import Sales from './pages/Sales';
import Logistics from './pages/Logistics';
import Executive from './pages/Executive';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import AiAssistant from './pages/AiAssistant';
import Configurator from './pages/Configurator';
import Customer360 from './pages/Customer360';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Fleet from './pages/Fleet';
import ServiceAppointments from './pages/ServiceAppointments';
import TradeInOpportunities from './pages/TradeInOpportunities';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { api } from './services/api';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-porsche-bgLight dark:bg-porsche-bgDark bg-studio-grid flex flex-col md:flex-row relative overflow-x-hidden theme-transition">
      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-porsche-red/5 dark:bg-porsche-red/10 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-porsche-red/5 blur-[140px] pointer-events-none" />

      {/* Mobile Top Header */}
      <div className="md:hidden w-full flex items-center justify-between px-6 py-4 porsche-glass border-b border-black/[0.08] dark:border-white/[0.08] sticky top-0 z-40">
        <span className="font-bold text-base tracking-widest text-slate-900 dark:text-white uppercase font-sans">
          PORSCHE <span className="text-porsche-red">SANTO DOMINGO</span>
        </span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl border border-black/10 dark:border-white/10 text-porsche-red hover:bg-porsche-red/10 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Fixed 260px Executive Sidebar */}
      <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

      {/* Main Content Area (Sidebar width offset 260px) */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-w-0 min-h-screen">
        {/* Sticky Header Top Navigation Bar */}
        <Header
          unreadNotifCount={3}
          onOpenNotifications={() => {
            window.location.hash = '#/notifications';
          }}
          onOpenAiAssistant={() => {
            window.location.hash = '#/ai-assistant';
          }}
        />

        {/* 1728px Max Width Content Container */}
        <main className="flex-1 w-full p-6 md:p-8 max-w-[1728px] mx-auto flex flex-col gap-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Overview /></PageWrapper>} />
              <Route path="/sales" element={<PageWrapper><Sales /></PageWrapper>} />
              <Route path="/logistics" element={<PageWrapper><Logistics /></PageWrapper>} />
              <Route path="/executive" element={<PageWrapper><Executive /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
              <Route path="/notifications" element={<PageWrapper><Notifications /></PageWrapper>} />
              <Route path="/ai-assistant" element={<PageWrapper><AiAssistant /></PageWrapper>} />
              <Route path="/configurator" element={<PageWrapper><Configurator /></PageWrapper>} />
              <Route path="/customer-360" element={<PageWrapper><Customer360 /></PageWrapper>} />
              <Route path="/customer-360/:customerId" element={<PageWrapper><Customer360 /></PageWrapper>} />
              <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
              <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
              <Route path="/fleet" element={<PageWrapper><Fleet /></PageWrapper>} />
              <Route path="/service-appointments" element={<PageWrapper><ServiceAppointments /></PageWrapper>} />
              <Route path="/trade-in-opportunities" element={<PageWrapper><TradeInOpportunities /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
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
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <MainLayout />
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
