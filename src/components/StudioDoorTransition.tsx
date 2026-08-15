import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, ArrowRight, Lock, Unlock, Sparkles } from 'lucide-react';
import { playDoorSlide, playTactileClick } from '../utils/audio';

interface StudioDoorTransitionProps {
  onEnterStudio: () => void;
}

export const StudioDoorTransition: React.FC<StudioDoorTransitionProps> = ({ onEnterStudio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenDoor = () => {
    if (isOpen) return;
    setIsOpen(true);
    playTactileClick();
    playDoorSlide();

    setTimeout(() => {
      onEnterStudio();
    }, 600);
  };

  return (
    <section
      id="studio-portal"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D10] to-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Section Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono-code uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
          <span>STUDIO PORTAL • STAGE 01</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase max-w-2xl leading-tight">
          ENTER THE <span className="text-[#8B5CF6]">AMIGOWORKS</span> DIGITAL STUDIO
        </h2>

        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-lg font-light leading-relaxed">
          Step into our creative technology workspace. Three specialized domains operating as one unified engineering core.
        </p>

        {/* Physical Mechanical Door Frame Metaphor */}
        <div className="mt-12 relative w-full max-w-xl p-4 sm:p-6 rounded-3xl bg-[#0F0F12] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Top Status Telemetry */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 text-[10px] font-mono-code uppercase text-white/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AIRLOCK: READY</span>
            </div>
            <div>STATUS: {isOpen ? 'UNLOCKED / TRANSITIONING' : 'SECURE / STANDBY'}</div>
          </div>

          {/* Sliding Door Leaves Container */}
          <div
            className="relative h-64 sm:h-72 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center cursor-pointer group"
            onClick={handleOpenDoor}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-cursor="ENTER"
          >
            {/* Left Door Shutter */}
            <motion.div
              animate={{
                x: isOpen ? '-100%' : '0%',
                opacity: isOpen ? 0.2 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#16161A] to-[#121214] border-r border-white/10 flex items-center justify-end pr-4 z-10"
            >
              <div className="space-y-2 opacity-30">
                <div className="w-12 h-1 bg-white/20 rounded" />
                <div className="w-8 h-1 bg-white/20 rounded" />
              </div>
            </motion.div>

            {/* Right Door Shutter */}
            <motion.div
              animate={{
                x: isOpen ? '100%' : '0%',
                opacity: isOpen ? 0.2 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#16161A] to-[#121214] border-l border-white/10 flex items-center justify-start pl-4 z-10"
            >
              <div className="space-y-2 opacity-30">
                <div className="w-12 h-1 bg-white/20 rounded" />
                <div className="w-8 h-1 bg-white/20 rounded" />
              </div>
            </motion.div>

            {/* Interior Studio Glimpse (Revealed upon opening or hovering) */}
            <div className="absolute inset-0 bg-[#09090C] flex flex-col items-center justify-center p-6 text-center z-0">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C4B5FD] mb-3 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Unlock className="w-6 h-6" />
              </div>
              <div className="font-display font-bold text-lg text-white uppercase">
                STUDIO CORE ACTIVE
              </div>
              <div className="text-xs font-mono-code text-[#A78BFA] mt-1">
                ACCESSING 3 FOUNDER LABS
              </div>
            </div>

            {/* Central Seal & Interaction Prompt */}
            {!isOpen && (
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                className="relative z-20 flex flex-col items-center gap-3 p-4 rounded-xl bg-[#1A1A20]/90 backdrop-blur-md border border-white/20 shadow-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center shadow-[0_0_15px_#8B5CF6]">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono-code font-bold text-white uppercase tracking-widest">
                  CLICK TO UNLOCK STUDIO
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-mono-code text-white/50 text-left">
              Explore our tripartite laboratory, founder disciplines, and project systems.
            </div>
            <button
              type="button"
              onClick={handleOpenDoor}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold text-xs font-mono-code uppercase tracking-wider hover:bg-[#F5F5F4] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer shrink-0"
            >
              <span>{isOpen ? 'ENTERING...' : 'ENTER AMIGOWORKS'}</span>
              <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
