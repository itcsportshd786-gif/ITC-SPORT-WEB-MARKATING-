import React from 'react';
import { Package } from '../../types';
import { 
  X, 
  Camera, 
  Check, 
  CalendarCheck, 
  Tv, 
  Radio, 
  RotateCcw, 
  Users, 
  Award,
  ShieldCheck
} from 'lucide-react';

interface PackageDetailModalProps {
  pkg: Package | null;
  onClose: () => void;
  onBook: (pkg: Package) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose, onBook }) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0a101d] border border-sky-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold font-mono tracking-wider text-sky-400 bg-sky-950 border border-sky-800">
              {pkg.cameras}
            </span>
            {pkg.isPopular && (
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider text-amber-300 bg-amber-950 border border-amber-700/60 uppercase">
                Most Selected
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-broadcast uppercase tracking-wide">
            {pkg.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {pkg.description}
          </p>
        </div>

        {/* Pricing Banner */}
        <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase font-semibold">Tournament Rate</span>
          <span className="text-sm sm:text-base font-extrabold text-sky-400 font-mono tracking-wider">
            {pkg.priceDisplay}
          </span>
        </div>

        {/* Technical Specs Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Technical Deployment Specifications</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Camera Hardware</span>
              <span className="font-semibold text-slate-200">{pkg.specs.cameras}</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Crew Personnel</span>
              <span className="font-semibold text-slate-200">{pkg.specs.operators}</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Slow Motion / Replay</span>
              <span className="font-semibold text-slate-200">{pkg.specs.replay}</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">On-Screen Score Bug</span>
              <span className="font-semibold text-slate-200">{pkg.specs.scoreboard}</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Live Feed Transmission</span>
              <span className="font-semibold text-slate-200">{pkg.specs.streaming}</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Post-Match Delivery</span>
              <span className="font-semibold text-slate-200">{pkg.specs.delivery}</span>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Included Deliverables
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {pkg.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => onBook(pkg)}
            className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50"
            style={{ backgroundColor: 'var(--theme-button)' }}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Select & Book This Package</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
