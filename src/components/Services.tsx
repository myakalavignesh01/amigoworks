import React, { useState } from 'react';
import { SERVICES } from '../data';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

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
                onClick={() => onSelectService && onSelectService(service.title)}
                className={`group relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'bg-[#141414] border-[#8B5CF6]/50 shadow-[0_10px_35px_-5px_rgba(139,92,246,0.15)]'
                    : 'bg-[#0E0E0E] border-white/5 hover:border-white/15'
                }`}
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
                      <span className="font-mono-code text-sm sm:text-base font-semibold text-[#8B5CF6]">
                        {service.number}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Animated Arrow button */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-sm flex items-center justify-center border transition-all duration-300 ${
                        isHovered
                          ? 'bg-white border-white text-black scale-105'
                          : 'bg-white/5 border-white/10 text-white/50 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="mt-2 text-sm sm:text-base text-white/60 pl-8 sm:pl-14 font-light">
                    {service.tagline}
                  </p>

                  {/* Expanding Capabilities on Hover / Click */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-6 pt-6 border-t border-white/5 pl-8 sm:pl-14"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {service.capabilities.map((cap) => (
                            <div
                              key={cap}
                              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 bg-white/5 px-3.5 py-2.5 rounded-sm border border-white/5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stacks */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                            TOOLING:
                          </span>
                          {service.techTags.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[11px] font-mono-code text-[#C4B5FD]"
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
