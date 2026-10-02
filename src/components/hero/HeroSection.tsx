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

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/50 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wider uppercase">
              <Camera className="w-3.5 h-3.5 text-sky-400" />
              <span>Broadcast-Grade Cricket Production</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white font-broadcast tracking-tight uppercase leading-[0.95]">
                {settings.brandName}
              </h1>

              <div className="text-lg sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-white uppercase font-broadcast">
                {settings.tagline}
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal pt-1">
                {settings.secondaryTagline}. Bringing television-standard multi-camera coverage, zero-delay slow motion, 3D animated scoreboards, and third umpire decision technology to every cricket arena.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
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
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded">
                <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">Multi-Cam</div>
                <div className="text-[11px] text-slate-400">1 to 6+ HD Cams</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded">
                <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">Slow-Mo</div>
                <div className="text-[11px] text-slate-400">Instant Replay</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded">
                <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">Score Bug</div>
                <div className="text-[11px] text-slate-400">Real-Time Graphic</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded">
                <div className="text-xs font-bold text-sky-400 font-broadcast uppercase">3rd Umpire</div>
                <div className="text-[11px] text-slate-400">DRS & Line Tech</div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Broadcast Monitor Simulation */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl shadow-sky-950/40">
              
              {/* Broadcast HUD Corners */}
              <BroadcastHudCorners />

              {/* Simulated Stadium Video Feed Frame */}
              <div className="relative aspect-[16/10] bg-gradient-to-b from-[#0a1426] via-[#050b16] to-[#02050b] p-4 flex flex-col justify-between overflow-hidden">
                
                {/* Background visual graphics simulation */}
                <div className="absolute inset-0 opacity-25">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-sky-400/30 rounded-full animate-radar"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-dashed border-sky-500/20 rounded-full"></div>
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-sky-500/20"></div>
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-sky-500/20"></div>
                </div>

                {/* Top Feed Header */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">CAM 01</span>
                    <span className="text-slate-400">MAIN PITCH STRIKER</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>SIGNAL 99.4%</span>
                  </div>
                </div>

                {/* Center Target & Frame Crosshairs */}
                <div className="relative z-10 my-auto text-center pointer-events-none">
                  <div className="w-16 h-16 mx-auto border border-dashed border-sky-400/40 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-sky-300 mt-2">
                    FOCUS LOCK · 400mm TELEPHOTO
                  </div>
                </div>

                {/* Broadcast Lower-Third Live Cricket Score Bug */}
                <div className="relative z-10 bg-slate-900/90 border border-slate-700/80 rounded p-2.5 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider font-broadcast">
                        KARNATAKA CHAMPIONS TROPHY
                      </span>
                    </div>
                    <span className="text-[10px] text-sky-400 font-mono font-bold">1st INNINGS</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-extrabold text-white font-broadcast">BAN WARRIORS</span>
                        <span className="text-base font-extrabold text-sky-400 font-mono-numbers">184/5</span>
                        <span className="text-xs text-slate-400 font-mono-numbers">(19.4 OV)</span>
                      </div>
                      <div className="text-[10px] text-slate-300 truncate max-w-[200px]">
                        Batting: V. Kumar 48* (29)
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] font-mono text-emerald-400 font-bold">CRR: 9.35</div>
                      <div className="text-[10px] text-slate-400">Bowler: K. Gowtham</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Monitor Deck Controls */}
              <div className="bg-slate-900 border-t border-slate-800 px-3 py-2 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-slate-400" />
                    <span>AUDIO CH 1/2 OK</span>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-sky-400">REPLAY BUFFER READY</span>
                </div>
                <div className="font-mono text-[10px] text-slate-400">
                  ITC MOBILE VAN #01
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
