import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Video, Cpu, Radio, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings } = useApp();

  return (
    <section id="about" className="relative py-20 bg-[#070b14] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Brand Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
              <span>About The Production Company</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
                {settings.brandName}
              </h2>
              <div className="text-base sm:text-lg font-bold text-sky-400 uppercase font-broadcast tracking-wide">
                {settings.tagline}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {settings.aboutText}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Engineered specifically for cricket pitch dynamics, ball tracking, and multi-day tournament schedules.</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Redundant high-speed bonded internet encoders preventing dropouts during critical match climaxes.</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Direct integration with on-ground umpires, commentary teams, and live YouTube/Facebook channels.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded">
                HEADQUARTERS: <span className="text-white font-bold">{settings.city}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded">
                OPERATIONS: <span className="text-emerald-400 font-bold">Pan-India Live Broadcast</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Technical Rig Representation */}
          <div className="lg:col-span-5">
            <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    BROADCAST TECHNICAL STANDARDS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  VERIFIED DEPLOYMENT
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Live Video Encoding</span>
                  <span className="text-white font-semibold block">1080p 60fps Full HD SDI / HDMI Hardware Encoders</span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Audio Capture Infrastructure</span>
                  <span className="text-white font-semibold block">Commentary Headsets + Stump Noise Boundary Ambience Mics</span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Slow Motion Replay Engine</span>
                  <span className="text-white font-semibold block">Synchronized Frame-by-Frame Scrubbing with Stinger Transitions</span>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Connectivity Guarantee</span>
                  <span className="text-white font-semibold block">Bonded 4G/5G Multi-SIM Cellular Transmission</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/91${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Radio className="w-4 h-4 text-sky-400" />
                  <span>Connect with Technical Lead</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
