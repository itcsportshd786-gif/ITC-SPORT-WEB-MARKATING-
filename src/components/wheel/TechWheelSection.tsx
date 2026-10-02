import React, { useState } from 'react';
import { TECH_WHEEL_ITEMS } from '../../data/initialData';
import { BroadcastTechNode } from '../../types';
import { 
  Camera, 
  RotateCcw, 
  BarChart2, 
  Video, 
  Scale, 
  Compass, 
  Radio, 
  Mic, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const TechWheelSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('camera');

  const selectedNode: BroadcastTechNode = 
    TECH_WHEEL_ITEMS.find((item) => item.id === selectedId) || TECH_WHEEL_ITEMS[0];

  const getIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Camera': return <Camera className={className} />;
      case 'RotateCcw': return <RotateCcw className={className} />;
      case 'BarChart2': return <BarChart2 className={className} />;
      case 'Video': return <Video className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Radio': return <Radio className={className} />;
      case 'Mic': return <Mic className={className} />;
      default: return <Camera className={className} />;
    }
  };

  const totalItems = TECH_WHEEL_ITEMS.length;
  const radius = 170; // Wheel radius in px for desktop SVG

  return (
    <section id="tech-wheel" className="relative py-20 bg-[#070b14] border-t border-slate-900 overflow-hidden">
      
      {/* Background glow behind wheel */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Core Broadcasting Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Broadcast Technology Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Click or tap each broadcast component around the wheel to inspect our live television equipment, replay engines, and digital scorecard systems.
          </p>
        </div>

        {/* Interactive Layout: Wheel + Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Wheel Graphic Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Desktop / Tablet Circular Interactive Wheel */}
            <div className="relative w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] flex items-center justify-center select-none">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-0 rounded-full border border-slate-800/80 pointer-events-none"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-sky-500/20 pointer-events-none"></div>
              <div className="absolute inset-16 rounded-full border border-slate-800/60 pointer-events-none"></div>

              {/* Center Hub */}
              <div className="relative z-20 w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-slate-950 border-2 border-sky-500/50 shadow-xl shadow-sky-950/80 flex flex-col items-center justify-center text-center p-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping mb-1"></span>
                <span className="text-xs sm:text-sm font-extrabold text-white font-broadcast tracking-wider">
                  ITC SPORTS
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">
                  LIVE HUB
                </span>
              </div>

              {/* 8 Positioned Nodes */}
              {TECH_WHEEL_ITEMS.map((item, index) => {
                const angle = (index * 360) / totalItems - 90;
                const rad = (angle * Math.PI) / 180;
                // Responsive distance factor
                const distance = 145; // pixel offset from center
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;
                const isSelected = item.id === selectedId;

                return (
                  <div
                    key={item.id}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className="absolute z-30 transition-all duration-300"
                  >
                    <button
                      onClick={() => setSelectedId(item.id)}
                      className={`group flex items-center gap-2 p-2 sm:p-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
                        isSelected
                          ? 'bg-sky-500 border-white text-white shadow-sky-500/40 scale-110 z-40'
                          : 'bg-slate-900/90 border-slate-700/80 text-slate-300 hover:text-white hover:border-sky-400/60 hover:bg-slate-800'
                      }`}
                      title={item.label}
                      aria-label={`Select ${item.label}`}
                    >
                      {getIcon(item.iconName, 'w-4 h-4 sm:w-5 sm:h-5')}
                      <span className={`text-[11px] font-bold font-broadcast tracking-wider uppercase pr-1.5 ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  </div>
                );
              })}

            </div>

            {/* Mobile Touch Quick Strip (for rapid thumb tapping on small screens) */}
            <div className="lg:hidden mt-8 w-full overflow-x-auto pb-2 flex items-center gap-2 scrollbar-none">
              {TECH_WHEEL_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border shrink-0 transition-colors flex items-center gap-1.5 ${
                    selectedId === item.id
                      ? 'bg-sky-500 border-sky-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {getIcon(item.iconName, 'w-3.5 h-3.5')}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Detailed Spec Card for Selected Node */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all">
              
              {/* Subtle accent border line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    {getIcon(selectedNode.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest">
                      {selectedNode.shortTag}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white font-broadcast tracking-wide uppercase">
                      {selectedNode.label}
                    </h3>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
                  COMPONENT #{TECH_WHEEL_ITEMS.findIndex(i => i.id === selectedNode.id) + 1}/08
                </div>
              </div>

              {/* Summary Lead */}
              <p className="text-base font-semibold text-slate-100 border-l-2 border-sky-500 pl-3 py-1 mb-4">
                "{selectedNode.summary}"
              </p>

              {/* Full Details */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedNode.fullDetails}
              </p>

              {/* Specs Checklist */}
              <div className="space-y-2.5 bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg mb-6">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Standard Deployment Specifications</span>
                </div>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {selectedNode.specs.map((spec: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  Included in all relevant tournament packages
                </span>
                <a
                  href="#packages"
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider"
                >
                  <span>See Packages</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
