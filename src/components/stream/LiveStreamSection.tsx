import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, ExternalLink, Tv, Play, Volume2, ShieldCheck, Flame } from 'lucide-react';
import { LiveOnAirBadge, BroadcastHudCorners } from '../common/BroadcastGraphics';

export const LiveStreamSection: React.FC = () => {
  const { settings } = useApp();
  const { liveStream } = settings;

  // Helper to extract YouTube embed URL from various YouTube formats
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      // If already embed URL
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      // Standard watch URL: youtube.com/watch?v=XYZ
      if (url.includes('watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return id ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0` : '';
      }
      // Shortened URL: youtu.be/XYZ
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return id ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0` : '';
      }
      // Live URL: youtube.com/live/XYZ
      if (url.includes('youtube.com/live/')) {
        const id = url.split('youtube.com/live/')[1]?.split('?')[0];
        return id ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0` : '';
      }
      return url;
    } catch {
      return '';
    }
  };

  const embedUrl = getEmbedUrl(liveStream?.youtubeUrl || '');

  return (
    <section id="live-stream" className="relative py-20 bg-[#060a13] border-t border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Official Live Telecast Center</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Watch Match Live
          </h2>

          <p className="text-xs sm:text-sm text-slate-400">
            {liveStream?.isLive 
              ? 'Broadcasting live directly from ground venue. Watch multi-camera coverage with scorecard and replays.'
              : 'Catch our latest live tournament broadcasts, match highlights, and upcoming stream schedule.'}
          </p>
        </div>

        {/* Live Broadcast Player Container */}
        <div className="relative rounded-2xl overflow-hidden bg-[#090e1a] border-2 border-slate-700/80 shadow-2xl shadow-sky-950/60">
          
          {/* Top HUD Frame Header */}
          <div className="bg-[#0b1220] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {liveStream?.isLive ? (
                <LiveOnAirBadge pulse={true} size="sm" />
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-bold uppercase">
                  <Tv className="w-3 h-3 text-sky-400" />
                  <span>STREAM STANDBY</span>
                </div>
              )}

              <span className="text-xs font-bold text-white font-broadcast uppercase tracking-wide truncate max-w-[260px] sm:max-w-md">
                {liveStream?.matchTitle || 'ITC SPORTS Live Tournament Broadcast'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="hidden sm:inline-block text-slate-400">
                {liveStream?.tournamentName || 'Cricket Championship'}
              </span>
              {liveStream?.youtubeUrl && (
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
            </div>
          </div>

          {/* YouTube Video Embed Viewport */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={liveStream?.matchTitle || "ITC SPORTS Live Stream"}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                  <Tv className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white font-broadcast uppercase">
                    Live Stream Scheduled
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    The broadcast link will appear here as soon as our mobile production OB van goes live on air.
                  </p>
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
              <span className="text-sky-400 font-semibold">MULTI-CAMERA COVERAGE</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>POWERED BY ITC SPORTS MEDIA</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
