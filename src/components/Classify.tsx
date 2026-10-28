import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Upload, CheckCircle2, Sparkles, Send, Eye } from 'lucide-react';
import { Cat, ClassificationResult } from '../types';
import { CATS, ALTERNATIVE_ITEMS } from '../data';
import { playSound } from '../audio';

interface ClassifyProps {
  onSendToSorting?: (cat: Cat, itemName: string) => void;
  onItemClassified?: (result: ClassificationResult) => void;
}

export const Classify: React.FC<ClassifyProps> = ({ onSendToSorting, onItemClassified }) => {
  const [c, setC] = useState<Cat>('Plastic');
  const [selectedSubItem, setSelectedSubItem] = useState<string>('Water Bottle');
  const [res, setRes] = useState<ClassificationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cameraMode, setCameraMode] = useState<'simulated' | 'upload'>('simulated');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<ClassificationResult[]>([]);

  const tRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const cur = CATS.find((x) => x.name === c)!;

  // When category changes, update default item
  const handleCategoryChange = (cat: Cat) => {
    setC(cat);
    setSelectedSubItem(ALTERNATIVE_ITEMS[cat][0] || cur.item);
    setRes(null);
    playSound('click');
  };

  const handleSubItemChange = (item: string) => {
    setSelectedSubItem(item);
    setRes(null);
    playSound('click');
  };

  const runClassification = () => {
    setBusy(true);
    setScanProgress(0);
    playSound('scan');

    const startTime = Date.now();
    const duration = 650; // ms

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setScanProgress(progress);
      if (progress >= 100 && progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }, 40);

    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => {
      const confidence = parseFloat((94.0 + Math.random() * 5.2).toFixed(1));
      const processingTime = Math.round(34 + Math.random() * 18);
      
      const newResult: ClassificationResult = {
        item: selectedSubItem,
        category: cur.name,
        confidence,
        processingTimeMs: processingTime,
        timestamp: new Date().toLocaleTimeString(),
        bin: cur.bin,
        color: cur.color,
        degradability: cur.degradeTime || '450 years',
        recyclabilityRate: cur.name === 'Plastic' ? 88 : cur.name === 'Paper' ? 95 : cur.name === 'Metal' ? 99 : cur.name === 'Glass' ? 100 : cur.name === 'Organic' ? 100 : 72,
        contaminantsDetected: Math.random() > 0.8 ? 'Minor surface moisture (<5%)' : 'None detected'
      };

      setRes(newResult);
      setHistory((prev) => [newResult, ...prev.slice(0, 4)]);
      setBusy(false);
      playSound('success');

      if (onItemClassified) {
        onItemClassified(newResult);
      }
    }, duration);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedImage(evt.target?.result as string);
        setCameraMode('upload');
        setRes(null);
        playSound('click');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRouteToConveyor = () => {
    if (onSendToSorting) {
      onSendToSorting(cur.name, selectedSubItem);
      playSound('click');
      // Scroll smoothly to sorting
      const el = document.getElementById('sorting');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="classify" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Camera className="h-4 w-4" />
            <span>Computer Vision Inference</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            AI classification demo
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            Pick a waste type and run a simulated inference. No real model is running.
          </p>
        </div>

        {/* Camera mode switcher */}
        <div className="mt-4 md:mt-0 flex items-center gap-1 bg-white/[0.04] border border-white/10 p-1 rounded-lg">
          <button
            onClick={() => {
              setCameraMode('simulated');
              playSound('click');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
              cameraMode === 'simulated'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Simulated Sensor
          </button>
          <button
            onClick={() => {
              fileInputRef.current?.click();
              playSound('click');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-1.5 ${
              cameraMode === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="h-3 w-3" />
            <span>Upload Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input / Camera Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulated camera frame</span>
              </span>
              <span className="rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                DEMO DATA
              </span>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div
              className="relative mb-4 flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed overflow-hidden bg-slate-950/80 transition-all duration-300"
              style={{ borderColor: cur.color }}
              role="img"
              aria-label={`Simulated view of ${selectedSubItem}`}
            >
              {/* Camera metadata overlays */}
              <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] font-mono text-emerald-400/80 bg-black/60 px-2 py-0.5 rounded">
                <span>REC ● 1080p 60fps</span>
                <span>ISO 400</span>
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
                ROI: [142, 88, 380, 240]
              </div>

              {/* Viewfinder crosshairs */}
              <div className="absolute inset-4 pointer-events-none border border-white/10 rounded-lg">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: cur.color }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: cur.color }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: cur.color }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: cur.color }} />
              </div>

              {/* Laser scan line when analyzing */}
              {busy && (
                <div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] transition-all duration-75 z-20 pointer-events-none"
                  style={{ top: `${scanProgress}%` }}
                />
              )}

              {/* Image or Item Visual Display */}
              {cameraMode === 'upload' && uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded waste item"
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <div className="text-center z-10 p-4">
                  <div
                    className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05] border shadow-inner transition-transform"
                    style={{ borderColor: `${cur.color}50`, color: cur.color }}
                  >
                    <span className="text-2xl font-bold font-mono">
                      {cur.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-white tracking-wide">
                    {selectedSubItem}
                  </div>
                  <div className="mt-1 text-xs font-mono" style={{ color: cur.color }}>
                    Target: {cur.bin} ({cur.name})
                  </div>
                </div>
              )}

              {/* Bounding box marker */}
              <div
                className="absolute inset-x-12 inset-y-8 rounded-lg border-2 pointer-events-none transition-all duration-300"
                style={{
                  borderColor: cur.color,
                  backgroundColor: `${cur.color}0a`,
                }}
              >
                <div
                  className="absolute -top-3 left-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-slate-950"
                  style={{ backgroundColor: cur.color }}
                >
                  {res ? `[${res.confidence}%] ${selectedSubItem}` : `TARGET: ${cur.name}`}
                </div>
              </div>
            </div>

            {/* Waste Category Selector Chips */}
            <div className="mb-3">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                1. Select Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATS.map((x) => {
                  const active = x.name === c;
                  return (
                    <button
                      key={x.name}
                      onClick={() => handleCategoryChange(x.name)}
                      aria-pressed={active}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                        active
                          ? 'bg-white/10 text-white shadow-sm'
                          : 'border-white/15 text-slate-300 hover:bg-white/5'
                      }`}
                      style={active ? { borderColor: x.color } : undefined}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-1.5"
                        style={{ backgroundColor: x.color }}
                      />
                      {x.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-item variants */}
            <div className="mb-4">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                2. Test Sample Object
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALTERNATIVE_ITEMS[c].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSubItemChange(item)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition ${
                      selectedSubItem === item
                        ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="pt-2">
            <button
              onClick={runClassification}
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50 shadow-md shadow-emerald-500/20 active:scale-98"
            >
              {busy ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Analyzing ({scanProgress}%)…</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Run classification</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output & Inference Results Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Output Telemetry</span>
              </span>
              <span className="rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                DEMO DATA
              </span>
            </div>

            {res ? (
              <div aria-live="polite" className="space-y-3.5">
                {/* Primary classification summary header */}
                <div
                  className="rounded-xl p-3.5 border flex items-center justify-between"
                  style={{
                    backgroundColor: `${res.color}12`,
                    borderColor: `${res.color}40`,
                  }}
                >
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">
                      Classification Match
                    </div>
                    <div className="text-lg font-bold text-white">{res.item}</div>
                    <div className="text-xs font-mono" style={{ color: res.color }}>
                      Destination: {res.bin} ({res.category})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-emerald-400">
                      {res.confidence}%
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">Confidence</div>
                  </div>
                </div>

                {/* Key value rows */}
                <dl className="divide-y divide-white/5 text-sm">
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Detected object</dt>
                    <dd className="font-medium text-white">{res.item}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Category</dt>
                    <dd className="font-semibold" style={{ color: res.color }}>
                      {res.category}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Confidence score</dt>
                    <dd className="font-mono text-emerald-400">{res.confidence}%</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Processing latency</dt>
                    <dd className="font-mono text-cyan-300">{res.processingTimeMs} ms</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Material code</dt>
                    <dd className="font-mono text-xs text-slate-300">{cur.materialCode}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Degradation lifecycle</dt>
                    <dd className="font-mono text-xs text-slate-300">{res.degradability}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400">Contaminant detection</dt>
                    <dd className="font-mono text-xs text-slate-300">{res.contaminantsDetected}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <div className="h-12 w-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 text-slate-500">
                  <Eye className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-300">Awaiting inference trigger</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Choose an item and click &quot;Run classification&quot; to test the simulated CNN detection model.
                </p>
              </div>
            )}
          </div>

          {/* Action to pipe directly into the conveyor */}
          {res && (
            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Item queued for pneumatic diversion
              </span>
              <button
                onClick={handleRouteToConveyor}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/20 transition active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Feed to Conveyor</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent inference audit log */}
      {history.length > 0 && (
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-mono text-slate-400">
              Session Inference Log ({history.length} items)
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Auto-logged</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono">
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Item</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Confidence</th>
                  <th className="pb-2">Target Bin</th>
                  <th className="pb-2">Inference Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((h, idx) => (
                  <tr key={idx} className="text-slate-300">
                    <td className="py-2 font-mono text-slate-400">{h.timestamp}</td>
                    <td className="py-2 font-medium text-white">{h.item}</td>
                    <td className="py-2" style={{ color: h.color }}>{h.category}</td>
                    <td className="py-2 font-mono text-emerald-400">{h.confidence}%</td>
                    <td className="py-2 font-mono">{h.bin}</td>
                    <td className="py-2 font-mono text-slate-400">{h.processingTimeMs} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
