import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { HeroSection } from './components/hero/HeroSection';
import { LiveStreamSection } from './components/stream/LiveStreamSection';
import { TechWheelSection } from './components/wheel/TechWheelSection';
import { ServicesSection } from './components/services/ServicesSection';
import { PackagesSection } from './components/packages/PackagesSection';
import { BookingSection } from './components/booking/BookingSection';
import { GallerySection } from './components/gallery/GallerySection';
import { WhySection } from './components/why/WhySection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, isAdminAuthenticated, openAuthModal, toasts, removeToast } = useApp();

  // Global key combo listener for direct crew access (Ctrl+Shift+A or Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        openAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openAuthModal]);

  // Secret URL hash listener (#admin, #login, #itc-admin)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#login' || hash === '#itc-admin') {
        openAuthModal();
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [openAuthModal]);

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-sky-600 selection:text-white">
      
      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md text-xs font-semibold animate-slide-in ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                : 'bg-slate-900/95 border-sky-500/40 text-sky-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* When in Admin View and Authenticated */}
      {currentView === 'admin' && isAdminAuthenticated ? (
        <AdminDashboard />
      ) : (
        /* Public Broadcast Production Website */
        <>
          <Header />
          <main className="flex-1">
            <HeroSection />
            <LiveStreamSection />
            <PackagesSection />
            <ServicesSection />
            <TechWheelSection />
            <GallerySection />
            <BookingSection />
            <WhySection />
            <AboutSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}

      {/* Admin Authorization Modal */}
      <AdminAuthModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
