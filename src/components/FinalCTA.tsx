import React from 'react';
import { LogoSymbol } from './Logo';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCTAProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative overflow-hidden text-center border-t border-white/5">
      {/* Background Large Subtle Symbol Monogram with slow breathing animation */}
      <motion.div
        animate={{
          scale: [1.5, 1.58, 1.5],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none"
      >
        <LogoSymbol size="w-96 h-96 sm:w-[480px] sm:h-[480px]" />
      </motion.div>

      {/* Ambiance Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4 font-mono-code"
        >
          DEPLOY WITH VELOCITY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-none"
        >
          GOT AN IDEA?
          <br />
          <span className="text-[#8B5CF6]">
            LET'S BUILD IT.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-white/60 max-w-xl mx-auto font-light leading-relaxed"
        >
          We bring high-craft product thinking, backend engineering, and intuitive interfaces to your next venture.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            id="final-cta-start-btn"
            onClick={onStartProject}
            className="w-full sm:w-auto min-h-[44px] bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 rounded-sm hover:bg-[#F5F5F4] transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.06)' }}
            whileTap={{ scale: 0.97 }}
            id="final-cta-explore-btn"
            onClick={onExploreWork}
            className="w-full sm:w-auto min-h-[44px] border border-white/20 hover:border-white/40 px-7 py-4 text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowDown className="w-4 h-4 text-[#8B5CF6] animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

