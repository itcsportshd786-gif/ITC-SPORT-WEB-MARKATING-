import React from 'react';
import { Invoice } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Printer, 
  Download, 
  MessageSquare, 
  X, 
  Building, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

interface InvoiceViewModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoiceViewModal: React.FC<InvoiceViewModalProps> = ({ invoice, onClose }) => {
  const { settings, showToast } = useApp();
  const [isSent, setIsSent] = React.useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSend = () => {
    const rawNumber = invoice.phone || settings.whatsapp;
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const finalNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;

    const text = `ITC SPORTS INVOICE

Invoice Number: ${invoice.invoiceNumber}
Date: ${invoice.date}
Client: ${invoice.clientName} (${invoice.organization})
Event: ${invoice.eventName}
Grand Total: ₹${invoice.grandTotal.toLocaleString('en-IN')}
Advance Paid: ₹${invoice.advancePaid.toLocaleString('en-IN')}
Balance Due: ₹${invoice.balanceDue.toLocaleString('en-IN')}
Payment Status: ${invoice.paymentStatus}

Thank you for choosing ITC SPORTS Live Sports Broadcasting!`;

    window.open(`https://wa.me/${finalNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setIsSent(true);
    showToast(`✅ Invoice #${invoice.invoiceNumber} saved in database & WhatsApp opened!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#090e1a] border border-slate-700 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 my-8 print:m-0 print:p-6 print:border-none print:bg-white print:text-black">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              INVOICE PREVIEW · {invoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleWhatsAppSend}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSent
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{isSent ? '✓ Sent & Saved!' : 'Send On WhatsApp'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded-md bg-slate-800 hover:bg-slate-700 ml-1 cursor-pointer font-medium"
            >
              Close
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div className="space-y-6 text-xs text-slate-300 print:text-black">
          
          {/* Top Brand Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 print:border-slate-300 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white print:text-black font-broadcast tracking-wider">
                {settings.brandName}
              </h2>
              <p className="text-xs font-mono font-bold text-sky-400 print:text-sky-700 uppercase tracking-widest mt-1">
                {settings.tagline}
              </p>
              <p className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
                {settings.address}, {settings.city}
              </p>
              <p className="text-[11px] text-slate-400 print:text-slate-600">
                Direct WhatsApp: +91 {settings.whatsapp} · Email: {settings.email}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="text-xl font-extrabold text-white print:text-black font-mono block">
                TAX INVOICE
              </span>
              <div className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                Invoice No: <span className="text-white print:text-black font-bold">{invoice.invoiceNumber}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                Date: <span className="text-white print:text-black font-bold">{invoice.date}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                Due Date: <span className="text-white print:text-black font-bold">{invoice.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Billed To / Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/70 print:bg-slate-100 p-4 rounded-xl border border-slate-800 print:border-slate-300">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 print:text-slate-600 block">
                Billed To (Client Details)
              </span>
              <h4 className="text-sm font-bold text-white print:text-black font-broadcast">
                {invoice.clientName}
              </h4>
              <p className="text-xs text-slate-300 print:text-black font-medium">
                {invoice.organization}
              </p>
              <p className="text-[11px] text-slate-400 print:text-slate-600 font-mono">
                Phone: {invoice.phone}
              </p>
              <p className="text-[11px] text-slate-400 print:text-slate-600 font-mono">
                Email: {invoice.email}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-mono uppercase text-slate-500 print:text-slate-600 block">
                Tournament / Event Information
              </span>
              <h4 className="text-sm font-bold text-sky-400 print:text-sky-700 font-broadcast">
                {invoice.eventName}
              </h4>
              <p className="text-xs text-slate-300 print:text-black">
                Venue: {invoice.venue}
              </p>
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 print:bg-slate-200 border border-slate-700 print:border-slate-400 text-sky-300 print:text-black">
                Payment: {invoice.paymentStatus}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-600 font-mono uppercase">
                  <th className="py-2.5 px-3">Description of Broadcast Service</th>
                  <th className="py-2.5 px-3 text-center">Qty / Days</th>
                  <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                  <th className="py-2.5 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 print:hover:bg-transparent">
                    <td className="py-3 px-3 text-slate-200 print:text-black font-medium">{item.description}</td>
                    <td className="py-3 px-3 text-center text-slate-300 print:text-black font-mono">{item.quantity}</td>
                    <td className="py-3 px-3 text-right text-slate-300 print:text-black font-mono">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right text-white print:text-black font-mono font-bold">₹{item.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculations Summary */}
          <div className="flex justify-end pt-2 border-t border-slate-800 print:border-slate-300">
            <div className="w-full sm:w-72 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>Subtotal:</span>
                <span className="text-white print:text-black">₹{invoice.subtotal.toLocaleString('en-IN')}</span>
              </div>

              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-400 print:text-emerald-700">
                  <span>Special Discount:</span>
                  <span>- ₹{invoice.discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>GST / Service Tax ({invoice.taxPercent}%):</span>
                <span className="text-white print:text-black">₹{invoice.taxAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-white print:text-black pt-2 border-t border-slate-700 print:border-slate-400">
                <span>Grand Total:</span>
                <span className="text-sky-400 print:text-sky-700">₹{invoice.grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-300 print:text-black pt-1">
                <span>Advance Paid:</span>
                <span className="text-emerald-400 print:text-emerald-700 font-bold">₹{invoice.advancePaid.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-rose-400 print:text-rose-700 pt-1 border-t border-slate-800 print:border-slate-300">
                <span>Remaining Balance Due:</span>
                <span>₹{invoice.balanceDue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 text-[11px] text-slate-400 print:text-slate-600 space-y-1">
            <span className="font-bold text-slate-300 print:text-black uppercase block">Payment & Broadcast Terms:</span>
            <p>{invoice.notes}</p>
            <p>{invoice.terms}</p>
            <p className="text-emerald-400 print:text-emerald-800 font-medium">
              • Committee / Organizer Responsibility: Traveling & Transport, Food & Stay (Accommodation), High-Speed Internet / WiFi, and continuous Electrical Power at ground to be provided by the Tournament Organizer / Committee.
            </p>
          </div>

          {/* Signature Block */}
          <div className="pt-8 flex justify-between items-end text-xs text-slate-400 print:text-black">
            <div>
              <span className="font-mono text-[10px] uppercase block text-slate-500">Authorized Signatory</span>
              <span className="font-bold text-white print:text-black">{settings.brandName} Operations Desk</span>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-500">
              Generated by ITC SPORTS Live Production Suite
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
