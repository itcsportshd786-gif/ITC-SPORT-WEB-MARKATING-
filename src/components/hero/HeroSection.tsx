import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BroadcastHudCorners, 
  LiveOnAirBadge, 
  RecIndicator, 
  StadiumAtmosphereSvg 
} from '../common/BroadcastGraphics';
import { 
  Camera, 
  ChevronRight, 
  Wifi, 
  Tv, 
  Volume2, 
  Activity,
  Maximize2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings } = useApp();
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const updateTc = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 60)).padStart(2, '0');
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
    };

    const interval = setInterval(updateTc, 50);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#05070c] pt-8 pb-16">
      {/* Stadium lights & atmospheric background */}
      <StadiumAtmosphereSvg />

      {/* Cinematic stadium floodlight graphics representation */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <radialGradient id="floodlight1" cx="20%" cy="10%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="floodlight2" cx="80%" cy="10%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#floodlight1)" />
          <rect width="100%" height="100%" fill="url(#floodlight2)" />
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top HUD Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-slate-800/80 pb-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <LiveOnAirBadge size="sm" pulse={true} />
            <RecIndicator />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              DIRECT SDI FEED
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1">
              <Wifi className="w-3 h-3 text-sky-400" />
              BONDED CELLULAR 4G/5G
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Tv className="w-3 h-3 text-sky-400" />
              1080p60 MASTER
            </span>
            <div className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono-numbers text-sky-300 tracking-wider">
              TC {timecode}
            </div>
          </div>
        </div>

        {/* Main Hero Container */}
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/50 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wider uppercase">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Broadcast-Grade Cricket Production · Belagavi</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white font-broadcast tracking-tight uppercase leading-[0.95]">
              {settings.brandName}
            </h1>

            <div className="text-lg sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-white uppercase font-broadcast">
              {settings.tagline}
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
              {settings.secondaryTagline}. Bringing television-standard multi-camera coverage, zero-delay slow motion, 3D animated scoreboards, and third umpire decision technology to every cricket arena.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => scrollTo('live-stream')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-bold tracking-wider text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-lg shadow-rose-950/60 active:scale-95 cursor-pointer uppercase flex items-center justify-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <span>WATCH LIVE MATCH</span>
            </button>

            <button
              onClick={() => scrollTo('booking')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-bold tracking-wider text-white transition-all shadow-lg active:scale-95 cursor-pointer uppercase flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--theme-button)' }}
            >
              <span>BOOK YOUR EVENT</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('packages')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-lg text-xs font-bold tracking-wider text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
            >
              <span>PACKAGES</span>
            </button>
          </div>

          {/* Key Capability Bullets */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center max-w-3xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">Multi-Cam</div>
              <div className="text-[11px] text-slate-400 mt-0.5">1 to 6+ HD Cams</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">Slow-Mo</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Instant Replay</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">Score Bug</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Real-Time Graphic</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
              <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">3rd Umpire</div>
              <div className="text-[11px] text-slate-400 mt-0.5">DRS & Line Tech</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
