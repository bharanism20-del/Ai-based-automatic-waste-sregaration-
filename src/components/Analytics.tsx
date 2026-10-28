import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Leaf, Droplets, Zap } from 'lucide-react';
import { CATS, DIST, TREND, DAYS, BIN_UTIL } from '../data';

export const Analytics: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<{ index: number; value: number } | null>(null);

  const maxTrend = Math.max(...TREND);
  const pts = TREND.map((v, i) => `${(i / 6) * 300},${90 - (v / maxTrend) * 80}`).join(' ');
  const recycled = 100 - DIST[4]; // 76%
  const totalWeeklyItems = TREND.reduce((a, b) => a + b, 0);

  // Carbon & eco metrics estimation
  const co2AvoidedKg = Math.round(totalWeeklyItems * 0.42);
  const waterSavedLiters = Math.round(totalWeeklyItems * 2.8);
  const kwhSaved = Math.round(totalWeeklyItems * 0.18);

  return (
    <section id="analytics" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <BarChart3 className="h-4 w-4" />
            <span>Yield & Composition Analytics</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Analytics
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            Lightweight SVG/CSS charts with real-time throughput metrics.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Weekly view</span>
          <span className="rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
            DEMO / SIMULATED DATA
          </span>
        </div>
      </div>

      {/* 3 Analytics Cards Grid */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Card 1: Category distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Category distribution</h3>
              <span className="text-xs font-mono text-slate-400">Total: 100%</span>
            </div>

            <div className="space-y-3">
              {CATS.map((c, i) => {
                const val = DIST[i];
                return (
                  <div key={c.name} className="group">
                    <div className="mb-1 flex justify-between text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        <span>{c.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({c.bin})</span>
                      </span>
                      <span className="font-mono font-medium">{val}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${val}%`,
                          backgroundColor: c.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400">
            Predominant stream: <strong className="text-cyan-300">Plastic (32%)</strong> & <strong className="text-lime-300">Organic (24%)</strong>
          </div>
        </div>

        {/* Card 2: Items processed per day (SVG Chart) */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 flex flex-col justify-between">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Items processed per day</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                +{TREND[6] - TREND[0]} items vs Mon
              </span>
            </div>

            {/* SVG Line Chart */}
            <div className="relative mt-3 pt-2">
              {hoveredDay && (
                <div className="absolute top-0 right-0 bg-slate-900 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded shadow">
                  {DAYS[hoveredDay.index]}: {hoveredDay.value} units
                </div>
              )}

              <svg
                viewBox="0 0 300 100"
                className="w-full overflow-visible"
                role="img"
                aria-label="Line chart of daily items processed"
              >
                {/* Horizontal reference grid lines */}
                <line x1="0" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.1)" />

                {/* Line Path */}
                <polyline
                  points={pts}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Data Dots */}
                {TREND.map((v, i) => {
                  const cx = (i / 6) * 300;
                  const cy = 90 - (v / maxTrend) * 80;
                  const isHovered = hoveredDay?.index === i;
                  return (
                    <g key={i}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 6 : 4}
                        fill="#22d3ee"
                        stroke="#070b0f"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-150"
                        onMouseEnter={() => setHoveredDay({ index: i, value: v })}
                        onMouseLeave={() => setHoveredDay(null)}
                      >
                        <title>{`${DAYS[i]}: ${v} items`}</title>
                      </circle>
                    </g>
                  );
                })}
              </svg>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
                {DAYS.map((d, i) => (
                  <span
                    key={d}
                    className={`cursor-pointer transition ${
                      hoveredDay?.index === i ? 'text-cyan-300 font-bold' : ''
                    }`}
                    onMouseEnter={() => setHoveredDay({ index: i, value: TREND[i] })}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key KPI Stats */}
          <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2">
              <p className="text-2xl font-extrabold text-emerald-300 font-mono">{recycled}%</p>
              <p className="text-[11px] text-slate-400">Recyclable share</p>
            </div>
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-2">
              <p className="text-2xl font-extrabold text-cyan-300 font-mono">95.2%</p>
              <p className="text-[11px] text-slate-400">Avg. confidence</p>
            </div>
          </div>
        </div>

        {/* Card 3: Bin utilization */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Bin utilization</h3>
              <span className="text-xs font-mono text-slate-400">Threshold: 80%</span>
            </div>

            <div className="space-y-3">
              {CATS.map((c, i) => {
                const util = BIN_UTIL[i];
                const isOverLimit = util > 80;
                return (
                  <div key={c.name} className="group">
                    <div className="mb-1 flex justify-between text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                      <span className="flex items-center gap-1.5">
                        <span>{c.bin}</span>
                        <span className="text-[10px] text-slate-500">({c.name})</span>
                      </span>
                      <span
                        className={`font-mono font-medium ${
                          isOverLimit ? 'text-red-400 font-bold flex items-center gap-1' : ''
                        }`}
                      >
                        {isOverLimit && <AlertTriangle className="h-3 w-3 inline" />}
                        {util}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${util}%`,
                          backgroundColor: isOverLimit ? '#f87171' : '#22d3ee',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Critical Bin:</span>
            <span className="text-red-400 font-bold">Bin 5 (Organic at 82%)</span>
          </div>
        </div>
      </div>

      {/* Environmental & Landfill Offset Banner */}
      <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-emerald-300">{co2AvoidedKg} kg</div>
            <div className="text-xs text-slate-400">CO2 Emissions Avoided</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-cyan-300">{waterSavedLiters} L</div>
            <div className="text-xs text-slate-400">Virtual Water Preserved</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-amber-300">{kwhSaved} kWh</div>
            <div className="text-xs text-slate-400">Sorting Energy Saved</div>
          </div>
        </div>
      </div>
    </section>
  );
};
