import React, { useState } from 'react';
import { SERVICES } from '../data';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, Box, Globe, Zap, BarChart3, Play, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { playTactileClick } from '../utils/audio';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [activeSimulationStep, setActiveSimulationStep] = useState<number>(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Render original physical interactive simulation for each service category
  const renderInteractiveSimulation = (serviceNumber: string) => {
    switch (serviceNumber) {
      case '01': // AI SYSTEMS: Prompt/Node flow
        return (
          <div className="p-4 rounded-xl bg-black/60 border border-[#8B5CF6]/30 space-y-3 font-mono-code text-xs">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5 text-[#8B5CF6] font-bold">
                <Cpu className="w-3.5 h-3.5" /> LIVE NEURAL PIPELINE
              </span>
              <span className="text-emerald-400">LATENCY: 42ms</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-white/80">
                <div className="text-[9px] text-[#C4B5FD] font-bold">01 INGESTION</div>
                <div>User Prompt</div>
              </div>
              <div className="p-2 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] animate-pulse">
                <div className="text-[9px] text-white font-bold">02 RAG / EMBED</div>
                <div>Vector Engine</div>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 text-white/80">
                <div className="text-[9px] text-emerald-400 font-bold">03 EXECUTE</div>
                <div>Structured Action</div>
              </div>
            </div>
          </div>
        );

      case '02': // DIGITAL PRODUCTS: SaaS Module Assembler
        return (
          <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-3 font-mono-code text-xs">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Box className="w-3.5 h-3.5 text-[#A78BFA]" /> MODULAR SAAS STACK
              </span>
              <span className="text-[#C4B5FD]">4/4 MODULES SYNCED</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
              <span className="p-2 rounded bg-white/5 border border-white/10 text-white/80">🔒 Auth & Roles</span>
              <span className="p-2 rounded bg-white/5 border border-white/10 text-white/80">⚡ Fast Core API</span>
              <span className="p-2 rounded bg-white/5 border border-white/10 text-white/80">🗄️ Relational DB</span>
              <span className="p-2 rounded bg-white/5 border border-white/10 text-white/80">🎨 Crisp Next.js UI</span>
            </div>
          </div>
        );

      case '03': // WEB EXPERIENCES: Kinetic Responsive Layers
        return (
          <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-3 font-mono-code text-xs">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Globe className="w-3.5 h-3.5 text-[#C4B5FD]" /> RESPONSIVE KINETIC CANVAS
              </span>
              <span className="text-white/40">120 FPS TRANSITIONS</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-center text-[10px]">
              <div className="flex-1 p-2 rounded bg-white/5 border border-white/10 text-white/80">
                Desktop (1920px)
              </div>
              <span className="text-[#8B5CF6]">→</span>
              <div className="flex-1 p-2 rounded bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                Tablet (768px)
              </div>
              <span className="text-[#8B5CF6]">→</span>
              <div className="flex-1 p-2 rounded bg-white/5 border border-white/10 text-white/80">
                Mobile (390px)
              </div>
            </div>
          </div>
        );

      case '04': // AUTOMATION: Event Trigger Pipeline
        return (
          <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-3 font-mono-code text-xs">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> EVENT TRIGGER WORKFLOW
              </span>
              <span className="text-emerald-400">STATUS: ZERO FAILURES</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <span className="p-1.5 rounded bg-white/5 border border-white/10 text-white/70">Webhook In</span>
              <span className="p-1.5 rounded bg-white/5 border border-white/10 text-white/70">Data Parse</span>
              <span className="p-1.5 rounded bg-white/5 border border-white/10 text-white/70">DB Upsert</span>
              <span className="p-1.5 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white font-bold">Auto-Dispatch</span>
            </div>
          </div>
        );

      case '05': // DATA & DASHBOARDS: Live Telemetry
        return (
          <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-3 font-mono-code text-xs">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> REAL-TIME TELEMETRY ENGINE
              </span>
              <span className="text-white/40">POLL: 1000ms</span>
            </div>
            <div className="flex items-end gap-1.5 h-8 pt-1">
              {[40, 65, 50, 85, 95, 75, 90, 100].map((val, i) => (
                <div
                  key={i}
                  style={{ height: `${val}%` }}
                  className="flex-1 bg-gradient-to-t from-[#8B5CF6]/40 to-[#8B5CF6] rounded-t-sm"
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/5"
        >
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2 font-mono-code">
              <Layers className="w-3.5 h-3.5" />
              <span>CAPABILITIES & PRACTICES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-white/60 max-w-md font-light">
            From zero to one. We architect intelligent systems, high-craft web experiences, and seamless automations.
          </p>
        </motion.div>

        {/* Large Interactive Editorial Rows with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-4"
        >
          {SERVICES.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.number}
                variants={rowVariants}
                id={`service-row-${service.number}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => {
                  playTactileClick();
                  setHoveredIndex(index);
                  if (onSelectService) onSelectService(service.title);
                }}
                className={`group relative rounded-2xl border transition-all duration-200 hover:scale-[1.015] active:scale-[0.99] cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'bg-[#121215] border-[#8B5CF6]/60 shadow-[0_12px_40px_rgba(139,92,246,0.18)]'
                    : 'bg-[#0E0E10] border-white/10 hover:border-white/20'
                }`}
                data-cursor="ACTIVATE"
              >
                {/* Active Violet Accent Bar on Left */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-[#8B5CF6] transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Top Bar Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="font-mono-code text-sm sm:text-base font-bold text-[#8B5CF6]">
                        {service.number}
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Animated Arrow button */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isHovered
                          ? 'bg-white border-white text-black scale-105 shadow-md'
                          : 'bg-white/5 border-white/10 text-white/50 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isHovered ? 'translate-x-0.5 -translate-y-0.5 text-[#8B5CF6]' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="mt-2 text-sm sm:text-base text-white/60 pl-8 sm:pl-14 font-light">
                    {service.tagline}
                  </p>

                  {/* Expanding Capabilities & Interactive System on Hover / Selection */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-6 pt-6 border-t border-white/5 pl-0 sm:pl-14 space-y-6"
                      >
                        {/* Live Metaphor Simulation Panel */}
                        {renderInteractiveSimulation(service.number)}

                        {/* Capabilities List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {service.capabilities.map((cap) => (
                            <div
                              key={cap}
                              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stacks */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                            CORE TOOLING:
                          </span>
                          {service.techTags.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono-code text-[#C4B5FD]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
