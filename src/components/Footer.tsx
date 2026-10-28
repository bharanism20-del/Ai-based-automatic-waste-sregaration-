import React from 'react';
import { ArrowUp, Recycle, Heart } from 'lucide-react';
import { playSound } from '../audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Recycle className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">EcoSort AI</span>
            <p className="text-xs text-slate-500 mt-0.5">
              AI Based Automatic Waste Segregation · Prototype demo
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right text-xs text-slate-500">
          <p>Designed for sustainable municipal and industrial recovery systems.</p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            Browser Simulation Engine · Zero Hardware Dependency Mode
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="self-center sm:self-auto flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white hover:border-emerald-400/40 transition"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
};
