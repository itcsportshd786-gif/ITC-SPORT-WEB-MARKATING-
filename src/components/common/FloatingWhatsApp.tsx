import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquareText } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const whatsappNumber = settings.whatsapp || '9986095581';
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const finalNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

  const message = encodeURIComponent(
    `Hello ${settings.brandName}! I am inquiring about live sports broadcasting and camera production services for an upcoming cricket event.`
  );

  const whatsappUrl = `https://wa.me/${finalNumber}?text=${message}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900/90 border border-slate-700/80 rounded shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat Directly with Production Desk on WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with ITC SPORTS"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 transition-transform hover:scale-105 active:scale-95"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
        
        <MessageSquareText className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
};
