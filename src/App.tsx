import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeToOne } from './components/ThreeToOne';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { ArchitectureDeconstructor } from './components/ArchitectureDeconstructor';
import { InteractivePlayground } from './components/InteractivePlayground';
import { Philosophy } from './components/Philosophy';
import { Process } from './components/Process';
import { Team } from './components/Team';
import { WhyUs } from './components/WhyUs';
import { FAQ } from './components/FAQ';
import { ProjectInquiry } from './components/ProjectInquiry';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Project } from './types';
import { CursorTrail } from './components/CursorTrail';
import { ClientAuditEngine } from './components/ClientAuditEngine';
import { ClientGuarantees } from './components/ClientGuarantees';

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
      {/* Refined Low-Opacity Custom Tech Cursor Trail */}
      <CursorTrail />

      {/* Sticky Navigation */}
      <Navbar onOpenContact={() => handleStartProject()} />

      {/* Hero Section */}
      <Hero
        onStartProject={() => handleStartProject()}
        onExploreWork={handleExploreWork}
      />

      {/* Signature Section: THREE -> ONE */}
      <ThreeToOne />

      {/* Selected Work Showcase */}
      <Work onSelectProject={(project) => setSelectedCaseStudy(project)} />

      {/* VIRAL FEATURE: 3-Minds AI Architecture Deconstructor & Blueprint Generator */}
      <ArchitectureDeconstructor
        onBuildWithUs={(projectType, briefText, budget) => {
          handleStartProject(projectType, briefText, budget);
        }}
      />

      {/* Services Section: WHAT WE BUILD */}
      <Services onSelectService={(service) => handleStartProject(service)} />

      {/* Interactive System Simulators / Sandbox */}
      <InteractivePlayground />

      {/* NEW CLIENT ATTRACTION: Live Architecture & Performance Auditor Engine */}
      <ClientAuditEngine
        onFixWithUs={(projectType, briefText) => {
          handleStartProject(projectType, briefText, '₹15K–₹50K');
        }}
      />

      {/* Philosophy Section: WE DON'T JUST WRITE CODE */}
      <Philosophy />

      {/* Process: FROM IDEA TO REALITY */}
      <Process />

      {/* Team: THREE PEOPLE. ONE STUDIO. */}
      <Team />

      {/* NEW CLIENT ATTRACTION: Client Trust & Rapid Sprint Guarantees */}
      <ClientGuarantees
        onClaimGuarantee={(type, note) => {
          handleStartProject(type, note, '₹15K–₹50K');
        }}
      />

      {/* Why AMIGOWORKS: 5 Principles */}
      <WhyUs />

      {/* FAQ Accordion */}
      <FAQ onOpenContact={() => handleStartProject()} />

      {/* Project Inquiry Lead Generation */}
      <ProjectInquiry
        initialProjectType={inquiryProjectType}
        initialDescription={inquiryDescription}
        initialBudget={inquiryBudget}
      />

      {/* Final Dramatic CTA */}
      <FinalCTA
        onStartProject={() => handleStartProject()}
        onExploreWork={handleExploreWork}
      />

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
