import React from 'react';
import { LogoSymbol } from './Logo';
import { ArrowDown } from 'lucide-react';

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
      {/* Background Large Subtle Symbol Monogram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none scale-150 sm:scale-175">
        <LogoSymbol size="w-96 h-96" />
      </div>

      {/* Ambiance Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4">
          DEPLOY WITH VELOCITY
        </div>

        <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-none">
          GOT AN IDEA?
          <br />
          <span className="text-[#8B5CF6]">
            LET'S BUILD IT.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl mx-auto font-light leading-relaxed">
          We bring high-craft product thinking, backend engineering, and intuitive interfaces to your next venture.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-start-btn"
            onClick={onStartProject}
            className="w-full sm:w-auto bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 rounded-sm hover:bg-[#F5F5F4] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>START A PROJECT</span>
            <span className="text-base font-bold">↗</span>
          </button>

          <button
            id="final-cta-explore-btn"
            onClick={onExploreWork}
            className="w-full sm:w-auto border border-white/20 hover:border-white/40 px-7 py-4 text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white hover:bg-white/5 rounded-sm transition-all flex items-center justify-center gap-2"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowDown className="w-4 h-4 text-[#8B5CF6]" />
          </button>
        </div>
      </div>
    </section>
  );
};
