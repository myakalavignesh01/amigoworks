import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'pointer' | 'interactive' | 'view';
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch / mobile devices and prefers-reduced-motion
    if (typeof window === 'undefined') return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor]');
        if (interactiveEl) {
          setIsPointer(true);
          const customLabel = interactiveEl.getAttribute('data-cursor') || '';
          setCursorText(customLabel);
        } else {
          setIsPointer(false);
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Halo / Follower */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: cursorText ? 72 : isPointer ? 44 : 28,
          height: cursorText ? 72 : isPointer ? 44 : 28,
          opacity: 1,
          borderColor: isPointer ? '#8B5CF6' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isPointer ? 'rgba(139, 92, 246, 0.18)' : 'rgba(255, 255, 255, 0.03)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono-code font-bold uppercase tracking-widest text-[#E5E7EB] text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_#8B5CF6]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
          opacity: cursorText ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
};
