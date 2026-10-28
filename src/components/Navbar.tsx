import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Recycle, Play } from 'lucide-react';
import { NAV } from '../data';
import { isAudioMuted, toggleAudioMute, playSound } from '../audio';

interface NavbarProps {
  onLiveDemoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLiveDemoClick }) => {
  const [muted, setMuted] = useState(isAudioMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMuteToggle = () => {
    const nextState = toggleAudioMute();
    setMuted(nextState);
    if (!nextState) {
      playSound('click');
    }
  };

  return (
    <>
      <nav aria-label="Main" className="sticky top-0 z-50 border-b border-white/10 bg-[#070b0f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Recycle className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                EcoSort<span className="text-emerald-400">.AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                v2.4 IoT
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-5 text-xs font-medium uppercase tracking-wider text-slate-300">
            {NAV.map((n) => (
              <li key={n}>
                <a
                  href={`#${n}`}
                  onClick={() => playSound('click')}
                  className="hover:text-emerald-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {n}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleMuteToggle}
              title={muted ? 'Enable sound effects' : 'Mute sound effects'}
              aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white hover:border-emerald-400/40 transition"
            >
              {muted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
            </button>

            {/* Live Demo CTA */}
            <a
              href="#classify"
              onClick={() => {
                playSound('click');
                if (onLiveDemoClick) onLiveDemoClick();
              }}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 shadow-sm shadow-emerald-500/20 transition active:scale-95"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>LIVE DEMO</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-slate-300"
              aria-label="Toggle mobile navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#090e15] px-4 py-3">
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium uppercase tracking-wider text-slate-300">
              {NAV.map((n) => (
                <li key={n}>
                  <a
                    href={`#${n}`}
                    onClick={() => {
                      playSound('click');
                      setMobileMenuOpen(false);
                    }}
                    className="block rounded-md p-2 hover:bg-white/5 hover:text-emerald-400 transition"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Demo Notification Banner */}
      <div className="border-b border-amber-400/30 bg-amber-400/10 py-1.5 px-4 text-center text-xs font-medium text-amber-200 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
        <span>DEMO / SIMULATION MODE: All hardware sensor streams and conveyor actuations are simulated in-browser.</span>
      </div>
    </>
  );
};
