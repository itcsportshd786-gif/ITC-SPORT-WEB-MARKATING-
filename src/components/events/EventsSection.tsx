import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';
import { 
  Radio, 
  Calendar, 
  MapPin, 
  Clock, 
  Trophy, 
  Activity, 
  CheckCircle, 
  Tv, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { events } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'COMPLETED'>('ALL');

  const liveEvents = events.filter((e) => e.status === 'LIVE');
  const upcomingEvents = events.filter((e) => e.status === 'UPCOMING');
  const completedEvents = events.filter((e) => e.status === 'COMPLETED');

  const displayedEvents = 
    activeTab === 'LIVE' ? liveEvents :
    activeTab === 'UPCOMING' ? upcomingEvents :
    activeTab === 'COMPLETED' ? completedEvents :
    events;

  return (
    <section id="events" className="relative py-20 bg-[#070b14] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Broadcast Schedule & Match Tracker</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-broadcast uppercase tracking-tight">
            Live Matches & Upcoming Tournaments
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Keep track of live tournament transmissions, scheduled cricket fixtures, and archived championship finals produced by ITC SPORTS.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {(['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-950'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab === 'LIVE' && liveEvents.length > 0 ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>LIVE NOW ({liveEvents.length})</span>
                </span>
              ) : (
                <span>{tab} ({tab === 'ALL' ? events.length : tab === 'UPCOMING' ? upcomingEvents.length : completedEvents.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Live Match Spotlight Card (if any live event exists and visible) */}
        {(activeTab === 'ALL' || activeTab === 'LIVE') && liveEvents.length > 0 && (
          <div className="mb-14">
            {liveEvents.map((evt) => (
              <div 
                key={evt.id}
                className="relative bg-gradient-to-r from-[#0d1627] via-[#09101d] to-[#120e17] border-2 border-rose-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-rose-950/20 overflow-hidden"
              >
                {/* Broadcast Live Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-950 border border-rose-500/60 text-rose-300 text-xs font-black uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    <span>● LIVE NOW ON AIR</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="text-sky-400 font-bold">{evt.package}</span>
                    <span>·</span>
                    <span>FEED: 1080p60 RTMP</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Event details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                        Official Broadcast Stream
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-broadcast tracking-wide uppercase mt-1">
                        {evt.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>{evt.venue}, {evt.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        <span>{evt.time}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Right Column: Live Broadcast TV Scorecard Simulator */}
                  {evt.liveMatchDetails && (
                    <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 backdrop-blur-md space-y-4 shadow-xl">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-white uppercase font-broadcast tracking-wider">
                          {evt.liveMatchDetails.matchTitle}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">INNINGS 1</span>
                      </div>

                      {/* Team 1 Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{evt.liveMatchDetails.team1.flag}</span>
                          <span className="text-sm font-bold text-white font-broadcast uppercase">
                            {evt.liveMatchDetails.team1.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-extrabold text-sky-400 font-mono-numbers">
                            {evt.liveMatchDetails.team1.score}
                          </span>
                          <span className="text-xs text-slate-400 font-mono-numbers ml-2">
                            ({evt.liveMatchDetails.team1.overs} ov)
                          </span>
                        </div>
                      </div>

                      {/* Team 2 Status */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{evt.liveMatchDetails.team2.flag}</span>
                          <span className="font-semibold text-slate-300 uppercase font-broadcast">
                            {evt.liveMatchDetails.team2.name}
                          </span>
                        </div>
                        <span className="font-mono text-slate-300">
                          {evt.liveMatchDetails.team2.score}
                        </span>
                      </div>

                      {/* Live Ticker info */}
                      <div className="bg-slate-900/80 rounded p-2.5 text-[11px] font-mono space-y-1 text-slate-300">
                        <div className="text-sky-300 font-semibold">
                          🏏 {evt.liveMatchDetails.currentBatsmen}
                        </div>
                        <div className="text-slate-400">
                          🎯 {evt.liveMatchDetails.currentBowler}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regular Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((evt) => {
            const isLive = evt.status === 'LIVE';
            const isUpcoming = evt.status === 'UPCOMING';
            const isCompleted = evt.status === 'COMPLETED';

            return (
              <div
                key={evt.id}
                className="bg-[#090e1a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isLive ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      isUpcoming ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                      'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {evt.status}
                    </span>

                    <span className="text-xs font-mono text-slate-400">
                      {evt.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-broadcast uppercase tracking-wide">
                      {evt.name}
                    </h3>
                    <span className="text-[11px] text-sky-400 font-semibold block">
                      Client: {evt.client}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{evt.venue}, {evt.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-300">{evt.package}</span>
                  </div>

                  {evt.tournamentResult && (
                    <div className="bg-slate-950 p-2 rounded text-[11px] text-emerald-400 font-mono mt-2">
                      🏆 {evt.tournamentResult}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
