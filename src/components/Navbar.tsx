import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, type Variants } from 'motion/react';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'STUDIO', href: '#digital-studio' },
    { name: 'WORK', href: '#work' },
    { name: 'DECONSTRUCTOR', href: '#deconstructor' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PROCESS', href: '#process' },
    { name: 'TEAM', href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleStartProject = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Motion Variants for Mobile Menu Dropdown
  const mobileDrawerVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.28,
        ease: [0.32, 0, 0.67, 0],
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.045,
        delayChildren: 0.06,
      },
    },
  };

  const mobileItemVariants: Variants = {
    closed: {
      opacity: 0,
      x: -12,
      transition: { duration: 0.15 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const mobileCtaVariants: Variants = {
    closed: {
      opacity: 0,
      y: 10,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'py-5 md:py-6 bg-[#0A0A0A]/40 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-white origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="nav-logo-link"
          className="group transition-transform duration-200 active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="AMIGOWORKS Homepage"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] font-semibold tracking-widest uppercase text-white/50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-[#8B5CF6] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            id="nav-cta-btn"
            onClick={handleStartProject}
            className="px-6 py-2.5 border border-white/20 text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] rounded-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>START A PROJECT</span>
            <span className="text-sm leading-none">↗</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle with Kinetic Icon Transition */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-white hover:text-[#8B5CF6] transition-colors relative overflow-hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileDrawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-[#0E0E0E]/95 backdrop-blur-xl border-b border-white/10 px-5 py-6 space-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  variants={mobileItemVariants}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all flex items-center justify-between border border-transparent hover:border-white/5"
                >
                  <span className="font-mono-code">{link.name}</span>
                  <span className="text-[#8B5CF6] text-[10px] font-mono-code font-bold">
                    0{idx + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div variants={mobileCtaVariants} className="pt-3 border-t border-white/10 space-y-3">
              <button
                id="mobile-menu-cta-btn"
                onClick={handleStartProject}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-[#E5E5E5] transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-between px-2 pt-1 text-[10px] text-white/40 font-mono-code">
                <span>AMIGOWORKS STUDIO</span>
                <span className="text-[#8B5CF6]">3 MINDS • 1 BUILD</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
