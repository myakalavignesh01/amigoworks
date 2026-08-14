import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Check,
  Flame,
  Clock,
  Code2,
  Lock,
  Headphones,
  Sparkles,
  ArrowRight,
  Mail,
  Zap,
  Star
} from 'lucide-react';

interface ClientGuaranteesProps {
  onClaimGuarantee: (type: string, note: string) => void;
}

export const ClientGuarantees: React.FC<ClientGuaranteesProps> = ({ onClaimGuarantee }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const guarantees = [
    {
      badge: 'SPEED & TIMELINE',
      title: '7–14 Day Rapid Production Sprint',
      desc: 'No endless agency retainers or 6-month bloated timelines. We ship complete, responsive, full-stack software and AI products in days.',
      icon: Clock,
      highlight: 'Delivery in days, not quarters',
      deliverables: [
        'Live production preview deployment within 72 hours',
        'Daily git commits and direct founders email update thread',
        'Zero meeting overhead — fast async reviews'
      ]
    },
    {
      badge: 'CODE QUALITY',
      title: '100% Full IP & Clean Code Ownership',
      desc: 'You receive complete source code ownership, clean modular TypeScript architecture, and no proprietary vendor lock-in.',
      icon: Code2,
      highlight: 'Your codebase, 100% your asset',
      deliverables: [
        'Strict zero-slop TypeScript, Vite & Tailwind standards',
        'Production CI/CD deployment scripts and Dockerfile/Cloud Run readiness',
        'Detailed architectural README & environment runbook'
      ]
    },
    {
      badge: 'REVISION & SATISFACTION',
      title: 'Flawless Launch Guarantee',
      desc: 'We do not hand over half-baked prototypes. We test rigorously across all devices and resolutions until you are 100% satisfied.',
      icon: ShieldCheck,
      highlight: 'Zero bugs policy on launch day',
      deliverables: [
        'Mobile, tablet, and desktop responsive validation across 12 viewport break points',
        '30 days of post-launch bug warranty included at zero extra cost',
        'AI prompt security audit & rate-limiting protection'
      ]
    },
    {
      badge: 'DIRECT FOUNDERS',
      title: '3 Senior Minds, No Account Managers',
      desc: 'You work directly with Vignesh, Sai Kiran, and Nuthan Sai. Zero bureaucracy, zero juniors, and zero lost-in-translation handoffs.',
      icon: Sparkles,
      highlight: '100% founder-built execution',
      deliverables: [
        'Direct technical review from Full-Stack, AI, and Systems architects',
        'Guaranteed reply within 24 hours on all email briefs',
        'High-velocity async decision turnaround'
      ]
    }
  ];

  return (
    <section id="guarantees" className="py-24 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden">
      {/* Background Accent */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLIENT ASSURANCE &amp; TRUST PLEDGE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            WHY FOUNDERS &amp; CLIENTS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C4B5FD] to-[#8B5CF6]">
              CHOOSE AMIGOWORKS
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light">
            We operate with radical transparency, relentless engineering standards, and an unwavering commitment to your product's success.
          </p>
        </div>

        {/* Guarantees Interactive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeTab === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#151224] border-[#8B5CF6] shadow-[0_0_30px_rgba(139,92,246,0.2)]'
                    : 'bg-[#101014] border-white/10 hover:border-white/20 hover:bg-[#141418]'
                }`}
              >
                {/* Top Glowing Edge on Selected */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4B5FD] to-transparent" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#C4B5FD] font-bold">
                      {item.badge}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#8B5CF6] text-white' : 'bg-white/5 text-white/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 space-y-2">
                  <div className="text-[10px] font-mono-code text-[#C4B5FD] font-semibold flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-[#8B5CF6]" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Guarantee Deep-Dive Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#161226] via-[#111116] to-black border border-[#8B5CF6]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] text-[10px] font-mono-code uppercase tracking-wider font-bold">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>ACTIVE PLEDGE: {guarantees[activeTab].title}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {guarantees[activeTab].deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono-code text-white/80">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onClaimGuarantee(
                'Full-Stack Sprint Inquiry',
                `Inquiring under AMIGOWORKS Guarantee: "${guarantees[activeTab].title}". Please review our project idea and timeline requirements.`
              )
            }
            className="px-6 py-4 rounded-xl bg-white hover:bg-[#E5E5E5] text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#8B5CF6]" />
            <span>START YOUR SPRINT WITH THIS GUARANTEE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
