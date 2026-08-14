import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowUp, Github, Linkedin, Instagram, Moon, Sun, Mail, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';

const FOUNDER_EMAIL = 'myakalavignesh01@gmail.com';

interface FooterProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme = 'dark',
  onToggleTheme,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_EMAIL).catch(() => {});
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const isLight = theme === 'light';

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'SERVICES', href: '#services' },
    { name: 'ABOUT', href: '#three-to-one' },
    { name: 'PROCESS', href: '#process' },
    { name: 'CONTACT (EMAIL)', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 text-white/50 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B5CF6] font-semibold">
              THREE MINDS. ONE BUILD.
            </p>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed font-light">
              We build AI products, web experiences, automation systems, dashboards, and digital solutions.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14121E] border border-[#8B5CF6]/30 text-[11px] font-mono-code text-[#C4B5FD]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>COMMUNICATION: 100% EMAIL DIRECT</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-bold text-white uppercase tracking-widest">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Email Channel */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>OFFICIAL EMAIL CHANNEL</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              All project proposals, specifications, and founder updates are conducted strictly via email.
            </p>

            {/* Email Action Bar */}
            <div className="p-3 rounded-lg bg-[#121216] border border-white/10 space-y-2 font-mono-code">
              <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                FOUNDER DESK
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent('[AMIGOWORKS Inquiry] New Project Brief')}`}
                  className="text-xs text-white font-bold hover:text-[#C4B5FD] transition-colors truncate underline decoration-[#8B5CF6]/50"
                  title="Open mailto draft"
                >
                  {FOUNDER_EMAIL}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-white/70 hover:text-white flex items-center gap-1 border border-white/5 shrink-0 transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#8B5CF6]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="#contact"
                aria-label="GitHub placeholder"
                title="GitHub (AMIGOWORKS)"
                className="w-8 h-8 rounded-sm bg-[#141414] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#8B5CF6] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                aria-label="LinkedIn placeholder"
                title="LinkedIn (AMIGOWORKS)"
                className="w-8 h-8 rounded-sm bg-[#141414] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#8B5CF6] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                aria-label="Instagram placeholder"
                title="Instagram (AMIGOWORKS)"
                className="w-8 h-8 rounded-sm bg-[#141414] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#8B5CF6] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright, Subtle Theme Toggle & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40 font-light">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span>© 2026 AMIGOWORKS. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code">
              VIGNESH • SAI KIRAN • NUTHAN SAI
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Subtle Theme Toggle Button */}
            {onToggleTheme && (
              <div className="flex items-center gap-2">
                <button
                  id="theme-toggle-btn"
                  onClick={onToggleTheme}
                  aria-label={`Switch to ${isLight ? 'Elegant Dark' : 'Minimal Light'} theme`}
                  title={`Switch to ${isLight ? 'Elegant Dark' : 'Minimal Light'} theme`}
                  className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-white/10 hover:border-[#8B5CF6]/50 text-white/70 hover:text-white transition-all shadow-sm"
                >
                  <span className="text-[10px] uppercase tracking-wider font-mono-code flex items-center gap-1.5">
                    {isLight ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-zinc-800 font-semibold">MINIMAL LIGHT</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span className="text-white/80">ELEGANT DARK</span>
                      </>
                    )}
                  </span>
                  
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:scale-125 transition-transform" />
                </button>
              </div>
            )}

            <button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/5"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
