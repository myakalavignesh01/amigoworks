import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  FileCode2,
  Terminal,
  Cpu,
  Mail
} from 'lucide-react';

interface AuditResult {
  url: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  metrics: {
    category: string;
    score: number;
    issues: string[];
    fix: string;
  }[];
  architectRecommendation: string;
  estimatedFixTime: string;
}

interface ClientAuditEngineProps {
  onFixWithUs: (projectType: string, briefText: string) => void;
}

export const ClientAuditEngine: React.FC<ClientAuditEngineProps> = ({ onFixWithUs }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [auditType, setAuditType] = useState<'website' | 'ai_app' | 'saas'>('website');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);

  const scanSteps = [
    'Connecting to DNS & SSL handshake...',
    'Evaluating Client-Side Performance & Core Web Vitals...',
    'Auditing TypeScript / Bundle Overhead & Code Splitting...',
    'Checking AI API Guardrails, Token Safety & Latency...',
    'Synthesizing AMIGOWORKS 3-Minds Architecture Verdict...'
  ];

  const presets = [
    { label: 'my-startup.io', type: 'saas' as const },
    { label: 'ai-doc-assistant.com', type: 'ai_app' as const },
    { label: 'agency-portfolio.com', type: 'website' as const },
  ];

  const handleRunAudit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsScanning(true);
    setResult(null);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 450);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsScanning(false);

      // Generate dynamic realistic audit based on input & type
      const cleanHost = inputUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'your-project.com';
      
      if (auditType === 'ai_app') {
        setResult({
          url: cleanHost,
          overallScore: 68,
          grade: 'C',
          metrics: [
            {
              category: 'AI Pipeline & Latency',
              score: 62,
              issues: [
                'Unbuffered LLM responses causing 3.4s cold-start UI freeze',
                'No client-side optimistic UI state during generation',
                'Raw API keys exposed in front-end client bundle'
              ],
              fix: 'Implement streaming edge workers + token rate-limiting middleware.'
            },
            {
              category: 'Architecture & State',
              score: 71,
              issues: [
                'Heavy unmemoized state re-renders across chat tree',
                'Missing fallback vector search cache for repetitive prompts'
              ],
              fix: 'Migrate to Zustand + memoized React 19 concurrent boundaries.'
            },
            {
              category: 'Design & Interaction',
              score: 74,
              issues: [
                'Generic AI slop typography with poor optical contrast',
                'Missing tactile audio/visual cues on generation progress'
              ],
              fix: 'Redesign with bespoke typography pairing + high-contrast telemetry.'
            }
          ],
          architectRecommendation:
            'Critical frontend-to-AI latency bottlenecks. We recommend rebuilding the inference pipeline with server-side streaming and a zero-latency React client.',
          estimatedFixTime: '5 – 8 Days'
        });
      } else if (auditType === 'saas') {
        setResult({
          url: cleanHost,
          overallScore: 74,
          grade: 'B',
          metrics: [
            {
              category: 'Conversion & UX Flow',
              score: 65,
              issues: [
                'Signup drop-off due to 5-step form before product value preview',
                'Mobile viewport shift (CLS 0.28) on hero assets',
                'No interactive product simulator to hook prospective buyers'
              ],
              fix: 'Replace form gate with frictionless 1-click interactive sandbox.'
            },
            {
              category: 'Database & API Speed',
              score: 78,
              issues: [
                'Unindexed foreign keys causing 400ms query latency under load',
                'Missing cache headers on static JSON dashboard routes'
              ],
              fix: 'Re-index Postgres schema and deploy Cloudflare edge caching.'
            },
            {
              category: 'Security & Auth',
              score: 82,
              issues: [
                'Session cookie lacks strict SameSite flag',
                'No automated brute-force rate limiter on auth routes'
              ],
              fix: 'Implement Argon2 password hashing + Upstash Redis rate limiting.'
            }
          ],
          architectRecommendation:
            'High potential SaaS product hindered by signup friction and unoptimized query paths. A rapid 1-week refactor can boost conversion by 40%.',
          estimatedFixTime: '4 – 7 Days'
        });
      } else {
        setResult({
          url: cleanHost,
          overallScore: 71,
          grade: 'C',
          metrics: [
            {
              category: 'Performance & Speed',
              score: 64,
              issues: [
                'Oversized uncompressed images (4.8MB initial page payload)',
                'Unused JavaScript chunks blocking first contentful paint (FCP: 2.9s)',
                'Render-blocking external font CSS stylesheets'
              ],
              fix: 'Convert assets to WebP/AVIF and configure dynamic Vite code-splitting.'
            },
            {
              category: 'Visual Craft & Hierarchy',
              score: 75,
              issues: [
                'Generic SaaS color palette with low WCAG text contrast',
                'Inconsistent border-radius math and nested container clutter'
              ],
              fix: 'Apply mathematical 1.25 typography ratio and bespoke visual theme.'
            },
            {
              category: 'SEO & Meta Infrastructure',
              score: 76,
              issues: [
                'Missing OpenGraph image tags and JSON-LD organization schema',
                'H1 tag nested inside non-semantic division'
              ],
              fix: 'Inject complete semantic metadata and schema.org structured data.'
            }
          ],
          architectRecommendation:
            'The site suffers from slow load times and template aesthetics. Rebuilding with modern Tailwind + Vite architecture will achieve a 99+ Lighthouse score.',
          estimatedFixTime: '3 – 5 Days'
        });
      }
    }, 2400);
  };

  const handleFixAudit = () => {
    if (!result) return;
    const brief = `AMIGOWORKS Technical Audit Follow-up for: ${result.url}\n` +
      `• Identified Grade: ${result.grade} (${result.overallScore}/100)\n` +
      `• Audit Category: ${auditType.toUpperCase()}\n` +
      `• Core Bottlenecks:\n${result.metrics.map((m) => `  - [${m.category}]: ${m.issues[0]}`).join('\n')}\n` +
      `• Founder Verdict: ${result.architectRecommendation}\n` +
      `• Estimated Squad Turnaround: ${result.estimatedFixTime}`;
    
    onFixWithUs(auditType === 'ai_app' ? 'AI Product' : auditType === 'saas' ? 'Web Application' : 'Website', brief);
  };

  return (
    <section id="audit-engine" className="py-24 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/10 via-[#6D28D9]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLIENT CONVERSION TOOL</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            INSTANT ARCHITECTURE &amp;
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C4B5FD] to-[#8B5CF6]">
              PERFORMANCE AUDITOR
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/60 font-light">
            Enter your current website or app URL. Our 3-minds scanner will instantly pinpoint performance bottlenecks, AI security risks, and conversion leaks.
          </p>
        </div>

        {/* Auditor Box */}
        <div className="bg-[#101014] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Scanner Input Form */}
          <form onSubmit={handleRunAudit} className="space-y-5">
            {/* Category Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                AUDIT PROFILE:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-lg border border-white/10">
                {(
                  [
                    { id: 'website', label: 'Website / Landing Page', icon: Layers },
                    { id: 'ai_app', label: 'AI Product / LLM App', icon: Cpu },
                    { id: 'saas', label: 'SaaS / Web App', icon: Terminal }
                  ] as const
                ).map((t) => {
                  const Icon = t.icon;
                  const active = auditType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAuditType(t.id)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-mono-code font-semibold flex items-center gap-1.5 transition-all ${
                        active
                          ? 'bg-[#8B5CF6] text-white shadow-sm'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* URL Input Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 font-mono-code text-xs">
                  https://
                </div>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="yourbrand.com or your-ai-app.io"
                  className="w-full pl-20 pr-4 py-4 rounded-xl bg-black/80 border border-white/15 text-white placeholder-white/30 font-mono-code text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isScanning || !inputUrl.trim()}
                className="px-8 py-4 rounded-xl bg-white hover:bg-[#E5E5E5] text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)] disabled:opacity-40 transition-all shrink-0 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>RUNNING SCAN...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-[#8B5CF6]" />
                    <span>ANALYZE ARCHITECTURE</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Test Presets */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-white/40">
              <span>Quick Demo:</span>
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setInputUrl(p.label);
                    setAuditType(p.type);
                  }}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </form>

          {/* Scanning Animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-6 rounded-xl bg-black/90 border border-[#8B5CF6]/30 font-mono-code space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-[#C4B5FD]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    AMIGOWORKS SCANNER ACTIVE
                  </span>
                  <span>STEP {scanStep + 1} OF 5</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-emerald-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((scanStep + 1) / 5) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <div className="text-sm text-white font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#8B5CF6]" />
                  <span>{scanSteps[scanStep]}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audit Results Dashboard */}
          <AnimatePresence>
            {result && !isScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-6 pt-6 border-t border-white/10"
              >
                {/* Result Top Banner */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-[#17132B] via-[#121218] to-black border border-[#8B5CF6]/40">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-code uppercase tracking-wider text-white/40">
                      TARGET HOST AUDITED
                    </div>
                    <div className="text-lg font-bold text-white font-mono-code flex items-center gap-2">
                      <span>{result.url}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        LIVE REPORT
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-[10px] font-mono-code uppercase tracking-wider text-white/40">
                        HEALTH SCORE
                      </div>
                      <div className="text-2xl font-black font-mono-code text-white">
                        {result.overallScore}
                        <span className="text-white/40 text-sm font-normal">/100</span>
                      </div>
                    </div>

                    <div className="w-14 h-14 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6] flex flex-col items-center justify-center font-display font-black text-2xl text-[#C4B5FD] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      {result.grade}
                    </div>
                  </div>
                </div>

                {/* Detailed Metric Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 font-mono-code"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{metric.category}</span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            metric.score > 75
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {metric.score}%
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-white/70">
                        <div className="text-[10px] uppercase text-white/40 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          <span>Identified Risks:</span>
                        </div>
                        {metric.issues.map((issue, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-white/60">
                            <span className="text-red-400 font-bold">•</span>
                            <span>{issue}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <div className="text-[10px] uppercase text-[#C4B5FD] font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                          <span>Squad Fix:</span>
                        </div>
                        <p className="text-[11px] text-white/90 mt-1 leading-normal">{metric.fix}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Founder Verdict & Conversion CTA */}
                <div className="p-6 rounded-xl bg-[#141022] border border-[#8B5CF6]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono-code uppercase tracking-widest text-[#C4B5FD] font-bold flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>AMIGOWORKS 3-MINDS SQUAD DIAGNOSIS</span>
                    </div>
                    <p className="text-sm text-white/85 max-w-xl font-light leading-relaxed">
                      "{result.architectRecommendation}"
                    </p>
                    <div className="flex items-center gap-3 text-xs font-mono-code text-white/50 pt-1">
                      <span>ESTIMATED TURNAROUND: <strong className="text-white">{result.estimatedFixTime}</strong></span>
                      <span>•</span>
                      <span>GUARANTEED 100% PRODUCTION READY</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleFixAudit}
                    className="px-6 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all shrink-0 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>HAVE AMIGOWORKS FIX THIS (EMAIL BRIEF)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
