import React, { useState } from 'react';
import { INITIAL_SERVICES } from '../../data/initialData';
import { 
  Tv, 
  Radio, 
  Camera, 
  Layers, 
  RotateCcw, 
  BarChart2, 
  Video, 
  Scale, 
  Maximize2, 
  Trophy, 
  ArrowRight, 
  X, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeModalService, setActiveModalService] = useState<typeof INITIAL_SERVICES[0] | null>(null);

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-sky-400 group-hover:text-white transition-colors" };
    switch (iconName) {
      case 'Tv': return <Tv {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'RotateCcw': return <RotateCcw {...props} />;
      case 'BarChart2': return <BarChart2 {...props} />;
      case 'Video': return <Video {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Maximize2': return <Maximize2 {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      default: return <Tv {...props} />;
    }
  };

  return (
    <section id="services" className="relative py-20 bg-[#05070c] border-t border-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Broadcast & Production Services
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tailored engineering solutions designed for cricket boards, private leagues, corporate championships, and sporting franchises.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {INITIAL_SERVICES.map((srv, index) => (
            <div
              key={srv.id}
              className="group relative bg-[#090e1a] border border-slate-800/80 hover:border-sky-500/50 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-950/40 flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-lg bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500 flex items-center justify-center transition-colors">
                  {getServiceIcon(srv.icon)}
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-sky-400 transition-colors">
                  0{index + 1}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 block">
                  {srv.tag}
                </span>
                <h3 className="text-base font-extrabold text-white font-broadcast tracking-wide uppercase leading-tight group-hover:text-sky-200 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {srv.shortDesc}
                </p>
              </div>

              {/* Action */}
              <button
                onClick={() => setActiveModalService(srv)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer pt-2 border-t border-slate-800/60"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0b1220] border border-sky-500/40 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
                {getServiceIcon(activeModalService.icon)}
              </div>
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                  {activeModalService.tag}
                </span>
                <h3 className="text-xl font-bold text-white font-broadcast uppercase">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeModalService.details}
            </p>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white uppercase font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Production Advantages</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Configured to international broadcast TV specifications.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Operated by certified sports video switchers and technicians.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Compatible with YouTube, Facebook, and private OTT streaming.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setActiveModalService(null);
                  const el = document.getElementById('booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 font-bold text-xs uppercase tracking-wider text-white transition-all text-center"
                style={{ backgroundColor: 'var(--theme-button)' }}
              >
                Inquire For Your Event
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
