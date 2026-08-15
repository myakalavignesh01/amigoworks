import React, { useState } from 'react';
import { FOUNDERS } from '../data';
import { Users, Cpu, Terminal, Palette, Quote, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Team: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors((prev) => ({ ...prev, [name]: true }));
  };

  const getFounderVisual = (index: number, name: string, imageSrc?: string, titleBadge?: string) => {
    const icons = [Cpu, Terminal, Palette];
    const Icon = icons[index];
    const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD'];
    const isImageFailed = !imageSrc || imageErrors[name];
    const isPrimaryFounder = index === 0 || titleBadge === 'FOUNDER';

    return (
      <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#121216] border border-white/10 group-hover:border-[#8B5CF6]/60 transition-all duration-500 flex items-center justify-center">
        {/* Subtle Ambient Backlight */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none blur-2xl"
          style={{ backgroundColor: colors[index] }}
        />

        {/* AI Portrait Image */}
        {!isImageFailed ? (
          <div className="relative w-full h-full">
            <img
              src={imageSrc}
              alt={`${name} - ${titleBadge || 'Amigoworks Builder'}`}
              referrerPolicy="no-referrer"
              onError={() => handleImageError(name)}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.08] group-hover:brightness-100"
            />
            {/* Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-black/25 pointer-events-none" />
          </div>
        ) : (
          /* Geometric Fallback Monogram */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#181820] to-[#0E0E12]">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-xl border border-white/10"
              style={{ backgroundColor: `${colors[index]}20`, color: colors[index] }}
            >
              <Icon className="w-10 h-10" />
            </div>
            <div className="text-xs font-mono-code text-white/50 uppercase tracking-widest">
              {titleBadge || `BUILDER 0${index + 1}`}
            </div>
          </div>
        )}

        {/* Floating Title / Founder Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider backdrop-blur-md border shadow-lg ${
              isPrimaryFounder
                ? 'bg-[#8B5CF6]/90 text-white border-white/30 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                : 'bg-black/70 text-[#C4B5FD] border-white/15'
            }`}
          >
            {isPrimaryFounder ? (
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            ) : (
              <ShieldCheck className="w-3 h-3 text-[#A78BFA]" />
            )}
            <span>{titleBadge || (index === 0 ? 'FOUNDER' : 'CO-FOUNDER')}</span>
          </div>
        </div>

        {/* Index Watermark */}
        <div className="absolute top-3.5 right-3.5 z-10 font-mono-code text-[11px] font-bold text-white/40 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
          0{index + 1}
        </div>
      </div>
    );
  };

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2 font-mono-code">
              <Users className="w-3.5 h-3.5" />
              <span>THE LEADERSHIP & BUILDERS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              ONE FOUNDER.
              <br />
              <span className="text-[#8B5CF6]">CO-FOUNDER CORE.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-white/60 max-w-md font-light">
            Founded by Vignesh with specialized co-founders across backend infrastructure and frontend craft. Direct engineering execution with zero intermediaries.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOUNDERS.map((founder, index) => {
            const isPrimary = index === 0 || founder.titleBadge === 'FOUNDER';

            return (
              <motion.div
                key={founder.name}
                id={`team-member-${founder.name.toLowerCase().replace(/\s+/g, '-')}`}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.85)] ${
                  isPrimary
                    ? 'bg-gradient-to-b from-[#13101E] to-[#0E0E12] border-[#8B5CF6]/50 shadow-[0_0_35px_rgba(139,92,246,0.15)]'
                    : 'bg-[#0E0E11] border-white/10 hover:border-white/20'
                }`}
                data-cursor="EXPAND"
              >
                <div>
                  {/* Visual Portrait with AI Image & Badges */}
                  {getFounderVisual(index, founder.name, founder.image, founder.titleBadge)}

                  {/* Role & Name */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#8B5CF6]">
                        {founder.role}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
                      {founder.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-white/70 leading-relaxed font-light">
                    {founder.description}
                  </p>

                  {/* Specialization Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {founder.specialization.map((spec) => (
                      <span
                        key={spec}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono-code transition-colors ${
                          isPrimary
                            ? 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD]'
                            : 'bg-white/5 border border-white/5 text-[#E5E7EB]'
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Philosophy Quote */}
                  <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-[#C4B5FD] italic flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5 not-italic" />
                    <span className="leading-relaxed">"{founder.philosophy}"</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold mb-2">
                    CORE PROFICIENCIES:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono-code text-[#A78BFA]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
