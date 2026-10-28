import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Send, Download, FileText, Check, HelpCircle, Terminal } from 'lucide-react';
import { INSIGHTS } from '../data';
import { playSound } from '../audio';

export const GenAI: React.FC = () => {
  const [q, setQ] = useState<string | null>('Weekly summary');
  const [customInput, setCustomInput] = useState('');
  const [think, setThink] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<string>(
    INSIGHTS['Weekly summary'] || 'Organic and plastic dominate the stream. Average classification confidence stayed above 94%.'
  );
  const [copiedReport, setCopiedReport] = useState(false);

  const tRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, []);

  const ask = (k: string) => {
    setQ(k);
    setThink(true);
    playSound('click');

    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => {
      setActiveAnswer(INSIGHTS[k] || 'Analyzed stream telemetry. All classification metrics meet operational thresholds.');
      setThink(false);
      playSound('success');
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const query = customInput.trim();
    setQ(query);
    setThink(true);
    playSound('click');

    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => {
      // Check if it matches existing questions loosely or generate intelligent expert waste management answer
      const lower = query.toLowerCase();
      let response = '';

      if (lower.includes('contamin') || lower.includes('clean') || lower.includes('rinse')) {
        response = 'Contamination rates are mitigated by the pre-sorting camera checking for residual liquids (HSV moisture detection). Items exceeding 15% moisture trigger an automated alert to divert to wash cycle.';
      } else if (lower.includes('accuracy') || lower.includes('confidence') || lower.includes('dnn') || lower.includes('model')) {
        response = 'The classification backbone utilizes MobileNetV3-Small fine-tuned on the TrashNet and TACO datasets. Model inference achieves 95.2% top-1 accuracy with an FP16 quantized latency of 38ms.';
      } else if (lower.includes('speed') || lower.includes('throughput') || lower.includes('rpm') || lower.includes('conveyor')) {
        response = 'The current belt operates at 0.35 m/s, yielding a maximum throughput of 45-50 sorted articles per minute. Servos are rated for 0.12s/60° transit to prevent item jamming.';
      } else if (lower.includes('cost') || lower.includes('roi') || lower.includes('price')) {
        response = 'Estimated hardware deployment cost for a single-lane cell is under $450 (using ESP32 microcontroller, MG996R servos, and industrial camera module), delivering projected ROI within 3.5 months versus manual sorting wages.';
      } else {
        response = `EcoSort AI Intelligence Engine analyzed your query regarding "${query}": The multi-stage optical and weight telemetry continuously reconciles waste density, categorizing complex composite materials into the optimal recycling bin with automated pneumatic deflection.`;
      }

      setActiveAnswer(response);
      setThink(false);
      setCustomInput('');
      playSound('success');
    }, 800);
  };

  const generateReportText = () => {
    const timestamp = new Date().toLocaleString();
    return `=====================================================
ECOSORT AI - AUTOMATED WASTE SEGREGATION SHIFT AUDIT
Generated: ${timestamp}
System Status: NOMINAL / OPERATIONAL (SIMULATED)
=====================================================

1. EXECUTIVE SUMMARY
-----------------------------------------------------
- Total Waste Processed: 1,284 items
- Net Recyclable Diversion Rate: 76.2%
- Overall Model Confidence: 95.2% (Top-1)
- Average End-to-End Latency: 42 ms

2. STREAM BREAKDOWN BY CATEGORY
-----------------------------------------------------
- Bin 1 (Plastic):  32%  [PET/HDPE Bottles, Packaging]
- Bin 2 (Paper):    18%  [Cardboard Boxes, Kraft Paper]
- Bin 3 (Metal):    11%  [Aluminium Beverage Cans, Tin]
- Bin 4 (Glass):    9%   [Jars, Culinary Glass Cullet]
- Bin 5 (Organic):  24%  [Biomass, Food Waste]
- Bin 6 (E-Waste):  6%   [Small Electronics, Batteries]

3. HARDWARE & IOT HEALTH
-----------------------------------------------------
- Conveyor Velocity: 0.35 m/s
- Diverter Servos: 6 Units Operational (Highest: Servo 2 at 3,410 cycles)
- Bin 5 Ultrasonic Level: 82% (Scheduled for Emptying)
- Motor Temperature: 38°C (Threshold 65°C)

4. AI RECOMMENDATIONS
-----------------------------------------------------
${INSIGHTS['Maintenance advice']}
${INSIGHTS['Sustainability tip']}

Report verified by EcoSort AI Autonomous Telemetry Node.
=====================================================`;
  };

  const handleDownloadReport = () => {
    playSound('click');
    const text = generateReportText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecosort-audit-report-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyReport = () => {
    playSound('click');
    navigator.clipboard.writeText(generateReportText());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <section id="genai" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Facility Intelligence & LLM Reasoning</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Generative AI insights
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            Planned: reports, anomaly explanations and recommendations from system data.
          </p>
        </div>

        {/* Report Export Button */}
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white transition"
          >
            {copiedReport ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FileText className="h-3.5 w-3.5" />}
            <span>{copiedReport ? 'Copied!' : 'Copy Audit'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-purple-400/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report (.txt)</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-purple-400/30">
        {/* Banner from user prompt */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <p className="w-fit rounded border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-xs font-semibold text-amber-300">
            AI DEMO · scripted answers, no API connected
          </p>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5" />
            <span>Autonomous Facility Diagnostics Agent</span>
          </span>
        </div>

        {/* Question Preset Chips */}
        <div className="mb-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Suggested Operational Queries:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(INSIGHTS).map((k) => (
              <button
                key={k}
                onClick={() => ask(k)}
                aria-pressed={q === k}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  q === k
                    ? 'border-purple-400 bg-purple-500/20 text-purple-200 shadow-sm'
                    : 'border-white/15 text-slate-300 hover:bg-white/5'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Chat Response Card */}
        <div
          aria-live="polite"
          className="rounded-xl border border-white/10 bg-slate-950/70 p-4 min-h-[7rem] flex flex-col justify-between"
        >
          {q ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs font-mono">
                <span className="text-cyan-400 font-bold">Query:</span>
                <span className="text-slate-200">{q}</span>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0 mt-0.5">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="text-sm leading-relaxed text-slate-200">
                  {think ? (
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                      <span>Synthesizing neural telemetry insights…</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-semibold text-purple-300 mr-1.5">Assistant:</span>
                      {activeAnswer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Choose a question above or type your own facility query below.</span>
            </p>
          )}
        </div>

        {/* Custom Query Input Bar */}
        <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ask anything about waste categorization, servo calibration, or contamination..."
            className="flex-1 rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || think}
            className="flex items-center gap-1.5 rounded-lg bg-purple-500 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-purple-400 transition disabled:opacity-50 active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Ask</span>
          </button>
        </form>
      </div>
    </section>
  );
};
