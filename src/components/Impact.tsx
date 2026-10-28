import React, { useState } from 'react';
import { Target, Award, Rocket, Check, Edit3 } from 'lucide-react';
import { FUTURE } from '../data';
import { playSound } from '../audio';

export const Impact: React.FC = () => {
  const [studentName, setStudentName] = useState('Bharani S.M.');
  const [collegeName, setCollegeName] = useState('Department of Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('2025 - 2026');
  const [isEditingCredits, setIsEditingCredits] = useState(false);

  const m: [string, string, string][] = [
    ['Items diverted', '1,284', 'Diverted from mixed municipal landfill streams'],
    ['Recyclable identified', '76%', 'High-purity target recovery efficiency'],
    ['Manual sorting reduced', 'Est. 80%', 'Eliminates direct human contact with hazardous items'],
    ['Processing efficiency', 'Est. 4x', 'Compared with manual conveyor pick lines'],
  ];

  return (
    <section id="impact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Target className="h-4 w-4" />
            <span>Ecological & Economic Validation</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Impact and future scope
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Prototype calculations, not measured results.
            <span className="ml-2 rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
              PROTOTYPE ESTIMATE
            </span>
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-1.5 text-xs font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
          <Award className="h-4 w-4" />
          <span>SDG Goal 12: Responsible Consumption</span>
        </div>
      </div>

      {/* 4 Impact Metric Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {m.map(([k, v, desc]) => (
          <div
            key={k}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-emerald-400/30 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs text-slate-400 font-mono uppercase mb-1">{k}</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{v}</p>
            </div>
            <p className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400 leading-snug">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Future Scope Tags */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Next Generation Roadmap & Future Scope</h3>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {FUTURE.map((f) => (
            <span
              key={f}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-cyan-200 transition hover:border-cyan-400 hover:bg-cyan-400/20"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Academic Project Credits Banner */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            Engineering Prototype & Research Demo
          </div>
          {isEditingCredits ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student Name"
                className="text-xs rounded border border-white/20 bg-black/60 px-2 py-1 text-white"
              />
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="College / Institution"
                className="text-xs rounded border border-white/20 bg-black/60 px-2 py-1 text-white"
              />
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="Academic Year"
                className="text-xs rounded border border-white/20 bg-black/60 px-2 py-1 text-white"
              />
            </div>
          ) : (
            <div className="text-sm font-medium text-slate-200">
              <span className="text-white font-semibold">{studentName}</span>
              <span className="mx-2 text-slate-500">·</span>
              <span className="text-slate-300">{collegeName}</span>
              <span className="mx-2 text-slate-500">·</span>
              <span className="text-emerald-400 font-mono text-xs">{academicYear}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setIsEditingCredits(!isEditingCredits);
            playSound('click');
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/[0.04] text-xs text-slate-300 hover:text-white transition"
        >
          {isEditingCredits ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Edit3 className="h-3.5 w-3.5" />}
          <span>{isEditingCredits ? 'Save Details' : 'Edit Project Details'}</span>
        </button>
      </div>
    </section>
  );
};
