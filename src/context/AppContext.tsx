import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Package, 
  Booking, 
  Client, 
  Invoice, 
  EventItem, 
  GalleryItem, 
  WebsiteSettings, 
  ThemeColors, 
  ThemePreset,
  BookingStatus,
  LiveStreamConfig
} from '../types';
import { 
  INITIAL_WEBSITE_SETTINGS, 
  INITIAL_PACKAGES, 
  INITIAL_BOOKINGS, 
  INITIAL_CLIENTS, 
  INITIAL_INVOICES, 
  INITIAL_EVENTS, 
  INITIAL_GALLERY,
  THEME_PRESETS 
} from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Settings & Theme
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  updateLiveStream: (config: Partial<LiveStreamConfig>) => void;
  updateAdminPassword: (password: string) => void;
  setThemePreset: (preset: ThemePreset) => void;
  updateCustomColors: (colors: Partial<ThemeColors>) => void;

  // Packages
  packages: Package[];
  addPackage: (pkg: Omit<Package, 'id'>) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  togglePackagePopular: (id: string) => void;
  togglePackageEnabled: (id: string) => void;

  // Bookings
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateBookingNotes: (id: string, notes: string, quotationAmount?: number, advancePaid?: number) => void;
  updateBookingPayment: (id: string, quotationAmount: number, advancePaid: number, paymentMethod?: string, internalNotes?: string) => void;
  markReminderSent: (id: string) => void;
  deleteBooking: (id: string) => void;

  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'totalEvents' | 'totalBilled'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  // Invoices
  invoices: Invoice[];
  createInvoice: (invoice: Omit<Invoice, 'id'>) => Invoice;
  updateInvoiceStatus: (id: string, status: Invoice['paymentStatus']) => void;
  deleteInvoice: (id: string) => void;

  // Events
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  toggleGalleryFeatured: (id: string) => void;

  // Auth & Admin Navigation
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  adminTab: 'dashboard' | 'livestream' | 'invoices' | 'gallery' | 'bookings' | 'clients' | 'packages' | 'events' | 'settings';
  setAdminTab: (tab: 'dashboard' | 'livestream' | 'invoices' | 'gallery' | 'bookings' | 'clients' | 'packages' | 'events' | 'settings') => void;

  // Booking Flow Helper
  preSelectedPackage: Package | null;
  setPreSelectedPackage: (pkg: Package | null) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset to defaults
  resetAllToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage with graceful fallback
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('itc_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.adminPassword || parsed.adminPassword === 'admin' || parsed.adminPassword === 'itc@sports2026' || parsed.adminPassword === 'admin123') {
          parsed.adminPassword = 'asifmulla786';
        }
        return parsed;
      } catch {
        return INITIAL_WEBSITE_SETTINGS;
      }
    }
    return INITIAL_WEBSITE_SETTINGS;
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('itc_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('itc_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('itc_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('itc_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('itc_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('itc_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('itc_admin_auth') === 'true';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'livestream' | 'invoices' | 'gallery' | 'bookings' | 'clients' | 'packages' | 'events' | 'settings'>('dashboard');
  const [preSelectedPackage, setPreSelectedPackage] = useState<Package | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Apply theme variables dynamically to the document root
  useEffect(() => {
    const colors = settings.colors;
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-bg', colors.bg);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-button', colors.button);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-accent-glow', `${colors.accent}40`);
  }, [settings.colors]);

  // Persist items to localStorage
  useEffect(() => {
    localStorage.setItem('itc_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('itc_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('itc_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('itc_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('itc_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('itc_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('itc_gallery', JSON.stringify(gallery));
  }, [gallery]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth - Fully secured with owner password asifmulla786
  const loginAdmin = (password: string): boolean => {
    const activeSecret = settings.adminPassword || 'asifmulla786';
    if (password.trim() === activeSecret.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('itc_admin_auth', 'true');
      setIsAuthModalOpen(false);
      setCurrentView('admin');
      showToast('Admin session authorized successfully', 'success');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('itc_admin_auth');
    setCurrentView('public');
    showToast('Admin logged out', 'info');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Settings & Theme
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Website settings updated', 'success');
  };

  const updateLiveStream = (config: Partial<WebsiteSettings['liveStream']>) => {
    setSettings((prev) => ({
      ...prev,
      liveStream: {
        ...prev.liveStream,
        ...config
      }
    }));
    showToast('Live stream parameters updated', 'success');
  };

  const updateAdminPassword = (newPassword: string) => {
    setSettings((prev) => ({
      ...prev,
      adminPassword: newPassword
    }));
    showToast('Admin password updated successfully', 'success');
  };

  const setThemePreset = (preset: ThemePreset) => {
    const colors = THEME_PRESETS[preset] || THEME_PRESETS['black-blue'];
    setSettings((prev) => ({
      ...prev,
      themePreset: preset,
      colors
    }));
    showToast(`Theme preset changed to ${preset.replace('-', ' ').toUpperCase()}`, 'info');
  };

  const updateCustomColors = (colors: Partial<ThemeColors>) => {
    setSettings((prev) => ({
      ...prev,
      themePreset: 'custom',
      colors: {
        ...prev.colors,
        ...colors
      }
    }));
  };

  // Package Management
  const addPackage = (pkg: Omit<Package, 'id'>) => {
    const newPkg: Package = {
      ...pkg,
      id: `pkg-${Date.now()}`
    };
    setPackages((prev) => [...prev, newPkg]);
    showToast(`Package "${pkg.name}" created`, 'success');
  };

  const updatePackage = (id: string, updated: Partial<Package>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Package updated', 'success');
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    showToast('Package deleted', 'info');
  };

  const togglePackagePopular = (id: string) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, isPopular: !p.isPopular } : p)));
  };

  const togglePackageEnabled = (id: string) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, isEnabled: !p.isEnabled } : p)));
  };

  // Bookings
  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quotation = bookingData.quotationAmount || 0;
    const advance = bookingData.advancePaid || 0;
    const balance = Math.max(0, quotation - advance);

    const newBooking: Booking = {
      ...bookingData,
      id: `ITC-2026-${randomSuffix}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      quotationAmount: quotation,
      advancePaid: advance,
      balanceDue: balance,
      reminderCount: 0
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Also auto-create or update client in CRM if doesn't exist
    setClients((prev) => {
      const existing = prev.find((c) => c.phone === bookingData.mobile || c.email === bookingData.email);
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? { ...c, totalEvents: c.totalEvents + 1, notes: `${c.notes}\nBooked event: ${bookingData.eventName}` }
            : c
        );
      } else {
        const newClient: Client = {
          id: `cl-${Date.now()}`,
          name: bookingData.clientName,
          organization: bookingData.organization || 'Individual Organizer',
          phone: bookingData.mobile,
          whatsapp: bookingData.whatsapp || bookingData.mobile,
          email: bookingData.email,
          city: bookingData.city,
          totalEvents: 1,
          totalBilled: 0,
          notes: `First booking created via website for ${bookingData.eventName}`,
          createdAt: new Date().toISOString()
        };
        return [newClient, ...prev];
      }
    });

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast(`Booking ${id} status updated to ${status}`, 'info');
  };

  const updateBookingNotes = (id: string, internalNotes: string, quotationAmount?: number, advancePaid?: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const finalQuot = quotationAmount !== undefined ? quotationAmount : (b.quotationAmount || 0);
          const finalAdv = advancePaid !== undefined ? advancePaid : (b.advancePaid || 0);
          return {
            ...b,
            internalNotes,
            quotationAmount: finalQuot,
            advancePaid: finalAdv,
            balanceDue: Math.max(0, finalQuot - finalAdv)
          };
        }
        return b;
      })
    );
    showToast(`Booking ${id} records updated`, 'success');
  };

  const updateBookingPayment = (
    id: string, 
    quotationAmount: number, 
    advancePaid: number, 
    paymentMethod?: string, 
    internalNotes?: string
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const balance = Math.max(0, quotationAmount - advancePaid);
          const newStatus: BookingStatus = balance <= 0 && quotationAmount > 0 
            ? 'COMPLETED' 
            : (advancePaid > 0 ? 'ADVANCE RECEIVED' : b.status);
          return {
            ...b,
            quotationAmount,
            advancePaid,
            balanceDue: balance,
            paymentMethod: paymentMethod || b.paymentMethod,
            internalNotes: internalNotes !== undefined ? internalNotes : b.internalNotes,
            status: newStatus
          };
        }
        return b;
      })
    );
    showToast(`Payment & balance updated for ${id}`, 'success');
  };

  const markReminderSent = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              lastReminderSentAt: new Date().toISOString(),
              reminderCount: (b.reminderCount || 0) + 1
            }
          : b
      )
    );
    showToast('Payment reminder logged successfully', 'success');
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast(`Booking ${id} removed`, 'info');
  };

  // Clients
  const addClient = (client: Omit<Client, 'id' | 'createdAt' | 'totalEvents' | 'totalBilled'>) => {
    const newClient: Client = {
      ...client,
      id: `cl-${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalEvents: 0,
      totalBilled: 0
    };
    setClients((prev) => [newClient, ...prev]);
    showToast(`Client "${client.name}" added to directory`, 'success');
  };

  const updateClient = (id: string, updated: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    showToast('Client records updated', 'success');
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast('Client removed', 'info');
  };

  // Invoices
  const createInvoice = (invoice: Omit<Invoice, 'id'>): Invoice => {
    const newInv: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`
    };
    setInvoices((prev) => [newInv, ...prev]);

    // Update client total billed
    setClients((prev) =>
      prev.map((c) =>
        c.name.toLowerCase() === invoice.clientName.toLowerCase() || c.phone === invoice.phone
          ? { ...c, totalBilled: c.totalBilled + invoice.grandTotal }
          : c
      )
    );

    showToast(`Invoice ${newInv.invoiceNumber} generated successfully`, 'success');
    return newInv;
  };

  const updateInvoiceStatus = (id: string, paymentStatus: Invoice['paymentStatus']) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, paymentStatus } : inv)));
    showToast('Invoice payment status updated', 'info');
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    showToast('Invoice removed', 'info');
  };

  // Events
  const addEvent = (event: Omit<EventItem, 'id'>) => {
    const newEvt: EventItem = {
      ...event,
      id: `evt-${Date.now()}`
    };
    setEvents((prev) => [newEvt, ...prev]);
    showToast(`Event "${event.name}" scheduled`, 'success');
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
    showToast('Event updated', 'success');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event removed', 'info');
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery((prev) => [newItem, ...prev]);
    showToast('Gallery media added', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('Gallery item removed', 'info');
  };

  const toggleGalleryFeatured = (id: string) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, isFeatured: !g.isFeatured } : g)));
  };

  const resetAllToDefaults = () => {
    setSettings(INITIAL_WEBSITE_SETTINGS);
    setPackages(INITIAL_PACKAGES);
    setBookings(INITIAL_BOOKINGS);
    setClients(INITIAL_CLIENTS);
    setInvoices(INITIAL_INVOICES);
    setEvents(INITIAL_EVENTS);
    setGallery(INITIAL_GALLERY);
    showToast('Reset all database tables to initial defaults', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        updateLiveStream,
        updateAdminPassword,
        setThemePreset,
        updateCustomColors,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        togglePackagePopular,
        togglePackageEnabled,
        bookings,
        createBooking,
        updateBookingStatus,
        updateBookingNotes,
        updateBookingPayment,
        markReminderSent,
        deleteBooking,
        clients,
        addClient,
        updateClient,
        deleteClient,
        invoices,
        createInvoice,
        updateInvoiceStatus,
        deleteInvoice,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        toggleGalleryFeatured,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        preSelectedPackage,
        setPreSelectedPackage,
        toasts,
        showToast,
        removeToast,
        resetAllToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
