import React, { useState } from 'react';
import { Layers, Cpu, ArrowDown, Info, ShieldCheck } from 'lucide-react';
import { ARCH, TECH } from '../data';
import { playSound } from '../audio';

const ARCH_SPECS: Record<string, string> = {
  'Camera + Sensors': 'ESP32-CAM / OV2640 2MP lens + TCRT5000 IR reflective optical barrier sensor (GPIO 34).',
  'Computer Vision': 'OpenCV 4.8 pipeline: Gaussian blur (5x5 kernel), CLAHE contrast equalization, 224x224 RGB crop.',
  'DNN Classification': 'Quantized TFLite MobileNetV3 model running INT8 weights with 38ms average inference latency.',
  'Decision Engine': 'Chute distance / belt speed delay timing matrix: T_divert = (Distance_to_bin / V_belt) - T_servo_swing.',
  'IoT Controller': 'ESP32 NodeMCU microcontroller broadcasting MQTT packets over Wi-Fi 802.11 b/g/n (Topic: /ecosort/chutes).',
  'Servo / Motor': '6x MG996R metal-gear digital servos powered by PCA9685 16-channel PWM driver (I2C address 0x40).',
  'Smart Bins': '6x HC-SR04 ultrasonic echo transducers triggered every 500ms to calculate air-gap distance to waste pile.',
  'Dashboard': 'Client-side reactive SCADA telemetry dashboard with WebSocket / MQTT synchronization and audio cues.',
};

export const Architecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (title: string) => {
    setSelectedNode(selectedNode === title ? null : title);
    playSound('click');
  };

  return (
    <section id="architecture" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Layers className="h-4 w-4" />
            <span>Industrial Hardware & Software Topology</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            System architecture
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm md:text-base">
            End-to-end data and control flow. Click any node to inspect hardware & protocol specifications.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-mono text-emerald-400 flex items-center gap-1.5 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="h-4 w-4" />
          <span>Real-time Deterministic Edge Loop</span>
        </div>
      </div>

      {/* End-to-End Vertical Pipeline Flow */}
      <div className="mx-auto max-w-2xl">
        <ol className="space-y-1.5">
          {ARCH.map(([t, d], i) => {
            const isSelected = selectedNode === t;
            const spec = ARCH_SPECS[t];
            return (
              <li key={t} className="text-center">
                <div
                  onClick={() => handleNodeClick(t)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleNodeClick(t)}
                  className={`rounded-xl border p-4 backdrop-blur text-left cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-500/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-emerald-400/40 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 font-mono text-xs font-bold border border-emerald-400/20">
                        0{i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-emerald-300">{t}</p>
                        <p className="text-xs text-slate-400">{d}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                      {isSelected ? 'Collapse' : 'Details'}
                    </span>
                  </div>

                  {/* Expanded Technical Detail Box */}
                  {isSelected && spec && (
                    <div className="mt-3 pt-3 border-t border-emerald-500/30 text-xs text-emerald-200 font-mono bg-black/40 p-2.5 rounded-lg flex items-start gap-2">
                      <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Technical Spec: </strong>
                        {spec}
                      </div>
                    </div>
                  )}
                </div>

                {i < ARCH.length - 1 && (
                  <div className="py-1 text-slate-600 flex justify-center" aria-hidden="true">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Technology Stack Grid */}
      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">Technology stack</h3>
            <p className="text-xs text-slate-400 mt-1">
              Modules and frameworks utilized across physical and edge processing layers.
            </p>
          </div>
          <Cpu className="h-6 w-6 text-emerald-400" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/[0.05]"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
                Technology
              </div>
              <p className="font-semibold text-white text-base">{t}</p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs font-mono text-slate-500 text-center">
          Edit this list to match what your prototype actually uses.
        </p>
      </div>
    </section>
  );
};
