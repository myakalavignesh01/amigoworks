import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoSymbol } from './Logo';
import { Sparkles, Cpu, Terminal, Palette, ArrowRight } from 'lucide-react';

export const ThreeToOne: React.FC = () => {
  // State for interactive slider convergence (0 = fully separate 3 minds, 100 = unified ONE BUILD)
  const [convergenceRatio, setConvergenceRatio] = useState<number>(75);
  const [activeMind, setActiveMind] = useState<number | null>(null);

  // Normalizing 0 to 1
  const t = convergenceRatio / 100;
  const isUnified = t > 0.85;

  const minds = [
    {
      id: 0,
      name: 'VIGNESH',
      role: 'AI • Product • Strategy',
      badge: 'THE PRODUCT INTELLECT',
      icon: Cpu,
      color: '#A78BFA',
      glow: 'rgba(167, 139, 250, 0.4)',
      focus: 'Architecting intelligent AI workflows, strategic product roadmaps, and business leverage.',
      vectorPos: {
        x: (1 - t) * -160,
        y: (1 - t) * -90,
        rotate: (1 - t) * -20,
      },
    },
    {
      id: 1,
      name: 'SAI KIRAN',
      role: 'Engineering • Backend • Systems',
      badge: 'THE SYSTEMS ENGINE',
      icon: Terminal,
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
      focus: 'Engineering resilient backend servers, high-throughput pipelines, and automation protocols.',
      vectorPos: {
        x: (1 - t) * 160,
        y: (1 - t) * -90,
        rotate: (1 - t) * 20,
      },
    },
    {
      id: 2,
      name: 'NUTHAN SAI',
      role: 'Frontend • Experience • Design',
      badge: 'THE EXPERIENCE CRAFT',
      icon: Palette,
      color: '#C4B5FD',
      glow: 'rgba(196, 181, 253, 0.4)',
      focus: 'Crafting pixel-level interfaces, responsive design systems, and seamless motion UX.',
      vectorPos: {
        x: 0,
        y: (1 - t) * 140,
        rotate: 0,
      },
    },
  ];

  return (
    <section
      id="three-to-one"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/5 overflow-hidden"
    >
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE AMIGOWORKS IDENTITY</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight">
            THREE MINDS.
            <br />
            <span className="text-[#8B5CF6]">ONE BUILD.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-light">
            Three friends. Three skill sets. Three perspectives. Coming together to create one technology studio.
            <br />
            <span className="text-white font-medium">Different strengths. One direction.</span>
          </p>
        </div>

        {/* Interactive Convergence Stage */}
        <div className="relative bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Interactive Controller HUD */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">
                CONVERGENCE MATRIX:
              </span>
              <span className="px-2.5 py-1 rounded-sm bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono-code text-[#C4B5FD] font-bold">
                {convergenceRatio === 100 ? '100% UNIFIED (ONE BUILD)' : `${convergenceRatio}% SYNCHRONIZATION`}
              </span>
            </div>

            {/* Interactive Slider */}
            <div className="w-full sm:w-72 flex items-center gap-3">
              <span className="text-[11px] font-mono-code text-white/40">THREE</span>
              <input
                type="range"
                min="0"
                max="100"
                value={convergenceRatio}
                onChange={(e) => setConvergenceRatio(Number(e.target.value))}
                className="w-full h-1.5 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                aria-label="Adjust Three to One Convergence Ratio"
              />
              <span className="text-[11px] font-mono-code text-[#C4B5FD] font-bold">ONE</span>
            </div>
          </div>

          {/* Canvas Simulation Area */}
          <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
            {/* Coordinate grid lines in center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />
              <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent absolute" />
            </div>

            {/* Unified Logo Apex (Emerges when t is high) */}
            <motion.div
              animate={{
                scale: isUnified ? 1.15 : 0.75 + t * 0.35,
                opacity: isUnified ? 1 : 0.2 + t * 0.7,
                filter: isUnified ? 'drop-shadow(0 0 35px rgba(139,92,246,0.6))' : 'none',
              }}
              transition={{ duration: 0.3 }}
              className="absolute z-20 flex flex-col items-center justify-center text-center select-none"
            >
              <LogoSymbol size="w-24 h-24 sm:w-32 sm:h-32" />
              <AnimatePresence>
                {isUnified && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3"
                  >
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-widest uppercase">
                      AMIGOWORKS
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[#8B5CF6] font-semibold">
                      THREE MINDS. ONE BUILD.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* The Three Converging Minds Elements */}
            {minds.map((mind) => {
              const Icon = mind.icon;
              return (
                <motion.div
                  key={mind.id}
                  animate={{
                    x: mind.vectorPos.x,
                    y: mind.vectorPos.y,
                    rotate: mind.vectorPos.rotate,
                    scale: 1 - t * 0.2,
                    opacity: isUnified ? 0.45 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  onClick={() => setActiveMind(mind.id)}
                  onMouseEnter={() => setActiveMind(mind.id)}
                  className={`absolute cursor-pointer z-30 transition-shadow ${
                    activeMind === mind.id ? 'z-40' : ''
                  }`}
                >
                  <div
                    className={`p-4 sm:p-5 rounded-xl bg-[#141414]/95 border backdrop-blur-md transition-all duration-300 w-52 sm:w-60 shadow-lg ${
                      activeMind === mind.id
                        ? 'border-[#8B5CF6] ring-1 ring-[#8B5CF6]/50 scale-105'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    style={{
                      boxShadow: activeMind === mind.id ? `0 0 25px ${mind.glow}` : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-7 h-7 rounded-sm flex items-center justify-center font-mono-code text-xs font-bold"
                        style={{ backgroundColor: `${mind.color}20`, color: mind.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-white/40">
                        {mind.badge}
                      </span>
                    </div>

                    <div className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                      {mind.name}
                    </div>
                    <div
                      className="text-xs font-semibold mt-0.5 tracking-tight"
                      style={{ color: mind.color }}
                    >
                      {mind.role}
                    </div>

                    <p className="mt-2 text-[11px] text-white/60 leading-relaxed line-clamp-2">
                      {mind.focus}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Interactive Trigger Actions */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <span>Drag the matrix slider or click any mind to inspect their domain strengths.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConvergenceRatio(0)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono-code transition-colors ${
                  convergenceRatio === 0 ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                3 MINDS
              </button>
              <button
                onClick={() => setConvergenceRatio(50)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono-code transition-colors ${
                  convergenceRatio === 50 ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                COLLABORATION
              </button>
              <button
                onClick={() => setConvergenceRatio(100)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono-code transition-colors ${
                  convergenceRatio === 100 ? 'bg-[#8B5CF6] text-white font-bold' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                1 BUILD
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Triad Breakdown Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-sm bg-[#111111]/60 border border-white/5 hover:border-[#8B5CF6]/40 transition-colors">
            <div className="text-[#8B5CF6] text-[10px] uppercase tracking-widest font-semibold">01 — VIGNESH</div>
            <h3 className="text-lg font-bold text-white mt-1">AI • Product • Strategy</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">
              Deconstructs client problems into high-leverage AI architectures and intuitive product trajectories.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#111111]/60 border border-white/5 hover:border-[#8B5CF6]/40 transition-colors">
            <div className="text-[#8B5CF6] text-[10px] uppercase tracking-widest font-semibold">02 — SAI KIRAN</div>
            <h3 className="text-lg font-bold text-white mt-1">Engineering • Backend • Systems</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">
              Builds rock-solid server backends, high-concurrency pipelines, and automated business integrations.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#111111]/60 border border-white/5 hover:border-[#8B5CF6]/40 transition-colors">
            <div className="text-[#8B5CF6] text-[10px] uppercase tracking-widest font-semibold">03 — NUTHAN SAI</div>
            <h3 className="text-lg font-bold text-white mt-1">Frontend • Experience • Design</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">
              Designs fluid digital interfaces, typographic hierarchies, and performant web platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
