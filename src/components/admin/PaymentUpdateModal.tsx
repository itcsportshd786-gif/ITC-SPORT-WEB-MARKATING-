import React, { useState, useEffect } from 'react';
import { Booking } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Save, 
  IndianRupee, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  MessageSquare, 
  Copy, 
  Trophy, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

interface PaymentUpdateModalProps {
  booking: Booking;
  onClose: () => void;
  initialMode?: 'advance' | 'full' | 'standard';
}

export const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({ 
  booking, 
  onClose,
  initialMode = 'advance'
}) => {
  const { updateBookingPayment, updateBookingStatus, showToast } = useApp();

  const [mode, setMode] = useState<'advance' | 'full'>(
    initialMode === 'full' ? 'full' : 'advance'
  );

  const [quotationAmount, setQuotationAmount] = useState<number>(booking.quotationAmount || 0);
  const [advancePaid, setAdvancePaid] = useState<number>(
    initialMode === 'full' 
      ? (booking.quotationAmount || 0)
      : (booking.advancePaid || 0)
  );

  const [paymentMethod, setPaymentMethod] = useState<string>(
    booking.paymentMethod || 'UPI (GPay / PhonePe / Paytm)'
  );

  const [internalNotes, setInternalNotes] = useState<string>(
    booking.internalNotes || ''
  );

  // Success dispatch state after user saves
  const [dispatchedReceipt, setDispatchedReceipt] = useState<{
    type: 'ADVANCE' | 'FULL_PAYMENT';
    title: string;
    waUrl: string;
    message: string;
    clientPhone: string;
  } | null>(null);

  const [autoCloseCountdown, setAutoCloseCountdown] = useState<number | null>(null);

  // Auto-close effect when receipt is dispatched so the board never sits stuck
  useEffect(() => {
    if (dispatchedReceipt) {
      setAutoCloseCountdown(5);
      const interval = setInterval(() => {
        setAutoCloseCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            onClose();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatchedReceipt, onClose]);

  const cleanNumber = (booking.whatsapp || booking.mobile).replace(/\D/g, '');
  const finalPhone = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

  // When switching to Full Payment mode, auto-fill full quotation amount
  const handleSelectFullPaymentMode = () => {
    setMode('full');
    setAdvancePaid(quotationAmount);
  };

  const handleSelectAdvanceMode = () => {
    setMode('advance');
    if (booking.advancePaid && booking.advancePaid > 0) {
      setAdvancePaid(booking.advancePaid);
    } else {
      setAdvancePaid(Math.round(quotationAmount * 0.5));
    }
  };

  // Generate Advance Receipt WhatsApp message
  const createAdvanceReceiptMessage = (advAmount: number, dueAmount: number) => {
    return `🏏 *ITC SPORTS - OFFICIAL ADVANCE PAYMENT RECEIPT*
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ *STATUS: ADVANCE PAYMENT RECEIVED & DATES RESERVED!*
*Thank you for choosing ITC SPORTS Live Sports Broadcasting.*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Booking Summary:*
• Booking ID: *#${booking.id}*
• Client / Organizer: *${booking.clientName}*
• Tournament: *${booking.eventName}*
• Ground Venue: *${booking.venue}, ${booking.city}*
• Event Date: *${booking.eventDate}* (${booking.days} Day/s)
• Production Tier: *${booking.packageName}*

💰 *Payment Summary:*
• Total Agreed Package: *₹${quotationAmount.toLocaleString('en-IN')}*
• ✅ *Advance Payment Received: ₹${advAmount.toLocaleString('en-IN')}*
• Payment Mode: *${paymentMethod}*
• ⚠️ *Remaining Balance Due:* *₹${dueAmount.toLocaleString('en-IN')}*
• Balance Due Timing: Payable on match day

📋 *Organizer / Committee Agreed Provisions:*
✓ Traveling & Transport by Committee
✓ Food & Stay / Accommodation by Committee
✓ High-Speed WiFi / Internet (30+ Mbps Upload) at ground
✓ Continuous Electrical Power & Scorer Desk

Thank you for choosing *ITC SPORTS*!
Experience the Game Like Never Before.
📞 Production Helpline: 9986095581`;
  };

  // Generate Full Payment Thank You WhatsApp message
  const createFullPaymentThankYouMessage = (totalAmount: number) => {
    return `🏆 *OFFICIAL RECEIPT: FULL PAYMENT RECEIVED - THANK YOU!*
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ *PAYMENT STATUS: 100% PAID IN FULL (NIL BALANCE)*
*ITC SPORTS thanks you for a successful tournament broadcast!*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Settlement Details:*
• Booking / Invoice ID: *#${booking.id}*
• Client / Organizer: *${booking.clientName}*
• Tournament: *${booking.eventName}*
• Ground Venue: *${booking.venue}, ${booking.city}*
• Event Date: *${booking.eventDate}* (${booking.days} Day/s)
• Production Tier: *${booking.packageName}*

💰 *Final Financial Clearance:*
• Total Package Value: *₹${totalAmount.toLocaleString('en-IN')}*
• Total Amount Received: *₹${totalAmount.toLocaleString('en-IN')}*
• ✅ *Remaining Balance: ₹0.00 (PAID IN FULL - NO DUES)*
• Clearance Mode: *${paymentMethod}*

🌟 *A HEARTFELT THANK YOU FROM ITC SPORTS:*
Aapke tournament *${booking.eventName}* ki live broadcasting ko deliver karne ka anubhav bohot shaandar raha! Aapki organizing committee aur management ka cooperation behtareen tha.

Hum aage bhi aapke sabhi upcoming tournaments aur cricket leagues me international-standard broadcast provide karne ke liye hamesha taiyyar hain!

🏏 *ITC SPORTS - Live Sports Broadcasting*
Experience the Game Like Never Before.
📞 WhatsApp / Helpline: 9986095581`;
  };

  // Handle Advance Payment Save & WhatsApp dispatch
  const handleSaveAdvancePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (advancePaid <= 0) {
      showToast('Please enter the advance amount received', 'error');
      return;
    }

    const calculatedBalance = Math.max(0, quotationAmount - advancePaid);
    const noteText = internalNotes.trim() 
      ? internalNotes 
      : `Advance payment of ₹${advancePaid.toLocaleString('en-IN')} received via ${paymentMethod}.`;

    // 1. Instantly save to database
    updateBookingPayment(
      booking.id,
      Number(quotationAmount) || 0,
      Number(advancePaid) || 0,
      paymentMethod,
      noteText
    );

    // 2. Update status to ADVANCE RECEIVED
    updateBookingStatus(booking.id, 'ADVANCE RECEIVED');

    const msg = createAdvanceReceiptMessage(advancePaid, calculatedBalance);
    const waUrl = `https://wa.me/${finalPhone}?text=${encodeURIComponent(msg)}`;

    // 3. Open WhatsApp in new tab
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Safe fallback
    }

    showToast(`✅ Advance payment saved in database & WhatsApp opened for ${booking.clientName}!`, 'success');

    // 4. Set state so user sees immediate confirmation and board auto-closes
    setDispatchedReceipt({
      type: 'ADVANCE',
      title: 'Advance Payment Receipt',
      waUrl,
      message: msg,
      clientPhone: finalPhone
    });
  };

  // Handle Full Payment Save & Thank You dispatch
  const handleSaveFullPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTotal = quotationAmount > 0 ? quotationAmount : advancePaid;
    const noteText = internalNotes.trim() 
      ? internalNotes 
      : `100% Full Payment of ₹${finalTotal.toLocaleString('en-IN')} received and cleared via ${paymentMethod}. Tournament completed.`;

    // 1. Instantly save to database
    updateBookingPayment(
      booking.id,
      finalTotal,
      finalTotal, // 100% paid
      paymentMethod,
      noteText
    );

    // 2. Update status to COMPLETED - this automatically adds to Gallery / Completed Broadcasts!
    updateBookingStatus(booking.id, 'COMPLETED');

    const msg = createFullPaymentThankYouMessage(finalTotal);
    const waUrl = `https://wa.me/${finalPhone}?text=${encodeURIComponent(msg)}`;

    // 3. Open WhatsApp in new tab
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Safe fallback
    }

    showToast(`🏆 Full payment saved in database! Status marked COMPLETED & added to Gallery!`, 'success');

    // 4. Set state so user sees immediate confirmation and board auto-closes
    setDispatchedReceipt({
      type: 'FULL_PAYMENT',
      title: 'Full Payment Received & Thank You Note',
      waUrl,
      message: msg,
      clientPhone: finalPhone
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#090e1a] border border-sky-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-widest block">
            Client Financials & WhatsApp Receipts
          </span>
          <h3 className="text-xl font-extrabold text-white font-broadcast uppercase tracking-wide">
            Record Client Payment
          </h3>
          <p className="text-xs text-slate-400">
            Booking: <strong className="text-white font-mono">#{booking.id}</strong> — {booking.clientName} ({booking.eventName})
          </p>
        </div>

        {/* ON-SCREEN WHATSAPP RECEIPT DISPATCH ALERT & CLEAN SUCCESS VIEW */}
        {dispatchedReceipt ? (
          <div className="bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl p-6 sm:p-7 space-y-5 animate-fade-in text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold uppercase">
                <Check className="w-4 h-4" />
                <span>100% SAFELY SAVED IN SYSTEM DATABASE!</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-broadcast uppercase">
                {dispatchedReceipt.title} Recorded!
              </h3>
              <p className="text-xs text-slate-200 max-w-md mx-auto font-medium">
                ✅ Record database me save ho chuka hai. Kisi cancel button ki zarurat nahi hai!
              </p>

              {autoCloseCountdown !== null && (
                <div className="text-[11px] font-mono text-emerald-300 bg-black/50 px-3 py-1 rounded-full inline-block border border-emerald-500/40">
                  ⏱️ Closing board automatically in <strong className="text-white font-bold">{autoCloseCountdown}s</strong>... (Data is saved)
                </div>
              )}
            </div>

            {/* Summary Details */}
            <div className="bg-black/60 border border-emerald-800/60 rounded-xl p-4 text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <strong className="text-white">{booking.clientName} (+{dispatchedReceipt.clientPhone})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tournament:</span>
                <span className="text-white font-semibold">{booking.eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Agreed Package:</span>
                <strong className="text-white">₹{quotationAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Recorded:</span>
                <strong className="text-emerald-400">₹{advancePaid.toLocaleString('en-IN')} ({paymentMethod})</strong>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2">
                <span className="text-slate-400">Database Status:</span>
                <strong className={mode === 'full' ? 'text-amber-300' : 'text-emerald-300'}>
                  {mode === 'full' ? '✓ COMPLETED (IN GALLERY / TRUST PROOF)' : '✓ ADVANCE RECEIVED'}
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={dispatchedReceipt.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Re-Open WhatsApp Chat</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(dispatchedReceipt.message);
                  showToast('Receipt message copied to clipboard!', 'success');
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Message</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>✅ ALL SAVED! CLOSE BOARD NOW</span>
              </button>
            </div>
          </div>
        ) : (
          /* MAIN INPUT FORM (DISAPPEARS ONCE SAVED) */
          <>
            {/* PAYMENT FLOW SWITCHER TABS */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={handleSelectAdvanceMode}
                className={`p-3 rounded-xl border font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'advance'
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-950'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>1. RECORD ADVANCE PAYMENT</span>
              </button>

              <button
                type="button"
                onClick={handleSelectFullPaymentMode}
                className={`p-3 rounded-xl border font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'full'
                    ? 'border-amber-400 bg-amber-950/40 text-amber-300 shadow-md shadow-amber-950'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>2. RECORD FULL PAYMENT (THANK YOU)</span>
              </button>
            </div>

            {/* Active Flow Form */}
            <form onSubmit={mode === 'advance' ? handleSaveAdvancePayment : handleSaveFullPayment} className="space-y-4 text-xs">
              
              {/* Total Quotation Amount */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Total Agreed Quotation / Deal Amount (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    min="0"
                    required
                    value={quotationAmount}
                    onChange={(e) => setQuotationAmount(Number(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Mode 1: Advance Amount Field */}
              {mode === 'advance' && (
                <div className="space-y-3 bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-emerald-400 font-bold">
                      Advance Amount Received from Client (₹) *
                    </label>
                    <span className="text-[10px] font-mono text-emerald-300">RECEIPT SENT ON WHATSAPP</span>
                  </div>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                    <input
                      type="number"
                      min="1"
                      required
                      value={advancePaid}
                      onChange={(e) => setAdvancePaid(Number(e.target.value) || 0)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-emerald-500/60 rounded-xl text-emerald-300 font-mono font-bold text-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {/* Quick percentage shortcuts */}
                  <div className="flex items-center gap-2 pt-1 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => setAdvancePaid(Math.round(quotationAmount * 0.3))}
                      className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      30% (₹{Math.round(quotationAmount * 0.3).toLocaleString('en-IN')})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdvancePaid(Math.round(quotationAmount * 0.5))}
                      className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-700 cursor-pointer"
                    >
                      50% (₹{Math.round(quotationAmount * 0.5).toLocaleString('en-IN')})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdvancePaid(Math.round(quotationAmount * 0.7))}
                      className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      70% (₹{Math.round(quotationAmount * 0.7).toLocaleString('en-IN')})
                    </button>
                  </div>

                  {/* Calculated Balance Preview */}
                  <div className="pt-2 border-t border-emerald-900/50 flex justify-between font-mono">
                    <span className="text-slate-400">Remaining Balance Due (on match day):</span>
                    <strong className="text-rose-400 font-bold">
                      ₹{Math.max(0, quotationAmount - advancePaid).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              )}

              {/* Mode 2: Full Payment Summary */}
              {mode === 'full' && (
                <div className="space-y-3 bg-amber-950/20 border border-amber-500/40 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Full Final Settlement (100% Cleared)</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/50">
                      NIL BALANCE DUE
                    </span>
                  </div>

                  <div className="bg-black/40 p-3 rounded-lg border border-amber-800/40 font-mono text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Cleared Amount:</span>
                      <strong className="text-emerald-400 font-bold">₹{quotationAmount.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-1">
                      <span className="text-slate-400">Remaining Balance:</span>
                      <strong className="text-emerald-400 font-extrabold">₹0.00 (PAID IN FULL)</strong>
                    </div>
                  </div>

                  <div className="bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/40 text-[11px] text-amber-200/90 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Trust Showcase Update:</strong> Full payment save karte hi ye tournament status <strong>COMPLETED</strong> ho jayega aur website gallery ke <strong>"Completed Tournaments Hall of Fame"</strong> me automatic show hone lagega jisse future clients ka trust badega!
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500 font-medium"
                >
                  <option value="UPI (GPay / PhonePe / Paytm)">UPI (Google Pay, PhonePe, Paytm - 9986095581)</option>
                  <option value="NEFT / RTGS Bank Transfer">NEFT / RTGS / IMPS Bank Transfer (SBI)</option>
                  <option value="Cash Handover">Cash Handover</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Mixed (Advance UPI + Balance Cash)">Mixed (Advance UPI + Balance Cash)</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Production / Payment Notes
                </label>
                <textarea
                  rows={2}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="e.g. Received via UPI reference UTR #9823471023."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Window
                </button>

                {mode === 'advance' ? (
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE ADVANCE & SEND RECEIPT VIA WHATSAPP</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-950"
                  >
                    <Trophy className="w-4 h-4 text-slate-950 fill-current" />
                    <span>SAVE FULL PAYMENT & SEND THANK YOU MSG</span>
                  </button>
                )}
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
