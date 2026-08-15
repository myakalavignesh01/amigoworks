import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, SunMedium, Lightbulb, Cpu, Server, Layout, CheckCircle2, RotateCcw, ArrowUpRight } from 'lucide-react';
import { playLightActivate, playConvergenceChime, playTactileClick } from '../utils/audio';
import { LogoSymbol } from './Logo';

export const DigitalStudio: React.FC<{ onStartProject?: () => void }> = ({ onStartProject }) => {
  // State for the 3 lighting zones (0: Vignesh, 1: Sai Kiran, 2: Nuthan Sai)
  const [activeZones, setActiveZones] = useState<boolean[]>([false, false, false]);
  const [selectedFounder, setSelectedFounder] = useState<number | null>(null);

  const allActive = activeZones.every(Boolean);

  const toggleZone = (index: number) => {
    playTactileClick();
    const next = [...activeZones];
    next[index] = !next[index];
    setActiveZones(next);
    setSelectedFounder(index);

    if (next[index]) {
      playLightActivate(440 + index * 120);
    }

    // If this activation completed all 3 zones:
    if (next.every(Boolean)) {
      setTimeout(() => {
        playConvergenceChime();
      }, 400);
    }
  };

  const handleActivateAll = () => {
    playTactileClick();
    setActiveZones([true, true, true]);
    playConvergenceChime();
  };

  const handleReset = () => {
    playTactileClick();
    setActiveZones([false, false, false]);
    setSelectedFounder(null);
  };

  const zones = [
    {
      id: 0,
      name: 'Vignesh',
      designation: 'FOUNDER',
      role: 'AI / Product / Strategy',
      badge: 'ZONE 01 • INTELLIGENCE',
      tagline: 'FOUNDER • AI & PRODUCT STRATEGY',
      image: '/images/vignesh_real_founder_1786789440900.jpg',
      description: 'Building intelligent products and turning ideas into usable systems.',
      icon: Cpu,
      accent: '#8B5CF6',
      tags: ['AI/LLM Workflows', 'Product Architecture', 'Prompt & Model Logic', 'Strategic Roadmapping'],
    },
    {
      id: 1,
      name: 'Sai Kiran',
      designation: 'CO-FOUNDER',
      role: 'Engineering / Systems / Backend',
      badge: 'ZONE 02 • INFRASTRUCTURE',
      tagline: 'CO-FOUNDER • SYSTEMS & BACKEND',
      image: '/images/saikiran_real_cofounder_1786789666669.jpg',
      description: 'Designing reliable server architectures, high-throughput APIs, and automation routines.',
      icon: Server,
      accent: '#A78BFA',
      tags: ['Distributed Systems', 'Python & Node.js', 'API & Automation Pipelines', 'Data Infrastructure'],
    },
    {
      id: 2,
      name: 'Nuthan Sai',
      designation: 'CO-FOUNDER',
      role: 'Frontend / Experience / Design',
      badge: 'ZONE 03 • INTERFACE',
      tagline: 'CO-FOUNDER • FRONTEND & DESIGN',
      image: '/images/nuthansai_real_cofounder_1786789566684.jpg',
      description: 'Crafting crisp, responsive, high-performance interfaces with obsessive typographic and tactile feel.',
      icon: Layout,
      accent: '#C4B5FD',
      tags: ['React & TypeScript', 'Tailwind & Motion', 'Design Systems', 'Interactive Micro-dynamics'],
    },
  ];

  return (
    <section
      id="digital-studio"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#09090C] border-b border-white/5 overflow-hidden"
    >
      {/* Background Studio Grid & Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Volumetric Spotlights when zones are active */}
      {activeZones[0] && (
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      )}
      {activeZones[1] && (
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#A78BFA]/15 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      )}
      {activeZones[2] && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C4B5FD]/15 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono-code uppercase tracking-widest">
              <Lightbulb className="w-3 h-3 text-[#8B5CF6]" />
              <span>DIGITAL STUDIO WORKSPACE • INTERACTIVE LIGHTING</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              THREE ZONES. <span className="text-[#8B5CF6]">ONE NEXUS.</span>
            </h2>
            <p className="text-sm md:text-base text-white/60 max-w-xl font-light leading-relaxed">
              Explore the studio. Illuminate each founder's laboratory to discover their discipline. Activate all three to power the AMIGOWORKS core.
            </p>
          </div>

          {/* Accessibility & Quick Controls */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleActivateAll}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono-code uppercase font-semibold flex items-center gap-2 transition-all cursor-pointer"
              title="Activate all three founder zones simultaneously"
            >
              <Sun className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>ACTIVATE STUDIO</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mono-code uppercase flex items-center gap-2 transition-all cursor-pointer"
              title="Reset lighting states"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET VIEW</span>
            </button>
          </div>
        </div>

        {/* Central Convergence Banner when all 3 zones are active */}
        <AnimatePresence>
          {allActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17122B] via-[#100F18] to-[#17122B] border-2 border-[#8B5CF6] shadow-[0_0_50px_rgba(139,92,246,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-3 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 shrink-0">
                  <LogoSymbol size="w-12 h-12" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-code uppercase tracking-widest text-[#C4B5FD] font-bold flex items-center gap-2 justify-center sm:justify-start">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>NEXUS HARMONIZED • ALL DISCIPLINES CONVERGED</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
                    THREE MINDS. ONE BUILD.
                  </h3>
                  <p className="text-xs text-white/70 max-w-md mt-0.5">
                    Intelligence, infrastructure, and interface working together to ship real products.
                  </p>
                </div>
              </div>

              {onStartProject && (
                <button
                  type="button"
                  onClick={onStartProject}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F5F5F4] text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
                >
                  <span>START A PROJECT WITH US</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Founder Lab Zones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {zones.map((zone) => {
            const isActive = activeZones[zone.id];
            const Icon = zone.icon;

            return (
              <motion.div
                key={zone.id}
                id={`studio-zone-${zone.name.toLowerCase().replace(/\s+/g, '-')}`}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-[#12101C] border-[#8B5CF6] shadow-[0_0_35px_rgba(139,92,246,0.25)]'
                    : 'bg-[#0E0E11] border-white/10 hover:border-white/20'
                }`}
                onClick={() => toggleZone(zone.id)}
                data-cursor={isActive ? 'DIM' : 'LIGHT ON'}
              >
                {/* Overhead Lighting Fixture Graphic */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-b-full">
                  <div
                    className={`w-full h-full transition-colors duration-500 ${
                      isActive ? 'bg-[#8B5CF6] shadow-[0_0_20px_#8B5CF6]' : 'bg-transparent'
                    }`}
                  />
                </div>

                {/* Top Telemetry & Light Switch Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-white/50 font-bold">
                      {zone.badge}
                    </span>

                    {/* Physical Light Toggle Indicator */}
                    <button
                      type="button"
                      aria-label={`Toggle light for ${zone.name}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase transition-all duration-300 ${
                        isActive
                          ? 'bg-[#8B5CF6] text-white shadow-[0_0_12px_#8B5CF6]'
                          : 'bg-white/5 text-white/40 border border-white/10'
                      }`}
                    >
                      <SunMedium className={`w-3 h-3 ${isActive ? 'animate-spin' : ''}`} />
                      <span>{isActive ? 'LIGHT ON' : 'DIM'}</span>
                    </button>
                  </div>

                  {/* Icon, Avatar & Founder Headline */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border transition-all duration-300 ${
                          isActive
                            ? 'border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                            : 'border-white/10'
                        }`}
                      >
                        <img
                          src={zone.image}
                          alt={zone.name}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            isActive ? 'scale-105 filter brightness-100' : 'filter grayscale opacity-60'
                          }`}
                        />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                          isActive ? 'bg-[#8B5CF6] text-white' : 'bg-black/80 text-white/40 border border-white/10'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono-code font-bold uppercase tracking-wider text-[#8B5CF6]">
                        {zone.designation}
                      </div>
                      <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mt-0.5">
                        {zone.name}
                      </h3>
                      <div className="text-xs font-mono-code text-white/50">
                        {zone.role}
                      </div>
                    </div>
                  </div>

                  {/* Founder Description */}
                  <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                    {zone.description}
                  </p>

                  {/* Capabilities Tags */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code">
                      DISCIPLINE FOCUS:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {zone.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono-code transition-all duration-300 ${
                            isActive
                              ? 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD]'
                              : 'bg-white/5 border border-white/5 text-white/50'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Status / Toggle prompt */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-white/40 uppercase text-[10px]">
                    {isActive ? 'DOMAINS LINKED' : 'TAP CARD TO ILLUMINATE'}
                  </span>
                  {isActive ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
                    </span>
                  ) : (
                    <span className="text-white/40 flex items-center gap-1 hover:text-white">
                      EXPLORE {zone.name.toUpperCase()} →
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
