import React from 'react';
import { FOUNDERS } from '../data';
import { Users, Cpu, Terminal, Palette, Quote } from 'lucide-react';

export const Team: React.FC = () => {
  const getFounderVisual = (index: number, name: string) => {
    // Custom geometric monogram visual for each founder
    const icons = [Cpu, Terminal, Palette];
    const Icon = icons[index];
    const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD'];

    return (
      <div className="relative w-full h-44 sm:h-52 bg-[#141414] border border-white/10 rounded-xl flex flex-col items-center justify-center p-6 overflow-hidden group-hover:border-[#8B5CF6]/50 transition-colors">
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: colors[index] }}
        />

        {/* Geometric Identity Emblem */}
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center mb-3 shadow-lg border border-white/10"
          style={{ backgroundColor: `${colors[index]}15`, color: colors[index] }}
        >
          <Icon className="w-8 h-8" />
        </div>

        <div className="text-[10px] uppercase tracking-widest text-white/40">
          FOUNDER 0{index + 1}
        </div>
        <div className="font-display font-black text-xl text-white tracking-wider mt-0.5">
          {name}
        </div>
      </div>
    );
  };

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              <span>THE BUILDERS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              THREE PEOPLE.
              <br />
              <span className="text-[#8B5CF6]">ONE STUDIO.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-white/60 max-w-md font-light">
            Three friends united by high craft, technical curiosity, and an obsession with shipping products that work.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOUNDERS.map((founder, index) => (
            <div
              key={founder.name}
              id={`team-member-${founder.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group bg-[#0E0E0E] border border-white/10 hover:border-[#8B5CF6]/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* Visual Avatar Monogram */}
                {getFounderVisual(index, founder.name)}

                {/* Role */}
                <div className="mt-6">
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#8B5CF6]">
                    {founder.role}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mt-1">
                    {founder.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">
                  {founder.description}
                </p>

                {/* Specialization Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {founder.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/5 text-[11px] font-mono-code text-[#E5E7EB]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Philosophy Quote */}
                <div className="mt-6 p-4 rounded-sm bg-[#141414] border border-white/5 text-xs text-[#C4B5FD] italic flex items-start gap-2">
                  <Quote className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5 not-italic" />
                  <span>"{founder.philosophy}"</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  PRIMARY FOCUS:
                </div>
                <div className="flex flex-wrap gap-1">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-sm bg-white/5 text-[10px] font-mono-code text-[#A78BFA]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
