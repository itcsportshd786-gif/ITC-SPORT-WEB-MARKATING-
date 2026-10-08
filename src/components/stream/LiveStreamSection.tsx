import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, ExternalLink, Tv, Play, Volume2, ShieldCheck, Flame, Settings, Eye, CheckCircle2 } from 'lucide-react';
import { LiveOnAirBadge, BroadcastHudCorners } from '../common/BroadcastGraphics';

export const LiveStreamSection: React.FC = () => {
  const { settings, setCurrentView, setAdminTab, openAuthModal, isAdminAuthenticated } = useApp();
  const { liveStream } = settings;
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  // Helper to extract YouTube embed URL from various YouTube formats
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const clean = url.trim();
    if (clean.includes('placeholder') || clean.includes('live_stream_placeholder')) {
      return '';
    }

    try {
      let id = '';
      if (clean.includes('youtube.com/embed/')) {
        id = clean.split('embed/')[1]?.split('?')[0]?.split('&')[0];
      } else if (clean.includes('watch?v=')) {
        id = clean.split('watch?v=')[1]?.split('&')[0]?.split('#')[0];
      } else if (clean.includes('youtu.be/')) {
        id = clean.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
      } else if (clean.includes('youtube.com/live/')) {
        id = clean.split('youtube.com/live/')[1]?.split('?')[0]?.split('&')[0];
      } else if (clean.includes('youtube.com/shorts/')) {
        id = clean.split('shorts/')[1]?.split('?')[0]?.split('&')[0];
      } else if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
        id = clean;
      }

      if (id && id.length >= 6) {
        // Use youtube-nocookie.com to avoid cross-domain / 3rd-party cookie blocking on external sites
        return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&enablejsapi=1`;
      }
      return '';
    } catch {
      return '';
    }
  };

  const activeEmbedUrl = showDemoVideo 
    ? 'https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?rel=0&modestbranding=1'
    : getEmbedUrl(liveStream?.youtubeUrl || '');

  const handleOpenAdminStreamManager = () => {
    if (isAdminAuthenticated) {
      setCurrentView('admin');
      setAdminTab('livestream');
    } else {
      openAuthModal();
    }
  };

  return (
    <section id="live-stream" className="relative py-20 bg-[#060a13] border-t border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Official Live Telecast Center · Belagavi</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Watch Match Live
          </h2>

          <p className="text-xs sm:text-sm text-slate-400">
            {activeEmbedUrl
              ? 'Broadcasting live directly from ground venue. Enjoy multi-camera coverage with real-time scorecards and instant replays.'
              : 'Official live match stream center. Catch ongoing cricket tournament coverage and upcoming broadcast schedules.'}
          </p>
        </div>

        {/* Live Broadcast Player Container */}
        <div className="relative rounded-2xl overflow-hidden bg-[#090e1a] border-2 border-slate-700/80 shadow-2xl shadow-sky-950/60">
          
          {/* Top HUD Frame Header */}
          <div className="bg-[#0b1220] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {activeEmbedUrl ? (
                <LiveOnAirBadge pulse={true} size="sm" />
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-bold uppercase">
                  <Tv className="w-3 h-3 text-sky-400" />
                  <span>STANDBY · READY</span>
                </div>
              )}

              <span className="text-xs font-bold text-white font-broadcast uppercase tracking-wide truncate max-w-[260px] sm:max-w-md">
                {liveStream?.matchTitle || 'ITC SPORTS Live Tournament Broadcast'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="hidden sm:inline-block text-slate-400">
                {liveStream?.tournamentName || 'Belagavi Champions Trophy'}
              </span>
              
              {activeEmbedUrl && liveStream?.youtubeUrl && !showDemoVideo && (
                <a
                  href={liveStream.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                onClick={handleOpenAdminStreamManager}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                title="Update YouTube Live Stream Link"
              >
                <Settings className="w-3 h-3" />
                <span>Admin Stream Setup</span>
              </button>
            </div>
          </div>

          {/* Video Viewport / Standby Display */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {activeEmbedUrl ? (
              <iframe
                src={activeEmbedUrl}
                title={liveStream?.matchTitle || "ITC SPORTS Live Stream"}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              /* High-Tech Broadcast Standby Screen */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0b1424] via-[#060a12] to-black">
                <BroadcastHudCorners />
                
                {/* Visual radar & stadium wave simulation */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-sky-400 rounded-full animate-ping opacity-25"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-dashed border-sky-500/40 rounded-full"></div>
                </div>

                <div className="relative z-10 max-w-lg space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-sky-500/40 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ITC SPORTS OB VAN TELECAST READY</span>
                  </div>

                  <h3 className="text-xl sm:text-3xl font-extrabold text-white font-broadcast uppercase tracking-tight">
                    {liveStream?.matchTitle || 'Next Live Match Scheduled'}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    The live stream video will play here as soon as the match begins. Operators can update the live stream URL anytime from the Admin Panel.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleOpenAdminStreamManager}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-950 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Paste Live YouTube Link</span>
                    </button>

                    <button
                      onClick={() => setShowDemoVideo(true)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-sky-400" />
                      <span>Test Video Player</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Stream Status Deck */}
          <div className="bg-[#090f1e] border-t border-slate-800/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300 font-mono">1080p 60FPS FULL HD BROADCAST FEED</span>
              <span className="text-slate-600">|</span>
              <span className="text-sky-400 font-semibold">BELAGAVI PRODUCTION HUB</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              {showDemoVideo && (
                <button
                  onClick={() => setShowDemoVideo(false)}
                  className="text-amber-400 hover:underline cursor-pointer font-bold"
                >
                  ✕ Close Demo Video
                </button>
              )}
              <span>POWERED BY ITC SPORTS MEDIA</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
