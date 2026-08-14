import React, { useState } from 'react';
import { Play, Sparkles, Calculator, Activity, CheckCircle, ShieldAlert, Cpu, RefreshCw, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai-guardian' | 'calci-py' | 'pipeline'>('ai-guardian');

  // AI Guardian Simulation State
  const [samplePrompt, setSamplePrompt] = useState<string>(
    'Analyze user financial transaction batch #8492 for recurring subscription anomalies and flag high-risk anomalies.'
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<{
    riskScore: number;
    safetyStatus: string;
    piiCleaned: boolean;
    latency: number;
    ruleMatches: string[];
  } | null>({
    riskScore: 98,
    safetyStatus: 'VERIFIED_SAFE',
    piiCleaned: true,
    latency: 24,
    ruleMatches: ['Financial Guardrail v4.2 passed', 'PII Masking applied to Account IDs', 'Zero Toxicity Detected']
  });

  const handleRunAiScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const score = Math.floor(92 + Math.random() * 8);
      const latencyMs = Math.floor(18 + Math.random() * 15);
      setIsScanning(false);
      setScanResult({
        riskScore: score,
        safetyStatus: score >= 90 ? 'VERIFIED_SAFE' : 'REVIEW_RECOMMENDED',
        piiCleaned: true,
        latency: latencyMs,
        ruleMatches: [
          'Enterprise Governance Heuristic v2.1 Passed',
          'Output Hallucination Entropy: 0.04 (Optimal)',
          'Context Token Boundary: 1,420 tokens validated'
        ]
      });
    }, 600);
  };

  // Calci.py Simulator State
  const [currentGpa, setCurrentGpa] = useState<number>(3.65);
  const [completedCredits, setCompletedCredits] = useState<number>(45);
  const [targetGpa, setTargetGpa] = useState<number>(3.85);
  const [plannedCredits, setPlannedCredits] = useState<number>(30);

  // Compute required average GPA in upcoming courses
  // Target GPA = (CurrentGPA * CompletedCredits + ReqGPA * PlannedCredits) / TotalCredits
  // ReqGPA = (TargetGPA * (CompletedCredits + PlannedCredits) - CurrentGPA * CompletedCredits) / PlannedCredits
  const totalCredits = completedCredits + plannedCredits;
  const requiredGpaRaw = (targetGpa * totalCredits - currentGpa * completedCredits) / plannedCredits;
  const requiredGpa = Math.min(4.0, Math.max(0, parseFloat(requiredGpaRaw.toFixed(2))));
  const isAchievable = requiredGpaRaw <= 4.0;

  // Pipeline Benchmark State
  const [workerCount, setWorkerCount] = useState<number>(8);
  const [batchSize, setBatchSize] = useState<number>(500);
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [pipelineMetrics, setPipelineMetrics] = useState<{
    throughput: number;
    latencyP99: number;
    errorRate: string;
  }>({
    throughput: 4200,
    latencyP99: 12,
    errorRate: '0.00%'
  });

  const runPipelineBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      setIsBenchmarking(false);
      setPipelineMetrics({
        throughput: Math.round(workerCount * batchSize * (1.1 + Math.random() * 0.2)),
        latencyP99: Math.max(4, Math.round(32 - workerCount * 1.8 + Math.random() * 4)),
        errorRate: '0.00%'
      });
    }, 500);
  };

  return (
    <section id="playground" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B5CF6]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/5">
          <div>
            <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE SYSTEM SIMULATORS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
              TEST OUR
              <br />
              <span className="text-[#8B5CF6]">ENGINES LIVE.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-white/60 max-w-md font-light">
            Interactive sandboxes showcasing the logic, algorithmic performance, and frontend polish we engineer into every client solution.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0E0E0E] border border-white/10 w-fit mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => setActiveTab('ai-guardian')}
            id="tab-ai-guardian"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono-code font-bold uppercase tracking-wider transition-all ${
              activeTab === 'ai-guardian'
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>01. AI GUARDIAN WORKBENCH</span>
          </button>

          <button
            onClick={() => setActiveTab('calci-py')}
            id="tab-calci-py"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono-code font-bold uppercase tracking-wider transition-all ${
              activeTab === 'calci-py'
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>02. CALCI.PY PREDICTOR</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            id="tab-pipeline"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono-code font-bold uppercase tracking-wider transition-all ${
              activeTab === 'pipeline'
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>03. ASYNC PIPELINE BENCHMARK</span>
          </button>
        </div>

        {/* Sandbox Content Cards */}
        <div className="bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {/* TAB 1: AI GUARDIAN OS SIMULATOR */}
            {activeTab === 'ai-guardian' && (
              <motion.div
                key="ai-guardian"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <div className="text-[10px] font-mono-code text-[#8B5CF6] uppercase tracking-widest font-semibold">
                      HEURISTIC GOVERNANCE & SAFETY ENGINE
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      AI Model Safety & Hallucination Auditor
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-code px-3 py-1.5 rounded-sm bg-[#141414] border border-white/10 text-white/70">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>KERNEL ACTIVE: v2.4 (PYTHON RUNTIME)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Prompt Input */}
                  <div className="lg:col-span-7 space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                      TEST INPUT PROMPT OR SYSTEM PAYLOAD
                    </label>
                    <textarea
                      value={samplePrompt}
                      onChange={(e) => setSamplePrompt(e.target.value)}
                      rows={4}
                      className="w-full p-4 rounded-xl bg-[#141414] border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#8B5CF6] font-mono-code text-xs leading-relaxed"
                    />

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono-code">PRESETS:</span>
                      <button
                        onClick={() =>
                          setSamplePrompt('Process credit card batch ending in 4112 with customer PII encrypted to safe storage vault.')
                        }
                        className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/10 text-[11px] font-mono-code text-white/70 transition-colors border border-white/5"
                      >
                        Financial PII Check
                      </button>
                      <button
                        onClick={() =>
                          setSamplePrompt('Generate autonomous code execution script to modify server environment variables.')
                        }
                        className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/10 text-[11px] font-mono-code text-white/70 transition-colors border border-white/5"
                      >
                        Execution Safety Rule
                      </button>
                    </div>

                    <button
                      onClick={handleRunAiScan}
                      disabled={isScanning}
                      className="flex items-center gap-2 px-6 py-3 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E5] transition-all disabled:opacity-50"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>AUDITING PAYLOAD...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>EXECUTE REAL-TIME AUDIT</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Audit Results */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-mono-code font-bold">
                        EVALUATION METRICS
                      </div>

                      {scanResult ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0E0E0E] border border-white/5">
                            <span className="text-xs text-white/60 font-mono-code">SAFETY SCORE:</span>
                            <span className="text-lg font-bold font-mono-code text-emerald-400">
                              {scanResult.riskScore} / 100
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0E0E0E] border border-white/5">
                            <span className="text-xs text-white/60 font-mono-code">EVALUATION LATENCY:</span>
                            <span className="text-sm font-mono-code text-[#8B5CF6] font-semibold">
                              {scanResult.latency}ms
                            </span>
                          </div>

                          <div className="space-y-2 pt-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono-code">
                              ACTIVE GUARDRAILS:
                            </div>
                            {scanResult.ruleMatches.map((rule, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-white/80 font-mono-code">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{rule}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-40 flex items-center justify-center text-xs text-white/40 font-mono-code">
                          Executing heuristic evaluation pipeline...
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-white/40 font-mono-code flex items-center justify-between">
                      <span>AMIGOWORKS GOVERNANCE ENGINE</span>
                      <span className="text-[#8B5CF6]">ZERO-DATA RETENTION</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: CALCI.PY GPA PREDICTOR */}
            {activeTab === 'calci-py' && (
              <motion.div
                key="calci-py"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <div className="text-[10px] font-mono-code text-[#8B5CF6] uppercase tracking-widest font-semibold">
                      ALGORITHMIC TRAJECTORY FORECASTER
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      Multi-Course GPA Scenario Simulation
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-code px-3 py-1.5 rounded-sm bg-[#141414] border border-white/10 text-white/70">
                    <Calculator className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>DETERMINISTIC KERNEL: ACTIVE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 rounded-xl bg-[#141414] border border-white/5 space-y-3">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                      CURRENT CUMULATIVE GPA
                    </label>
                    <div className="text-2xl font-mono-code font-bold text-white">{currentGpa.toFixed(2)}</div>
                    <input
                      type="range"
                      min="2.0"
                      max="4.0"
                      step="0.05"
                      value={currentGpa}
                      onChange={(e) => setCurrentGpa(parseFloat(e.target.value))}
                      className="w-full accent-[#8B5CF6]"
                    />
                  </div>

                  <div className="p-5 rounded-xl bg-[#141414] border border-white/5 space-y-3">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                      COMPLETED CREDITS
                    </label>
                    <div className="text-2xl font-mono-code font-bold text-white">{completedCredits} hrs</div>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="3"
                      value={completedCredits}
                      onChange={(e) => setCompletedCredits(parseInt(e.target.value))}
                      className="w-full accent-[#8B5CF6]"
                    />
                  </div>

                  <div className="p-5 rounded-xl bg-[#141414] border border-white/5 space-y-3">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                      TARGET TARGET GPA
                    </label>
                    <div className="text-2xl font-mono-code font-bold text-[#8B5CF6]">{targetGpa.toFixed(2)}</div>
                    <input
                      type="range"
                      min="2.5"
                      max="4.0"
                      step="0.05"
                      value={targetGpa}
                      onChange={(e) => setTargetGpa(parseFloat(e.target.value))}
                      className="w-full accent-[#8B5CF6]"
                    />
                  </div>

                  <div className="p-5 rounded-xl bg-[#141414] border border-white/5 space-y-3">
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono-code font-bold">
                      UPCOMING CREDITS
                    </label>
                    <div className="text-2xl font-mono-code font-bold text-white">{plannedCredits} hrs</div>
                    <input
                      type="range"
                      min="12"
                      max="60"
                      step="3"
                      value={plannedCredits}
                      onChange={(e) => setPlannedCredits(parseInt(e.target.value))}
                      className="w-full accent-[#8B5CF6]"
                    />
                  </div>
                </div>

                {/* Trajectory Output Banner */}
                <div className="p-6 rounded-xl bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-[10px] font-mono-code uppercase tracking-widest text-white/40">
                      CALCULATED REQUIREMENT FOR {plannedCredits} UPCOMING CREDITS
                    </div>
                    <div className="text-base sm:text-lg text-white font-medium">
                      {isAchievable ? (
                        <span>
                          You need to maintain an average of{' '}
                          <span className="text-emerald-400 font-mono-code font-bold text-xl">{requiredGpa.toFixed(2)}</span>{' '}
                          across remaining courses.
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          Target requires &gt;4.00 average. Increase upcoming credits or adjust target.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-3 rounded-lg bg-[#0E0E0E] border border-white/10 text-center font-mono-code text-xs shrink-0">
                    <div className="text-white/40 text-[9px] uppercase">TOTAL ACADEMIC LOAD</div>
                    <div className="text-white font-bold text-base mt-0.5">{totalCredits} CREDITS</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: ASYNC PIPELINE BENCHMARK */}
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <div className="text-[10px] font-mono-code text-[#8B5CF6] uppercase tracking-widest font-semibold">
                      DISTRIBUTED TASK & API BENCHMARK
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      High-Concurrency Async Pipeline
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-code px-3 py-1.5 rounded-sm bg-[#141414] border border-white/10 text-white/70">
                    <Cpu className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>ASYNCIO WORKER CLUSTER</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Controls */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono-code">
                        <span className="text-white/60">CONCURRENT WORKERS:</span>
                        <span className="text-white font-bold">{workerCount} WORKERS</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="32"
                        step="2"
                        value={workerCount}
                        onChange={(e) => setWorkerCount(parseInt(e.target.value))}
                        className="w-full accent-[#8B5CF6]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono-code">
                        <span className="text-white/60">BATCH SIZE / CHUNK:</span>
                        <span className="text-white font-bold">{batchSize} ITEMS</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="2000"
                        step="100"
                        value={batchSize}
                        onChange={(e) => setBatchSize(parseInt(e.target.value))}
                        className="w-full accent-[#8B5CF6]"
                      />
                    </div>

                    <button
                      onClick={runPipelineBenchmark}
                      disabled={isBenchmarking}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E5] transition-all disabled:opacity-50"
                    >
                      {isBenchmarking ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>STRESS-TESTING PIPELINE...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>RUN CONCURRENCY STRESS TEST</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Benchmark Realtime Stats */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-[#141414] border border-white/5 flex flex-col justify-between">
                      <div className="text-[10px] font-mono-code text-white/40 uppercase">THROUGHPUT</div>
                      <div className="text-2xl font-mono-code font-black text-emerald-400 my-2">
                        {pipelineMetrics.throughput.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono-code text-white/40">req / sec</div>
                    </div>

                    <div className="p-5 rounded-xl bg-[#141414] border border-white/5 flex flex-col justify-between">
                      <div className="text-[10px] font-mono-code text-white/40 uppercase">P99 LATENCY</div>
                      <div className="text-2xl font-mono-code font-black text-[#8B5CF6] my-2">
                        {pipelineMetrics.latencyP99}ms
                      </div>
                      <div className="text-[10px] font-mono-code text-white/40">sub-20ms target</div>
                    </div>

                    <div className="p-5 rounded-xl bg-[#141414] border border-white/5 flex flex-col justify-between">
                      <div className="text-[10px] font-mono-code text-white/40 uppercase">ERROR RATE</div>
                      <div className="text-2xl font-mono-code font-black text-white my-2">
                        {pipelineMetrics.errorRate}
                      </div>
                      <div className="text-[10px] font-mono-code text-emerald-400">Zero Drops</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
