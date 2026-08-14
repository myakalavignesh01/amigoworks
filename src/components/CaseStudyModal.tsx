import React from 'react';
import { Project } from '../types';
import { X, CheckCircle2, ShieldCheck, Code, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onStartSimilar: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartSimilar,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#0E0E0E] border border-white/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/5 bg-[#141414]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-sm bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[10px] font-mono-code uppercase tracking-wider text-[#C4B5FD] font-semibold">
                {project.category}
              </span>
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-white/40 hidden sm:inline">
                {project.deliverableType}
              </span>
            </div>

            <button
              onClick={onClose}
              id="close-case-study-btn"
              className="p-2 rounded-sm bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/5"
              aria-label="Close Case Study Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
            {/* Title & Subtitle */}
            <div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-[#8B5CF6] mt-2 font-medium">
                {project.subtitle}
              </p>
              <p className="text-sm text-white/60 mt-3 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Bar */}
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mr-2 flex items-center gap-1.5 font-semibold">
                <Code className="w-3.5 h-3.5 text-[#8B5CF6]" />
                TECH STACK:
              </span>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-sm bg-white/5 border border-white/5 text-[11px] font-mono-code text-[#F5F5F4] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-[#141414] border border-white/5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#F87171] font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>THE CHALLENGE</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C4B5FD] font-semibold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>OUR SOLUTION</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="font-display font-bold text-base text-white uppercase tracking-wider mb-4">
                KEY CAPABILITIES & DELIVERABLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#141414] border border-white/5 text-sm text-white/70 font-light"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="p-6 rounded-xl bg-[#141414] border border-white/5">
              <h4 className="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-semibold mb-3">
                ENGINEERING & ARCHITECTURE SPECIFICATION
              </h4>
              <ul className="space-y-2">
                {project.architecture.map((arch, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/60 font-mono-code">
                    <span className="text-[#8B5CF6] font-bold">0{idx + 1}.</span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-5 border-t border-white/5 bg-[#141414]">
            <div className="text-xs text-white/50 font-light">
              Need a similar product built for your business?
            </div>
            <button
              id="modal-start-similar-btn"
              onClick={() => {
                onClose();
                onStartSimilar(project.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-[#E5E5E5] transition-colors"
            >
              <span>BUILD A SIMILAR PRODUCT</span>
              <span className="text-sm font-bold">↗</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
