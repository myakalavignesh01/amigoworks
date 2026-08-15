import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { playConvergenceChime, playTactileClick } from '../utils/audio';

interface InteractiveHeroObjectProps {
  onExploreWork?: () => void;
}

export const InteractiveHeroObject: React.FC<InteractiveHeroObjectProps> = ({ onExploreWork }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationState, setTransformationState] = useState<'idle' | 'three' | 'converge' | 'one'>('idle');
  const [webGLFailed, setWebGLFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pointer tracking for smooth 3D tilt
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let frameId: number;
    let group: THREE.Group;

    // Three node meshes representing the 3 minds / pillars
    let nodeA: THREE.Mesh;
    let nodeB: THREE.Mesh;
    let nodeC: THREE.Mesh;
    let coreNexus: THREE.Mesh;
    let ringOuter: THREE.LineSegments;

    try {
      const container = mountRef.current;
      const width = container.clientWidth || 380;
      const height = container.clientHeight || 380;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 7;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      group = new THREE.Group();
      scene.add(group);

      // Materials
      const primaryMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x8B5CF6,
        emissive: 0x4C1D95,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.9,
        wireframe: false,
      });

      const titaniumMaterial = new THREE.MeshStandardMaterial({
        color: 0xEEEEEE,
        metalness: 0.9,
        roughness: 0.3,
      });

      const coreMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xC4B5FD,
        emissive: 0x8B5CF6,
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.1,
      });

      // 3 Angular Prisms / Chevron Shards forming the tripartite AMIGOWORKS symbol
      const prismGeo = new THREE.CylinderGeometry(0.3, 0.7, 1.8, 3);
      
      nodeA = new THREE.Mesh(prismGeo, primaryMaterial);
      nodeA.position.set(-1.1, 0.6, 0);
      nodeA.rotation.z = Math.PI / 6;

      nodeB = new THREE.Mesh(prismGeo, titaniumMaterial);
      nodeB.position.set(1.1, 0.6, 0);
      nodeB.rotation.z = -Math.PI / 6;

      nodeC = new THREE.Mesh(prismGeo, primaryMaterial);
      nodeC.position.set(0, -1.2, 0);
      nodeC.rotation.z = Math.PI;

      // Central core nexus
      const coreGeo = new THREE.OctahedronGeometry(0.55, 0);
      coreNexus = new THREE.Mesh(coreGeo, coreMaterial);
      coreNexus.position.set(0, 0, 0);

      // Surrounding precision orbital wireframe
      const ringGeo = new THREE.RingGeometry(2.2, 2.22, 48);
      const ringEdges = new THREE.EdgesGeometry(ringGeo);
      ringOuter = new THREE.LineSegments(
        ringEdges,
        new THREE.LineBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.3 })
      );
      ringOuter.rotation.x = Math.PI / 2.5;

      group.add(nodeA, nodeB, nodeC, coreNexus, ringOuter);

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const pointLightViolet = new THREE.PointLight(0x8B5CF6, 3, 10);
      pointLightViolet.position.set(2, 3, 4);
      scene.add(pointLightViolet);

      const pointLightWhite = new THREE.PointLight(0xffffff, 2, 10);
      pointLightWhite.position.set(-3, -2, 3);
      scene.add(pointLightWhite);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation damping toward pointer
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.06;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.06;

        group.rotation.x = currentRotation.current.x + Math.sin(elapsedTime * 0.5) * 0.05;
        group.rotation.y = currentRotation.current.y + Math.cos(elapsedTime * 0.5) * 0.05;

        // Subtle core breathing
        coreNexus.rotation.y += 0.01;
        coreNexus.rotation.x += 0.005;

        ringOuter.rotation.z += 0.003;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn('WebGL Initialization fallback to CSS/SVG:', err);
      setWebGLFailed(true);
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    targetRotation.current.y = x * 0.8;
    targetRotation.current.x = -y * 0.8;
  };

  const handlePointerLeave = () => {
    targetRotation.current.x = 0;
    targetRotation.current.y = 0;
    setIsHovered(false);
  };

  const handleTriggerTransformation = () => {
    if (isTransforming) return;
    setIsTransforming(true);
    playTactileClick();

    // Step 1: Separation into THREE
    setTransformationState('three');

    setTimeout(() => {
      // Step 2: Converge inward
      setTransformationState('converge');
      playConvergenceChime();
    }, 700);

    setTimeout(() => {
      // Step 3: Fusion into ONE
      setTransformationState('one');
    }, 1400);

    setTimeout(() => {
      // Return to calm idle state
      setTransformationState('idle');
      setIsTransforming(false);
    }, 2800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 3D Interactive Canvas Container */}
      <div
        className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center cursor-pointer group"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerEnter={() => setIsHovered(true)}
        onClick={handleTriggerTransformation}
        data-cursor="ACTIVATE"
        title="Click to trigger THREE → ONE convergence"
      >
        {/* Violet Ambient Aura */}
        <div
          className={`absolute inset-4 rounded-full bg-[#8B5CF6]/15 blur-3xl pointer-events-none transition-all duration-700 ${
            isHovered || isTransforming ? 'scale-125 opacity-100 bg-[#8B5CF6]/30' : 'opacity-40'
          }`}
        />

        {/* Three.js Canvas Mount */}
        {!webGLFailed && (
          <div ref={mountRef} className="w-full h-full relative z-10 flex items-center justify-center" />
        )}

        {/* CSS/SVG Robust Fallback & Overlay Hybrid */}
        {(webGLFailed || isTransforming) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: transformationState === 'three' ? 1.25 : transformationState === 'converge' ? 0.85 : 1,
                rotate: transformationState === 'three' ? 15 : transformationState === 'converge' ? -15 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Pillar 1: Vignesh (AI / Top Left) */}
              <motion.div
                animate={{
                  x: transformationState === 'three' ? -40 : transformationState === 'converge' ? -5 : 0,
                  y: transformationState === 'three' ? -35 : transformationState === 'converge' ? -5 : 0,
                  opacity: transformationState === 'three' ? 1 : 0.9,
                }}
                transition={{ duration: 0.4 }}
                className="absolute w-12 h-20 border-2 border-[#8B5CF6] bg-[#8B5CF6]/20 rounded-md rotate-[-30deg] shadow-[0_0_20px_#8B5CF6]"
              />

              {/* Pillar 2: Sai Kiran (Engineering / Top Right) */}
              <motion.div
                animate={{
                  x: transformationState === 'three' ? 40 : transformationState === 'converge' ? 5 : 0,
                  y: transformationState === 'three' ? -35 : transformationState === 'converge' ? -5 : 0,
                  opacity: transformationState === 'three' ? 1 : 0.9,
                }}
                transition={{ duration: 0.4 }}
                className="absolute w-12 h-20 border-2 border-white bg-white/20 rounded-md rotate-[30deg] shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              />

              {/* Pillar 3: Nuthan Sai (Frontend / Bottom Center) */}
              <motion.div
                animate={{
                  y: transformationState === 'three' ? 45 : transformationState === 'converge' ? 5 : 0,
                  opacity: transformationState === 'three' ? 1 : 0.9,
                }}
                transition={{ duration: 0.4 }}
                className="absolute w-12 h-20 border-2 border-[#A78BFA] bg-[#A78BFA]/20 rounded-md rotate-[180deg] shadow-[0_0_20px_#A78BFA]"
              />

              {/* Central Core */}
              <motion.div
                animate={{
                  scale: transformationState === 'one' ? 1.4 : 1,
                  boxShadow: transformationState === 'one' ? '0 0 35px #8B5CF6' : '0 0 10px #8B5CF6',
                }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-white via-[#8B5CF6] to-[#4C1D95] border border-white/60 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Physical Ring Reticle Indicator */}
        <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/5 border-dashed pointer-events-none group-hover:border-[#8B5CF6]/30 transition-colors duration-500" />
      </div>

      {/* Tactile Status & Micro-copy Display */}
      <div className="mt-2 text-center h-12 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {transformationState !== 'idle' ? (
            <motion.div
              key={transformationState}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-[0.25em] text-[#8B5CF6]">
                {transformationState === 'three' && '01 • THREE MINDS'}
                {transformationState === 'converge' && '02 • CONVERGENCE'}
                {transformationState === 'one' && '03 • ONE BUILD'}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
                THREE MINDS. ONE BUILD.
              </span>
            </motion.div>
          ) : (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleTriggerTransformation}
              className="group/btn inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-white/10 hover:border-[#8B5CF6]/50 text-white/50 hover:text-white transition-all text-[10px] font-mono-code uppercase tracking-widest cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover/btn:animate-ping" />
              <span>TAP OBJECT TO CONVERGE</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
