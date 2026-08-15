import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { InteractiveHeroObject } from './InteractiveHeroObject';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle scroll parallax for depth
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, prefersReducedMotion ? 1 : 0.2]);

  // Motion Variants with fast, smooth, intentional pacing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-14 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0A] bg-grid-pattern"
    >
      {/* Subtle, restrained ambient accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-[#8B5CF6]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: contentParallaxY,
          opacity: contentOpacity,
        }}
        className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center"
      >
        {/* 1. Brand Tag Badge */}
        <motion.div variants={itemFadeUp} className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[#C4B5FD] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase font-mono-code">
              AMIGOWORKS • THREE MINDS. ONE BUILD.
            </span>
          </div>
        </motion.div>

        {/* 2. Hero Headline - Fluid & Controlled on Mobile (320px - 1440px+) */}
        <motion.div variants={itemFadeUp} className="w-full max-w-4xl px-2">
          <h1 className="font-display font-black text-[36px] xs:text-[44px] sm:text-6xl md:text-7xl lg:text-[84px] tracking-tight leading-[0.95] sm:leading-[0.92] text-white uppercase break-words">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white"
            >
              WE BUILD
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white/30 tracking-tight"
            >
              WHAT'S NEXT.
            </motion.span>
          </h1>
        </motion.div>

        {/* 3. Supporting Statement */}
        <motion.p
          variants={itemFadeUp}
          className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-white/65 max-w-xl font-light leading-relaxed text-center px-2"
        >
          AI products, web experiences, automation systems and digital solutions built by three ambitious creators.
        </motion.p>

        {/* 4. Primary & Secondary Magnetic CTAs */}
        <motion.div
          variants={itemFadeUp}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <MagneticButton
            id="hero-primary-cta"
            onClick={onStartProject}
            variant="primary"
            cursorLabel="START"
            className="w-full sm:w-auto min-h-[48px] px-8 py-4 text-xs sm:text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" />
          </MagneticButton>

          <MagneticButton
            id="hero-secondary-cta"
            onClick={onExploreWork}
            variant="secondary"
            cursorLabel="EXPLORE"
            className="w-full sm:w-auto min-h-[48px] px-7 py-4 text-xs sm:text-sm"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#8B5CF6] animate-bounce" />
          </MagneticButton>
        </motion.div>

        {/* 5. Central Precision Interactive 3D Hero Object */}
        <motion.div
          variants={itemFadeUp}
          className="mt-8 sm:mt-10 w-full flex justify-center"
        >
          <InteractiveHeroObject onExploreWork={onExploreWork} />
        </motion.div>

        {/* 6. Editorial Focus Trio */}
        <motion.div
          variants={itemFadeUp}
          className="mt-10 sm:mt-12 pt-8 border-t border-white/5 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left"
        >
          <div className="p-3.5 rounded-xl bg-[#111114]/60 border border-white/5 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] cursor-default">
            <div className="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-mono-code font-bold">01 — AI Systems</div>
            <div className="text-xs font-medium text-white/90 mt-0.5">Intelligent Workflows & Logic</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#111114]/60 border border-white/5 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] cursor-default">
            <div className="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-mono-code font-bold">02 — Digital Products</div>
            <div className="text-xs font-medium text-white/90 mt-0.5">Modern Web Applications</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#111114]/60 border border-white/5 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] cursor-default">
            <div className="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-mono-code font-bold">03 — Engineering</div>
            <div className="text-xs font-medium text-white/90 mt-0.5">Python & Backend Systems</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
