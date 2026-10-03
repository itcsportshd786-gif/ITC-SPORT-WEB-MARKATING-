import React, { useState } from 'react';
import { Booking } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MessageSquare, 
  Copy, 
  Check, 
  AlertTriangle,
  Clock,
  Send
} from 'lucide-react';

interface BalanceReminderModalProps {
  booking: Booking;
  onClose: () => void;
}

export const BalanceReminderModal: React.FC<BalanceReminderModalProps> = ({ booking, onClose }) => {
  const { markReminderSent, showToast, settings } = useApp();
  const [copied, setCopied] = useState(false);

  const quotation = booking.quotationAmount || 0;
  const advance = booking.advancePaid || 0;
  const balanceDue = Math.max(0, quotation - advance);

  const cleanNumber = (booking.whatsapp || booking.mobile).replace(/\D/g, '');
  const clientPhone = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

  const getDaysElapsed = () => {
    if (!booking.createdAt) return 0;
    const created = new Date(booking.createdAt).getTime();
    if (isNaN(created)) return 0;
    return Math.max(0, Math.floor((Date.now() - created) / (1000 * 60 * 60 * 24)));
  };

  const daysElapsed = getDaysElapsed();
  const isOverdue10Days = daysElapsed >= 10;

  // Professional message template tailored to whether 10 days have elapsed or not
  const defaultMessage = isOverdue10Days
    ? `🏏 *ITC SPORTS - Live Cricket Broadcasting*
⚠️ *NOTICE: 10 DAYS ELAPSED - PENDING BALANCE DUE*
━━━━━━━━━━━━━━━━━━━━━━━━━━
Dear *${booking.clientName}*,
Greetings from the *ITC SPORTS* production desk.

It has been *${daysElapsed} days* since your tournament booking confirmation (10-day booking grace period completed).

📋 *Booking Details:*
• Booking ID: *#${booking.id}*
• Tournament / Match: *${booking.eventName}*
• Match Date: *${booking.eventDate}* (${booking.days} Day/s)
• Venue: *${booking.venue}, ${booking.city}*
• Broadcast Setup: *${booking.packageName}*

💰 *Payment Account Summary:*
• Total Agreed Package: *₹${quotation.toLocaleString('en-IN')}*
• Advance Received: *₹${advance.toLocaleString('en-IN')}*
• ⚠️ *Remaining Pending Due: ₹${balanceDue.toLocaleString('en-IN')}*

Kindly arrange to clear this pending balance of *₹${balanceDue.toLocaleString('en-IN')}* at your earliest convenience to lock the technical crew, live streaming servers, and third umpire equipment.

Official UPI / GPay / PhonePe: *9986095581* (ITC Sports Live)
Please share the payment confirmation screenshot here on WhatsApp once completed.

Thank you!
*ITC SPORTS Broadcast Operations*
📞 Helpline: ${settings.whatsapp || '9986095581'}`
    : `🏏 *ITC SPORTS - Live Cricket Broadcasting*
*PAYMENT BALANCE REMINDER (DAY ${daysElapsed}/10)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
Dear *${booking.clientName}*,
Greetings from the *ITC SPORTS* production desk!

This is a gentle payment balance reminder regarding your upcoming tournament live broadcast:

📋 *Booking Details:*
• Booking ID: *#${booking.id}*
• Tournament / Match: *${booking.eventName}*
• Date: *${booking.eventDate}* (${booking.days} Day/s)
• Venue: *${booking.venue}, ${booking.city}*
• Broadcast Setup: *${booking.packageName}*

💰 *Payment Account Summary:*
• Total Agreed Amount: *₹${quotation.toLocaleString('en-IN')}*
• Advance Received: *₹${advance.toLocaleString('en-IN')}*
• 🟢 *Remaining Balance (Due on Match Day): ₹${balanceDue.toLocaleString('en-IN')}*

Kindly note that the remaining balance of *₹${balanceDue.toLocaleString('en-IN')}* is payable on match day.
For online payment (UPI / Bank transfer) or coordination, reply here on WhatsApp.

Thank you for choosing *ITC SPORTS*!
📞 Contact: ${settings.whatsapp || '9986095581'}`;

  const [reminderText, setReminderText] = useState(defaultMessage);

  const handleSendWhatsApp = () => {
    markReminderSent(booking.id);
    const waUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(reminderText)}`;
    window.open(waUrl, '_blank');
    showToast(`✅ Balance reminder saved in database & WhatsApp opened for ${booking.clientName}!`, 'success');
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reminderText);
    setCopied(true);
    showToast('Reminder text copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className={`relative w-full max-w-2xl bg-[#090e1a] border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto ${
        isOverdue10Days ? 'border-rose-500/60 shadow-rose-950/30' : 'border-amber-500/40 shadow-amber-950/20'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            {isOverdue10Days ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/60 text-rose-300 text-xs font-mono font-bold uppercase animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>⚠️ 10+ DAYS OVERDUE PENDING DUE (DAY {daysElapsed})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>ACTIVE ADVANCE (DAY {daysElapsed}/10)</span>
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-broadcast uppercase tracking-wide">
            {isOverdue10Days ? 'Send 10-Day Pending Due Notice' : 'Send Balance Payment Reminder'}
          </h3>
          <p className="text-xs text-slate-400">
            Official notice for <strong className="text-white">{booking.clientName}</strong> on WhatsApp.
          </p>
        </div>

        {/* Balance Card Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Total Deal Quote</span>
            <span className="text-base font-extrabold text-white font-mono">
              ₹{quotation.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Advance Received</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              ₹{advance.toLocaleString('en-IN')}
            </span>
          </div>

          <div className={`text-center sm:text-left p-3 rounded-lg border ${
            isOverdue10Days 
              ? 'bg-rose-500/15 border-rose-500/50' 
              : 'bg-amber-500/10 border-amber-500/30'
          }`}>
            <span className={`text-[10px] font-mono font-bold uppercase block ${
              isOverdue10Days ? 'text-rose-300' : 'text-amber-300'
            }`}>
              {isOverdue10Days ? '⚠️ PENDING DUE (10+ DAYS)' : 'Remaining Balance'}
            </span>
            <span className={`text-lg font-black font-mono ${
              isOverdue10Days ? 'text-rose-400' : 'text-amber-400'
            }`}>
              ₹{balanceDue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Client & Event Quick Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#0c1322] p-3.5 rounded-xl border border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="font-semibold text-slate-300">Client:</span>
              <span className="text-white font-bold">{booking.clientName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="font-semibold text-slate-300">WhatsApp:</span>
              <span className="text-emerald-400 font-mono font-bold">+{clientPhone}</span>
            </div>
          </div>
          <div className="space-y-1 sm:text-right">
            <div className="text-slate-400">
              <span className="font-semibold text-slate-300">Tournament:</span> {booking.eventName}
            </div>
            <div className="text-slate-400">
              <span className="font-semibold text-slate-300">Days Elapsed:</span> <strong className="text-white font-mono">{daysElapsed} days</strong> ({isOverdue10Days ? 'Overdue flag active' : 'Within 10-day period'})
            </div>
          </div>
        </div>

        {/* Message Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-300">
              WhatsApp Message Preview & Direct Edit
            </label>
            <span className="text-slate-500 font-mono text-[11px]">
              Ready to Send to Client
            </span>
          </div>
          <textarea
            rows={8}
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            className="w-full p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Message'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Close Window
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
                isOverdue10Days
                  ? 'bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 hover:from-rose-400 hover:to-amber-300 shadow-rose-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-950'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>SEND ON WHATSAPP & SAVE</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
