import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Phone, Mail, MapPin, Youtube, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, openAuthModal, isAdminAuthenticated, setCurrentView } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#030509] border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white font-broadcast tracking-wider">
              {settings.brandName}
            </h2>
            <p className="text-xs uppercase font-bold tracking-widest text-sky-400">
              {settings.tagline}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional live cricket broadcasting, multi-camera television production, high-speed slow-motion replay, and dynamic real-time graphics for tournaments across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('tech-wheel')} className="hover:text-white transition-colors cursor-pointer">
                  Broadcast Tech
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('packages')} className="hover:text-white transition-colors cursor-pointer">
                  Packages & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Tournament Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('events')} className="hover:text-white transition-colors cursor-pointer">
                  Live & Upcoming Events
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('booking')} className="hover:text-white transition-colors cursor-pointer">
                  Book Your Event
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Broadcast Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Broadcast Services</h3>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-300 transition-colors">Sports Broadcasting</li>
              <li className="hover:text-slate-300 transition-colors">Camera Production</li>
              <li className="hover:text-slate-300 transition-colors">Instant Slow-Mo Replay</li>
              <li className="hover:text-slate-300 transition-colors">Live Scoreboard Integration</li>
              <li className="hover:text-slate-300 transition-colors">Multi-Angle Production</li>
              <li className="hover:text-slate-300 transition-colors">Third Umpire Review Console</li>
              <li className="hover:text-slate-300 transition-colors">Full Ground Coverage</li>
              <li className="hover:text-slate-300 transition-colors">Tournament Media Packages</li>
            </ul>
          </div>

          {/* Production Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Production Inquiries</h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Instant Booking Desk</span>
                  <a 
                    href={`https://wa.me/91${settings.whatsapp.replace(/\D/g, '')}?text=Hello%20ITC%20SPORTS,%20I%20would%20like%20to%20inquire%20about%20cricket%20broadcasting.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-0.5 px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 font-bold rounded text-xs transition-colors"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Official Email</span>
                  <span className="font-mono-numbers">{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Operations Base</span>
                  <span>{settings.address}, {settings.city}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.brandName}. All rights reserved. Live Sports Broadcasting & Production.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-600">Cricket Tournament & League Specialists</span>
            {isAdminAuthenticated && (
              <button
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors text-[11px] py-1 px-2.5 rounded bg-slate-900 border border-slate-800 cursor-pointer"
                title="Admin Dashboard"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Panel</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
