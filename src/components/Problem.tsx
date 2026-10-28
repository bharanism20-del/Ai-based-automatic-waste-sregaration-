import React from 'react';
import { UserX, Shuffle, Recycle, ShieldAlert, Cpu, AlertCircle } from 'lucide-react';
import { PROBLEMS } from '../data';

const PROBLEM_ICONS = [UserX, Shuffle, Recycle, ShieldAlert, Cpu];
const STATS = [
  '85% sorting inefficiency',
  '>40% batch contamination',
  'Only 9% global plastic recycled',
  'High occupational biohazard risk',
  '<0.1s needed per sorting decision',
];

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <AlertCircle className="h-4 w-4" />
            <span>Operational Challenges</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            The problem
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            Why waste segregation needs intelligent automation.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400 border border-white/10 rounded-lg p-2.5 bg-white/[0.02]">
          <span>Global Municipal Solid Waste: </span>
          <span className="text-amber-300 font-semibold">2.01 Billion Tonnes/yr</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map(([t, d], i) => {
          const Icon = PROBLEM_ICONS[i] || AlertCircle;
          return (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-all duration-200 hover:border-amber-400/40 hover:bg-white/[0.06] group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20 group-hover:scale-105 transition-transform">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-mono text-slate-500">#{i + 1}</span>
              </div>

              <h3 className="font-medium text-base text-emerald-300 group-hover:text-emerald-200 transition-colors">
                {t}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{d}</p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Impact:</span>
                <span className="text-amber-400/90">{STATS[i]}</span>
              </div>
            </div>
          );
        })}

        {/* Highlight Card: The Solution Approach */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900/60 p-5 backdrop-blur flex flex-col justify-between">
          <div>
            <div className="inline-block rounded border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 mb-2">
              SOLUTION ARCHITECTURE
            </div>
            <h3 className="text-base font-semibold text-white">Closed-Loop AI Segregator</h3>
            <p className="mt-2 text-sm text-slate-300">
              By placing edge-optimized computer vision at the conveyor intake, EcoSort AI performs 
              non-contact multi-spectral classification within 40 milliseconds, directing micro-servos 
              to bin items at 96%+ purity.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target: 0% Cross-Contamination</span>
          </div>
        </div>
      </div>
    </section>
  );
};
