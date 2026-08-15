import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';
import { playTactileClick } from '../utils/audio';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.25,
  className = '',
  variant = 'primary',
  cursorLabel,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouch(touch || reducedMotion);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playTactileClick();
    if (onClick) onClick(e);
  };

  const baseVariantStyles = {
    primary:
      'bg-white text-black hover:bg-[#F5F5F4] border border-white shadow-[0_0_25px_rgba(255,255,255,0.18)] font-bold text-xs uppercase tracking-wider',
    secondary:
      'bg-[#121212] text-white hover:bg-[#1A1A1A] border border-white/20 hover:border-white/40 font-bold text-xs uppercase tracking-wider',
    outline:
      'bg-transparent text-white/80 hover:text-white border border-white/20 hover:border-[#8B5CF6]/60 font-semibold text-xs uppercase tracking-wider',
    ghost:
      'bg-transparent text-white/70 hover:text-white hover:bg-white/5 font-semibold text-xs uppercase tracking-wider',
  };

  return (
    <motion.button
      ref={buttonRef}
      style={isTouch ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      data-cursor={cursorLabel}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm transition-colors cursor-pointer select-none ${baseVariantStyles[variant]} ${className}`}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
};
