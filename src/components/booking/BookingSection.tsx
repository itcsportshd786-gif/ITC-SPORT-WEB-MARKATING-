import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, Package } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Building, 
  CheckCircle2, 
  Send, 
  UploadCloud, 
  FileText, 
  Sparkles,
  MessageSquare,
  Printer,
  ChevronRight,
  ShieldCheck,
  Check,
  Car,
  UtensilsCrossed,
  Wifi,
  Zap,
  AlertCircle
} from 'lucide-react';

export const BookingSection: React.FC = () => {
  const { packages, createBooking, preSelectedPackage, settings } = useApp();

  const [formData, setFormData] = useState({
    clientName: '',
    organization: 'Tournament Organizing Committee',
    mobile: '',
    whatsapp: '',
    email: '',
    eventName: '',
    eventType: 'Cricket Tournament',
    venue: '',
    city: 'Belagavi',
    eventDate: '',
    startTime: '08:30',
    endTime: '17:30',
    days: 1,
    packageId: packages[1]?.id || packages[0]?.id || '',
    additionalServices: [] as string[],
    requirements: '',
    notes: '',
    posterName: '',
    referenceCount: 0,
    // Committee / Organizer Mandatory Conditions
    agreeTraveling: true,
    agreeFoodStay: true,
    agreeHighSpeedInternet: true,
    agreePowerSupply: true,
    agreeAllTerms: false
  });

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync pre-selected package if user clicked from package cards
  useEffect(() => {
    if (preSelectedPackage) {
      setFormData((prev) => ({
        ...prev,
        packageId: preSelectedPackage.id
      }));
    }
  }, [preSelectedPackage]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.clientName.trim()) errors.clientName = 'Client / Organizer name is required';
    if (!formData.mobile.trim() || formData.mobile.length < 10) errors.mobile = 'Valid 10-digit mobile number required';
    if (!formData.eventName.trim()) errors.eventName = 'Event / Tournament name is required';
    if (!formData.venue.trim()) errors.venue = 'Venue ground location is required';
    if (!formData.eventDate) errors.eventDate = 'Event start date is required';
    if (!formData.agreeAllTerms) {
      errors.agreeAllTerms = 'Please confirm and agree to the Organizer / Committee responsibilities (Traveling, Food & Stay, High-Speed WiFi, and Power).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.getElementById('terms-section');
      if (!formData.agreeAllTerms && firstError) {
        firstError.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);

    const selectedPkg = packages.find((p) => p.id === formData.packageId) || packages[0];

    const newBooking = createBooking({
      clientName: formData.clientName,
      organization: formData.organization || 'Tournament Organizer Committee',
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      email: formData.email,
      eventName: formData.eventName,
      eventType: formData.eventType,
      venue: formData.venue,
      city: formData.city,
      eventDate: formData.eventDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      days: Number(formData.days),
      packageId: selectedPkg.id,
      packageName: `${selectedPkg.name} (${selectedPkg.cameras})`,
      additionalServices: formData.additionalServices,
      requirements: formData.requirements,
      notes: formData.notes,
      posterName: formData.posterName,
      referenceImagesCount: formData.referenceCount,
      organizerAgreedTerms: true,
      committeeProvisions: [
        'Traveling & Local Transport for Crew',
        'Food & Stay (Accommodation & Meals)',
        'High-Speed Internet / WiFi (30+ Mbps Upload)',
        'Continuous Electrical Power & Scorer Desk Access'
      ]
    });

    setIsSubmitting(false);
    setConfirmedBooking(newBooking);

    // Automatically trigger WhatsApp direct send to 9986095581
    try {
      const waUrl = generateWhatsAppUrl(newBooking);
      window.open(waUrl, '_blank');
    } catch {
      // Handled by on-screen direct WhatsApp button
    }
  };

  const generateWhatsAppUrl = (booking: Booking) => {
    const rawNumber = settings.whatsapp || '9986095581';
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const finalNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

    const text = `🏏 *NEW ITC SPORTS EVENT BOOKING - IN PROCESS*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 *ORDER STATUS: YOUR ORDER IS IN PROCESS!*
*ITC SPORTS WILL CONTACT YOU SOON.*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Booking Identification:*
• Booking ID: *#${booking.id}*
• Client / Organizer: *${booking.clientName}*
• Mobile: *${booking.mobile}*
• WhatsApp: *${booking.whatsapp}*

🏆 *Tournament Schedule:*
• Event: *${booking.eventName}* (${booking.eventType})
• Venue: *${booking.venue}, ${booking.city}*
• Date: *${booking.eventDate}* (${booking.days} Day/s)
• Timing: *${booking.startTime} to ${booking.endTime}*
• Production Package: *${booking.packageName}*

📋 *ORGANIZER / COMMITTEE PROVISIONS (CONFIRMED & AGREED):*
✓ *Traveling & Transport:* Arranged by Organizer
✓ *Food & Stay / Accommodation:* Provided by Committee
✓ *High-Speed Internet / WiFi:* Arranged at ground for 1080p live stream
✓ *Continuous Power Supply:* Arranged by Committee`;

    return `https://wa.me/${finalNumber}?text=${encodeURIComponent(text)}`;
  };

  const printConfirmation = () => {
    window.print();
  };

  return (
    <section id="booking" className="relative py-20 bg-[#070b14] border-t border-slate-900">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Direct Reservation Desk · Belagavi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Book Your Tournament Broadcast
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Submit your event schedule to lock in camera operators, transmission rigs, and broadcast director consoles.
          </p>
        </div>

        {/* Confirmation Screen Overlay State */}
        {confirmedBooking ? (
          <div className="bg-[#0b1220] border-2 border-emerald-500/70 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fade-in">
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>ORDER STATUS: IN PROCESS</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-broadcast tracking-wide uppercase leading-tight">
                  YOUR ORDER IS IN PROCESS!
                  <span className="block text-sky-400 text-xl sm:text-3xl mt-1">
                    ITC SPORTS WILL CONTACT YOU SOON.
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Your event booking order has been successfully registered. The ITC SPORTS broadcast production desk will contact you shortly via call and WhatsApp to finalize the match schedule and crew dispatch.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
                <span>Official Booking ID:</span>
                <strong className="text-white font-bold text-sm tracking-wide">#{confirmedBooking.id}</strong>
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 uppercase block font-bold">Organizer / Client</span>
                  <span className="text-white font-bold text-sm">{confirmedBooking.clientName}</span>
                  <span className="text-slate-400 block text-[11px]">Ph: {confirmedBooking.mobile}</span>
                  {confirmedBooking.whatsapp && confirmedBooking.whatsapp !== confirmedBooking.mobile && (
                    <span className="text-slate-400 block text-[11px]">WA: {confirmedBooking.whatsapp}</span>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 uppercase block font-bold">Tournament / Event</span>
                  <span className="text-white font-bold text-sm">{confirmedBooking.eventName}</span>
                  <span className="text-slate-400 block text-[11px]">{confirmedBooking.eventType}</span>
                  <span className="text-slate-400 block text-[11px]">{confirmedBooking.venue}, {confirmedBooking.city}</span>
                </div>

                <div>
                  <span className="text-slate-500 uppercase block font-bold">Match Date & Schedule</span>
                  <span className="text-white font-bold">{confirmedBooking.eventDate} ({confirmedBooking.days} Day/s)</span>
                  <span className="text-slate-400 block text-[11px]">{confirmedBooking.startTime} to {confirmedBooking.endTime}</span>
                </div>

                <div>
                  <span className="text-slate-500 uppercase block font-bold">Production Tier</span>
                  <span className="text-sky-400 font-bold text-sm">{confirmedBooking.packageName}</span>
                </div>
              </div>

              {/* Organizer Confirmed Facilities Badge */}
              <div className="pt-3 border-t border-slate-900 space-y-2">
                <span className="text-slate-400 font-bold uppercase block text-[11px]">
                  ✓ Organizer / Committee Agreed Provisions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Traveling & Transport arranged by Committee</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Food & Stay (Accommodation) provided by Committee</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>High-Speed Internet / WiFi (30+ Mbps Upload) at ground</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Continuous Electrical Power & Scorer Desk access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={generateWhatsAppUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/80 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>CHAT WITH ITC SPORTS CREW ON WHATSAPP (9986095581)</span>
              </a>

              <button
                onClick={printConfirmation}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Booking Slip</span>
              </button>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-slate-400 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Another Match
              </button>
            </div>

          </div>
        ) : (
          /* Main Interactive Form */
          <form onSubmit={handleSubmit} className="bg-[#0b111e] border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Step 1: Client & Organizer Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase font-broadcast tracking-wider">
                  Client & Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Client / Organizer Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rajesh Patil"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  {formErrors.clientName && <p className="text-rose-400 text-[11px] mt-1">{formErrors.clientName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  {formErrors.mobile && <p className="text-rose-400 text-[11px] mt-1">{formErrors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    WhatsApp Number (for confirmation)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="WhatsApp number if different"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase font-broadcast tracking-wider">
                  Event & Venue Parameters
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="lg:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">
                    Event / Tournament Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Belagavi Champions Trophy 2026"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                  {formErrors.eventName && <p className="text-rose-400 text-[11px] mt-1">{formErrors.eventName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Cricket Tournament">Cricket Tournament</option>
                    <option value="Cricket League / Championship">Cricket League / Championship</option>
                    <option value="Corporate Cricket Cup">Corporate Cricket Cup</option>
                    <option value="Day-Night Exhibition Match">Day-Night Exhibition Match</option>
                    <option value="State / District Fixture">State / District Fixture</option>
                    <option value="Other Sports Event">Other Sports Event</option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">
                    Venue Ground Name & Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., Union Gymkhana Ground / Sardar Ground, Belagavi"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  {formErrors.venue && <p className="text-rose-400 text-[11px] mt-1">{formErrors.venue}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    City / District
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Event Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                  {formErrors.eventDate && <p className="text-rose-400 text-[11px] mt-1">{formErrors.eventDate}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Start & End Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-2 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500 text-center"
                    />
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-2 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500 text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Number of Tournament Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Package Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase font-broadcast tracking-wider">
                  Production Package Selection
                </h3>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2 text-xs">
                  Choose Production Tier *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, packageId: pkg.id })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.packageId === pkg.id
                          ? 'bg-sky-950/80 border-sky-400 text-white shadow-lg shadow-sky-950'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-mono text-sky-400 uppercase font-bold">{pkg.cameras}</div>
                      <div className="text-sm font-extrabold text-white font-broadcast">{pkg.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{pkg.tagline}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Organizer & Committee Responsibilities (Mandatory Conditions) */}
            <div id="terms-section" className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">4</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase font-broadcast tracking-wider">
                    Organizer / Committee Responsibilities (Mandatory Terms)
                  </h3>
                  <span className="text-[11px] text-amber-400 font-mono block">
                    The tournament organizer or organizing committee is required to provide the following arrangements on-ground:
                  </span>
                </div>
              </div>

              {/* 4 Conditions Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* 1. Traveling */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 font-bold font-broadcast uppercase">
                    <Car className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>1. Traveling & Local Transport</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ground transportation / travel allowance for broadcast crew and camera equipment to and from venue / airport / station.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    ✓ Organizer / Committee Provision
                  </span>
                </div>

                {/* 2. Food & Stay */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold font-broadcast uppercase">
                    <UtensilsCrossed className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>2. Food & Stay / Accommodation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Hygienic accommodation hotel rooms, meals (breakfast, lunch, dinner), and ground drinking water/refreshments during all match days.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    ✓ Organizer / Committee Provision
                  </span>
                </div>

                {/* 3. High-Speed Internet / WiFi */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold font-broadcast uppercase">
                    <Wifi className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>3. High-Speed Internet / WiFi (30+ Mbps Upload)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Dedicated high-speed internet (LAN cable or stable 5G/WiFi router) at ground scoring area for uninterrupted 1080p 60fps live streaming.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    ✓ Organizer / Committee Provision
                  </span>
                </div>

                {/* 4. Electrical Power */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold font-broadcast uppercase">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>4. Continuous Electrical Power & Ground Access</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Continuous AC electricity / generator backup for streaming rigs, replay servers, commentary area, and official match scoring desk.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    ✓ Organizer / Committee Provision
                  </span>
                </div>

              </div>

              {/* Master Mandatory Checkbox */}
              <div className={`p-4 rounded-xl border transition-all cursor-pointer ${
                formData.agreeAllTerms
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                  : formErrors.agreeAllTerms
                  ? 'bg-rose-950/30 border-rose-500 text-rose-200'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeAllTerms}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        agreeAllTerms: e.target.checked
                      });
                      if (e.target.checked) {
                        setFormErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.agreeAllTerms;
                          return copy;
                        });
                      }
                    }}
                    className="mt-1 w-5 h-5 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 bg-slate-900 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-bold block leading-snug">
                    I / We confirm that as the Tournament Organizer or Committee, we agree to arrange and provide the above facilities (Traveling, Food & Stay, High-Speed Internet / WiFi, and Power) for the ITC SPORTS broadcast crew. *
                  </span>
                </label>
              </div>

              {formErrors.agreeAllTerms && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formErrors.agreeAllTerms}</span>
                </div>
              )}

            </div>

            {/* Submission Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                <span className="block font-semibold text-emerald-400">Direct WhatsApp Dispatch on Submission</span>
                <span>Your booking details are sent directly to the production coordinators without delay.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-950 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--theme-button)' }}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'GENERATING BOOKING...' : 'SUBMIT EVENT RESERVATION'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
