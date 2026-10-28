import React from 'react';
import { Camera, Cpu, Activity, Server, Trash2, ArrowRight } from 'lucide-react';
import { playSound } from '../audio';

export const Hero: React.FC = () => {
  const flow = [
    { title: 'Camera', icon: Camera, desc: 'Optical feed capture' },
    { title: 'AI Model', icon: Cpu, desc: 'CNN feature extraction' },
    { title: 'Classification', icon: Activity, desc: 'Confidence scoring' },
    { title: 'IoT Controller', icon: Server, desc: 'PWM servo commands' },
    { title: 'Smart Bins', icon: Trash2, desc: 'Automated sorting' },
  ];

  return (
    <header className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 md:pt-20">
      {/* Background glow orb */}
      <div 
        className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-96 w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl opacity-70" 
        aria-hidden="true" 
      />

      <div className="flex flex-col items-start">
        {/* Status pill */}
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span>SYSTEM ONLINE (demo)</span>
          <span className="text-emerald-400/60">·</span>
          <span className="text-emerald-300 font-mono text-[11px]">99.4% Uptime</span>
        </p>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
          AI Based Automatic{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Waste Segregation
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          A prototype combining Deep Neural Networks, Generative AI and IoT automation to identify, classify and sort waste with real-time monitoring.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#classify"
            onClick={() => playSound('click')}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <span>Live Demo</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#architecture"
            onClick={() => playSound('click')}
            className="rounded-lg border border-white/20 bg-white/[0.03] px-5 py-2.5 font-medium text-slate-200 hover:bg-white/10 hover:border-white/30 transition active:scale-95"
          >
            Explore System
          </a>
          <a
            href="#sorting"
            onClick={() => playSound('click')}
            className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 font-medium text-cyan-300 hover:bg-cyan-500/20 transition active:scale-95 text-sm"
          >
            Conveyor Simulator
          </a>
        </div>
      </div>

      {/* 5-Step System Pipeline Flow */}
      <div className="mt-14">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
            Pipeline Architecture Flow
          </span>
          <span className="text-xs text-emerald-400 font-mono">End-to-End Latency: ~52ms</span>
        </div>

        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5" aria-label="System flow">
          {flow.map((f, i) => {
            const Icon = f.icon;
            return (
              <li
                key={f.title}
                className="group relative rounded-xl border border-cyan-400/20 bg-slate-900/60 p-4 text-center transition hover:border-emerald-400/40 hover:bg-slate-900/90 shadow-sm"
              >
                {/* Step indicator */}
                <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 group-hover:scale-110 transition-transform">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-xs font-semibold text-emerald-400 font-mono mb-0.5">
                  0{i + 1}
                </div>
                <div className="text-sm font-semibold text-slate-100">{f.title}</div>
                <div className="mt-1 text-[11px] text-slate-400 leading-tight">{f.desc}</div>

                {/* Arrow connector between stages on desktop */}
                {i < flow.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500/50"
                    aria-hidden="true"
                  >
                    →
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </header>
  );
};
