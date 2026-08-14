import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { LogoSymbol } from './Logo';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax scroll effects via useScroll & useTransform
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Layered parallax transformations for subtle depth separation
  const logoParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -50]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.88]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 35]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, prefersReducedMotion ? 1 : 0.15]);
  const bgGlowParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 70]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / 25;
      const y = (e.clientY - (rect.top + rect.height / 2)) / 25;
      setMousePos({ x, y });
    };

    const currentHero = heroRef.current;
    if (currentHero) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  // Motion Variants with staggered orchestration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const cardItemVariant: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Ambient Background Elements with Scroll Parallax */}
      <motion.div
        style={{ y: bgGlowParallaxY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#8B5CF6]/5 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.3 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Main Container with Scroll-Aware Parallax Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: textParallaxY,
          opacity: textOpacity,
        }}
        className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center"
      >
        {/* Subtle Brand Tag Badge */}
        <motion.div variants={itemFadeUp} className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="text-[#8B5CF6] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase font-mono-code">
              INNOVATION STUDIO • THREE MINDS. ONE BUILD.
            </span>
          </div>
        </motion.div>

        {/* Hero Interactive Symbol Anchor with 3D Tilt & Parallax Scale/Lift */}
        <motion.div
          variants={logoVariants}
          style={{
            y: logoParallaxY,
            scale: logoScale,
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${mousePos.x * 0.75}px, ${mousePos.y * 0.75}px, 0) rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="my-6 cursor-pointer group"
          onClick={onExploreWork}
          title="AMIGOWORKS Symbol"
        >
          <div className="relative p-3 rounded-xl bg-[#111111]/80 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:border-[#8B5CF6]/60 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            <LogoSymbol size="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
          </div>
        </motion.div>

        {/* Hero Headline with Staggered Visual Rhythm */}
        <motion.h1
          variants={itemFadeUp}
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[88px] tracking-tighter leading-[0.88] text-white uppercase max-w-4xl"
        >
          <span>WE BUILD</span>
          <br />
          <span className="text-white/20">
            WHAT'S NEXT.
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          variants={itemFadeUp}
          className="mt-7 text-base sm:text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed text-center px-4"
        >
          AI products, web experiences, automation systems and digital solutions built by three ambitious creators.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={itemFadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="hero-primary-cta"
            onClick={onStartProject}
            className="w-full sm:w-auto bg-white text-black px-8 py-4 text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-3 rounded-sm hover:bg-[#F5F5F4] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>Start a Project</span>
            <span className="text-base font-bold">↗</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)' }}
            whileTap={{ scale: 0.98 }}
            id="hero-secondary-cta"
            onClick={onExploreWork}
            className="w-full sm:w-auto border border-white/20 hover:border-white/40 px-7 py-4 text-sm font-bold tracking-wider uppercase text-white/80 hover:text-white rounded-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-4 h-4 text-[#8B5CF6]" />
          </motion.button>
        </motion.div>

        {/* Micro Credential Grid with Staggered Entrance */}
        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 pt-10 border-t border-white/5 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-left"
        >
          <motion.div variants={cardItemVariant} className="p-4 rounded-xl bg-[#111111]/60 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-[10px] uppercase tracking-widest text-[#8B5CF6] mb-1 font-mono-code font-bold">01 — AI Systems</div>
            <div className="text-xs sm:text-sm font-medium text-[#F5F5F4]">Intelligent Workflows & Assistants</div>
          </motion.div>
          <motion.div variants={cardItemVariant} className="p-4 rounded-xl bg-[#111111]/60 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-[10px] uppercase tracking-widest text-[#8B5CF6] mb-1 font-mono-code font-bold">02 — Digital Products</div>
            <div className="text-xs sm:text-sm font-medium text-[#F5F5F4]">Full-Scale SaaS & Web Platforms</div>
          </motion.div>
          <motion.div variants={cardItemVariant} className="p-4 rounded-xl bg-[#111111]/60 border border-white/5 hover:border-white/15 transition-all">
            <div className="text-[10px] uppercase tracking-widest text-[#8B5CF6] mb-1 font-mono-code font-bold">03 — Automation</div>
            <div className="text-xs sm:text-sm font-medium text-[#F5F5F4]">Enterprise Python Workflows</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
