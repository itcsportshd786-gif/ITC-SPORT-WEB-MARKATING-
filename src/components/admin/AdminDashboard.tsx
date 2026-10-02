import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Booking, 
  BookingStatus, 
  Client, 
  Invoice, 
  Package, 
  GalleryItem 
} from '../../types';
import { InvoiceViewModal } from './InvoiceViewModal';
import { BalanceReminderModal } from './BalanceReminderModal';
import { PaymentUpdateModal } from './PaymentUpdateModal';
import { 
  BarChart3, 
  Radio, 
  Receipt, 
  Image as ImageIcon, 
  Calendar, 
  Layers, 
  Settings, 
  LogOut, 
  Eye, 
  Plus, 
  Trash2, 
  MessageSquare, 
  ExternalLink, 
  Save, 
  CheckCircle2, 
  Upload, 
  Tv, 
  Lock, 
  Phone, 
  RefreshCw,
  Search,
  Printer,
  Bell,
  CreditCard,
  AlertTriangle,
  IndianRupee,
  Clock,
  Send,
  Check,
  Copy,
  Sparkles,
  Trophy
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    updateLiveStream,
    updateAdminPassword,
    setThemePreset, 
    packages, 
    updatePackage, 
    bookings, 
    updateBookingStatus, 
    updateBookingPayment,
    deleteBooking,
    invoices, 
    createInvoice, 
    deleteInvoice,
    gallery, 
    addGalleryItem, 
    deleteGalleryItem, 
    logoutAdmin,
    setCurrentView,
    adminTab,
    setAdminTab,
    showToast
  } = useApp();

  // Active Live Stream Form State
  const [liveStreamForm, setLiveStreamForm] = useState({
    youtubeUrl: settings.liveStream?.youtubeUrl || '',
    isLive: settings.liveStream?.isLive ?? true,
    matchTitle: settings.liveStream?.matchTitle || '',
    tournamentName: settings.liveStream?.tournamentName || '',
    streamDescription: settings.liveStream?.streamDescription || ''
  });

  // Bill / Invoice Generator Form State
  const [billForm, setBillForm] = useState({
    clientName: '',
    clientWhatsapp: '',
    eventName: '',
    venue: '',
    eventDate: new Date().toISOString().split('T')[0],
    packageSelected: 'PRO (2 Cameras Setup)',
    days: 1,
    ratePerDay: 25000,
    advancePaid: 10000,
    advanceRequested: 15000,
    notes: 'Advance credited. Balance due on match day evening.'
  });

  const [matchedInquiry, setMatchedInquiry] = useState<Booking | null>(null);
  const [lastDispatchedInfo, setLastDispatchedInfo] = useState<{
    invoiceNum: string;
    clientName: string;
    clientPhone: string;
    grandTotal: number;
    advancePaid: number;
    advanceRequested: number;
    balanceDue: number;
    waUrl: string;
    message: string;
  } | null>(null);

  const [activeViewingInvoice, setActiveViewingInvoice] = useState<Invoice | null>(null);

  // Gallery Uploader State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Cricket',
    mediaType: 'image' as 'image' | 'video',
    url: '',
    description: ''
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  // Password update state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Modals for balance reminder & payment updates
  const [selectedReminderBooking, setSelectedReminderBooking] = useState<Booking | null>(null);
  const [selectedPaymentBooking, setSelectedPaymentBooking] = useState<Booking | null>(null);
  const [paymentModalInitialMode, setPaymentModalInitialMode] = useState<'advance' | 'full' | 'standard'>('advance');

  // Helper to calculate days elapsed since booking creation (User Requirement: "PENDING DUE 10 DIN KE BAD SHOW HO")
  const getDaysElapsed = (dateStr?: string) => {
    if (!dateStr) return 0;
    const created = new Date(dateStr).getTime();
    if (isNaN(created)) return 0;
    const diff = Date.now() - created;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  // Filter for bookings
  const [bookingFilter, setBookingFilter] = useState<'ALL' | 'OVERDUE_10_DAYS' | 'ACTIVE_ADVANCE' | 'NEW' | 'CONFIRMED' | 'PAID'>('ALL');
  const [bookingSearch, setBookingSearch] = useState('');

  // Calculate booking financial totals & balances
  const totalQuotation = bookings.reduce((sum, b) => sum + (b.quotationAmount || 0), 0);
  const totalAdvance = bookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const totalPendingBalance = bookings.reduce(
    (sum, b) => sum + Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0)),
    0
  );
  
  // Pending due only flagged after 10 days
  const overdue10DaysBookings = bookings.filter((b) => {
    const due = Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0));
    const elapsed = getDaysElapsed(b.createdAt);
    return due > 0 && elapsed >= 10;
  });

  const activeAdvanceBookings = bookings.filter((b) => {
    const due = Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0));
    const elapsed = getDaysElapsed(b.createdAt);
    return due > 0 && elapsed < 10;
  });

  const overdue10DaysCount = overdue10DaysBookings.length;
  const activeAdvanceCount = activeAdvanceBookings.length;
  const pendingBalanceCount = overdue10DaysCount; // Aligned with 10 days rule

  const overdue10DaysTotal = overdue10DaysBookings.reduce(
    (sum, b) => sum + Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0)),
    0
  );

  const activeAdvanceTotal = activeAdvanceBookings.reduce(
    (sum, b) => sum + Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0)),
    0
  );

  const fullyPaidCount = bookings.filter(
    (b) => (b.quotationAmount || 0) > 0 && Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0)) === 0
  ).length;
  const newInquiriesCount = bookings.filter((b) => b.status === 'NEW').length;
  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'ADVANCE RECEIVED').length;

  // Filter bookings based on active filter and search
  const filteredBookings = bookings.filter((b) => {
    const due = Math.max(0, (b.quotationAmount || 0) - (b.advancePaid || 0));
    const elapsed = getDaysElapsed(b.createdAt);

    if (bookingFilter === 'OVERDUE_10_DAYS' && (due <= 0 || elapsed < 10)) return false;
    if (bookingFilter === 'ACTIVE_ADVANCE' && (due <= 0 || elapsed >= 10)) return false;
    if (bookingFilter === 'NEW' && b.status !== 'NEW') return false;
    if (bookingFilter === 'PAID' && (due > 0 || (b.quotationAmount || 0) === 0)) return false;
    if (bookingFilter === 'CONFIRMED' && b.status !== 'CONFIRMED' && b.status !== 'ADVANCE RECEIVED') return false;

    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      const match =
        b.clientName.toLowerCase().includes(q) ||
        b.mobile.includes(q) ||
        b.eventName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        (b.venue && b.venue.toLowerCase().includes(q)) ||
        (b.city && b.city.toLowerCase().includes(q)) ||
        (b.requirements && b.requirements.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const handleSelectInquiry = (b: Booking) => {
    const days = b.days || 1;
    const quot = b.quotationAmount || 25000;
    const ratePerDay = Math.round(quot / days);
    const advPaid = b.advancePaid || 0;
    const advReq = advPaid > 0 ? 0 : Math.round(quot * 0.5);

    setBillForm({
      clientName: b.clientName,
      clientWhatsapp: b.whatsapp || b.mobile,
      eventName: b.eventName,
      venue: b.venue || 'Cricket Stadium',
      eventDate: b.eventDate || new Date().toISOString().split('T')[0],
      packageSelected: b.packageName || 'PRO (2 Cameras Setup)',
      days,
      ratePerDay,
      advancePaid: advPaid,
      advanceRequested: advReq,
      notes: `Booking ID: ${b.id}. Organizer arranged: Travel, Food/Stay, High-Speed WiFi & Power.`
    });
    setMatchedInquiry(b);
    setAdminTab('invoices');
    showToast(`✨ Auto-filled all contact & event details for ${b.clientName}!`, 'success');
  };

  const handleClientNameChange = (name: string) => {
    // Check if matches any existing booking inquiry
    const matched = bookings.find(
      (b) => b.clientName.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (matched) {
      const days = matched.days || 1;
      const quot = matched.quotationAmount || 25000;
      const ratePerDay = Math.round(quot / days);
      const advPaid = matched.advancePaid || 0;
      const advReq = advPaid > 0 ? 0 : Math.round(quot * 0.5);

      setBillForm((prev) => ({
        ...prev,
        clientName: matched.clientName,
        clientWhatsapp: matched.whatsapp || matched.mobile,
        eventName: matched.eventName,
        venue: matched.venue || prev.venue,
        eventDate: matched.eventDate || prev.eventDate,
        packageSelected: matched.packageName || prev.packageSelected,
        days,
        ratePerDay,
        advancePaid: advPaid,
        advanceRequested: advReq,
        notes: `Booking ID: ${matched.id}. Organizer arranged: Travel, Food/Stay, High-Speed WiFi & Power.`
      }));
      setMatchedInquiry(matched);
      showToast(`✨ Auto-matched inquiry! WhatsApp number & match details auto-filled for ${matched.clientName}`, 'success');
    } else {
      setBillForm((prev) => ({ ...prev, clientName: name }));
      setMatchedInquiry(null);
    }
  };

  const handlePrefillBillFromBooking = (b: Booking) => {
    handleSelectInquiry(b);
  };

  // Calculate bill totals
  const subtotal = billForm.days * billForm.ratePerDay;
  const grandTotal = subtotal;
  const balanceDue = Math.max(0, grandTotal - billForm.advancePaid);

  // Handle YouTube Live Stream Save
  const handleSaveLiveStream = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveStream({
      youtubeUrl: liveStreamForm.youtubeUrl.trim(),
      isLive: liveStreamForm.isLive,
      matchTitle: liveStreamForm.matchTitle.trim(),
      tournamentName: liveStreamForm.tournamentName.trim(),
      streamDescription: liveStreamForm.streamDescription.trim()
    });
    showToast('Live Stream settings saved! Public website updated.', 'success');
  };

  // Handle Bill Generation & Direct WhatsApp Send
  const handleGenerateAndSendBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billForm.clientName || !billForm.clientWhatsapp) {
      showToast('Please enter Client Name and Client WhatsApp Number', 'error');
      return;
    }

    const cleanNumber = billForm.clientWhatsapp.replace(/\D/g, '');
    const clientPhone = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
    const invoiceNum = `INV-ITC-${Date.now().toString().slice(-4)}`;
    const advanceAsked = billForm.advanceRequested || Math.round(grandTotal * 0.5);

    // Create invoice record
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invoiceNum,
      date: new Date().toISOString().split('T')[0],
      dueDate: billForm.eventDate,
      clientName: billForm.clientName,
      organization: 'Tournament Organizer',
      phone: billForm.clientWhatsapp,
      email: 'organizer@cricket.in',
      eventName: billForm.eventName,
      venue: billForm.venue || 'Cricket Stadium',
      items: [
        {
          id: '1',
          description: `${billForm.packageSelected} (${billForm.days} Day/s)`,
          quantity: billForm.days,
          unitPrice: billForm.ratePerDay,
          total: subtotal
        }
      ],
      subtotal,
      discount: 0,
      taxPercent: 0,
      taxAmount: 0,
      grandTotal,
      advancePaid: billForm.advancePaid,
      balanceDue,
      paymentStatus: balanceDue <= 0 ? 'PAID' : (billForm.advancePaid > 0 ? 'PARTIALLY PAID' : 'PENDING'),
      notes: billForm.notes,
      terms: 'Broadcast feed in 1080p 60fps Full HD.'
    };

    createInvoice(newInv);

    // If matched to a client booking, update the booking status and payment in system
    if (matchedInquiry) {
      updateBookingPayment(
        matchedInquiry.id,
        grandTotal,
        billForm.advancePaid,
        'UPI / Bank Transfer / Cash',
        `Invoice ${invoiceNum} generated. Advance requested: ₹${advanceAsked}. Balance due: ₹${balanceDue}.`
      );
      updateBookingStatus(
        matchedInquiry.id,
        billForm.advancePaid > 0 ? 'ADVANCE RECEIVED' : 'CONFIRMED'
      );
    }

    // Format WhatsApp message to send directly to Client's WhatsApp with full confirmation & advance request
    const message = `🎉 *ITC SPORTS - BOOKING CONFIRMED & OFFICIAL BILL*
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ *CONGRATULATIONS! YOUR EVENT BOOKING IS CONFIRMED!*
*ITC SPORTS broadcast camera crew & live setup have been officially locked for your tournament.*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 *Invoice No:* ${invoiceNum}
👤 *Client / Organizer:* ${billForm.clientName}
📞 *Client WhatsApp:* ${billForm.clientWhatsapp}
🏆 *Tournament / Event:* ${billForm.eventName}
📍 *Match Ground:* ${billForm.venue || 'Cricket Ground'}
📅 *Event Date:* ${billForm.eventDate} (${billForm.days} Day/s)
🎥 *Production Tier:* ${billForm.packageSelected}

💰 *COMMERCIALS & ADVANCE PAYMENT DETAILS:*
• Total Agreed Package: *₹${grandTotal.toLocaleString('en-IN')}*
• Advance Payment Received: *₹${billForm.advancePaid.toLocaleString('en-IN')}*
• 👉 *ADVANCE PAYMENT REQUESTED TO LOCK DATES:* *₹${advanceAsked.toLocaleString('en-IN')}*
• Remaining Balance Due: *₹${balanceDue.toLocaleString('en-IN')}* (payable on match day)

👉 *ADVANCE PAYMENT INSTRUCTIONS:*
Tournament dates and camera production crew are confirmed and held upon receipt of the advance payment.
Please transfer the requested advance amount of *₹${advanceAsked.toLocaleString('en-IN')}* using any of the official methods below:

🏦 *OFFICIAL PAYMENT ACCOUNTS (ITC SPORTS):*
• UPI / GPay / PhonePe: *9986095581*
• UPI ID: *9986095581@upi* (ITC Sports Live)
• Account Name: *ITC Sports Live Broadcasting*
• Bank: *State Bank of India*
• Branch: *Bangalore Main Branch*

Please send payment screenshot / UTR number here on WhatsApp once transferred.

📋 *Organizer / Committee Agreed Provisions:*
✓ Traveling & Local Transport: Provided by Committee
✓ Food & Stay / Accommodation: Provided by Committee
✓ High-Speed WiFi / Internet (30+ Mbps Upload): Provided at ground
✓ Electrical Power & Scorer Desk: Provided at ground

📌 *Booking Status:* ${balanceDue <= 0 ? 'PAID IN FULL - DATES LOCKED' : 'CONFIRMED - DATES RESERVED PENDING ADVANCE'}
📝 *Billing Notes:* ${billForm.notes}

Thank you for choosing *ITC SPORTS*!
Experience the Game Like Never Before.
📞 Production Helpline: 9986095581`;

    const waUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(message)}`;

    setLastDispatchedInfo({
      invoiceNum,
      clientName: billForm.clientName,
      clientPhone,
      grandTotal,
      advancePaid: billForm.advancePaid,
      advanceRequested: advanceAsked,
      balanceDue,
      waUrl,
      message
    });

    try {
      window.open(waUrl, '_blank');
    } catch {
      // Safe fallback handled by on-screen direct WhatsApp button
    }

    // Reset form so inputs are cleared and not left sitting on screen
    setBillForm({
      clientName: '',
      clientWhatsapp: '',
      eventName: '',
      venue: '',
      eventDate: new Date().toISOString().split('T')[0],
      packageSelected: 'PRO (2 Cameras Setup)',
      days: 1,
      ratePerDay: 25000,
      advancePaid: 0,
      advanceRequested: 15000,
      notes: 'Balance due on match day evening.'
    });
    setMatchedInquiry(null);

    showToast(`✅ Invoice #${invoiceNum} saved in database & dispatched for ${billForm.clientName}!`, 'success');
  };

  // Handle Local File Upload for Gallery
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setGalleryForm((prev) => ({ ...prev, url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add Gallery Item
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.url) {
      showToast('Please provide an image title and select/paste an image', 'error');
      return;
    }

    addGalleryItem({
      title: galleryForm.title,
      category: galleryForm.category,
      mediaType: galleryForm.mediaType,
      url: galleryForm.url,
      description: galleryForm.description,
      tag: galleryForm.category,
      createdAt: new Date().toISOString()
    });

    setGalleryForm({
      title: '',
      category: 'Cricket',
      mediaType: 'image',
      url: '',
      description: ''
    });
    setPreviewImage('');
    showToast('Media added to public gallery successfully!', 'success');
  };

  // Helper for YouTube embed preview
  const getEmbedPreviewUrl = (url: string) => {
    if (!url) return '';
    try {
      if (url.includes('youtube.com/embed/')) return url;
      if (url.includes('watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return id ? `https://www.youtube.com/embed/${id}` : '';
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return id ? `https://www.youtube.com/embed/${id}` : '';
      }
      if (url.includes('youtube.com/live/')) {
        const id = url.split('youtube.com/live/')[1]?.split('?')[0];
        return id ? `https://www.youtube.com/embed/${id}` : '';
      }
      return url;
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="h-16 bg-[#080d18] border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400 text-sky-400 flex items-center justify-center font-bold font-broadcast">
            ITC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white font-broadcast uppercase tracking-wider">
                ITC SPORTS ADMIN CONTROL
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                ACTIVE
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Live Stream & WhatsApp Invoicing Hub
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('public')}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-sky-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#060a12] border-r border-slate-800 p-4 space-y-2 shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 py-1">
            CONTROL CENTER
          </div>

          <button
            onClick={() => setAdminTab('livestream')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'livestream'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-300 animate-pulse" />
            <span>YouTube Live Stream</span>
          </button>

          <button
            onClick={() => setAdminTab('invoices')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'invoices'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4 text-emerald-300" />
            <span>Bill Generator (WhatsApp)</span>
          </button>

          <button
            onClick={() => setAdminTab('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'gallery'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-sky-300" />
            <span>Media Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('bookings')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'bookings'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-blue-300" />
              <span>Bookings & Balances</span>
            </div>
            {pendingBalanceCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold animate-pulse">
                {pendingBalanceCount} Due
              </span>
            ) : bookings.length > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono">
                {bookings.length}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setAdminTab('packages')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'packages'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-300" />
            <span>Packages Pricing</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-slate-700 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Password & Settings</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#04070d] p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: YOUTUBE LIVE STREAM MANAGER */}
          {(adminTab === 'livestream' || adminTab === 'dashboard') && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block">
                  Match Telecast Control
                </span>
                <h2 className="text-2xl font-extrabold text-white font-broadcast uppercase">
                  YouTube Live Match Broadcast Manager
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Yahan apni YouTube link daalo. Agar match LIVE hai toh LIVE tick karo, client ko website me se sidha live telecast milega.
                </p>
              </div>

              <form onSubmit={handleSaveLiveStream} className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* Live Status Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white flex items-center gap-2 font-broadcast uppercase">
                      <span className={`w-3 h-3 rounded-full ${liveStreamForm.isLive ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span>Is Match LIVE Right Now? (🔴 LIVE ON AIR)</span>
                    </span>
                    <p className="text-xs text-slate-400">
                      Turn this ON when broadcasting a live tournament match. Website will show "LIVE NOW" badge.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={liveStreamForm.isLive}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, isLive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-13 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>

                {/* YouTube Link Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    YouTube Stream / Video URL * (Apni YouTube Link Yahan Paste Karein)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. https://www.youtube.com/watch?v=YOUR_VIDEO_ID or https://youtu.be/..."
                    value={liveStreamForm.youtubeUrl}
                    onChange={(e) => setLiveStreamForm({ ...liveStreamForm, youtubeUrl: e.target.value })}
                    className="w-full px-3.5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-rose-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Accepts any YouTube stream link, normal video link, or shortened youtu.be link.
                  </p>
                </div>

                {/* Match Title & Tournament */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Match Title (e.g. Semi Final / Final Clash)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. KPL Season 4 - Grand Final: Bangalore vs Mysore"
                      value={liveStreamForm.matchTitle}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, matchTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Tournament Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. State Championship 2026"
                      value={liveStreamForm.tournamentName}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, tournamentName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Live Preview Screen */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-slate-400 block uppercase font-bold">
                    Embed Preview (What Clients Will See on Website):
                  </span>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
                    {getEmbedPreviewUrl(liveStreamForm.youtubeUrl) ? (
                      <iframe
                        src={getEmbedPreviewUrl(liveStreamForm.youtubeUrl)}
                        title="Live Stream Preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                        Enter a valid YouTube URL above to see player preview
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-rose-950 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE & UPDATE WEBSITE LIVE STREAM</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 2: BILL GENERATOR (DIRECT WHATSAPP SEND) */}
          {adminTab === 'invoices' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  Commercials & Billing
                </span>
                <h2 className="text-2xl font-extrabold text-white font-broadcast uppercase">
                  Bill Generator & Direct WhatsApp Dispatch
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Client ka name likhte hi inquiry auto-fill hogi (Mobile, WhatsApp, Tournament, Venue, Date). Confirmation button press karte hi WhatsApp par official confirmation bill aur advance payment request chali jayegi!
                </p>
              </div>

              {/* SUCCESS DISPATCH BANNER (IF A BILL WAS JUST SENT) */}
              {lastDispatchedInfo && (
                <div className="bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                            ✅ 100% SAVED IN DATABASE & WHATSAPP DISPATCHED!
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold">
                            {lastDispatchedInfo.invoiceNum}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-0.5">
                          Invoice Saved Permanently for {lastDispatchedInfo.clientName} ({lastDispatchedInfo.clientPhone})
                        </h4>
                        <p className="text-[11px] text-emerald-300/80">
                          ✓ Record database me save ho chuka hai. Niche di gayi link se chat kholiye ya naya bill banayein.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setLastDispatchedInfo(null)}
                      className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Dismiss Banner
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-black/50 p-3 rounded-xl border border-emerald-800/40">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Total Package:</span>
                      <strong className="text-white">₹{lastDispatchedInfo.grandTotal.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Advance Paid:</span>
                      <strong className="text-emerald-400">₹{lastDispatchedInfo.advancePaid.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Advance Requested:</span>
                      <strong className="text-amber-400 font-bold">₹{lastDispatchedInfo.advanceRequested.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Balance Due:</span>
                      <strong className="text-rose-400">₹{lastDispatchedInfo.balanceDue.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={lastDispatchedInfo.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>OPEN CLIENT WHATSAPP CHAT</span>
                    </a>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(lastDispatchedInfo.message);
                        showToast('Confirmation message copied to clipboard!', 'success');
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Message</span>
                    </button>

                    <button
                      onClick={() => setAdminTab('bookings')}
                      className="px-3.5 py-2.5 rounded-xl bg-sky-950/60 hover:bg-sky-900 border border-sky-600/50 text-sky-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View in Bookings List →</span>
                    </button>

                    <button
                      onClick={() => setLastDispatchedInfo(null)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 cursor-pointer"
                    >
                      Create Another Bill
                    </button>
                  </div>
                </div>
              )}

              {/* QUICK INQUIRY AUTO-FILL BAR */}
              <div className="bg-[#0b1220] border border-blue-900/60 rounded-2xl p-4 sm:p-5 space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider">
                    ⚡ Quick Auto-Fill: Select from Client Inquiries / Messages
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <select
                    className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-sky-500"
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      if (!selectedId) return;
                      const found = bookings.find((b) => b.id === selectedId);
                      if (found) handleSelectInquiry(found);
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>-- Select a Client Inquiry to Auto-Fill Everything --</option>
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.clientName} · {b.eventName} ({b.eventDate}) - Ph: {b.mobile} [ID: {b.id}]
                      </option>
                    ))}
                  </select>

                  <span className="text-[11px] text-slate-400 text-center sm:text-left">
                    Ya niche direct Client Name type karein
                  </span>
                </div>
              </div>

              {/* AUTO-MATCHED INQUIRY BADGE */}
              {matchedInquiry && (
                <div className="bg-sky-950/40 border border-sky-500/50 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white font-mono">
                        Auto-matched Inquiry #{matchedInquiry.id} ({matchedInquiry.clientName})
                      </span>
                      <span className="block text-[11px] text-slate-300">
                        Event: {matchedInquiry.eventName} · Venue: {matchedInquiry.venue} · Date: {matchedInquiry.eventDate} · WhatsApp: {matchedInquiry.whatsapp || matchedInquiry.mobile}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMatchedInquiry(null);
                      setBillForm({
                        clientName: '',
                        clientWhatsapp: '',
                        eventName: '',
                        venue: '',
                        eventDate: new Date().toISOString().split('T')[0],
                        packageSelected: 'PRO (2 Cameras Setup)',
                        days: 1,
                        ratePerDay: 25000,
                        advancePaid: 0,
                        advanceRequested: 15000,
                        notes: 'Balance due on match day evening.'
                      });
                      showToast('Form cleared', 'info');
                    }}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 cursor-pointer"
                  >
                    Clear Form
                  </button>
                </div>
              )}

              {/* Bill Form */}
              <form onSubmit={handleGenerateAndSendBill} className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* Datalist for automatic client name suggestion */}
                <datalist id="clientInquiriesDatalist">
                  {bookings.map((b) => (
                    <option key={b.id} value={b.clientName}>
                      {b.eventName} - {b.mobile}
                    </option>
                  ))}
                </datalist>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-slate-300 font-semibold">
                        Client Name * (Auto-fill on type)
                      </label>
                      {matchedInquiry && (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">✓ AUTO-MATCHED</span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      list="clientInquiriesDatalist"
                      placeholder="Type client name (e.g. Rahul Verma, Suresh...)"
                      value={billForm.clientName}
                      onChange={(e) => handleClientNameChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-sky-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      💡 Tip: Kisi bhi client ka name type karenge toh contact number aur match details auto-fill ho jayengi!
                    </p>
                  </div>

                  <div>
                    <label className="block text-emerald-400 font-bold mb-1">
                      Client WhatsApp Number * (Auto-filled · Bill sent here)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit WhatsApp number (e.g. 9845012345)"
                      value={billForm.clientWhatsapp}
                      onChange={(e) => setBillForm({ ...billForm, clientWhatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-emerald-500/70 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Confirmation msg aur bill direct is WhatsApp number par receive hoga.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Tournament / Event Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mysore Premier Cup 2026"
                      value={billForm.eventName}
                      onChange={(e) => setBillForm({ ...billForm, eventName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Ground Venue
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. RWF Cricket Stadium"
                      value={billForm.venue}
                      onChange={(e) => setBillForm({ ...billForm, venue: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={billForm.eventDate}
                      onChange={(e) => setBillForm({ ...billForm, eventDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Selected Broadcast Tier
                    </label>
                    <select
                      value={billForm.packageSelected}
                      onChange={(e) => setBillForm({ ...billForm, packageSelected: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="BASIC HD (1 Camera Setup)">BASIC HD (1 Camera Setup)</option>
                      <option value="PRO (2 Cameras Setup)">PRO (2 Cameras Setup)</option>
                      <option value="PREMIUM (3 Cameras Setup)">PREMIUM (3 Cameras Setup)</option>
                      <option value="GOLDEN PRO (4+ Cameras with Third Umpire)">GOLDEN PRO (4+ Cameras with Third Umpire)</option>
                      <option value="Custom Cricket Tournament Package">Custom Tournament Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Number of Match Days
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={billForm.days}
                      onChange={(e) => setBillForm({ ...billForm, days: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Rate Per Day (₹)
                    </label>
                    <input
                      type="number"
                      value={billForm.ratePerDay}
                      onChange={(e) => setBillForm({ ...billForm, ratePerDay: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* Advance Received Input */}
                  <div>
                    <label className="block text-emerald-400 font-semibold mb-1">
                      Advance Received So Far (₹)
                    </label>
                    <input
                      type="number"
                      value={billForm.advancePaid}
                      onChange={(e) => setBillForm({ ...billForm, advancePaid: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Already client se cash ya online receive hua advance amount.
                    </p>
                  </div>

                  {/* Advance Required / Requested Input (User Specific Requirement) */}
                  <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-amber-300 font-bold">
                        👉 Advance Payment Requested (₹) *
                      </label>
                      <span className="text-[10px] font-mono text-amber-400">ASKED ON WHATSAPP</span>
                    </div>

                    <input
                      type="number"
                      value={billForm.advanceRequested}
                      onChange={(e) => setBillForm({ ...billForm, advanceRequested: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-slate-950 border border-amber-500/60 rounded-lg text-amber-300 font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
                    />

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setBillForm({ ...billForm, advanceRequested: Math.round(grandTotal * 0.3) })}
                        className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700 cursor-pointer"
                      >
                        30% (₹{Math.round(grandTotal * 0.3).toLocaleString('en-IN')})
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillForm({ ...billForm, advanceRequested: Math.round(grandTotal * 0.5) })}
                        className="px-2 py-0.5 rounded bg-amber-900/60 hover:bg-amber-900 text-[10px] font-mono text-amber-200 border border-amber-700 cursor-pointer"
                      >
                        50% (₹{Math.round(grandTotal * 0.5).toLocaleString('en-IN')})
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillForm({ ...billForm, advanceRequested: balanceDue })}
                        className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700 cursor-pointer"
                      >
                        Full Due (₹{balanceDue.toLocaleString('en-IN')})
                      </button>
                    </div>

                    <p className="text-[10px] text-amber-200/70">
                      Ye advance amount WhatsApp message me maanga jayega dates lock karne ke liye.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">
                      Billing Terms & Notes
                    </label>
                    <input
                      type="text"
                      value={billForm.notes}
                      onChange={(e) => setBillForm({ ...billForm, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Live Bill Summary Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Total Billed</span>
                    <span className="text-xl font-extrabold text-white">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Advance Paid</span>
                    <span className="text-xl font-extrabold text-emerald-400">₹{billForm.advancePaid.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Advance Asked</span>
                    <span className="text-xl font-extrabold text-amber-400">₹{(billForm.advanceRequested || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Remaining Balance</span>
                    <span className="text-xl font-extrabold text-rose-400">₹{balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Confirmation Button with WhatsApp Dispatch */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-950 cursor-pointer hover:scale-[1.01] active:scale-95"
                  >
                    <MessageSquare className="w-5 h-5 fill-current text-slate-950" />
                    <span>CONFIRM BOOKING & SEND BILL + ADVANCE REQUEST ON WHATSAPP</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Click karte hi invoice generate hoga aur client ko WhatsApp par complete confirmation msg + advance payment details dispatch ho jayengi.
                  </p>
                </div>

              </form>

              {/* Past Invoices List */}
              <div className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white font-broadcast uppercase tracking-wide">
                  Previously Generated Invoices ({invoices.length})
                </h3>

                <div className="space-y-3 text-xs font-mono">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-sky-400 font-bold">{inv.invoiceNumber}</span>
                        <div className="text-white font-semibold">{inv.clientName} · {inv.eventName}</div>
                        <div className="text-slate-400 text-[11px]">Phone: {inv.phone} · Date: {inv.date}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-bold">Total: ₹{inv.grandTotal.toLocaleString('en-IN')}</div>
                        <div className="text-rose-400">Balance: ₹{inv.balanceDue.toLocaleString('en-IN')}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveViewingInvoice(inv)}
                          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                        >
                          Print / PDF
                        </button>
                        <button
                          onClick={() => deleteInvoice(inv.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MEDIA GALLERY MANAGER */}
          {adminTab === 'gallery' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block">
                  Media Control
                </span>
                <h2 className="text-2xl font-extrabold text-white font-broadcast uppercase">
                  Media Gallery Manager (Add & Delete Photos)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Yahan se aap khud photos ya videos add kar sakte hain (file upload ya image link) aur purani photos ko 1-click me delete kar sakte hain.
                </p>
              </div>

              {/* Add New Media Form */}
              <form onSubmit={handleAddGalleryItem} className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
                <h3 className="text-sm font-bold text-white uppercase font-broadcast tracking-wide flex items-center gap-2">
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>Add New Photo or Video to Website</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Photo / Video Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Finals Camera Setup / Tournament Pitch View"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Category
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="Cricket">Cricket Action</option>
                      <option value="Live Matches">Live Matches</option>
                      <option value="Camera Setup">Camera Setup</option>
                      <option value="Broadcasting">Broadcasting Control Room</option>
                      <option value="Third Umpire">Third Umpire / DRS</option>
                      <option value="Tournaments">Tournaments & Trophies</option>
                    </select>
                  </div>
                </div>

                {/* Upload Image Option or Paste URL */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-200">
                    Upload Photo from Mobile/Computer OR Paste Online Image URL:
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className="w-full sm:w-auto px-4 py-3 bg-slate-900 hover:bg-slate-850 border border-dashed border-sky-500/50 rounded-xl text-xs font-bold text-sky-400 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Choose File from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-500 uppercase">OR</span>

                    <input
                      type="text"
                      placeholder="Paste online image link (https://...)"
                      value={galleryForm.url}
                      onChange={(e) => {
                        setGalleryForm({ ...galleryForm, url: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                      className="flex-1 px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                  </div>

                  {previewImage && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono text-slate-400 block mb-1">Selected Preview:</span>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-40 h-28 object-cover rounded-lg border border-slate-700"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 text-xs">
                    Short Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Striker end 400mm broadcast camera on heavy duty fluid head"
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-sky-950"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload & Add to Gallery</span>
                  </button>
                </div>
              </form>

              {/* Current Gallery Items with Delete Buttons */}
              <div className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white font-broadcast uppercase tracking-wide">
                  Current Gallery Items ({gallery.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
                      <div className="aspect-[16/10] bg-slate-900 relative">
                        {item.url ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-sky-400">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-3 space-y-1">
                        <h4 className="text-xs font-bold text-white truncate font-broadcast uppercase">{item.title}</h4>
                        {item.description && <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>}
                      </div>

                      <div className="p-2 border-t border-slate-900 flex justify-end">
                        <button
                          onClick={() => deleteGalleryItem(item.id)}
                          className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 hover:bg-rose-900 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CLIENT BOOKINGS, MESSAGES & BALANCE TRACKER */}
          {adminTab === 'bookings' && (
            <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
              
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">
                      Client CRM & Financial Tracking
                    </span>
                    <h2 className="text-2xl font-extrabold text-white font-broadcast uppercase">
                      Client Bookings, Messages & Balance Tracker
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Website se aane wale sabhi client messages aur bookings yahan milenge. Har client ka quotation, advance aur pending balance track karein aur 1-click me WhatsApp balance reminder send karein.
                    </p>
                  </div>

                  {overdue10DaysCount > 0 ? (
                    <button
                      onClick={() => setBookingFilter('OVERDUE_10_DAYS')}
                      className="px-3.5 py-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold font-mono flex items-center gap-2 hover:bg-rose-500/30 transition-all cursor-pointer animate-pulse"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{overdue10DaysCount} Clients with Pending Due (10+ Days)</span>
                    </button>
                  ) : (
                    <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>All Client Balances Within 10-Day Normal Window</span>
                    </div>
                  )}
                </div>
              </div>

              {/* PAYMENT ENTRY & TRUST GUIDE BANNER */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-sky-950/30 to-amber-950/40 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase font-broadcast tracking-wide flex items-center gap-2">
                        <span>💰 Client Payment Entry & Gallery Trust System</span>
                        <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                          AUTOMATIC WHATSAPP RECEIPTS
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        • <strong>Advance milne par:</strong> Kisi bhi client card par <strong>"Record Advance"</strong> click karein → Advance amount enter karein → Client ke WhatsApp par turant <strong>Advance Receipt</strong> chali jayegi.<br />
                        • <strong>Full payment hone par:</strong> <strong>"Record Full Payment"</strong> click karein → Client ko <strong>Thank You</strong> message dispatch hoga aur tournament status <strong>COMPLETED</strong> ho kar website ke <strong>Completed Broadcasts Gallery</strong> me automatic show hone lagega!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial KPI Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-[#080d18] border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Agreed Quotation</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-white font-mono">
                      ₹{totalQuotation.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{bookings.length} Deals</span>
                  </div>
                </div>

                <div className="bg-[#080d18] border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase block">Advance Collected</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      ₹{totalAdvance.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">In Bank/UPI</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/50 rounded-xl p-4 space-y-1 shadow-lg shadow-rose-950/30">
                  <span className="text-[11px] font-mono text-rose-300 font-bold uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>⚠️ PENDING DUE (10+ DAYS)</span>
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono">
                      ₹{overdue10DaysTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-500/40">
                      {overdue10DaysCount} Due (10+ Din)
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/30 rounded-xl p-4 space-y-1">
                  <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>🟢 Active Advance (&lt;10 Days)</span>
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      ₹{activeAdvanceTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300/80 font-bold">
                      {activeAdvanceCount} Within 10 Days
                    </span>
                  </div>
                </div>
              </div>

              {/* Filters & Search Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#080d18] border border-slate-800 p-3 rounded-xl">
                
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by client name, mobile, tournament, venue..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                  {bookingSearch && (
                    <button
                      onClick={() => setBookingSearch('')}
                      className="absolute right-2.5 top-2 text-slate-500 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono font-bold shrink-0">
                  <button
                    onClick={() => setBookingFilter('ALL')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      bookingFilter === 'ALL'
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    All ({bookings.length})
                  </button>

                  <button
                    onClick={() => setBookingFilter('OVERDUE_10_DAYS')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      bookingFilter === 'OVERDUE_10_DAYS'
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-950 font-black'
                        : 'text-rose-400 hover:text-white bg-rose-950/40 border border-rose-600/40'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>⚠️ PENDING DUE 10+ DAYS ({overdue10DaysCount})</span>
                  </button>

                  <button
                    onClick={() => setBookingFilter('ACTIVE_ADVANCE')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      bookingFilter === 'ACTIVE_ADVANCE'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                        : 'text-emerald-400 hover:text-white bg-emerald-950/40 border border-emerald-600/40'
                    }`}
                  >
                    <span>🟢 Active Advance (&lt;10 Days) ({activeAdvanceCount})</span>
                  </button>

                  <button
                    onClick={() => setBookingFilter('NEW')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      bookingFilter === 'NEW'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    New Inquiries ({newInquiriesCount})
                  </button>

                  <button
                    onClick={() => setBookingFilter('CONFIRMED')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      bookingFilter === 'CONFIRMED'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    Confirmed ({confirmedCount})
                  </button>

                  <button
                    onClick={() => setBookingFilter('PAID')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      bookingFilter === 'PAID'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    Paid ({fullyPaidCount})
                  </button>
                </div>

              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-14 bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
                    <p className="text-sm font-semibold">No bookings match this filter.</p>
                    <button
                      onClick={() => {
                        setBookingFilter('ALL');
                        setBookingSearch('');
                      }}
                      className="text-xs text-sky-400 hover:underline font-mono"
                    >
                      Clear search & view all bookings
                    </button>
                  </div>
                ) : (
                  filteredBookings.map((b) => {
                    const quot = b.quotationAmount || 0;
                    const adv = b.advancePaid || 0;
                    const due = Math.max(0, quot - adv);
                    const cleanPhone = (b.whatsapp || b.mobile).replace(/\D/g, '');
                    const daysElapsed = getDaysElapsed(b.createdAt);
                    const isOverdue10Days = due > 0 && daysElapsed >= 10;

                    return (
                      <div
                        key={b.id}
                        className={`bg-[#080d18] border rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl transition-all ${
                          isOverdue10Days
                            ? 'border-rose-500/50 hover:border-rose-500 shadow-rose-950/20'
                            : due > 0
                            ? 'border-emerald-500/30 hover:border-emerald-500/50'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        
                        {/* Top Header of Card */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-sky-400 font-mono bg-sky-950/60 border border-sky-800/60 px-2.5 py-0.5 rounded-md">
                              {b.id}
                            </span>
                            <div>
                              <h3 className="text-base font-extrabold text-white font-broadcast uppercase tracking-wide">
                                {b.eventName}
                              </h3>
                              <span className="text-[11px] text-slate-400 font-mono">
                                Type: {b.eventType} • Booked: {new Date(b.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status Selector */}
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                              className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-950 border border-slate-700 text-sky-300 focus:outline-none focus:border-sky-500"
                            >
                              <option value="NEW">NEW INQUIRY</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUOTATION SENT">QUOTATION SENT</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="ADVANCE RECEIVED">ADVANCE RECEIVED</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete booking ${b.id}?`)) {
                                  deleteBooking(b.id);
                                }
                              }}
                              className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Client Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-500 uppercase text-[10px] block font-bold">Client Contact</span>
                            <span className="text-white font-bold text-sm block">{b.clientName}</span>
                            <span className="text-slate-400 text-[11px] block">{b.organization || 'Individual'}</span>
                            <div className="pt-1 flex items-center gap-2">
                              <a
                                href={`tel:${b.mobile}`}
                                className="text-sky-400 hover:underline text-[11px] flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{b.mobile}</span>
                              </a>
                            </div>
                          </div>

                          <div>
                            <span className="text-slate-500 uppercase text-[10px] block font-bold">Match Schedule</span>
                            <span className="text-white font-bold block">{b.eventDate} ({b.days} Day/s)</span>
                            <span className="text-slate-400 text-[11px] block">{b.startTime} - {b.endTime}</span>
                            <span className="text-slate-400 text-[11px] truncate block">{b.venue}, {b.city}</span>
                          </div>

                          <div>
                            <span className="text-slate-500 uppercase text-[10px] block font-bold">Selected Package</span>
                            <span className="text-sky-400 font-bold block">{b.packageName}</span>
                            {b.additionalServices && b.additionalServices.length > 0 && (
                              <span className="text-slate-400 text-[10px] block line-clamp-1">
                                + {b.additionalServices.join(', ')}
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="text-slate-500 uppercase text-[10px] block font-bold">Client WhatsApp</span>
                            <span className="text-emerald-400 font-bold block font-mono">
                              +{cleanPhone}
                            </span>
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(b.clientName)},%20this%20is%20ITC%20SPORTS%20regarding%20your%20booking%20for%20${encodeURIComponent(b.eventName)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold mt-1"
                            >
                              <MessageSquare className="w-3 h-3 fill-current" />
                              <span>Direct WhatsApp Chat →</span>
                            </a>
                          </div>
                        </div>

                        {/* Client Message / Requirements Box */}
                        {(b.requirements || b.notes) && (
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs">
                            <span className="text-slate-400 font-bold font-mono block mb-1">
                              💬 Client Requirements & Message:
                            </span>
                            <p className="text-slate-300 leading-relaxed font-sans">
                              {b.requirements || b.notes}
                            </p>
                          </div>
                        )}

                        {/* Financial Account Breakdown Banner */}
                        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                          
                          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase block font-bold">Total Deal Quote</span>
                              <span className="text-sm font-extrabold text-white">
                                {quot > 0 ? `₹${quot.toLocaleString('en-IN')}` : 'Quote Pending'}
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] text-emerald-400 uppercase block font-bold">Advance Paid</span>
                              <span className="text-sm font-extrabold text-emerald-400">
                                ₹{adv.toLocaleString('en-IN')}
                              </span>
                            </div>

                            <div className="pl-3 border-l border-slate-800">
                              <span className="text-[10px] text-amber-300 uppercase block font-bold">Remaining Balance</span>
                              <span className={`text-base font-black ${due > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                ₹{due.toLocaleString('en-IN')}
                              </span>
                            </div>

                            {/* Status tag */}
                            <div className="flex items-center">
                              {isOverdue10Days ? (
                                <span className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[10px] font-black font-mono flex items-center gap-1.5 animate-pulse">
                                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                  <span>⚠️ ₹{due.toLocaleString('en-IN')} PENDING DUE ({daysElapsed} DAYS ELAPSED)</span>
                                </span>
                              ) : due > 0 ? (
                                <span className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold font-mono flex items-center gap-1">
                                  <span>🟢 ACTIVE ADVANCE · ₹{due.toLocaleString('en-IN')} Due on Match Day (Day {daysElapsed}/10)</span>
                                </span>
                              ) : quot > 0 ? (
                                <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold font-mono">
                                  ✅ FULLY PAID (NIL BALANCE)
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                                  QUOTE PENDING
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Reminder status badge */}
                          {b.lastReminderSentAt && (
                            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1.5">
                              <Bell className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>
                                Reminder sent {new Date(b.lastReminderSentAt).toLocaleDateString()} (x{b.reminderCount || 1})
                              </span>
                            </div>
                          )}

                        </div>

                        {/* Internal Payment Note if exists */}
                        {b.internalNotes && (
                          <div className="text-[11px] font-mono text-slate-400 italic px-1">
                            Note: {b.internalNotes} {b.paymentMethod && `(${b.paymentMethod})`}
                          </div>
                        )}

                        {/* Committee Provisions Status Badge */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-semibold flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>Committee Provisions Agreed: Traveling, Food & Stay, High-Speed Internet WiFi, Power</span>
                          </span>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-900">
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {/* RECORD ADVANCE BUTTON (If balance still pending) */}
                            {due > 0 && (
                              <button
                                onClick={() => {
                                  setPaymentModalInitialMode('advance');
                                  setSelectedPaymentBooking(b);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-950/60 transition-all cursor-pointer"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>RECORD ADVANCE (RECEIPT)</span>
                              </button>
                            )}

                            {/* RECORD FULL PAYMENT (THANK YOU) BUTTON */}
                            {due > 0 && (
                              <button
                                onClick={() => {
                                  setPaymentModalInitialMode('full');
                                  setSelectedPaymentBooking(b);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-950/60 transition-all cursor-pointer"
                              >
                                <Trophy className="w-3.5 h-3.5 fill-current" />
                                <span>RECORD FULL PAYMENT (THANK YOU)</span>
                              </button>
                            )}

                            {/* IF ALREADY FULLY PAID / COMPLETED */}
                            {due === 0 && quot > 0 && (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                                  <span>100% PAID & IN TRUST GALLERY</span>
                                </span>

                                <button
                                  onClick={() => {
                                    setPaymentModalInitialMode('full');
                                    setSelectedPaymentBooking(b);
                                  }}
                                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>Resend Thank You Msg</span>
                                </button>
                              </div>
                            )}

                            {/* SEND BALANCE REMINDER (WHATSAPP) */}
                            {due > 0 && isOverdue10Days && (
                              <button
                                onClick={() => setSelectedReminderBooking(b)}
                                className="px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500 text-rose-200 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-rose-950"
                              >
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                <span>⚠️ SEND 10-DAY PENDING DUE REMINDER</span>
                              </button>
                            )}

                            {due > 0 && !isOverdue10Days && adv > 0 && (
                              <button
                                onClick={() => setSelectedReminderBooking(b)}
                                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Bell className="w-3.5 h-3.5 text-amber-400" />
                                <span>Send Balance Reminder (Day {daysElapsed}/10)</span>
                              </button>
                            )}

                            {/* Generate Official Bill / Invoice for WhatsApp */}
                            <button
                              onClick={() => handlePrefillBillFromBooking(b)}
                              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Create Bill</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(b.clientName)},%20this%20is%20ITC%20SPORTS.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-current" />
                              <span>Chat on WhatsApp</span>
                            </a>
                          </div>

                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* TAB 5: PACKAGES PRICING */}
          {adminTab === 'packages' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                  Pricing Plans
                </span>
                <h2 className="text-2xl font-extrabold text-white font-broadcast uppercase">
                  Broadcast Packages & Camera Tiers
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Yahan se aap public website par dikhne wale packages ke features ya pricing text change kar sakte hain.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-[#080d18] border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-sky-400">{pkg.cameras}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                        Tier 0{pkg.sortOrder}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white font-broadcast uppercase">{pkg.name}</h4>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Price Tag Display</label>
                        <input
                          type="text"
                          value={pkg.priceDisplay}
                          onChange={(e) => updatePackage(pkg.id, { priceDisplay: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Tagline</label>
                        <input
                          type="text"
                          value={pkg.tagline}
                          onChange={(e) => updatePackage(pkg.id, { tagline: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                      <span>Features included: {pkg.features.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & PASSWORD */}
          {adminTab === 'settings' && (
            <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  Configuration
                </span>
                <h2 className="text-2xl font-extrabold text-white font-broadcast uppercase">
                  Admin Password & Theme Settings
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Yahan se apna login password change karein ya website ka theme color badlein.
                </p>
              </div>

              {/* Password update card - STRICTLY SECURED WITHOUT ANY HINTS */}
              <div className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white uppercase font-broadcast">
                    Change Admin Access Password
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs max-w-md">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">New Secret Password</label>
                    <input
                      type="password"
                      placeholder="Enter new secret password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono tracking-wider focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter new secret password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono tracking-wider focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!newPassword.trim()) {
                        showToast('Please enter a new password', 'error');
                        return;
                      }
                      if (newPassword.trim().length < 6) {
                        showToast('Password should be at least 6 characters', 'error');
                        return;
                      }
                      if (newPassword.trim() !== confirmNewPassword.trim()) {
                        showToast('Passwords do not match! Please check and retry.', 'error');
                        return;
                      }
                      updateAdminPassword(newPassword.trim());
                      setNewPassword('');
                      setConfirmNewPassword('');
                      showToast('Admin password successfully updated and secured!', 'success');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-sky-950 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE NEW PASSWORD</span>
                  </button>

                  <p className="text-[11px] text-slate-400">
                    🔒 Your password is encrypted in local session and strictly guarded. No hints are displayed on screen.
                  </p>
                </div>
              </div>

              {/* Themes preset card */}
              <div className="bg-[#080d18] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-broadcast border-b border-slate-800 pb-3">
                  Website Theme Palette
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {(
                    [
                      { id: 'black-blue', label: 'Black + Blue' },
                      { id: 'black-red', label: 'Black + Red' },
                      { id: 'black-gold', label: 'Black + Gold' },
                      { id: 'darkblue-cyan', label: 'Dark Blue + Cyan' }
                    ] as const
                  ).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setThemePreset(theme.id)}
                      className={`p-3 rounded-xl border text-center font-bold font-broadcast uppercase transition-all cursor-pointer ${
                        settings.themePreset === theme.id
                          ? 'border-sky-400 bg-slate-900 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Invoice Printable View Modal */}
      {activeViewingInvoice && (
        <InvoiceViewModal
          invoice={activeViewingInvoice}
          onClose={() => setActiveViewingInvoice(null)}
        />
      )}

      {/* Balance Payment Reminder WhatsApp Modal */}
      {selectedReminderBooking && (
        <BalanceReminderModal
          booking={selectedReminderBooking}
          onClose={() => setSelectedReminderBooking(null)}
        />
      )}

      {/* Payment & Advance Update Modal */}
      {selectedPaymentBooking && (
        <PaymentUpdateModal
          booking={selectedPaymentBooking}
          initialMode={paymentModalInitialMode}
          onClose={() => setSelectedPaymentBooking(null)}
        />
      )}

    </div>
  );
};
