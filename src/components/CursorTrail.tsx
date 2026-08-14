import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is on a touch device
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      setIsEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and motion tracking
    const mouse = {
      x: -100,
      y: -100,
      targetX: -100,
      targetY: -100,
      lastX: -100,
      lastY: -100,
      speed: 0,
      isHovering: false,
      isDown: false,
      isVisible: false,
      lastMoveTime: performance.now(),
    };

    // Trailing points for fluid spline ribbon
    const TRAIL_LENGTH = 16;
    const trailPoints: Point[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailPoints.push({
        x: -100,
        y: -100,
        vx: 0,
        vy: 0,
        radius: Math.max(1.5, 4 - (i / TRAIL_LENGTH) * 3),
        alpha: Math.max(0.04, 0.35 - (i / TRAIL_LENGTH) * 0.3),
        color: i % 2 === 0 ? '#8B5CF6' : '#C4B5FD',
      });
    }

    // Sparkle micro-particles on dynamic movement
    const particles: Particle[] = [];
    const ripples: Ripple[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isVisible = true;

      const now = performance.now();
      const dt = Math.max(1, now - mouse.lastMoveTime);
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy) / dt;

      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.lastMoveTime = now;

      // Spawn subtle velocity sparkles when moving quickly
      if (mouse.speed > 0.8 && particles.length < 24) {
        const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 0.8;
        const pSpeed = Math.random() * 1.5 + 0.5;
        const palette = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#10B981'];
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * pSpeed,
          vy: Math.sin(angle) * pSpeed,
          size: Math.random() * 2 + 1,
          alpha: 0.45,
          maxAlpha: 0.45,
          decay: Math.random() * 0.025 + 0.015,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [tabindex="0"], .group, summary, [data-interactive="true"]'
        );
        mouse.isHovering = !!interactive;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouse.isDown = true;
      // Add subtle ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: mouse.isHovering ? 45 : 32,
        alpha: 0.4,
        color: '#8B5CF6',
      });
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    const handleMouseLeave = () => {
      mouse.isVisible = false;
    };

    const handleMouseEnter = () => {
      mouse.isVisible = true;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Initial position setup
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
    mouse.targetX = mouse.x;
    mouse.targetY = mouse.y;

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for primary mouse position
      const ease = 0.35;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      // Update trail points with spring/follow delay
      let prevX = mouse.x;
      let prevY = mouse.y;

      for (let i = 0; i < trailPoints.length; i++) {
        const pt = trailPoints[i];
        const factor = 0.42 - (i / trailPoints.length) * 0.12;

        pt.x += (prevX - pt.x) * factor;
        pt.y += (prevY - pt.y) * factor;

        prevX = pt.x;
        prevY = pt.y;
      }

      // Draw subtle glow trail ribbon if visible
      if (mouse.isVisible && trailPoints.length > 2) {
        ctx.save();

        // 1. Draw glowing connecting ribbon with low opacity
        ctx.beginPath();
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);

        for (let i = 1; i < trailPoints.length - 1; i++) {
          const xc = (trailPoints[i].x + trailPoints[i + 1].x) / 2;
          const yc = (trailPoints[i].y + trailPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(trailPoints[i].x, trailPoints[i].y, xc, yc);
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = mouse.isHovering ? 2.8 : 1.8;

        const gradient = ctx.createLinearGradient(
          trailPoints[0].x,
          trailPoints[0].y,
          trailPoints[trailPoints.length - 1].x,
          trailPoints[trailPoints.length - 1].y
        );
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.28)');
        gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.18)');
        gradient.addColorStop(1, 'rgba(196, 181, 253, 0.01)');

        ctx.strokeStyle = gradient;
        ctx.stroke();

        // 2. Draw subtle trailing nodes
        for (let i = 0; i < trailPoints.length; i++) {
          const pt = trailPoints[i];
          const radius = pt.radius * (mouse.isHovering ? 1.3 : 1);
          const alpha = pt.alpha * (mouse.isHovering ? 1.2 : 0.85);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = i === 0 ? `rgba(196, 181, 253, ${alpha + 0.15})` : `rgba(139, 92, 246, ${alpha})`;
          ctx.fill();
        }

        // 3. Draw ambient glow halo around main cursor
        const haloRadius = mouse.isHovering ? 28 : mouse.isDown ? 14 : 18;
        const haloGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          1,
          mouse.x,
          mouse.y,
          haloRadius
        );
        haloGradient.addColorStop(0, mouse.isHovering ? 'rgba(139, 92, 246, 0.18)' : 'rgba(139, 92, 246, 0.1)');
        haloGradient.addColorStop(0.6, 'rgba(124, 58, 237, 0.04)');
        haloGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGradient;
        ctx.fill();

        // 4. Draw cursor target reticle / accent ring when hovering
        if (mouse.isHovering) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(196, 181, 253, 0.35)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore();
      }

      // Draw and update micro-particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255)
          .toString(16)
          .padStart(2, '0')}`;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // Draw and update click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.18;
        r.alpha *= 0.88;

        if (r.alpha < 0.02 || r.radius >= r.maxRadius - 1) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      id="custom-cursor-trail-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] select-none"
      style={{ willChange: 'transform' }}
    />
  );
};
