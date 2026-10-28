import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Scale, Radio, Wifi, AlertTriangle, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import { playSound } from '../audio';

export const Dashboard: React.FC = () => {
  const [n, setN] = useState(1284);
  const [s, setS] = useState({ temp: 38, dist: 34, w: 212 });
  const [emergencyStopped, setEmergencyStopped] = useState(false);
  const [systemPings, setSystemPings] = useState<Record<string, number>>({
    Camera: 12,
    'AI Model': 38,
    Sensors: 8,
    Conveyor: 14,
    'Motor / Servo': 19,
    Bins: 15,
    System: 6,
  });

  const status = ['Camera', 'AI Model', 'Sensors', 'Conveyor', 'Motor / Servo', 'Bins', 'System'];

  useEffect(() => {
    if (emergencyStopped) return;

    const id = setInterval(() => {
      setN((v) => v + 1);
      setS({
        temp: 36 + Math.round(Math.random() * 5),
        dist: 30 + Math.round(Math.random() * 8),
        w: 180 + Math.round(Math.random() * 70),
      });

      // Fluctuate latency slightly
      setSystemPings((prev) => ({
        ...prev,
        'AI Model': 34 + Math.round(Math.random() * 8),
        Sensors: 6 + Math.round(Math.random() * 4),
      }));
    }, 2000);

    return () => clearInterval(id);
  }, [emergencyStopped]);

  const toggleEmergencyStop = () => {
    const next = !emergencyStopped;
    setEmergencyStopped(next);
    if (next) {
      playSound('alert');
    } else {
      playSound('success');
    }
  };

  const handleEmptyBins = () => {
    setS((prev) => ({ ...prev, dist: 45, w: 40 }));
    playSound('success');
  };

  return (
    <section id="dashboard" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Radio className="h-4 w-4 animate-pulse" />
            <span>Telemetry & SCADA Telemetry</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            IoT monitoring dashboard
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            Every value below is generated in the browser. No hardware is connected.
          </p>
        </div>

        {/* Dashboard Actions */}
        <div className="mt-4 md:mt-0 flex items-center gap-2.5">
          <button
            onClick={toggleEmergencyStop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              emergencyStopped
                ? 'bg-red-500 text-white border-red-400 animate-pulse'
                : 'border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{emergencyStopped ? 'E-STOP ACTIVE (RESUME)' : 'EMERGENCY STOP'}</span>
          </button>

          <button
            onClick={handleEmptyBins}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Empty Bins</span>
          </button>
        </div>
      </div>

      {/* Simulation status pill banner */}
      <div className="mb-5 flex items-center justify-between text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Simulation Mode</span>
          <span className="rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
            SIMULATED
          </span>
        </div>
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          <span>MQTT Broker: broker.hivemq.com (virtual topic /ecosort/telemetry)</span>
        </div>
      </div>

      {/* Component Status Row (7 components) */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {status.map((x) => {
          const ping = systemPings[x] || 12;
          return (
            <div
              key={x}
              className={`rounded-2xl border p-3 backdrop-blur transition hover:border-emerald-400/30 ${
                emergencyStopped
                  ? 'border-red-500/40 bg-red-950/20'
                  : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-400 font-medium truncate">{x}</p>
                <span className="text-[10px] font-mono text-slate-500">{ping}ms</span>
              </div>
              <p
                className={`text-sm font-semibold flex items-center gap-1.5 ${
                  emergencyStopped ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    emergencyStopped ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'
                  }`}
                />
                <span className="text-xs">{emergencyStopped ? 'Paused' : 'Online (sim)'}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* 4 Main Real-Time Telemetry Gauges */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Metric 1: Processed items */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 font-mono uppercase">Waste processed</p>
            <Activity className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold tabular-nums text-white tracking-tight">
            {n.toLocaleString()}
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2">
            <span>Daily target: 2,500</span>
            <span className="text-emerald-400">+{Math.round((n / 2500) * 100)}%</span>
          </div>
        </div>

        {/* Metric 2: Ultrasonic Bin Level */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 font-mono uppercase">Ultrasonic (bin level)</p>
            <Radio className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold tabular-nums text-cyan-300 tracking-tight">
            {s.dist} <span className="text-lg font-normal text-slate-400">cm</span>
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2">
            <span>Free clearance depth</span>
            <span className={s.dist < 15 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
              {s.dist < 15 ? 'CRITICAL FILL' : 'NORMAL'}
            </span>
          </div>
        </div>

        {/* Metric 3: Weight Strain Gauge */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 font-mono uppercase">Weight</p>
            <Scale className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold tabular-nums text-amber-300 tracking-tight">
            {s.w} <span className="text-lg font-normal text-slate-400">g</span>
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2">
            <span>Load Cell: HX711</span>
            <span className="text-slate-300">±2g accuracy</span>
          </div>
        </div>

        {/* Metric 4: Motor Temperature */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 font-mono uppercase">Motor temp</p>
            <Thermometer className="h-4 w-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold tabular-nums text-rose-300 tracking-tight">
            {s.temp} <span className="text-lg font-normal text-slate-400">°C</span>
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2">
            <span>Thermal cut-off: 65°C</span>
            <span className={s.temp > 50 ? 'text-amber-400' : 'text-emerald-400'}>
              {s.temp > 50 ? 'ELEVATED' : 'NOMINAL'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
