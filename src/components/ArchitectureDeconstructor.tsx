import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Cpu,
  Server,
  Layout,
  ArrowRight,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Zap,
  Shield,
  Clock,
  Layers,
  Flame,
  ArrowUpRight,
  Terminal,
  Activity,
  Sliders,
  Send
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface PresetIdea {
  title: string;
  tag: string;
  category: string;
  prompt: string;
  complexity: number;
  timeline: string;
  budget: string;
  vigneshPlan: {
    framework: string;
    designSystem: string;
    keyUxPatterns: string[];
    interactionSpeed: string;
  };
  saiKiranPlan: {
    model: string;
    ragVectorStore: string;
    guardrails: string;
    tokenOptimization: string;
  };
  nuthanPlan: {
    runtime: string;
    database: string;
    cachingStrategy: string;
    deployment: string;
  };
  topologyNodes: { name: string; type: 'client' | 'gateway' | 'ai' | 'backend' | 'db'; desc: string }[];
  milestones: { week: string; focus: string; deliverables: string }[];
}

const PRESET_IDEAS: PresetIdea[] = [
  {
    title: 'AI Legal Risk Auditor & PDF Redlining',
    tag: 'LEGALTECH • AI RAG',
    category: 'AI Product',
    prompt: 'A web app where lawyers and founders upload multi-page contracts, and an AI instantly audits risky clauses, highlights indemnity traps, and outputs redlined drafts in real-time.',
    complexity: 7.8,
    timeline: '2.5 Weeks',
    budget: '₹40K–₹75K',
    vigneshPlan: {
      framework: 'React 18 + Vite / Tailwind CSS',
      designSystem: 'Split-pane Document Viewer + Side-by-Side Diffing UI',
      keyUxPatterns: ['Virtual scroll for 100+ page PDFs', 'Interactive risk score heatmaps', 'One-click clause accept/reject tooltips'],
      interactionSpeed: '< 45ms optimistic highlights',
    },
    saiKiranPlan: {
      model: 'Gemini 2.5 Flash + Claude 3.5 Sonnet Router',
      ragVectorStore: 'pgvector / Pinecone with Hybrid BM25 Search',
      guardrails: 'Strict clause schema extraction & hallucination validation (<0.05% error)',
      tokenOptimization: 'Context chunking with cached system prompt embeddings',
    },
    nuthanPlan: {
      runtime: 'FastAPI (Python) + Node.js Gateway',
      database: 'PostgreSQL (ACID compliance) + S3 encrypted buckets',
      cachingStrategy: 'Redis cache for frequent clause embeddings',
      deployment: 'Dockerized microservices on Cloud Run (Auto-scaling)',
    },
    topologyNodes: [
      { name: 'Lawyer Client Viewport', type: 'client', desc: 'Realtime split-screen PDF renderer' },
      { name: 'Encrypted Edge Gateway', type: 'gateway', desc: 'Rate-limiting & JWT auth verification' },
      { name: 'Nuthan Fast API Engine', type: 'backend', desc: 'Async PDF parser & contract chunker' },
      { name: 'Sai Kiran Vector & LLM RAG', type: 'ai', desc: 'Heuristic clause auditor & risk classifier' },
      { name: 'Secure PostgreSQL & S3', type: 'db', desc: 'Versioned contract diffs & metadata' },
    ],
    milestones: [
      { week: 'Week 01', focus: 'Document Parsing & RAG Architecture', deliverables: 'PyPDF extraction, vector chunking pipeline, base Gemini prompt suite.' },
      { week: 'Week 02', focus: 'Interactive UI & Redline Engine', deliverables: 'Split-screen PDF canvas, real-time risk cards, one-click replacement diffs.' },
      { week: 'Week 03', focus: 'Security Hardening & Production Push', deliverables: 'End-to-end encryption, audit logs export (DOCX/PDF), Cloud Run deployment.' },
    ],
  },
  {
    title: 'Autonomous Voice Dispatcher for Clinics',
    tag: 'AI VOICE • AUTOMATION',
    category: 'Automation',
    prompt: 'An automated voice agent and WhatsApp assistant that answers patient inbound phone calls, checks doctor calendars, triages urgency, and books verified appointments automatically.',
    complexity: 8.2,
    timeline: '3 Weeks',
    budget: '₹50K–₹90K',
    vigneshPlan: {
      framework: 'Next.js App Router + Tailwind + Tremor',
      designSystem: 'Real-time Clinic Receptionist Command Center',
      keyUxPatterns: ['Live audio waveform visualizer during calls', 'Color-coded patient urgency tags', 'Instant calendar drag-and-drop override'],
      interactionSpeed: 'Real-time WebSocket audio feed',
    },
    saiKiranPlan: {
      model: 'Gemini Live Multimodal API + Deepgram Whisper TTS/STT',
      ragVectorStore: 'Clinic FAQ & Doctor Schedule Vector Graph',
      guardrails: 'Strict medical escalation protocol (Auto-transfers critical cases to human ER)',
      tokenOptimization: 'Streaming bidirectional audio tokens with minimal latency buffers',
    },
    nuthanPlan: {
      runtime: 'Node.js / Express with Twilio WebSockets',
      database: 'PostgreSQL + Google Calendar / Twilio Sync',
      cachingStrategy: 'Redis Pub/Sub for real-time doctor slot availability',
      deployment: 'Serverless Edge Workers + WebRTC media bridges',
    },
    topologyNodes: [
      { name: 'Patient Phone / WhatsApp', type: 'client', desc: 'Inbound PSTN voice call or text chat' },
      { name: 'Twilio Media Stream Gateway', type: 'gateway', desc: 'Low-latency full-duplex audio pipeline' },
      { name: 'Sai Kiran Live AI Agent', type: 'ai', desc: 'Natural voice synthesis & slot booking intent' },
      { name: 'Nuthan Calendar & Triage DB', type: 'backend', desc: 'Slot validation, SMS dispatch & EHR sync' },
      { name: 'Receptionist Dashboard', type: 'client', desc: 'Live call monitoring & override panel' },
    ],
    milestones: [
      { week: 'Week 01', focus: 'Voice Pipeline & Telephony Bridge', deliverables: 'Twilio WebSocket integration, sub-500ms voice roundtrip with Gemini Live.' },
      { week: 'Week 02', focus: 'Calendar Integration & WhatsApp Bot', deliverables: 'Google Calendar / CRM sync, instant appointment SMS confirmation, fallback human transfer.' },
      { week: 'Week 03', focus: 'Receptionist UI & Load Testing', deliverables: 'Real-time admin console, transcript search, SLA stress testing.' },
    ],
  },
  {
    title: 'Real-Time Spatial Whiteboard (Figma + Miro Alternative)',
    tag: 'WEBSOCKETS • CANVAS ENGINE',
    category: 'Web Application',
    prompt: 'A zero-latency collaborative spatial whiteboard where distributed product teams brainstorm with infinite infinite canvas, sticky notes, diagram auto-layout, and AI idea clustering.',
    complexity: 8.5,
    timeline: '3 Weeks',
    budget: '₹60K–₹1L',
    vigneshPlan: {
      framework: 'React + HTML5 Canvas / WebGL (Pixi.js / Konva)',
      designSystem: 'Ultra-minimal Dark Canvas + Dynamic Floating Toolbars',
      keyUxPatterns: ['60FPS smooth panning & zoom up to 10,000 items', 'Multiplayer cursor avatars with username pills', 'Smart alignment snap guides'],
      interactionSpeed: '< 16ms render loop (60 FPS)',
    },
    saiKiranPlan: {
      model: 'Gemini 2.5 Flash for Semantic Clustering',
      ragVectorStore: 'In-memory dynamic embedding space',
      guardrails: 'Spatial boundary validation & content moderation filters',
      tokenOptimization: 'Batch sticky note embedding requests on canvas idle',
    },
    nuthanPlan: {
      runtime: 'Go (Golang) / Node.js High-Throughput WebSocket Server',
      database: 'PostgreSQL (Canvas metadata) + Yjs / CRDT Conflict Free Replicated Data Types',
      cachingStrategy: 'Redis Memory Clusters for room state broadcasting',
      deployment: 'Kubernetes / Cloud Run with sticky sessions',
    },
    topologyNodes: [
      { name: 'Team WebGL Viewport', type: 'client', desc: '60FPS hardware-accelerated canvas' },
      { name: 'Multiplayer CRDT Sync', type: 'gateway', desc: 'Zero-conflict distributed state sync' },
      { name: 'Nuthan High-Speed Go Server', type: 'backend', desc: 'Sub-15ms WebSocket delta broadcasting' },
      { name: 'Sai Kiran Smart Cluster AI', type: 'ai', desc: 'Auto-groups sticky notes by thematic intent' },
      { name: 'PostgreSQL Snapshot Storage', type: 'db', desc: 'Continuous canvas revision history' },
    ],
    milestones: [
      { week: 'Week 01', focus: 'Canvas Engine & CRDT Sync', deliverables: 'High-performance canvas panning/zooming, multiplayer cursor positions, CRDT state sync.' },
      { week: 'Week 02', focus: 'Tooling & AI Clustering', deliverables: 'Pen, sticky notes, vector shapes, mindmap connectors, AI semantic grouping.' },
      { week: 'Week 03', focus: 'Exporting & Collaborative Auth', deliverables: 'PNG/SVG high-res export, team permissions, project workspaces, production CDN.' },
    ],
  },
  {
    title: 'High-Frequency Crypto Arbitrage Radar & Alert Bot',
    tag: 'FINTECH • REALTIME DATA',
    category: 'Dashboard',
    prompt: 'A real-time financial dashboard monitoring cross-exchange liquidity spreads (Binance, Bybit, Uniswap), alerting traders via Telegram when profitable triangular arbitrage opportunities occur.',
    complexity: 7.9,
    timeline: '2 Weeks',
    budget: '₹45K–₹80K',
    vigneshPlan: {
      framework: 'React + Vite + Lightweight Charts (TradingView)',
      designSystem: 'Bloomberg-Terminal Aesthetic with High-Density HUD',
      keyUxPatterns: ['Color-coded tick flashes on price updates', 'One-click trade simulation calculator', 'Custom sound chime alerts'],
      interactionSpeed: '< 30ms DOM patch cycle',
    },
    saiKiranPlan: {
      model: 'Anomaly Detection Regressors + Claude Market Sentiment Parser',
      ragVectorStore: 'Time-series price history cache',
      guardrails: 'Slippage calculation & gas fee deduction verification before alert firing',
      tokenOptimization: 'Statistical math heuristics first; AI calls only on macro sentiment',
    },
    nuthanPlan: {
      runtime: 'Rust / Node.js Multi-exchange WebSocket listeners',
      database: 'TimescaleDB / Redis for 100,000 ticks/sec throughput',
      cachingStrategy: 'In-memory order book matching matrix',
      deployment: 'Dedicated low-latency compute nodes near exchange data hubs',
    },
    topologyNodes: [
      { name: 'Trader Pro Dashboard', type: 'client', desc: 'Realtime order book & spread heatmaps' },
      { name: 'Exchange WS Ingestor', type: 'gateway', desc: 'Parallel Binance & Uniswap orderbook feeds' },
      { name: 'Nuthan Math Engine', type: 'backend', desc: 'Triangular arbitrage matrix calculator' },
      { name: 'Sai Kiran Risk & Sentiment', type: 'ai', desc: 'Gas fee & slippage safety validator' },
      { name: 'Telegram & Web Push Bot', type: 'client', desc: 'Sub-second push notifications to users' },
    ],
    milestones: [
      { week: 'Week 01', focus: 'Exchange Ingestion & Math Core', deliverables: 'Unified WebSocket feeds from top exchanges, order book depth normalizer, spread detector.' },
      { week: 'Week 02', focus: 'Trading Dashboard & Telegram Bot', deliverables: 'High-density terminal UI, Telegram bot dispatch, custom alert rule builder.' },
      { week: 'Week 03', focus: 'Slippage Engine & Live Testnet', deliverables: 'Transaction fee calculator, automated paper-trading testnet validator.' },
    ],
  },
];

interface ArchitectureDeconstructorProps {
  onBuildWithUs?: (projectType: string, briefText: string, budget: string) => void;
}

export const ArchitectureDeconstructor: React.FC<ArchitectureDeconstructorProps> = ({
  onBuildWithUs,
}) => {
  const [inputIdea, setInputIdea] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<PresetIdea>(PRESET_IDEAS[0]);
  const [isDeconstructing, setIsDeconstructing] = useState<boolean>(false);
  const [analyzedIdea, setAnalyzedIdea] = useState<PresetIdea>(PRESET_IDEAS[0]);
  const [copiedDossier, setCopiedDossier] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'3founders' | 'topology' | 'roadmap'>('3founders');

  // Handle Preset Click
  const handleSelectPreset = (preset: PresetIdea) => {
    setSelectedPreset(preset);
    setInputIdea(preset.prompt);
    triggerDeconstruct(preset);
  };

  const triggerDeconstruct = (targetSpec?: PresetIdea) => {
    setIsDeconstructing(true);
    const specToUse = targetSpec || generateDynamicSpec(inputIdea || selectedPreset.prompt);

    setTimeout(() => {
      setAnalyzedIdea(specToUse);
      setIsDeconstructing(false);
    }, 700);
  };

  const generateDynamicSpec = (rawPrompt: string): PresetIdea => {
    const isAi = /ai|gpt|llm|agent|voice|bot|copilot|rag|model/i.test(rawPrompt);
    const isDashboard = /dashboard|analytics|crypto|trading|chart|metrics|monitor/i.test(rawPrompt);
    const isApp = /app|saas|marketplace|platform|social|collaboration/i.test(rawPrompt);

    return {
      title: rawPrompt.length > 50 ? `${rawPrompt.slice(0, 48)}...` : rawPrompt,
      tag: isAi ? 'AI ENGINE • SYSTEMS ARCHITECTURE' : isDashboard ? 'HIGH-THROUGHPUT METRICS' : 'FULL-STACK CLOUD MVP',
      category: isAi ? 'AI Product' : isDashboard ? 'Dashboard' : 'Web Application',
      prompt: rawPrompt,
      complexity: isAi ? 8.1 : isDashboard ? 7.6 : 7.2,
      timeline: isAi ? '2.5 Weeks' : '2 Weeks',
      budget: isAi ? '₹45K–₹85K' : '₹30K–₹60K',
      vigneshPlan: {
        framework: 'React 18 + Vite / Next.js + Tailwind CSS',
        designSystem: 'Bespoke High-Contrast Technical UI with Framer Motion Micro-states',
        keyUxPatterns: ['Instant sub-50ms feedback loops', 'Keyboard-first navigation shortcuts', 'Zero layout shifts on data stream'],
        interactionSpeed: '< 50ms client response',
      },
      saiKiranPlan: {
        model: isAi ? 'Gemini 2.5 Flash + Hybrid Vector Store' : 'Statistical Heuristics & Structured Classification Engine',
        ragVectorStore: 'Pinecone / pgvector with BM25 contextual indexing',
        guardrails: 'Strict input/output JSON schemas with automated fallbacks',
        tokenOptimization: 'Embedding caching layer reducing cloud inference spend',
      },
      nuthanPlan: {
        runtime: 'Node.js TypeScript / FastAPI with Docker containerization',
        database: 'PostgreSQL (Prisma/Drizzle) + Redis In-Memory Store',
        cachingStrategy: 'Edge reverse-proxy caching with stale-while-revalidate',
        deployment: 'Google Cloud Run (Scale-to-zero) with automated CI/CD pipeline',
      },
      topologyNodes: [
        { name: 'User Client App', type: 'client', desc: 'Responsive interface engineered by Vignesh' },
        { name: 'Secure API Gateway', type: 'gateway', desc: 'JWT verification & rate limiting' },
        { name: 'Nuthan Backend Services', type: 'backend', desc: 'High-concurrency logic & DB schemas' },
        { name: 'Sai Kiran Intelligence Layer', type: 'ai', desc: 'AI orchestration & vector search' },
        { name: 'Postgres & Cloud Storage', type: 'db', desc: 'Persistent durable storage' },
      ],
      milestones: [
        { week: 'Week 01', focus: 'Architecture Core & Data Schemas', deliverables: 'Database schema, authentication, API routes, base AI pipelines.' },
        { week: 'Week 02', focus: 'High-Fidelity UI & Real-Time Sync', deliverables: 'Vignesh design system implementation, data visualizers, error boundaries.' },
        { week: 'Week 03', focus: 'Stress Testing & Production Launch', deliverables: 'Security audit, performance optimization, Docker deployment to Cloud Run.' },
      ],
    };
  };

  const handleCopySpec = () => {
    const markdown = `# ARCHITECTURAL SPECIFICATION — AMIGOWORKS
PROJECT: ${analyzedIdea.title}
CATEGORY: ${analyzedIdea.category} | COMPLEXITY: ${analyzedIdea.complexity}/10
ESTIMATED TIMELINE: ${analyzedIdea.timeline} | BUDGET TIER: ${analyzedIdea.budget}

---
[1] VIGNESH (FRONTEND & UX ARCHITECTURE)
- Framework: ${analyzedIdea.vigneshPlan.framework}
- Design System: ${analyzedIdea.vigneshPlan.designSystem}
- UX Patterns: ${analyzedIdea.vigneshPlan.keyUxPatterns.join(', ')}
- Speed Target: ${analyzedIdea.vigneshPlan.interactionSpeed}

---
[2] SAI KIRAN (AI & SYSTEMS ARCHITECTURE)
- Model Engine: ${analyzedIdea.saiKiranPlan.model}
- Vector Storage: ${analyzedIdea.saiKiranPlan.ragVectorStore}
- Guardrails: ${analyzedIdea.saiKiranPlan.guardrails}
- Token Strategy: ${analyzedIdea.saiKiranPlan.tokenOptimization}

---
[3] NUTHAN SAI (BACKEND & CLUSTER TOPOLOGY)
- Server Runtime: ${analyzedIdea.nuthanPlan.runtime}
- Database: ${analyzedIdea.nuthanPlan.database}
- Caching: ${analyzedIdea.nuthanPlan.cachingStrategy}
- Deployment: ${analyzedIdea.nuthanPlan.deployment}

---
ESTIMATED SPRINT ROADMAP:
${analyzedIdea.milestones.map((m) => `- ${m.week} [${m.focus}]: ${m.deliverables}`).join('\n')}

Engineered by AMIGOWORKS (Vignesh • Sai Kiran • Nuthan Sai)
`;

    navigator.clipboard.writeText(markdown).catch(() => {});
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2200);
  };

  const handleBuildThisClick = () => {
    if (onBuildWithUs) {
      const brief = `Hi AmigoWorks! I used your 3-Minds Architecture Deconstructor for: "${analyzedIdea.prompt}".\n\nRecommended Stack:\n- Frontend: ${analyzedIdea.vigneshPlan.framework}\n- AI Engine: ${analyzedIdea.saiKiranPlan.model}\n- Backend: ${analyzedIdea.nuthanPlan.runtime}\n\nEstimated Timeline: ${analyzedIdea.timeline}. Let's discuss building this MVP.`;
      onBuildWithUs(analyzedIdea.category, brief, analyzedIdea.budget);
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="deconstructor"
      className="py-28 px-4 sm:px-6 lg:px-8 bg-[#090909] border-t border-white/5 relative overflow-hidden"
    >
      {/* Background Ambience & Grid Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#8B5CF6]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161226] border border-[#8B5CF6]/40 text-[#C4B5FD] text-[11px] font-mono-code font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Flame className="w-3.5 h-3.5 text-[#A78BFA] animate-pulse" />
            <span>VIRAL FOUNDER TOOL • 3-MINDS AI DECONSTRUCTOR</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
            DECONSTRUCT YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C4B5FD] to-[#8B5CF6]">
              PRODUCT ARCHITECTURE.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/60 font-light max-w-2xl mx-auto">
            Type your raw idea. Our 3 founding engineers will instantly break down the exact UI, AI intelligence, and backend infrastructure topology in 30 seconds.
          </p>
        </div>

        {/* Input Terminal Box & Presets */}
        <div className="bg-[#0E0E12] border border-white/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl mb-12 relative overflow-hidden">
          {/* Top Terminal Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono-code">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-2 text-[#C4B5FD] font-semibold">
                <Terminal className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>AMIGOWORKS_SPEC_SYNTHESIZER_V3.4</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>3 FOUNDERS ONLINE</span>
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="text-[#8B5CF6] font-semibold uppercase">READY TO TRIAGE</span>
            </div>
          </div>

          {/* Prompt Input Area */}
          <div className="pt-6 space-y-4">
            <label htmlFor="custom-idea-input" className="block text-[11px] font-mono-code uppercase tracking-wider text-white/60 font-bold">
              DESCRIBE YOUR PRODUCT IDEA OR STARTUP CONVENTIONS:
            </label>

            <div className="relative">
              <textarea
                id="custom-idea-input"
                rows={3}
                value={inputIdea}
                onChange={(e) => setInputIdea(e.target.value)}
                placeholder="e.g. A marketplace matching freelance video editors with YouTubers, with automated frame-by-frame cloud rendering and escrow milestone payments..."
                className="w-full p-4 sm:p-5 rounded-xl bg-[#14141A] border border-white/15 focus:border-[#8B5CF6] text-white placeholder-white/25 text-sm sm:text-base font-light focus:outline-none transition-all resize-none shadow-inner"
              />

              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex items-center gap-3">
                <button
                  id="deconstruct-idea-btn"
                  onClick={() => triggerDeconstruct()}
                  disabled={isDeconstructing || !inputIdea.trim()}
                  className="px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold font-mono-code uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  {isDeconstructing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>DECONSTRUCTING...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>DECONSTRUCT BLUEPRINT</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick 1-Click Viral Preset Ideas */}
            <div className="pt-2">
              <span className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest block mb-2 font-bold">
                OR SELECT POPULAR STARTUP CONCEPTS:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_IDEAS.map((preset) => {
                  const isSelected = selectedPreset.title === preset.title;
                  return (
                    <button
                      key={preset.title}
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white font-semibold shadow-sm'
                          : 'bg-[#141418] border border-white/5 text-white/60 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                      <span>{preset.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Generated Architectural Dossier Showcase */}
        <AnimatePresence mode="wait">
          {isDeconstructing ? (
            <motion.div
              key="analyzing-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0E0E12] border border-white/10 rounded-2xl p-12 text-center space-y-6 shadow-2xl animate-shimmer"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E1B4B] border border-[#8B5CF6]/50 text-[#A78BFA] shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Activity className="w-8 h-8 animate-pulse text-[#C4B5FD]" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono-code text-[#8B5CF6] uppercase tracking-widest font-semibold">
                  TRIAGING ARCHITECTURAL CONSTRAINTS...
                </div>
                <h3 className="text-xl font-bold text-white uppercase font-mono-code">
                  SYNTHESIZING VIGNESH • SAI KIRAN • NUTHAN RECOMMENDATIONS
                </h3>
                <p className="text-sm text-white/50 font-light max-w-md mx-auto">
                  Calculating UX latency budget, model token routing, vector indexing, and Cloud Run cluster schema.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="blueprint-output"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Executive Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10">
                  <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>COMPLEXITY INDEX</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono-code mt-1.5 flex items-baseline gap-1">
                    <span>{analyzedIdea.complexity}</span>
                    <span className="text-xs text-white/40 font-normal">/ 10</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono-code mt-1">HIGH FEASIBILITY</div>
                </div>

                <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10">
                  <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>ESTIMATED DELIVERY</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono-code mt-1.5">
                    {analyzedIdea.timeline}
                  </div>
                  <div className="text-[10px] text-[#C4B5FD] font-mono-code mt-1">FAST-TRACK MVP</div>
                </div>

                <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10">
                  <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>BUDGET BRACKET</span>
                  </div>
                  <div className="text-2xl font-black text-[#A78BFA] font-mono-code mt-1.5">
                    {analyzedIdea.budget}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono-code mt-1">NO AGENCY OVERHEAD</div>
                </div>

                <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10">
                  <div className="text-[10px] font-mono-code text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FOUNDER SQUAD</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono-code mt-1.5">
                    3 MINDS
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono-code mt-1">100% DIRECT SENIOR ACCESS</div>
                </div>
              </div>

              {/* Blueprint Navigation Tabs & Quick Action Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E0E12] border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('3founders')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono-code uppercase tracking-wider transition-all ${
                      activeTab === '3founders'
                        ? 'bg-[#8B5CF6] text-white font-bold shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    1. 3-FOUNDER SPECIALIZATION SPEC
                  </button>
                  <button
                    onClick={() => setActiveTab('topology')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono-code uppercase tracking-wider transition-all ${
                      activeTab === 'topology'
                        ? 'bg-[#8B5CF6] text-white font-bold shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    2. DATA FLOW TOPOLOGY
                  </button>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono-code uppercase tracking-wider transition-all ${
                      activeTab === 'roadmap'
                        ? 'bg-[#8B5CF6] text-white font-bold shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    3. 3-WEEK EXECUTION ROADMAP
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySpec}
                    className="px-3.5 py-2 rounded-lg bg-[#181820] hover:bg-[#202028] border border-white/10 text-white/80 hover:text-white text-xs font-mono-code transition-all flex items-center gap-1.5"
                    title="Copy full markdown spec"
                  >
                    {copiedDossier ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED DOSSIER</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>COPY DOSSIER</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tab 1: 3 Founders Architectural Breakdown */}
              {activeTab === '3founders' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Vignesh Card */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#0E0E12] border border-white/10 hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                            <Layout className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono-code text-[#8B5CF6] uppercase font-bold">FRONTEND & UX</span>
                            <h4 className="text-sm font-bold text-white font-mono-code">VIGNESH</h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono-code text-white/50 border border-white/5">
                          LAYER 01
                        </span>
                      </div>

                      <div className="space-y-3 text-xs font-mono-code">
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">CORE FRAMEWORK:</span>
                          <span className="text-white font-semibold">{analyzedIdea.vigneshPlan.framework}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">DESIGN SYSTEM:</span>
                          <span className="text-[#C4B5FD]">{analyzedIdea.vigneshPlan.designSystem}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block mb-1">KEY INTERACTION PATTERNS:</span>
                          <ul className="space-y-1 text-white/70">
                            {analyzedIdea.vigneshPlan.keyUxPatterns.map((pat, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                                <span>{pat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono-code text-emerald-400">
                      <span>LATENCY BUDGET:</span>
                      <span className="font-bold">{analyzedIdea.vigneshPlan.interactionSpeed}</span>
                    </div>
                  </div>

                  {/* Sai Kiran Card */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#0E0E12] border border-white/10 hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono-code text-[#8B5CF6] uppercase font-bold">AI & SYSTEMS</span>
                            <h4 className="text-sm font-bold text-white font-mono-code">SAI KIRAN</h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono-code text-white/50 border border-white/5">
                          LAYER 02
                        </span>
                      </div>

                      <div className="space-y-3 text-xs font-mono-code">
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">MODEL ORCHESTRATION:</span>
                          <span className="text-white font-semibold">{analyzedIdea.saiKiranPlan.model}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">VECTOR STORAGE / RAG:</span>
                          <span className="text-[#C4B5FD]">{analyzedIdea.saiKiranPlan.ragVectorStore}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">GUARDRAILS & VALIDATION:</span>
                          <span className="text-white/70 leading-relaxed block mt-0.5">{analyzedIdea.saiKiranPlan.guardrails}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">TOKEN OPTIMIZATION:</span>
                          <span className="text-white/70 leading-relaxed block mt-0.5">{analyzedIdea.saiKiranPlan.tokenOptimization}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono-code text-[#C4B5FD]">
                      <span>RELIABILITY SCORE:</span>
                      <span className="font-bold">99.9% DETERMINISTIC</span>
                    </div>
                  </div>

                  {/* Nuthan Sai Card */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#0E0E12] border border-white/10 hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                            <Server className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono-code text-[#8B5CF6] uppercase font-bold">BACKEND & CLOUD</span>
                            <h4 className="text-sm font-bold text-white font-mono-code">NUTHAN SAI</h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono-code text-white/50 border border-white/5">
                          LAYER 03
                        </span>
                      </div>

                      <div className="space-y-3 text-xs font-mono-code">
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">SERVER RUNTIME:</span>
                          <span className="text-white font-semibold">{analyzedIdea.nuthanPlan.runtime}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">DATABASE ARCHITECTURE:</span>
                          <span className="text-[#C4B5FD]">{analyzedIdea.nuthanPlan.database}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">CACHING STRATEGY:</span>
                          <span className="text-white/70 leading-relaxed block mt-0.5">{analyzedIdea.nuthanPlan.cachingStrategy}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">CONTAINER DEPLOYMENT:</span>
                          <span className="text-white/70 leading-relaxed block mt-0.5">{analyzedIdea.nuthanPlan.deployment}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono-code text-emerald-400">
                      <span>AUTO-SCALING:</span>
                      <span className="font-bold">SCALE-TO-ZERO READY</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive Data Flow Topology */}
              {activeTab === 'topology' && (
                <div className="bg-[#0E0E12] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono-code text-[#8B5CF6] uppercase tracking-wider font-bold">SYSTEM TOPOLOGY</span>
                      <h4 className="text-lg font-bold text-white font-mono-code uppercase mt-0.5">
                        END-TO-END DATA STREAM ARCHITECTURE
                      </h4>
                    </div>
                    <span className="text-xs font-mono-code text-white/40">5 CRITICAL HOPS</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                    {analyzedIdea.topologyNodes.map((node, idx) => (
                      <div
                        key={node.name}
                        className="p-4 rounded-xl bg-[#14141A] border border-white/10 flex flex-col justify-between h-44 relative group hover:border-[#8B5CF6] transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-[#8B5CF6] font-bold">
                              0{idx + 1}
                            </span>
                            <span className="text-[9px] font-mono-code text-white/40 uppercase">{node.type}</span>
                          </div>
                          <h5 className="text-xs font-bold text-white font-mono-code leading-snug">{node.name}</h5>
                          <p className="text-[11px] text-white/60 font-light leading-relaxed">{node.desc}</p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono-code text-emerald-400">
                          <span>ACTIVE</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[#141418] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code text-white/60">
                    <span>* Zero blocking I/O: All LLM inference and long-running PDF/audio jobs execute asynchronously via Redis queues.</span>
                    <span className="text-[#8B5CF6] font-semibold">100% ISOLATED CONTAINER</span>
                  </div>
                </div>
              )}

              {/* Tab 3: 3-Week Execution Roadmap */}
              {activeTab === 'roadmap' && (
                <div className="bg-[#0E0E12] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono-code text-[#8B5CF6] uppercase tracking-wider font-bold">MVP SPRINT SCHEDULE</span>
                      <h4 className="text-lg font-bold text-white font-mono-code uppercase mt-0.5">
                        RAPID 3-WEEK EXECUTION MATRIX
                      </h4>
                    </div>
                    <span className="text-xs font-mono-code text-emerald-400 font-semibold">ZERO FLUFF • DIRECT CODE</span>
                  </div>

                  <div className="space-y-4">
                    {analyzedIdea.milestones.map((mile, i) => (
                      <div
                        key={mile.week}
                        className="p-5 rounded-xl bg-[#14141A] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start md:items-center gap-4">
                          <div className="px-3 py-2 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] font-mono-code font-bold text-xs shrink-0">
                            {mile.week}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white font-mono-code">{mile.focus}</h5>
                            <p className="text-xs text-white/60 font-light mt-0.5">{mile.deliverables}</p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2 text-[10px] font-mono-code text-white/50">
                          <span>SQUAD:</span>
                          <span className="text-white font-semibold">ALL 3 FOUNDERS</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Conversion Call-to-Action */}
              <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#18122B] via-[#101018] to-[#120E22] border border-[#8B5CF6]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(139,92,246,0.2)]">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SQUAD READY TO BUILD THIS SPEC IMMEDIATELY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                    READY TO TURN THIS SPEC INTO PRODUCTION?
                  </h3>
                  <p className="text-sm text-white/70 font-light max-w-xl">
                    Skip hiring 5 separate freelancers or waiting 4 months with a bloated agency. Vignesh, Sai Kiran, and Nuthan Sai will build this exact architecture in 2–3 weeks.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    id="build-architecture-cta-btn"
                    onClick={handleBuildThisClick}
                    className="w-full sm:w-auto px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-[#E5E5E5] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <span>BUILD THIS ARCHITECTURE WITH US</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
