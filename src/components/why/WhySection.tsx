import React from 'react';
import { 
  Users, 
  Tv, 
  RotateCcw, 
  Layers, 
  BarChart2, 
  Video, 
  Scale, 
  Maximize2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const WhySection: React.FC = () => {
  const reasons = [
    {
      title: 'Professional Camera Team',
      desc: 'Trained sports camera operators specializing in fast-moving cricket ball tracking, boundary diving stops, and batter emotion closeups.',
      icon: Users
    },
    {
      title: 'HD Production Standards',
      desc: 'Crystal clear 1080p 60fps high-bitrate video pipelines matched to international sports television transmission guidelines.',
      icon: Tv
    },
    {
      title: 'Instant Slow-Motion Replay',
      desc: 'Dedicated replay servers capable of scrubbing to 25% speed with custom tournament animated stingers.',
      icon: RotateCcw
    },
    {
      title: 'Multi-Camera Coverage',
      desc: 'Coordinated deployment from 2 to 6+ cameras covering straight pitch lines, square leg lines, deep boundary towers, and dugout reactions.',
      icon: Layers
    },
    {
      title: 'Live Digital Scoreboard',
      desc: 'Real-time on-screen broadcast TV bugs displaying runs, wickets, overs, required run rate, wagon wheels, and tournament sponsor logos.',
      icon: BarChart2
    },
    {
      title: 'Multi-Angle Production',
      desc: 'Dynamic live switching between strategic field viewpoints orchestrated in real-time by veteran sports technical directors.',
      icon: Video
    },
    {
      title: 'Third Umpire System',
      desc: 'High-speed line-review consoles for precision run-out, stumping, and boundary rope checks with on-screen TV review graphics.',
      icon: Scale
    },
    {
      title: 'Full Ground Coverage',
      desc: 'Complete 360-degree arena vision ensuring zero blind spots from boundary ropes to VIP presentation stages.',
      icon: Maximize2
    },
    {
      title: 'Turnkey Event Production',
      desc: 'Complete end-to-end media execution from pre-match captain toss interviews to post-match awards ceremonies and presentation stages.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="relative py-20 bg-[#05070c] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Why Tournament Organizers Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            The Broadcast Edge
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Dedicated hardware, seasoned sports camera operators, and broadcast engineering built exclusively for live cricket tournaments.
          </p>
        </div>

        {/* 9 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#090e1a] border border-slate-800/80 hover:border-sky-500/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 space-y-3"
              >
                <div className="w-11 h-11 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white font-broadcast uppercase tracking-wide">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
