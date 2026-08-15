import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data';
import { GitCommit, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { playTactileClick } from '../utils/audio';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
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

  const stepCardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const pipelineStages = [
    { label: 'IDEA', phase: '01' },
    { label: 'SYSTEM', phase: '02' },
    { label: 'DESIGN', phase: '03' },
    { label: 'CODE', phase: '04' },
    { label: 'PRODUCT', phase: '05' },
    { label: 'SHIP', phase: '06' },
  ];

  return (
    <section id="process" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/5"
        >
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2 font-mono-code">
              <GitCommit className="w-3.5 h-3.5" />
              <span>THE ENGINEERING PIPELINE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              FROM IDEA
              <br />
              <span className="text-[#8B5CF6]">TO REALITY.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-white/60 max-w-md font-light">
            A battle-tested transformation pipeline ensuring rapid turnaround, rock-solid stability, and transparent iteration.
          </p>
        </motion.div>

        {/* Interactive Progressive Pipeline Metaphor Bar */}
        <div className="mb-12 p-4 sm:p-6 rounded-2xl bg-[#0F0F12] border border-white/10 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[580px] gap-2">
            {pipelineStages.map((stage, idx) => {
              const isSelected = activeStep === idx;
              const isPast = idx < activeStep;

              return (
                <React.Fragment key={stage.label}>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setActiveStep(idx);
                    }}
                    className={`flex-1 p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-105'
                        : isPast
                        ? 'bg-white/10 border-white/20 text-white/80'
                        : 'bg-white/5 border-white/5 text-white/40 hover:text-white/70 hover:border-white/10'
                    }`}
                  >
                    <div className="text-[9px] font-mono-code font-bold uppercase tracking-widest opacity-80">
                      PHASE {stage.phase}
                    </div>
                    <div className="text-xs font-display font-black tracking-wider uppercase mt-0.5">
                      {stage.label}
                    </div>
                  </button>
                  {idx < pipelineStages.length - 1 && (
                    <span className="text-white/20 font-mono-code text-xs px-1">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 6-Step Interactive Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROCESS_STEPS.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <motion.div
                key={step.number}
                variants={stepCardVariants}
                id={`process-step-${step.number}`}
                onClick={() => {
                  playTactileClick();
                  setActiveStep(index);
                }}
                onMouseEnter={() => setActiveStep(index)}
                className={`group relative rounded-2xl p-7 border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#141414] border-[#8B5CF6] shadow-[0_10px_30px_rgba(139,92,246,0.15)]'
                    : 'bg-[#0E0E0E] border-white/5 hover:border-white/20'
                }`}
                data-cursor="ACTIVATE"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-mono-code text-sm font-bold px-3 py-1 rounded-sm border transition-colors ${
                        isActive
                          ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                          : 'bg-white/5 text-white/60 border-white/10'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code">
                      PHASE 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-sm font-semibold text-[#8B5CF6] mt-1 font-mono-code">
                    {step.summary}
                  </div>

                  {/* Details */}
                  <p className="mt-4 text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>

                {/* Bottom Status Marker */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code">
                    STATUS: {isActive ? 'IN FOCUS' : 'STANDBY'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#8B5CF6] text-white' : 'bg-white/5 text-white/30'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Timeline Indicator with Motion Reveal */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="text-xs text-white/80 font-medium tracking-wide font-mono-code">
              AVERAGE VELOCITY: 2 TO 6 WEEKS FROM DISCOVERY TO PRODUCTION DEPLOYMENT
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-bold tracking-wider uppercase text-[#8B5CF6] hover:text-white transition-colors flex items-center gap-1.5 font-mono-code"
          >
            <span>START DISCOVERY PHASE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
