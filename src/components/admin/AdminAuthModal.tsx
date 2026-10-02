import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, KeyRound, AlertCircle, X, Shield } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    } else {
      setPassword('');
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#090e1a] border border-sky-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block font-bold">
            Secured Owner Access
          </span>
          <h3 className="text-xl font-extrabold text-white font-broadcast uppercase tracking-wide">
            ITC SPORTS Admin Login
          </h3>
          <p className="text-xs text-slate-400">
            Enter your secret password to manage Live Stream, Invoices, and Gallery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secret Admin Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full pl-10 pr-3.5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-sky-500 font-mono tracking-widest"
              />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-rose-400 text-[11px] mt-2 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Incorrect password. Access denied.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--theme-button)' }}
          >
            <Shield className="w-4 h-4" />
            <span>LOGIN TO ADMIN PANEL</span>
          </button>
        </form>

      </div>
    </div>
  );
};
