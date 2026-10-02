import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, ShieldAlert, Radio } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    settings, 
    isAdminAuthenticated, 
    logoutAdmin, 
    currentView, 
    setCurrentView,
    openAuthModal
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret Triple-Click and Long-Press detector on logo for Admin access
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimerRef = React.useRef<number | null>(null);
  const pressTimerRef = React.useRef<number | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);

    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
    }

    if (nextCount >= 3) {
      setLogoClicks(0);
      openAuthModal();
      return;
    }

    clickTimerRef.current = window.setTimeout(() => {
      setLogoClicks(0);
    }, 1000);

    if (nextCount === 1) {
      scrollToSection('home');
    }
  };

  const handleTouchStart = () => {
    pressTimerRef.current = window.setTimeout(() => {
      openAuthModal();
    }, 1500); // 1.5s long press on logo
  };

  const handleTouchEnd = () => {
    if (pressTimerRef.current) {
      window.clearTimeout(pressTimerRef.current);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('public');
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#05070c]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark with secret triple-click */}
        <a 
          href="#home"
          onClick={handleLogoClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="text-2xl font-extrabold tracking-wider text-white font-broadcast hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 select-none cursor-pointer"
          title={settings.brandName}
        >
          {settings.brandName}
        </a>

        {/* Zone 2: clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <button 
            onClick={() => scrollToSection('live-stream')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 text-rose-400"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Live Stream</span>
          </button>
          <button 
            onClick={() => scrollToSection('packages')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Packages
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('booking')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Book Match
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {isAdminAuthenticated && (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-md p-1">
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'public' : 'admin')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentView === 'admin' 
                    ? 'bg-sky-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {currentView === 'admin' ? 'Public Site' : 'Admin Panel'}
              </button>
              <button
                onClick={logoutAdmin}
                className="px-2 py-1 text-xs text-rose-400 hover:text-rose-300 transition-colors whitespace-nowrap"
                title="Log out"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => scrollToSection('booking')}
            className="px-4 py-2 text-xs sm:text-sm font-bold tracking-wide text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded transition-all shadow-md shadow-blue-900/30 whitespace-nowrap cursor-pointer"
            style={{ backgroundColor: 'var(--theme-button)' }}
          >
            BOOK YOUR EVENT
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070b14] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-semibold text-slate-200">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('tech-wheel')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              Broadcast Tech Wheel
            </button>
            <button
              onClick={() => scrollToSection('packages')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              Packages & Pricing
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              Media Gallery
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              Live & Upcoming Events
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              About ITC SPORTS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/60"
            >
              Contact & WhatsApp
            </button>
          </div>

          {isAdminAuthenticated && (
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentView(currentView === 'admin' ? 'public' : 'admin');
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-sky-400 font-semibold py-1 px-2 bg-slate-900 rounded"
              >
                {currentView === 'admin' ? 'Switch to Public Site' : 'Open Admin Panel'}
              </button>
              <button
                onClick={() => {
                  logoutAdmin();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 font-semibold py-1 px-2"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
