import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Package } from '../../types';
import { PackageDetailModal } from './PackageDetailModal';
import { PackageComparison } from './PackageComparison';
import { 
  Camera, 
  Check, 
  ChevronRight, 
  Sparkles, 
  Video, 
  Flame,
  ArrowUpRight
} from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { packages, setPreSelectedPackage } = useApp();
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<Package | null>(null);

  // Filter enabled packages and sort by sortOrder
  const activePackages = packages
    .filter((p) => p.isEnabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const handleBookNow = (pkg: Package) => {
    setPreSelectedPackage(pkg);
    setSelectedDetailPackage(null);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="relative py-20 bg-[#05070c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Broadcast Production Tiers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Tournament Broadcasting Packages
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered setups from single-camera local league coverage to 4+ camera television OB van productions with DRS Third Umpire review.
          </p>
        </div>

        {/* 4 Interactive Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {activePackages.map((pkg) => {
            const isGolden = pkg.cameraCount >= 4;
            const isPro = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isGolden
                    ? 'bg-gradient-to-b from-[#141006] via-[#0d0d0f] to-[#08090d] border-2 border-amber-500/50 shadow-2xl shadow-amber-950/40'
                    : isPro
                    ? 'bg-gradient-to-b from-[#09152b] via-[#09101d] to-[#070b14] border-2 border-sky-500/60 shadow-2xl shadow-sky-950/50'
                    : 'bg-[#090e1a] border border-slate-800/80 hover:border-slate-700 shadow-xl'
                }`}
              >
                {/* Popular or Golden Flag */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-sky-900">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Most Popular</span>
                  </div>
                )}

                {isGolden && !pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-900">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Championship Tier</span>
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono px-2.5 py-1 rounded ${
                      isGolden 
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40' 
                        : 'bg-sky-950/80 text-sky-400 border border-sky-800/40'
                    }`}>
                      <Camera className="w-3.5 h-3.5" />
                      <span>{pkg.cameras}</span>
                    </span>

                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      Tier 0{pkg.sortOrder}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-broadcast uppercase tracking-wide">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400 min-h-[32px] mt-1">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing Placeholder */}
                  <div className="py-2 px-3 rounded bg-slate-950/70 border border-slate-800/80 text-center">
                    <span className="text-xs font-mono font-bold text-sky-400 tracking-wider">
                      {pkg.priceDisplay}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    {pkg.features.slice(0, 6).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isGolden ? 'text-amber-400' : 'text-sky-400'
                        }`} />
                        <span className="line-clamp-2 leading-tight">{feat}</span>
                      </div>
                    ))}
                    {pkg.features.length > 6 && (
                      <div className="text-[11px] text-sky-400 font-semibold pt-1">
                        + {pkg.features.length - 6} additional features
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2.5">
                  <button
                    onClick={() => handleBookNow(pkg)}
                    className="w-full py-2.5 px-4 rounded font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    style={{ backgroundColor: 'var(--theme-button)' }}
                  >
                    <span>BOOK NOW</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedDetailPackage(pkg)}
                    className="w-full py-2 px-4 rounded font-semibold text-xs text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Comparison Matrix */}
        <PackageComparison packages={activePackages} onSelectPackage={handleBookNow} />

      </div>

      {/* Package Detail Modal */}
      {selectedDetailPackage && (
        <PackageDetailModal
          pkg={selectedDetailPackage}
          onClose={() => setSelectedDetailPackage(null)}
          onBook={handleBookNow}
        />
      )}
    </section>
  );
};
