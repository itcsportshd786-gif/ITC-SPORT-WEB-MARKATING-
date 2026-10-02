import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Calendar,
  Youtube,
  Instagram,
  Facebook
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, showToast, createBooking } = useApp();
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const cleanNumber = settings.whatsapp.replace(/\D/g, '');
  const finalNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) return;

    createBooking({
      clientName: contactForm.name.trim(),
      organization: 'Website Visitor Inquiry',
      mobile: contactForm.phone.trim(),
      whatsapp: contactForm.phone.trim(),
      email: contactForm.email.trim() || 'N/A',
      eventName: 'Tournament Broadcast Inquiry',
      eventType: 'Client Message Inquiry',
      venue: 'To be discussed',
      city: 'Pan-India',
      eventDate: new Date().toISOString().split('T')[0],
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      days: 1,
      packageId: 'inquiry',
      packageName: 'Broadcast Production Inquiry',
      additionalServices: [],
      requirements: contactForm.message.trim() || 'Client submitted message via contact form',
      notes: `Inquiry Message: ${contactForm.message.trim()}`,
      quotationAmount: 0,
      advancePaid: 0
    });

    setSent(true);
    showToast('Inquiry logged and sent to ITC SPORTS crew!', 'success');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative py-20 bg-[#05070c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Direct Communication Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Contact ITC SPORTS
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Have questions regarding camera setups, multi-day rates, or technical requirements? Reach out directly via WhatsApp or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Quick Action Buttons */}
          <div className="lg:col-span-5 bg-[#090e1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white font-broadcast tracking-wide uppercase">
                {settings.brandName}
              </h3>
              <p className="text-xs text-sky-400 font-mono uppercase tracking-wider font-semibold">
                Official Broadcast Operations
              </p>
            </div>

            {/* Prominent Direct Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${finalNumber}?text=Hello%20ITC%20SPORTS,%20I%20would%20like%20to%20inquire%20about%20live%20cricket%20broadcasting%20for%20our%20tournament.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>CHAT WITH US ON WHATSAPP</span>
              </a>

              <button
                onClick={() => scrollTo('booking')}
                className="w-full py-3.5 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 cursor-pointer"
                style={{ backgroundColor: 'var(--theme-button)' }}
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK YOUR EVENT</span>
              </button>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Direct WhatsApp Channel</span>
                  <a 
                    href={`https://wa.me/${finalNumber}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold text-sm hover:underline"
                  >
                    Click to Open WhatsApp Chat →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Official Email</span>
                  <span className="text-white font-mono">{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Headquarters & Production Hub</span>
                  <span className="text-white">{settings.address}, {settings.city}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 font-mono uppercase block">Follow Live Broadcasts</span>
              <div className="flex items-center gap-3">
                <a
                  href={settings.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-rose-400 hover:border-rose-900 transition-colors flex items-center gap-1.5"
                >
                  <Youtube className="w-3.5 h-3.5 text-rose-500" />
                  <span>YouTube</span>
                </a>
                <a
                  href={settings.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-pink-400 hover:border-pink-900 transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a
                  href={settings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-blue-400 hover:border-blue-900 transition-colors flex items-center gap-1.5"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-500" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0b111e] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {sent ? (
              <div className="py-10 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-white font-broadcast uppercase">
                    Inquiry Received & Logged
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                    Your inquiry has been received by the ITC SPORTS production desk. You can also chat with us directly on WhatsApp right now.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${finalNumber}?text=${encodeURIComponent(
                      `Hello ITC SPORTS, my name is ${contactForm.name}. I just submitted an inquiry: "${contactForm.message || 'Please contact me regarding cricket tournament broadcast.'}"`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Open Chat on WhatsApp Now</span>
                  </a>

                  <button
                    onClick={() => {
                      setContactForm({ name: '', phone: '', email: '', message: '' });
                      setSent(false);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="border-b border-slate-800 pb-3 mb-2">
                  <h4 className="text-base font-bold text-white font-broadcast uppercase tracking-wide">
                    Send Direct Message to Production Team
                  </h4>
                  <p className="text-slate-400 text-xs">
                    Receive a quick callback or WhatsApp quotation response within 2 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Anoop Kumar"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g., anoop@tournament.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Event Inquiries & Messages</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your upcoming match dates, ground venue, required camera count..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: 'var(--theme-button)' }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
