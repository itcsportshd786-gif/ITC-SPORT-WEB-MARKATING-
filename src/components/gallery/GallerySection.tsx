import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryItem, Booking } from '../../types';
import { 
  Maximize2, 
  X, 
  Play, 
  Camera, 
  Image as ImageIcon, 
  Trophy, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Tv, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Radio,
  Eye,
  Users
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, bookings, setPreSelectedPackage, packages } = useApp();
  const [activeTab, setActiveTab] = useState<'completed' | 'media'>('completed');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  // Completed tournament broadcasts from real bookings
  const completedBookings = bookings.filter(
    (b) => b.status === 'COMPLETED' || (b.quotationAmount && b.quotationAmount > 0 && b.balanceDue === 0)
  );

  // Total completed tournaments count (historical + system real-time)
  const totalTournamentsCount = 48 + completedBookings.length;

  const handleBookSimilar = (pkgName: string) => {
    const matchedPkg = packages.find((p) => pkgName.toLowerCase().includes(p.name.toLowerCase())) || packages[0];
    setPreSelectedPackage(matchedPkg);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="relative py-20 bg-[#05070c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Broadcast Track Record & Media</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Completed Live Broadcasts & Media Gallery
          </h2>

          <p className="text-xs sm:text-sm text-slate-400">
            Real action highlights, live tournament deliveries, and ground rigs. Every completed tournament is recorded here, showcasing our 100% on-time broadcast commitment.
          </p>
        </div>

        {/* TRUST PROOF STATS COUNTER BAR */}
        <div className="bg-gradient-to-r from-blue-950/40 via-sky-950/40 to-slate-950 border border-sky-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-broadcast tracking-tight">
                {totalTournamentsCount}+
              </span>
              <span className="text-[11px] text-sky-400 uppercase font-bold block">
                Tournaments Delivered
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-broadcast tracking-tight">
                100%
              </span>
              <span className="text-[11px] text-slate-400 uppercase block">
                Broadcast Completion
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-broadcast tracking-tight">
                40M+
              </span>
              <span className="text-[11px] text-slate-400 uppercase block">
                Live YouTube Views
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-800">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-broadcast tracking-tight">
                1080p 60fps
              </span>
              <span className="text-[11px] text-slate-400 uppercase block">
                Full HD Multi-Cam
              </span>
            </div>
          </div>
        </div>

        {/* SECTION TOGGLE TABS */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>COMPLETED LIVE BROADCASTS ({completedBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4 text-sky-300" />
              <span>PRODUCTION MEDIA & RIG PHOTOS ({gallery.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: COMPLETED BROADCASTS SHOWCASE */}
        {activeTab === 'completed' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  Hall of Fame · Successfully Delivered
                </span>
                <h3 className="text-lg font-bold text-white font-broadcast uppercase">
                  Tournaments Broadcasted Live by ITC SPORTS
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Real orders completed by our on-ground crew
              </span>
            </div>

            {completedBookings.length === 0 ? (
              <div className="text-center py-16 bg-[#080d18] border border-slate-800 rounded-2xl p-8 space-y-3">
                <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white uppercase font-broadcast">
                  No Completed Broadcasts Recorded Yet
                </h3>
                <p className="text-xs text-slate-400">
                  When the admin completes a tournament booking and clears the balance, it will automatically appear here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#080d18] border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-6 space-y-4 shadow-xl hover:shadow-emerald-950/30 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>100% BROADCAST COMPLETED</span>
                        </span>

                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          #{b.id}
                        </span>
                      </div>

                      {/* Tournament Title */}
                      <div>
                        <h4 className="text-base font-extrabold text-white font-broadcast uppercase tracking-wide group-hover:text-sky-300 transition-colors">
                          {b.eventName}
                        </h4>
                        <span className="text-xs text-slate-400 font-mono block mt-0.5">
                          {b.organization || b.clientName}
                        </span>
                      </div>

                      {/* Match Details */}
                      <div className="space-y-1.5 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="truncate">{b.venue}, {b.city}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{b.eventDate} ({b.days} Day/s)</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <Tv className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="text-sky-400 font-bold truncate">{b.packageName}</span>
                        </div>
                      </div>

                      {/* Add-ons Delivered */}
                      {b.additionalServices && b.additionalServices.length > 0 && (
                        <div className="text-[11px] text-slate-400 font-mono">
                          <span className="text-slate-500 uppercase text-[10px] block font-bold">Delivered Features:</span>
                          <span className="text-slate-300">{b.additionalServices.join(' • ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer with Call to Action */}
                    <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                        ✓ HD Feed Streamed
                      </span>

                      <button
                        onClick={() => handleBookSimilar(b.packageName)}
                        className="text-xs font-bold text-sky-400 hover:text-white flex items-center gap-1 font-mono transition-colors cursor-pointer"
                      >
                        <span>Book Similar Setup</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTION MEDIA & GROUND RIG PHOTOS */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fade-in">
            {gallery.length === 0 ? (
              <div className="text-center py-16 bg-[#080d18] border border-slate-800 rounded-2xl p-8 space-y-3">
                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white uppercase font-broadcast">No Photos Added Yet</h3>
                <p className="text-xs text-slate-400">
                  Photos and match videos uploaded by admin will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveLightboxItem(item)}
                    className="group relative bg-[#090e1a] border border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-950/40 flex flex-col justify-between"
                  >
                    {/* Media Image / Thumbnail */}
                    <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden">
                      {item.url ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : null}

                      {/* Fallback container with gradient and icon */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1628] via-[#08101e] to-black flex items-center justify-center -z-10 p-4 text-center">
                        <div className="space-y-1">
                          <Camera className="w-8 h-8 text-sky-400/60 mx-auto" />
                          <span className="text-[10px] font-mono text-slate-400 block">{item.tag || item.category}</span>
                        </div>
                      </div>

                      {/* Top Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/80 text-sky-300 border border-slate-700 backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-lg">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Info Text */}
                    <div className="p-3.5 bg-[#080d18] border-t border-slate-800/80 space-y-1">
                      <h4 className="text-xs font-bold text-white font-broadcast uppercase tracking-wide truncate group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-1 leading-normal">
                          {item.description}
                        </p>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div 
          onClick={() => setActiveLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#090e1a] border border-sky-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white p-2 rounded-full bg-black/70 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video max-h-[70vh] bg-black rounded-lg overflow-hidden flex items-center justify-center">
              {activeLightboxItem.url ? (
                <img
                  src={activeLightboxItem.url}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <Camera className="w-16 h-16 text-sky-400/60 mx-auto mb-2" />
                  <span className="text-xs font-mono text-slate-400">ITC SPORTS Broadcast Production Photo</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800 pt-3">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block font-bold">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-broadcast uppercase">
                  {activeLightboxItem.title}
                </h3>
                {activeLightboxItem.description && (
                  <p className="text-xs text-slate-300 mt-1">{activeLightboxItem.description}</p>
                )}
              </div>

              <div className="text-right font-mono text-[10px] text-slate-500 shrink-0">
                ITC SPORTS MEDIA REEL
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
