import React from 'react';
import { Sparkles, Terminal, Rocket, CheckCircle } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative border-y border-white/5 overflow-hidden">
      {/* Background Subtle Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Eyebrow / Pillar tag */}
        <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-8 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR CORE PHILOSOPHY</span>
        </div>

        {/* Primary Staggered Statement */}
        <div className="space-y-6 sm:space-y-8">
          <div className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white/20 tracking-tighter uppercase leading-tight line-through decoration-[#8B5CF6] decoration-4">
            WE DON'T JUST
            <br />
            WRITE CODE.
          </div>

          <div className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[88px] text-white tracking-tighter uppercase leading-none">
            WE BUILD
            <br />
            <span className="text-[#8B5CF6]">
              PRODUCTS.
            </span>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="mt-10 text-base sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
          From first idea to deployed product, AMIGOWORKS combines <span className="text-white font-medium">product thinking</span>, <span className="text-white font-medium">design</span> and <span className="text-white font-medium">engineering</span> to turn concepts into usable digital experiences.
        </p>

        {/* The 3-Pillar Fusion Ribbon */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/5 text-left">
          <div className="p-5 rounded-sm bg-[#111111]/60 border border-white/5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#8B5CF6] font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>01 — PRODUCT THINKING</span>
            </div>
            <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
              We question assumptions to build only what provides direct value.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#111111]/60 border border-white/5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#8B5CF6] font-semibold">
              <Terminal className="w-4 h-4" />
              <span>02 — TECHNICAL RIGOR</span>
            </div>
            <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
              Clean, modular architectures designed to run without downtime.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#111111]/60 border border-white/5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#8B5CF6] font-semibold">
              <Rocket className="w-4 h-4" />
              <span>03 — DEPLOYMENT FOCUS</span>
            </div>
            <p className="mt-2 text-xs text-white/60 leading-relaxed font-light">
              Working software in users' hands quickly, ready to scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
