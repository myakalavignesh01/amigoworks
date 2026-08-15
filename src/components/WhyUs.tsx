import React from 'react';
import { PRINCIPLES } from '../data';
import { ShieldCheck } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE AMIGOWORKS STANDARD</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              WHY WORK
              <br />
              <span className="text-[#8B5CF6]">WITH US?</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-white/60 max-w-md font-light">
            No agency bloat, no layers of middle management. You get direct access to dedicated technical builders.
          </p>
        </div>

        {/* 5 Concise Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={principle.number}
              id={`principle-card-${principle.number}`}
              className={`p-8 rounded-2xl border border-white/10 bg-[#0E0E0E] hover:border-[#8B5CF6]/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
                index === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono-code font-bold px-2.5 py-1 rounded-sm bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30 uppercase tracking-widest">
                    PRINCIPLE {principle.number}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
                  {principle.title}
                </h3>

                <p className="mt-4 text-sm text-white/60 leading-relaxed font-light">
                  {principle.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
                <span>STANDARDS / 0{index + 1}</span>
                <span className="text-[#8B5CF6] font-semibold">GUARANTEED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
