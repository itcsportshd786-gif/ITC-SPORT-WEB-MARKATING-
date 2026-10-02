import React from 'react';

export const BroadcastHudCorners: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      {/* Top Left */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sky-400/40"></div>
      {/* Top Right */}
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sky-400/40"></div>
      {/* Bottom Left */}
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sky-400/40"></div>
      {/* Bottom Right */}
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sky-400/40"></div>
    </div>
  );
};

export const LiveOnAirBadge: React.FC<{ pulse?: boolean; size?: 'sm' | 'md' | 'lg' }> = ({ 
  pulse = true, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5'
  }[size];

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  }[size];

  return (
    <div className={`inline-flex items-center font-bold tracking-wider uppercase text-rose-100 bg-rose-950/80 border border-rose-500/50 rounded shadow-sm shadow-rose-900/40 ${sizeClasses}`}>
      <span className={`relative flex ${dotSize}`}>
        {pulse && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full ${dotSize} bg-rose-500 ${pulse ? 'animate-pulse' : ''}`}></span>
      </span>
      <span>LIVE ON AIR</span>
    </div>
  );
};

export const RecIndicator: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs text-rose-400 bg-black/60 border border-rose-500/30 px-2.5 py-1 rounded">
      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
      <span className="font-semibold tracking-wider">REC</span>
      <span className="text-slate-400 text-[10px] tabular-nums font-mono">1080p60</span>
    </div>
  );
};

export const StadiumAtmosphereSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Top Floodlight Beams */}
      <div className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-sky-400/15 via-blue-500/5 to-transparent rounded-full blur-3xl transform -rotate-12"></div>
      <div className="absolute -top-32 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-sky-400/15 via-blue-600/5 to-transparent rounded-full blur-3xl transform rotate-12"></div>
      
      {/* Stadium Pitch Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] bg-gradient-to-t from-emerald-950/20 via-sky-950/10 to-transparent blur-2xl"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 broadcast-grid opacity-30"></div>

      {/* Subtle Scanlines */}
      <div className="absolute inset-0 broadcast-scanlines opacity-10"></div>
    </div>
  );
};
