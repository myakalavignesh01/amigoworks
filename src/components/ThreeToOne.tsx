import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoSymbol } from './Logo';
import { Cpu, Terminal, Palette, Sparkles } from 'lucide-react';

export const ThreeToOne: React.FC = () => {
  const [convergenceState, setConvergenceState] = useState<'three' | 'converging' | 'one'>('converging');
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Convergence factor: 0 = separated nodes, 0.5 = converging vectors, 1 = unified ONE BUILD
  const t = convergenceState === 'three' ? 0 : convergenceState === 'converging' ? 0.6 : 1;
  const isOne = convergenceState === 'one';

  const founders = [
    {
      id: 0,
      name: 'VIGNESH',
      code: 'V-01',
      title: 'AI • Product Strategy',
      subtitle: 'The Product Intellect',
      icon: Cpu,
      color: '#A78BFA',
      desktopAngle: -140, // Top-left
      description: 'Translates complex client visions into high-leverage AI workflows, system logic, and clear product direction.',
      deliverables: ['Intelligent Agents & LLM RAG', 'System Roadmaps', 'Product Architecture'],
    },
    {
      id: 1,
      name: 'SAI KIRAN',
      code: 'S-02',
      title: 'Backend • Systems Engineering',
      subtitle: 'The Systems Engine',
      icon: Terminal,
      color: '#8B5CF6',
      desktopAngle: -40, // Top-right
      description: 'Builds fault-tolerant server backends, database architectures, and automated data pipelines.',
      deliverables: ['High-Concurrency APIs', 'Database Schemas & ORMs', 'Automation Pipelines'],
    },
    {
      id: 2,
      name: 'NUTHAN SAI',
      code: 'N-03',
      title: 'Design • Frontend Craft',
      subtitle: 'The Experience Craft',
      icon: Palette,
      color: '#C4B5FD',
      desktopAngle: 90, // Bottom-center
      description: 'Crafts responsive interfaces, interaction physics, and design systems for web and mobile.',
      deliverables: ['Responsive Web Apps', 'Design Systems & Tokens', 'Fluid Motion & UX'],
    },
  ];

  return (
    <section
      id="three-to-one"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-y border-white/5 overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5CF6]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2 font-mono-code">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE AMIGOWORKS IDENTITY</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight">
            THREE MINDS.
            <br />
            <span className="text-white/30">ONE BUILD.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto">
            Three distinct engineering forces converging into a single unified build studio. No bloated agency layers.
          </p>
        </div>

        {/* State Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10">
          <button
            onClick={() => setConvergenceState('three')}
            className={`px-4 py-2 text-xs font-mono-code font-bold uppercase tracking-wider rounded-sm transition-all border ${
              convergenceState === 'three'
                ? 'bg-white text-black border-white shadow-sm'
                : 'bg-[#121212] text-white/60 border-white/10 hover:text-white'
            }`}
          >
            01. THREE FORCES
          </button>
          <button
            onClick={() => setConvergenceState('converging')}
            className={`px-4 py-2 text-xs font-mono-code font-bold uppercase tracking-wider rounded-sm transition-all border ${
              convergenceState === 'converging'
                ? 'bg-white text-black border-white shadow-sm'
                : 'bg-[#121212] text-white/60 border-white/10 hover:text-white'
            }`}
          >
            02. CONVERGENCE
          </button>
          <button
            onClick={() => setConvergenceState('one')}
            className={`px-4 py-2 text-xs font-mono-code font-bold uppercase tracking-wider rounded-sm transition-all border ${
              convergenceState === 'one'
                ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-sm'
                : 'bg-[#121212] text-white/60 border-white/10 hover:text-white'
            }`}
          >
            03. ONE BUILD
          </button>
        </div>

        {/* Dynamic Vector Convergence Arena */}
        <div className="relative bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle Vector Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Desktop Geometric Arena (hidden on small mobile, rendered on sm+) */}
          <div className="hidden sm:flex relative min-h-[420px] items-center justify-center">
            {/* SVG Connecting Vector Rays with Animated Energetic Flow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 420">
              <defs>
                <linearGradient id="vectorRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glowPulse" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central crosshairs & orbit rings */}
              <circle cx="400" cy="210" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <circle
                cx="400"
                cy="210"
                r="130"
                fill="none"
                stroke="rgba(139,92,246,0.12)"
                strokeDasharray="4 6"
                className="animate-[spin_40s_linear_infinite] origin-[400px_210px]"
              />

              {/* Rays from nodes to center */}
              <line
                x1={200 + t * 160}
                y1={90 + t * 90}
                x2="400"
                y2="210"
                stroke="url(#vectorRayGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                x1={600 - t * 160}
                y1={90 + t * 90}
                x2="400"
                y2="210"
                stroke="url(#vectorRayGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                x1="400"
                y1={330 - t * 90}
                x2="400"
                y2="210"
                stroke="url(#vectorRayGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Flowing energy particles traveling toward the center */}
              <circle r="3" fill="#A78BFA" filter="url(#glowPulse)">
                <animateMotion
                  path={`M ${200 + t * 160} ${90 + t * 90} L 400 210`}
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#8B5CF6" filter="url(#glowPulse)">
                <animateMotion
                  path={`M ${600 - t * 160} ${90 + t * 90} L 400 210`}
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#C4B5FD" filter="url(#glowPulse)">
                <animateMotion
                  path={`M 400 ${330 - t * 90} L 400 210`}
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            {/* Central Nexus / Unified Symbol */}
            <motion.div
              animate={{
                scale: isOne ? 1.2 : 0.85 + t * 0.25,
                opacity: 0.3 + t * 0.7,
              }}
              transition={{ duration: 0.4 }}
              className="relative z-20 flex flex-col items-center justify-center text-center select-none"
            >
              <div className="p-3 rounded-xl bg-[#111111] border border-white/10 shadow-lg">
                <LogoSymbol size="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <div className="mt-3">
                <div className="font-display font-black text-lg text-white tracking-widest uppercase">
                  AMIGOWORKS
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#8B5CF6] font-mono-code font-bold">
                  THREE MINDS. ONE BUILD.
                </div>
              </div>
            </motion.div>

            {/* 3 Interactive Force Nodes positioned around the Nexus */}
            {founders.map((f) => {
              const Icon = f.icon;
              const isSelected = activeNode === f.id;

              // Compute coordinates based on t
              let posX = 0;
              let posY = 0;
              if (f.id === 0) {
                posX = (1 - t) * -220;
                posY = (1 - t) * -110;
              } else if (f.id === 1) {
                posX = (1 - t) * 220;
                posY = (1 - t) * -110;
              } else {
                posX = 0;
                posY = (1 - t) * 130;
              }

              return (
                <motion.div
                  key={f.id}
                  animate={{
                    x: posX,
                    y: posY,
                    opacity: isOne ? 0.35 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                  onClick={() => setActiveNode(isSelected ? null : f.id)}
                  className={`absolute z-30 cursor-pointer transition-all ${
                    isSelected ? 'scale-105 z-40' : 'hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <div
                    className={`p-4 rounded-xl border transition-all duration-200 w-52 bg-[#121212]/95 backdrop-blur-md shadow-md ${
                      isSelected
                        ? 'border-[#8B5CF6] ring-1 ring-[#8B5CF6]/50 bg-[#161616]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono-code font-bold uppercase tracking-wider text-[#8B5CF6]">
                        {f.code}
                      </span>
                      <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/70">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="font-display font-black text-sm text-white uppercase tracking-tight">
                      {f.name}
                    </div>
                    <div className="text-[11px] text-white/50 font-medium">{f.title}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Dedicated Composition (clean vertical flow) */}
          <div className="sm:hidden space-y-4">
            {/* Center Monogram in Mobile */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#121212] border border-white/10 text-center">
              <LogoSymbol size="w-12 h-12" />
              <div className="font-display font-black text-sm text-white uppercase tracking-wider mt-2">
                AMIGOWORKS NEXUS
              </div>
              <div className="text-[9px] text-[#8B5CF6] font-mono-code font-bold tracking-widest uppercase">
                THREE MINDS. ONE BUILD.
              </div>
            </div>

            {/* 3 Node Cards in Mobile */}
            <div className="space-y-3 pt-2">
              {founders.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.id}
                    className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-start justify-between gap-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono-code font-bold text-[#8B5CF6]">
                          {f.code}
                        </span>
                        <span className="text-xs font-bold text-white uppercase font-display">
                          {f.name}
                        </span>
                      </div>
                      <div className="text-xs text-white/70">{f.title}</div>
                      <p className="text-[11px] text-white/50 font-light leading-relaxed pt-1">
                        {f.description}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/70 shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Node Detail Expansion */}
          <AnimatePresence>
            {activeNode !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-6 pt-6 border-t border-white/5 hidden sm:grid grid-cols-3 gap-4 text-xs font-mono-code"
              >
                <div className="col-span-1 text-white/60">
                  <span className="text-white font-bold block mb-1">
                    FOCUS: {founders[activeNode].name}
                  </span>
                  {founders[activeNode].description}
                </div>
                <div className="col-span-2 flex flex-wrap gap-2 items-center">
                  <span className="text-white/40 block w-full text-[10px] uppercase tracking-wider">
                    KEY DELIVERABLES:
                  </span>
                  {founders[activeNode].deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-white/80 text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Editorial Triad Breakdown Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {founders.map((f, i) => (
            <div
              key={f.id}
              className="p-5 sm:p-6 rounded-xl bg-[#111111]/50 border border-white/5 hover:border-white/15 transition-colors"
            >
              <div className="text-[#8B5CF6] text-[10px] uppercase tracking-widest font-mono-code font-bold">
                0{i + 1} — {f.name}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1.5 font-display">
                {f.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

