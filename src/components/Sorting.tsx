import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Cog, ArrowDown, Activity } from 'lucide-react';
import { Cat } from '../types';
import { CATS, STAGES } from '../data';
import { playSound } from '../audio';

interface SortingProps {
  initialCategory?: Cat;
  onItemSorted?: (cat: Cat) => void;
}

export const Sorting: React.FC<SortingProps> = ({ initialCategory = 'Plastic', onItemSorted }) => {
  const [c, setC] = useState<Cat>(initialCategory);
  const [st, setSt] = useState<number>(-1);
  const [autoLoop, setAutoLoop] = useState(false);
  const [binCounters, setBinCounters] = useState<Record<Cat, number>>({
    Plastic: 42,
    Paper: 28,
    Metal: 16,
    Glass: 14,
    Organic: 37,
    'E-Waste': 8,
  });

  const hRef = useRef<number | null>(null);
  const autoLoopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hRef.current) clearInterval(hRef.current);
      if (autoLoopTimerRef.current) clearTimeout(autoLoopTimerRef.current);
    };
  }, []);

  const cur = CATS.find((x) => x.name === c)!;

  const startSorting = (categoryName: Cat) => {
    if (hRef.current) clearInterval(hRef.current);
    setC(categoryName);
    let step = 0;
    setSt(0);
    playSound('click');

    hRef.current = window.setInterval(() => {
      step++;
      setSt(step);

      if (step === 1) {
        playSound('scan');
      } else if (step === 3) {
        playSound('servo');
      } else if (step === 4) {
        playSound('binDrop');
        setBinCounters((prev) => ({
          ...prev,
          [categoryName]: prev[categoryName] + 1,
        }));
        if (onItemSorted) {
          onItemSorted(categoryName);
        }
        if (hRef.current) clearInterval(hRef.current);

        // If continuous mode is on, trigger next item
        if (autoLoop) {
          autoLoopTimerRef.current = window.setTimeout(() => {
            const nextCatIndex = Math.floor(Math.random() * CATS.length);
            startSorting(CATS[nextCatIndex].name);
          }, 1200);
        }
      }
    }, 850);
  };

  const handleToggleAutoLoop = () => {
    const nextVal = !autoLoop;
    setAutoLoop(nextVal);
    playSound('click');
    if (nextVal && st < 0) {
      startSorting(c);
    }
  };

  const resetSorter = () => {
    if (hRef.current) clearInterval(hRef.current);
    if (autoLoopTimerRef.current) clearTimeout(autoLoopTimerRef.current);
    setSt(-1);
    setAutoLoop(false);
    playSound('click');
  };

  return (
    <section id="sorting" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Cog className="h-4 w-4 animate-[spin_6s_linear_infinite]" />
            <span>Robotic Conveyor Subsystem</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Automatic segregation
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            Select a category to watch a simulated item move to its bin.
          </p>
        </div>

        {/* Conveyor controls */}
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={handleToggleAutoLoop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              autoLoop
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                : 'border-white/15 bg-white/[0.04] text-slate-300 hover:text-white'
            }`}
          >
            {autoLoop ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>Continuous Feed {autoLoop ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={resetSorter}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/[0.04] text-slate-400 hover:text-white transition"
            title="Reset conveyor"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30">
        {/* Category dispatch buttons */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono text-slate-400">
              Select Material to Feed:
            </span>
            <span className="text-xs font-mono text-slate-400">
              Active: <span className="font-semibold" style={{ color: cur.color }}>{cur.name} ({cur.item})</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((x) => {
              const active = x.name === c && st >= 0;
              return (
                <button
                  key={x.name}
                  onClick={() => startSorting(x.name)}
                  aria-pressed={active}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 flex items-center gap-2 ${
                    active
                      ? 'bg-white/15 text-white shadow-lg'
                      : 'border-white/15 text-slate-300 hover:bg-white/5'
                  }`}
                  style={active ? { borderColor: x.color } : undefined}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: x.color }}
                  />
                  <span>{x.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({x.bin})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Industrial Conveyor Visual */}
        <div className="relative mb-6 rounded-xl border border-white/10 bg-gradient-to-b from-slate-950 to-slate-900/90 p-4 pt-8 overflow-hidden">
          {/* Overhead Scanner Frame & Beam */}
          <div className="absolute top-1 left-[25%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
            <div className="h-2 w-16 bg-slate-700 rounded-t border-t border-cyan-400" />
            <div className={`h-10 w-14 transition-opacity duration-300 ${st === 1 ? 'opacity-100' : 'opacity-20'} bg-gradient-to-b from-cyan-400/50 to-transparent blur-sm`} />
            <span className="text-[9px] font-mono text-cyan-300 mt-[-24px]">AI CAMERA</span>
          </div>

          {/* Diverter Servo Gate Indicator */}
          <div className="absolute top-1 left-[75%] -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
            <div className="h-2 w-14 bg-slate-700 rounded-t border-t border-emerald-400" />
            <div className={`text-[9px] font-mono transition-colors ${st === 3 ? 'text-emerald-300 animate-pulse' : 'text-slate-500'}`}>
              SERVO GATE
            </div>
          </div>

          {/* The Conveyor Belt Track */}
          <div className="relative h-14 rounded-lg bg-slate-950 border border-white/10 shadow-inner flex items-center px-2 overflow-hidden">
            {/* Belt Tread Lines pattern */}
            <div
              className={`absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,#fff_0px,#fff_2px,transparent_2px,transparent_16px)] ${
                st >= 0 && st < 4 ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''
              }`}
            />

            {/* Travel Path Line */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-1 bg-white/5 rounded-full" />

            {/* Simulated Moving Object */}
            <div
              className="absolute top-2 h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold font-mono shadow-lg transition-[left] duration-700 ease-out motion-reduce:transition-none z-20"
              style={{
                left: `calc(${Math.max(st, 0) * 22}% + 4px)`,
                backgroundColor: cur.color,
                color: '#070b0f',
                boxShadow: `0 0 15px ${cur.color}80`,
              }}
              aria-hidden="true"
            >
              {st < 0 ? '?' : cur.name.slice(0, 2).toUpperCase()}
            </div>

            {/* Sensor tripwire line */}
            <div className="absolute left-[3%] inset-y-1 w-0.5 bg-red-500/50" />
            <div className="absolute left-[26%] inset-y-1 w-0.5 bg-cyan-400/50" />
            <div className="absolute left-[50%] inset-y-1 w-0.5 bg-amber-400/50" />
            <div className="absolute left-[75%] inset-y-1 w-0.5 bg-emerald-400/50" />
            <div className="absolute right-[4%] inset-y-1 w-0.5 bg-purple-400/50" />
          </div>

          {/* Status ticker below belt */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${st >= 0 && st < 4 ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
              <span>Conveyor Status: {st >= 0 && st < 4 ? 'RUNNING (0.35 m/s)' : 'IDLE / READY'}</span>
            </span>
            <span>Servo Actuation Angle: {st === 3 ? '45° DIVERT' : '0° HOME'}</span>
          </div>
        </div>

        {/* 5-Stage Stepper Track */}
        <div className="mb-6">
          <ol className="grid grid-cols-5 gap-2 text-center text-xs">
            {STAGES.map((s, i) => {
              const active = i <= st;
              const current = i === st;
              return (
                <li
                  key={s}
                  className={`rounded-lg border p-2 transition-colors ${
                    current
                      ? 'border-emerald-400 bg-emerald-400/20 text-emerald-200 font-semibold'
                      : active
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-white/5 bg-white/[0.02] text-slate-500'
                  }`}
                >
                  <div className="text-[10px] font-mono mb-0.5 opacity-70">Stage 0{i + 1}</div>
                  <div className="truncate">{s}</div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* 6 Smart Destination Bins */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono text-slate-400">
              Chute Receptacles & Fill Counts
            </span>
            <span className="text-xs text-slate-500 font-mono">Sensors: HC-SR04 Ultrasonic</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {CATS.map((x) => {
              const hit = st === 4 && x.name === c;
              return (
                <div
                  key={x.name}
                  className="rounded-xl border p-3 text-center transition-all duration-300 relative group"
                  style={{
                    borderColor: hit ? x.color : 'rgba(255,255,255,0.1)',
                    backgroundColor: hit ? `${x.color}25` : 'rgba(255,255,255,0.02)',
                    boxShadow: hit ? `0 0 16px ${x.color}40` : 'none',
                  }}
                >
                  {hit && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce">
                      <ArrowDown className="h-4 w-4" style={{ color: x.color }} />
                    </div>
                  )}

                  <div className="text-xs font-mono font-bold text-white mb-0.5">{x.bin}</div>
                  <div className="text-xs font-medium" style={{ color: x.color }}>
                    {x.name}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Count:</span>
                    <span className="font-bold text-slate-200">{binCounters[x.name]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* State feedback message */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-4">
          <p className="text-sm text-slate-300" aria-live="polite">
            {st < 0 ? (
              <span className="text-slate-400">Choose a category above to start the automated sorting sequence.</span>
            ) : st === 4 ? (
              <span className="text-emerald-300 font-medium">
                ✓ {cur.item} successfully routed to {cur.bin} ({cur.name}) via pneumatic servo diverter.
              </span>
            ) : (
              <span className="text-cyan-300">
                ● Current sequence: <strong className="font-semibold text-white">{STAGES[st]}</strong> (Stage {st + 1} of 5)
              </span>
            )}
            <span className="ml-2 rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 align-middle text-[10px] font-semibold text-amber-300">
              SIMULATION
            </span>
          </p>

          <div className="text-xs font-mono text-slate-500">
            Diverter Cycle: ~3.4s
          </div>
        </div>
      </div>
    </section>
  );
};
