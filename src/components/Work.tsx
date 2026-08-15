import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ArrowUpRight, FolderGit2, ShieldAlert, Calculator, Compass, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSkeletonCard: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div
      id={`work-skeleton-${index}`}
      className="relative bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-shimmer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Info Skeleton */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category & Badge Skeletons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-4 w-32 rounded bg-[#8B5CF6]/20 animate-pulse" />
            <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
          </div>

          {/* Title & Subtitle Skeletons */}
          <div className="space-y-2.5">
            <div className="h-9 sm:h-10 w-4/5 rounded-lg bg-white/10 animate-pulse" />
            <div className="h-5 w-1/2 rounded bg-[#C4B5FD]/20 animate-pulse" />
          </div>

          {/* Description Lines Skeleton */}
          <div className="space-y-2.5 pt-1">
            <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
          </div>

          {/* Tech Tags Skeleton */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <div className="h-3 w-10 bg-white/10 rounded" />
            <div className="h-6 w-16 rounded-sm bg-[#141414] border border-white/5 animate-pulse" />
            <div className="h-6 w-20 rounded-sm bg-[#141414] border border-white/5 animate-pulse" />
            <div className="h-6 w-24 rounded-sm bg-[#141414] border border-white/5 animate-pulse" />
            <div className="h-6 w-16 rounded-sm bg-[#141414] border border-white/5 animate-pulse" />
          </div>

          {/* Button Skeleton */}
          <div className="pt-2">
            <div className="h-11 w-44 rounded-sm bg-white/10 border border-white/10 animate-pulse" />
          </div>
        </div>

        {/* Right Architectural Schematic Showcase Skeleton */}
        <div className="lg:col-span-5 h-[280px] sm:h-[320px]">
          <div className="w-full h-full bg-[#0E111C] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
            {/* Top Bar Skeleton */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#8B5CF6]/30 animate-pulse" />
                <div className="h-3.5 w-32 rounded bg-white/10 animate-pulse" />
              </div>
              <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
            </div>

            {/* Middle Waveform / Matrix Skeleton */}
            <div className="space-y-3 my-4">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-28 rounded bg-white/10 animate-pulse" />
                  <div className="h-3 w-12 rounded bg-[#8B5CF6]/40 animate-pulse" />
                </div>
                <div className="w-full bg-[#1F2433] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8B5CF6]/40 h-full w-3/4 animate-pulse" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-32 rounded bg-white/10 animate-pulse" />
                  <div className="h-3 w-16 rounded bg-emerald-500/30 animate-pulse" />
                </div>
                <div className="w-full bg-[#1F2433] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500/30 h-full w-4/5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom Metadata Line Skeleton */}
            <div className="flex justify-between pt-2 border-t border-white/[0.04]">
              <div className="h-3 w-28 rounded bg-white/5 animate-pulse" />
              <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Work: React.FC<WorkProps> = ({ onSelectProject }) => {
  const [loading, setLoading] = useState(true);

  // Initial simulated graceful asset hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateReload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 750);
  };

  // Visual schematic icons for each project
  const getProjectVisual = (projectId: string) => {
    switch (projectId) {
      case 'ai-guardian-os':
        return (
          <div className="w-full h-full bg-[#0E111C] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#7C3AED]/50 transition-all duration-300 transform group-hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-xs font-mono-code text-[#E5E7EB]">GUARDIAN_CORE_V2.1</span>
              </div>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE MONITORING
              </span>
            </div>

            <div className="space-y-2.5 my-4">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono-code text-[#9CA3AF]">
                <div className="text-white font-semibold mb-1 flex justify-between">
                  <span>HEURISTIC AUDIT MATRIX</span>
                  <span className="text-[#A78BFA]">PASSED</span>
                </div>
                <div className="w-full bg-[#1F2433] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7C3AED] h-full w-[94%]" />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono-code text-[#9CA3AF]">
                <div className="text-white font-semibold mb-1 flex justify-between">
                  <span>HALLUCINATION GUARDRAILS</span>
                  <span className="text-emerald-400">0.02% DEV</span>
                </div>
                <div className="w-full bg-[#1F2433] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[98%]" />
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono-code text-[#6B7280] flex justify-between pt-2 border-t border-white/[0.04]">
              <span>STACK: PYTHON / STREAMLIT</span>
              <span>ENGINE: GOVERNANCE</span>
            </div>
          </div>
        );

      case 'calci-py':
        return (
          <div className="w-full h-full bg-[#0E111C] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#7C3AED]/50 transition-all duration-300 transform group-hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-xs font-mono-code text-[#E5E7EB]">CALCI_ANALYTICS_SYS</span>
              </div>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30">
                GPA ENGINE
              </span>
            </div>

            <div className="my-4 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                  <div className="text-[9px] font-mono-code text-[#6B7280]">CREDITS</div>
                  <div className="text-xs font-bold text-white font-mono-code mt-0.5">148.0</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                  <div className="text-[9px] font-mono-code text-[#6B7280]">SEMESTERS</div>
                  <div className="text-xs font-bold text-[#A78BFA] font-mono-code mt-0.5">8 OF 8</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                  <div className="text-[9px] font-mono-code text-[#6B7280]">PROJECTION</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono-code mt-0.5">OPTIMAL</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono-code text-[#9CA3AF]">
                <span>TRAJECTORY CURVE: MULTI-SEMESTER WEIGHTED</span>
                <div className="flex items-end gap-1.5 h-7 mt-1.5">
                  <div className="flex-1 bg-[#7C3AED]/40 h-[60%] rounded-t-sm" />
                  <div className="flex-1 bg-[#7C3AED]/60 h-[75%] rounded-t-sm" />
                  <div className="flex-1 bg-[#7C3AED]/80 h-[85%] rounded-t-sm" />
                  <div className="flex-1 bg-[#8B5CF6] h-[95%] rounded-t-sm" />
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono-code text-[#6B7280] flex justify-between pt-2 border-t border-white/[0.04]">
              <span>EDTECH • PRODUCTIVITY</span>
              <span>STATE: STABLE</span>
            </div>
          </div>
        );

      case 'guide360':
        return (
          <div className="w-full h-full bg-[#0E111C] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#7C3AED]/50 transition-all duration-300 transform group-hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4B5FD]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C4B5FD]" />
                <span className="text-xs font-mono-code text-[#E5E7EB]">GUIDE360_MAP_SPATIAL</span>
              </div>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                GEO SPATIAL
              </span>
            </div>

            <div className="my-4 space-y-2.5">
              <div className="relative h-20 rounded-lg bg-[#141724] border border-white/[0.04] p-2 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#8B5CF6] animate-ping" />
                  <span className="text-xs font-mono-code text-white">INTERACTIVE MAP GRID</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-white/[0.03] text-[10px] font-mono-code text-[#9CA3AF] flex-1 text-center">
                  WAYPOINTS
                </span>
                <span className="px-2 py-1 rounded bg-white/[0.03] text-[10px] font-mono-code text-[#9CA3AF] flex-1 text-center">
                  GEO-TAGS
                </span>
                <span className="px-2 py-1 rounded bg-white/[0.03] text-[10px] font-mono-code text-[#9CA3AF] flex-1 text-center">
                  ITINERARIES
                </span>
              </div>
            </div>

            <div className="text-[10px] font-mono-code text-[#6B7280] flex justify-between pt-2 border-t border-white/[0.04]">
              <span>WEB / MAPS / APIS</span>
              <span>MODE: EXPLORATORY</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2 font-mono-code">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PORTFOLIO & CASE STUDIES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              SELECTED WORK
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm md:text-base text-white/60 max-w-md font-light">
              Real products engineered with product intelligence, robust architectures, and clean interfaces.
            </p>
            <button
              id="refresh-work-telemetry-btn"
              onClick={handleSimulateReload}
              title="Refresh telemetry"
              aria-label="Refresh telemetry data"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-white/10 hover:border-[#8B5CF6]/40 text-white/60 hover:text-white text-[10px] font-mono-code uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 text-[#8B5CF6] ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'SYNCING...' : 'LIVE SYNC'}</span>
            </button>
          </div>
        </div>

        {/* Selected Projects List or Skeleton Cards */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="work-skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {[1, 2, 3].map((idx) => (
                <WorkSkeletonCard key={idx} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="work-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  whileHover={{ y: -3, scale: 1.015 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-[#0E0E0E] border border-white/10 hover:border-[#8B5CF6]/40 rounded-2xl p-6 sm:p-8 lg:p-10 transition-colors duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Text / Info Column */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Category & Badge */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-semibold font-mono-code">
                          0{index + 1} — {project.category}
                        </span>
                        <span className="px-3 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono-code text-white/60">
                          {project.deliverableType}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-base text-[#C4B5FD] font-medium mt-1 font-mono-code">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 mr-1 font-mono-code font-bold">
                          TECH:
                        </span>
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-sm bg-[#141414] border border-white/5 text-xs font-mono-code text-[#E5E7EB] hover:border-white/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          id={`view-case-study-${project.id}-btn`}
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
                        >
                          <span>VIEW CASE STUDY</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Visual Architecture Showcase Column */}
                    <div className="lg:col-span-5 h-[280px] sm:h-[320px]">
                      {getProjectVisual(project.id)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
