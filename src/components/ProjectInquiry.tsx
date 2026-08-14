import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import {
  Send,
  Check,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Radio,
  Clock,
  Layers,
  Hash,
  Copy,
  CheckCheck,
  Mail,
  ExternalLink,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

const FOUNDER_EMAIL = 'myakalavignesh01@gmail.com';

interface ProjectInquiryProps {
  initialProjectType?: string;
  initialDescription?: string;
  initialBudget?: string;
}

export const ProjectInquiry: React.FC<ProjectInquiryProps> = ({
  initialProjectType,
  initialDescription,
  initialBudget,
}) => {
  const projectTypes = [
    'Website',
    'AI Product',
    'Web Application',
    'Automation',
    'Dashboard',
    'MVP',
    'Other',
  ];

  const budgetOptions = [
    '₹5K–₹15K',
    '₹15K–₹50K',
    '₹50K–₹1L',
    '₹1L+',
  ];

  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    projectType: initialProjectType || 'AI Product',
    budget: initialBudget || '₹15K–₹50K',
    description: initialDescription || '',
    timeline: 'Within 2-4 weeks',
  });

  // Sync props when user triggers build CTA from deconstructor or estimator
  React.useEffect(() => {
    if (initialProjectType || initialDescription || initialBudget) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialProjectType || prev.projectType,
        description: initialDescription !== undefined ? initialDescription : prev.description,
        budget: initialBudget || prev.budget,
      }));
    }
  }, [initialProjectType, initialDescription, initialBudget]);

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedEmailText, setCopiedEmailText] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>('');
  const [dispatchStatus, setDispatchStatus] = useState<'delivering' | 'delivered' | 'local_fallback'>('delivering');

  const validateForm = () => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'Please describe your project idea with details (minimum 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateEmailSubject = (id: string) => {
    return `[AMIGOWORKS Inquiry ${id}] ${formData.projectType} — ${formData.name} (${formData.company || 'Direct Founder Brief'})`;
  };

  const generateEmailBody = (id: string) => {
    return `Hi AmigoWorks Team (Vignesh, Sai Kiran, Nuthan Sai),

I am reaching out with our project requirements for AMIGOWORKS. All our project details are specified below:

========================================
PROJECT SPECIFICATION & INQUIRY BRIEF
========================================
• Reference ID: ${id}
• Client Name: ${formData.name}
• Client Email: ${formData.email}
• Company / Organization: ${formData.company || 'Not Specified'}
• Project Category: ${formData.projectType}
• Budget Bracket: ${formData.budget}
• Target Delivery Timeline: ${formData.timeline}

----------------------------------------
FULL PROJECT DESCRIPTION & REQUIREMENTS:
----------------------------------------
${formData.description}

----------------------------------------
COMMUNICATION PROTOCOL:
• We understand AMIGOWORKS operates exclusively via email.
• Please review our details and reply directly to this email thread with your feasibility assessment, architecture proposal, and next steps.

Best regards,
${formData.name}
${formData.email}
`;
  };

  const openEmailClient = (id: string) => {
    const subject = encodeURIComponent(generateEmailSubject(id));
    const body = encodeURIComponent(generateEmailBody(id));
    const mailtoUrl = `mailto:${FOUNDER_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const openGmailWeb = (id: string) => {
    const subject = encodeURIComponent(generateEmailSubject(id));
    const body = encodeURIComponent(generateEmailBody(id));
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${FOUNDER_EMAIL}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const generatedId = `AW-${Math.floor(1000 + Math.random() * 9000)}-${formData.projectType.slice(0, 3).toUpperCase()}`;
    setInquiryId(generatedId);

    try {
      // 1. Direct real network transmission to FormSubmit AJAX endpoint delivering straight to myakalavignesh01@gmail.com
      const emailPayload = {
        _subject: generateEmailSubject(generatedId),
        _replyto: formData.email,
        _template: 'table',
        _captcha: 'false',
        'Reference ID': generatedId,
        'Client Name': formData.name,
        'Client Email': formData.email,
        'Company / Startup': formData.company || 'Not Specified',
        'Project Category': formData.projectType,
        'Budget Bracket': formData.budget,
        'Expected Timeline': formData.timeline,
        'Full Project Description': formData.description,
        'Submission Timestamp': new Date().toISOString(),
      };

      const response = await fetch(`https://formsubmit.co/ajax/${FOUNDER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (response.ok) {
        setDispatchStatus('delivered');
      } else {
        setDispatchStatus('local_fallback');
      }
    } catch {
      // Network or sandbox fallback
      setDispatchStatus('local_fallback');
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Also open local mail draft so the client has immediate mail confirmation on their device
      try {
        openEmailClient(generatedId);
      } catch {
        // Ignore if blocked by browser popup policies
      }
    }
  };

  const handleCopyId = () => {
    if (!inquiryId) return;
    navigator.clipboard.writeText(inquiryId).catch(() => {});
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyFullEmail = () => {
    const fullText = `TO: ${FOUNDER_EMAIL}\nSUBJECT: ${generateEmailSubject(inquiryId || 'AW-INQUIRY')}\n\n${generateEmailBody(inquiryId || 'AW-INQUIRY')}`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopiedEmailText(true);
    setTimeout(() => setCopiedEmailText(false), 2500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: 'AI Product',
      budget: '₹15K–₹50K',
      description: '',
      timeline: 'Within 2-4 weeks',
    });
  };

  // Motion variants for staggered success entry
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const checkmarkPathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.6, ease: 'easeOut', delay: 0.25 },
        opacity: { duration: 0.15, delay: 0.2 },
      },
    },
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative">
      {/* Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL-ONLY CLIENT CONTACT PROTOCOL</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
            CONTACT VIA EMAIL.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C4B5FD] to-[#8B5CF6]">
              ALL DETAILS IN ONE PLACE.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-light">
            We work <strong className="text-white font-medium">100% exclusively through email</strong>. Enter your requirements below to generate a comprehensive, structured project brief sent directly to the three founders.
          </p>

          {/* Email Badge Notice */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#14121E] border border-[#8B5CF6]/40 text-xs font-mono-code text-[#C4B5FD]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DIRECT INBOX:</span>
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="text-white font-bold underline hover:text-[#A78BFA] transition-colors"
            >
              {FOUNDER_EMAIL}
            </a>
          </div>
        </div>

        {/* Form / Success Container */}
        <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="inquiry-success-panel"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="py-4 text-center space-y-8"
              >
                {/* Animated Futuristic Success Beacon */}
                <motion.div variants={itemVariants} className="relative inline-flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.25, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut' }}
                    className="absolute w-24 h-24 rounded-full border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 pointer-events-none"
                  />

                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E1B4B] via-[#141414] to-[#0A0A0A] border border-[#8B5CF6]/60 flex items-center justify-center text-[#A78BFA] shadow-[0_0_35px_rgba(139,92,246,0.35)] relative z-10"
                  >
                    <svg
                      className="w-10 h-10 text-[#C4B5FD]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#8B5CF6"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                      <motion.path
                        d="M8 12.5l2.8 2.8L16.5 9"
                        variants={checkmarkPathVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Header & Status Indicator */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono-code uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {dispatchStatus === 'delivered'
                        ? 'TRANSMITTED TO INBOX & DRAFT PREPARED'
                        : 'EMAIL BRIEF COMPILED & READY FOR DISPATCH'}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                    ALL DETAILS FORMATTED IN EMAIL
                  </h3>

                  <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>! All your project specifications have been sent to <span className="text-white font-mono-code font-bold underline decoration-[#8B5CF6]">{FOUNDER_EMAIL}</span>. You can also launch your local email client or Gmail web below to review the full thread.
                  </p>
                </motion.div>

                {/* Primary Action Buttons for Email */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openEmailClient(inquiryId)}
                    className="px-6 py-3.5 rounded-sm bg-white hover:bg-[#E5E5E5] text-black text-xs font-bold font-mono-code uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all"
                  >
                    <Mail className="w-4 h-4 text-[#8B5CF6]" />
                    <span>LAUNCH DEFAULT EMAIL APP</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openGmailWeb(inquiryId)}
                    className="px-6 py-3.5 rounded-sm bg-[#1A1828] hover:bg-[#241F3A] border border-[#8B5CF6]/50 text-white text-xs font-bold font-mono-code uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4 text-[#C4B5FD]" />
                    <span>SEND VIA GMAIL (WEB)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyFullEmail}
                    className="px-5 py-3.5 rounded-sm bg-[#141414] hover:bg-[#1C1C1C] border border-white/15 text-white/90 hover:text-white text-xs font-mono-code uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    {copiedEmailText ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED FULL EMAIL BRIEF</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8B5CF6]" />
                        <span>COPY COMPLETE EMAIL TEXT</span>
                      </>
                    )}
                  </button>
                </motion.div>

                {/* High-Tech Transmission Spec Sheet / Receipt */}
                <motion.div
                  variants={itemVariants}
                  className="max-w-xl mx-auto bg-[#121216] border border-white/10 rounded-xl p-5 sm:p-6 text-left shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />

                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono-code">
                    <div className="flex items-center gap-2 text-[#8B5CF6] font-bold uppercase tracking-wider">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span>DISPATCH TELEMETRY</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white/70 hover:text-white transition-colors"
                      title="Copy Reference ID"
                    >
                      <Hash className="w-3 h-3 text-[#8B5CF6]" />
                      <span>{inquiryId}</span>
                      {copiedId ? (
                        <CheckCheck className="w-3 h-3 text-emerald-400 ml-0.5" />
                      ) : (
                        <Copy className="w-3 h-3 text-white/40 ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-xs font-mono-code">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] uppercase text-white/40 font-bold flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#8B5CF6]" />
                        <span>RECIPIENT INBOX</span>
                      </div>
                      <div className="text-white font-semibold text-xs truncate">{FOUNDER_EMAIL}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] uppercase text-white/40 font-bold flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#8B5CF6]" />
                        <span>PROJECT TYPE</span>
                      </div>
                      <div className="text-white font-semibold text-xs truncate">{formData.projectType}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] uppercase text-white/40 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                        <span>BUDGET BRACKET</span>
                      </div>
                      <div className="text-[#C4B5FD] font-semibold text-xs truncate">{formData.budget}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] uppercase text-white/40 font-bold flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#8B5CF6]" />
                        <span>DELIVERY TARGET</span>
                      </div>
                      <div className="text-white font-semibold text-xs truncate">{formData.timeline}</div>
                    </div>
                  </div>

                  {formData.description && (
                    <div className="mt-3.5 p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono-code text-white/60">
                      <div className="text-[9px] uppercase tracking-wider text-white/30 mb-1 font-bold">
                        FULL DETAILS INCLUDED IN MAIL:
                      </div>
                      <p className="line-clamp-3 italic text-white/80">"{formData.description}"</p>
                    </div>
                  )}
                </motion.div>

                {/* Reset Action */}
                <motion.div variants={itemVariants} className="pt-2 flex justify-center gap-4">
                  <button
                    id="submit-another-inquiry-btn"
                    onClick={handleReset}
                    className="px-6 py-3 rounded-sm bg-white/5 hover:bg-white/10 text-xs font-bold tracking-wider uppercase text-white transition-all border border-white/10 hover:border-white/30 flex items-center gap-2"
                  >
                    <span>COMPOSE ANOTHER BRIEF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="inquiry-form-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-8"
                noValidate
              >
                {/* Mandatory Email-Only Protocol Banner */}
                <div className="p-4 rounded-xl bg-[#161226] border border-[#8B5CF6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
                  <div className="flex items-center gap-2.5 text-white">
                    <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                    <span>
                      <strong className="text-[#C4B5FD]">EMAIL-ONLY PROTOCOL:</strong> Please fill out all details below. Submitting will launch your email client with all specifications pre-filled.
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 uppercase tracking-wider shrink-0 font-bold">
                    FOUNDER INBOX MONITORED
                  </span>
                </div>

                {/* Row 1: Name, Email, Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="inquiry-name" className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-semibold">
                      YOUR NAME <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Sharma"
                      className={`w-full px-4 py-3 rounded-sm bg-[#141414] border text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#8B5CF6]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-semibold">
                      YOUR EMAIL ADDRESS <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-sm bg-[#141414] border text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#8B5CF6]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="inquiry-company" className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-semibold">
                      COMPANY / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      id="inquiry-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company or Startup name"
                      className="w-full px-4 py-3 rounded-sm bg-[#141414] border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type Select */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3 font-semibold">
                    PROJECT CATEGORY
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all ${
                            isSelected
                              ? 'bg-white text-black border border-white font-bold shadow-md'
                              : 'bg-[#141414] text-white/60 border border-white/5 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range Selection */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3 font-semibold">
                    ESTIMATED BUDGET BRACKET
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetOptions.map((tier) => {
                      const isSelected = formData.budget === tier;
                      return (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={`py-3 px-4 rounded-sm text-xs font-mono-code font-bold tracking-wider transition-all text-center ${
                            isSelected
                              ? 'bg-[#8B5CF6] text-white border border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                              : 'bg-[#141414] text-white/70 border border-white/5 hover:border-white/20'
                          }`}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-semibold">
                      EXPECTED TIMELINE
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Urgent (< 2 weeks)', 'Standard (2-4 weeks)', 'Flexible / Exploring'].map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setFormData({ ...formData, timeline: time })}
                          className={`py-2.5 px-3 rounded-sm text-xs font-mono-code transition-all ${
                            formData.timeline === time
                              ? 'bg-[#181818] text-[#C4B5FD] border border-[#8B5CF6] shadow-sm'
                              : 'bg-[#141414] text-white/60 border border-white/5 hover:border-white/20'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="inquiry-description" className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                      FULL PROJECT DETAILS & REQUIREMENTS <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <span className="text-[10px] font-mono-code text-[#C4B5FD]">
                      ALL DETAILS ARE EMBEDDED IN YOUR EMAIL
                    </span>
                  </div>
                  <textarea
                    id="inquiry-description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide all your project details here: the key problem to solve, required features, user flows, tech preferences, and any reference links..."
                    className={`w-full px-4 py-3 rounded-sm bg-[#141414] border text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                      errors.description ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#8B5CF6]'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    id="inquiry-submit-btn"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-sm text-xs font-bold font-mono-code uppercase tracking-widest text-black bg-white hover:bg-[#E5E5E5] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 shadow-[0_4px_25px_rgba(255,255,255,0.15)]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        COMPILING ALL DETAILS INTO EMAIL...
                      </span>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-[#8B5CF6]" />
                        <span>SEND ALL DETAILS TO FOUNDERS VIA EMAIL</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] font-mono-code text-white/40">
                      Or write directly to:{' '}
                      <a
                        href={`mailto:${FOUNDER_EMAIL}`}
                        className="text-[#C4B5FD] font-semibold hover:underline"
                      >
                        {FOUNDER_EMAIL}
                      </a>
                    </span>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

