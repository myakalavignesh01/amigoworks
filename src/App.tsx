import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudioDoorTransition } from './components/StudioDoorTransition';
import { DigitalStudio } from './components/DigitalStudio';
import { ThreeToOne } from './components/ThreeToOne';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { ArchitectureDeconstructor } from './components/ArchitectureDeconstructor';
import { Philosophy } from './components/Philosophy';
import { Process } from './components/Process';
import { Team } from './components/Team';
import { WhyUs } from './components/WhyUs';
import { ProjectInquiry } from './components/ProjectInquiry';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Project } from './types';
import { CustomCursor } from './components/CustomCursor';
import { ClientGuarantees } from './components/ClientGuarantees';

// Reusable scroll-triggered fade-in animation container
const sectionFadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SectionFadeIn: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      variants={sectionFadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [inquiryProjectType, setInquiryProjectType] = useState<string>('AI Product');
  const [inquiryDescription, setInquiryDescription] = useState<string>('');
  const [inquiryBudget, setInquiryBudget] = useState<string>('₹15K–₹50K');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('amigoworks_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch {
      // Ignore localStorage errors in sandboxed iframes
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('amigoworks_theme', next);
      } catch {
        // Ignore localStorage error
      }
      return next;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = (type?: string, description?: string, budget?: string) => {
    if (type) {
      setInquiryProjectType(type);
    }
    if (description !== undefined) {
      setInquiryDescription(description);
    }
    if (budget) {
      setInquiryBudget(budget);
    }
    scrollToSection('#contact');
  };

  const handleExploreWork = () => {
    scrollToSection('#work');
  };

  return (
    <div
      className={`min-h-screen bg-[#0A0A0A] text-[#F5F5F4] relative selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300 ${
        theme === 'light' ? 'theme-light' : ''
      }`}
    >
      {/* Precision Context-Aware Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar onOpenContact={() => handleStartProject()} />

      {/* Hero Section with 3D WebGL Three-to-One Interactive Symbol */}
      <Hero
        onStartProject={() => handleStartProject()}
        onExploreWork={handleExploreWork}
      />

      {/* Interactive Mechanical Studio Portal Transition */}
      <SectionFadeIn>
        <StudioDoorTransition
          onEnterStudio={() => {
            scrollToSection('#digital-studio');
          }}
        />
      </SectionFadeIn>

      {/* Digital Studio Workspace: 3 Zones with Interactive Spotlights & Core Convergence */}
      <SectionFadeIn>
        <DigitalStudio onStartProject={() => handleStartProject()} />
      </SectionFadeIn>

      {/* Signature Section: THREE -> ONE Convergence */}
      <SectionFadeIn>
        <ThreeToOne />
      </SectionFadeIn>

      {/* Selected Work Showcase with Interactive Project Schematics */}
      <SectionFadeIn>
        <Work onSelectProject={(project) => setSelectedCaseStudy(project)} />
      </SectionFadeIn>

      {/* 3-Minds AI Architecture Deconstructor & Blueprint Generator */}
      <SectionFadeIn>
        <ArchitectureDeconstructor
          onBuildWithUs={(projectType, briefText, budget) => {
            handleStartProject(projectType, briefText, budget);
          }}
        />
      </SectionFadeIn>

      {/* Services Section: WHAT WE BUILD with Live Interactive Simulations */}
      <SectionFadeIn>
        <Services onSelectService={(service) => handleStartProject(service)} />
      </SectionFadeIn>

      {/* Philosophy Section: WE DON'T JUST WRITE CODE */}
      <SectionFadeIn>
        <Philosophy />
      </SectionFadeIn>

      {/* Process: FROM IDEA TO REALITY */}
      <SectionFadeIn>
        <Process />
      </SectionFadeIn>

      {/* Team: THREE PEOPLE. ONE STUDIO. */}
      <SectionFadeIn>
        <Team />
      </SectionFadeIn>

      {/* Client Trust & Rapid Sprint Guarantees */}
      <SectionFadeIn>
        <ClientGuarantees
          onClaimGuarantee={(type, note) => {
            handleStartProject(type, note, '₹15K–₹50K');
          }}
        />
      </SectionFadeIn>

      {/* Why AMIGOWORKS: 5 Principles */}
      <SectionFadeIn>
        <WhyUs />
      </SectionFadeIn>

      {/* Project Inquiry Lead Generation Engine */}
      <SectionFadeIn>
        <ProjectInquiry
          initialProjectType={inquiryProjectType}
          initialDescription={inquiryDescription}
          initialBudget={inquiryBudget}
        />
      </SectionFadeIn>

      {/* Final Dramatic CTA */}
      <SectionFadeIn>
        <FinalCTA
          onStartProject={() => handleStartProject()}
          onExploreWork={handleExploreWork}
        />
      </SectionFadeIn>

      {/* Footer with Theme Toggle */}
      <Footer theme={theme} onToggleTheme={toggleTheme} />

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onStartSimilar={(title) => {
          setSelectedCaseStudy(null);
          handleStartProject(`Similar to ${title}`);
        }}
      />
    </div>
  );
}
