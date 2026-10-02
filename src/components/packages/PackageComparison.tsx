import React, { useState } from 'react';
import { Package } from '../../types';
import { Check, Minus, LayoutGrid, Table } from 'lucide-react';

interface PackageComparisonProps {
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
}

export const PackageComparison: React.FC<PackageComparisonProps> = ({ packages, onSelectPackage }) => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const criteria = [
    { key: 'cameras', label: 'Camera Count' },
    { key: 'hd', label: 'HD Coverage' },
    { key: 'replay', label: 'Instant Slow-Mo Replay' },
    { key: 'scoreboard', label: 'Live Digital Scoreboard' },
    { key: 'multiAngle', label: 'Multi-Angle Angles' },
    { key: 'thirdUmpire', label: 'Third Umpire / DRS Review' },
    { key: 'fullGround', label: 'Full Ground 360° Vision' },
    { key: 'streaming', label: 'Bonded 60fps Live Streaming' },
    { key: 'production', label: 'Production Level' },
  ];

  const getCriterionValue = (pkg: Package, key: string) => {
    switch (key) {
      case 'cameras':
        return pkg.cameras;
      case 'hd':
        return 'Full HD 1080p';
      case 'replay':
        return pkg.cameraCount >= 2 ? (pkg.cameraCount >= 3 ? 'Multi-Angle Slow-Mo' : 'Basic Replay') : 'Optional Add-on';
      case 'scoreboard':
        return pkg.cameraCount >= 2 ? 'Full TV Graphic Suite' : 'Basic TV Bug';
      case 'multiAngle':
        return pkg.cameraCount >= 2 ? `${pkg.cameraCount} Synchronized Angles` : 'Single Main View';
      case 'thirdUmpire':
        return pkg.cameraCount >= 4 ? 'Included (DRS Line Console)' : 'Not Included';
      case 'fullGround':
        return pkg.cameraCount >= 4 ? 'Full 360° Ground Wire Feeds' : (pkg.cameraCount === 3 ? 'Wide Ground Coverage' : 'Standard Boundary');
      case 'streaming':
        return 'YouTube & Facebook (1080p)';
      case 'production':
        return pkg.cameraCount >= 4 ? 'Championship TV Van' : (pkg.cameraCount >= 2 ? 'Studio Multi-Cam' : 'Single Cam ENG');
      default:
        return 'Included';
    }
  };

  const isPositive = (val: string) => {
    return !val.toLowerCase().includes('not included') && !val.toLowerCase().includes('optional');
  };

  return (
    <div className="mt-16 bg-[#090e1a] border border-slate-800 rounded-2xl p-6 sm:p-8">
      
      {/* Header & Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-broadcast uppercase tracking-wide">
            Broadcast Capability Matrix
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare key technical specifications across our production packages.
          </p>
        </div>

        {/* View Switcher Button */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'cards' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Card View</span>
          </button>
        </div>
      </div>

      {/* Desktop / Full Table View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                <th className="py-4 px-4 font-bold text-slate-300 min-w-[180px]">Feature & Tech Spec</th>
                {packages.map((pkg) => (
                  <th key={pkg.id} className="py-4 px-4 min-w-[150px]">
                    <div className="text-sm font-extrabold text-white font-broadcast">{pkg.name}</div>
                    <div className="text-[10px] text-sky-400 font-mono">{pkg.cameras}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {criteria.map((crit) => (
                <tr key={crit.key} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 text-slate-300 font-semibold">{crit.label}</td>
                  {packages.map((pkg) => {
                    const val = getCriterionValue(pkg, crit.key);
                    const positive = isPositive(val);
                    return (
                      <td key={pkg.id} className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 ${
                          positive ? 'text-slate-200' : 'text-slate-500'
                        }`}>
                          {positive ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Minus className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span>{val}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="py-5 px-4 text-slate-400 font-mono">Action</td>
                {packages.map((pkg) => (
                  <td key={pkg.id} className="py-5 px-4">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="w-full py-2 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] uppercase tracking-wider transition-all"
                      style={{ backgroundColor: 'var(--theme-button)' }}
                    >
                      Book {pkg.name}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        /* Mobile Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white font-broadcast uppercase">{pkg.name}</h4>
                  <span className="text-xs font-mono text-sky-400">{pkg.cameras}</span>
                </div>
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="py-1.5 px-3 rounded bg-blue-600 text-white text-xs font-bold uppercase"
                  style={{ backgroundColor: 'var(--theme-button)' }}
                >
                  Book
                </button>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-900 pt-3">
                {criteria.map((crit) => {
                  const val = getCriterionValue(pkg, crit.key);
                  const positive = isPositive(val);
                  return (
                    <div key={crit.key} className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">{crit.label}:</span>
                      <span className={`font-semibold ${positive ? 'text-slate-100' : 'text-slate-500'}`}>
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
