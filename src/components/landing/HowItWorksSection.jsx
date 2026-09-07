import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Sparkles,
  HeartHandshake,
  Terminal,
  Code2,
  CheckCircle2,
  ArrowRight,
  GitBranch,
  Laptop,
  GitPullRequest,
  Check,
  Cpu,
  Layers,
  Play,
  Pause,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Sync Your GitHub & Craft Dev Profile",
    desc: "Connect your GitHub or GitLab in one click. DevTinder auto-fetches your top languages, active repositories, commit streaks, and verified stars.",
    badge: "Stage 1: Auth & Ingest",
    highlight: "GitHub OAuth Verified • 48 Repos Synced",
    terminalOutput: `$ devtinder auth github --sync-repos
[✓] Authenticated as @chaitanyadev (ID: 849201)
[✓] Ingesting commit telemetry across 48 public repos
[✓] Top Stacks Detected: TypeScript (44%), Rust (32%), Go (24%)
[✓] Profile synergy rating indexed to global neural cluster.`,
    gitBranches: [
      { name: "main", commit: "init dev profile metadata", hash: "9f82a1" },
      { name: "feat/auth-sync", commit: "sync 48 public github repos", hash: "4c10e3" },
    ],
  },
  {
    step: "02",
    icon: Sparkles,
    title: "AI Stacks & Synergy Calibration",
    desc: "Our neural matching algorithm calculates stack compatibility, time-zone alignment, and project vision to curate your daily developer feed.",
    badge: "Stage 2: Calibrate & Rank",
    highlight: "99.4% Match Score with Elena (Rust/LLMs)",
    terminalOutput: `$ devtinder match --evaluate-synergy
[✓] Running vector embedding cosine distance...
[✓] Frontend React/Next.js alignment: 0.98
[✓] Distributed Systems complement: 0.99
[✓] 99.4% Synergy Confirmed -> Dispatching to Match Queue.`,
    gitBranches: [
      { name: "main", commit: "profile live on global radar", hash: "8a72d4" },
      { name: "feat/ai-weights", commit: "calibrate vector embeddings", hash: "7b31f0" },
    ],
  },
  {
    step: "03",
    icon: HeartHandshake,
    title: "Swipe & Exchange Connection Requests",
    desc: "Browse developers one by one. Click 'Pass' to ignore or 'Interested' to send a request. When both developers express interest, you match instantly!",
    badge: "Stage 3: Swipe & Connect",
    highlight: "Mutual Connection Request Accepted",
    terminalOutput: `$ devtinder request --send @elena_systems
[✓] Connection intent registered: "Interested"
[✓] Checking mutual reciprocal interest...
[✓] MATCH DETECTED: Elena accepted your request!
[✓] Initializing encrypted real-time WebSocket channel.`,
    gitBranches: [
      { name: "main", commit: "mutual match confirmed", hash: "1e48c7" },
      { name: "collab/elena-squad", commit: "branch joint hackathon repo", hash: "5d92a8" },
    ],
  },
  {
    step: "04",
    icon: Laptop,
    title: "Chat In-App & Ship Products Together",
    desc: "Collaborate inside our developer-focused chat with embedded code snippets, PR diff previews, and project boards. Form your dream squad and launch.",
    badge: "Stage 4: Chat & Ship",
    highlight: "Real-time WebSockets & Markdown Engine Active",
    terminalOutput: `$ devtinder pair-session --start
[✓] Sub-20ms WebRTC voice lounge active
[✓] VS Code syntax bridge connected
[✓] PR #1 merged into collab/elena-squad: "Added streaming API"
[✓] Deployment URL generated: https://devtinder-mvp.app`,
    gitBranches: [
      { name: "collab/elena-squad", commit: "merge PR #1 - streaming agent API", hash: "3a99b2" },
      { name: "release/v1.0.0", commit: "production launch to hackathon", hash: "0d77e4" },
    ],
  },
];

const HowItWorksSection = ({ playTone }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("terminal"); // "terminal" | "git"
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Automatically cycle through stages every 2 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (idx) => {
    if (playTone) playTone(520 + idx * 90, "sine", 0.08);
    setActiveStep(idx);
  };

  const currentStepData = steps[activeStep];

  return (
    <section id="how-it-works" className="relative py-28 bg-[#040714] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient lights */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-wider mb-4">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>Workflow Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How DevTinder Works.
            <span className="block mt-1 gradient-text-pink-orange">
              From First Swipe to Production Merge.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A frictionless, 4-stage engineering pipeline designed to connect solo builders into high-output developer squads.
          </p>

          {/* Auto-play status pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Auto-advancing every 2s</span>
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="ml-2 text-pink-400 hover:text-pink-300"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Vertical Laser Circuit Sequencer */}
          <div className="lg:col-span-6 relative">
            
            {/* Glowing Laser Timeline Line */}
            <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 hidden sm:block opacity-40" />

            <div className="space-y-5">
              {steps.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.step}
                    onClick={() => handleStepClick(idx)}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? "bg-[#0d1433] border-pink-500/60 shadow-[0_10px_35px_rgba(236,72,153,0.2)] translate-x-2"
                        : "bg-[#080d22]/60 border-white/10 hover:border-white/20 hover:bg-[#0b1028]"
                    }`}
                  >
                    {/* Active Step Progress Fill Indicator */}
                    {isActive && isAutoPlaying && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl overflow-hidden">
                        <div className="h-full bg-white/40 animate-[marquee_2s_linear_infinite]" />
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Step Number Node */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 border transition-all relative z-10 ${
                          isActive
                            ? "bg-gradient-to-tr from-pink-500 to-purple-600 text-white border-pink-400 shadow-lg shadow-pink-500/40"
                            : "bg-[#080c1d] text-slate-400 border-white/10"
                        }`}
                      >
                        {item.step}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-base sm:text-lg font-bold transition-colors ${
                              isActive ? "text-white" : "text-slate-200"
                            }`}
                          >
                            {item.title}
                          </h4>
                          {isActive && (
                            <span className="flex h-2.5 w-2.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Dynamic Multi-Tab Pipeline Terminal */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
              
              {/* Terminal Title Bar & Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs text-slate-400 ml-2">
                    devtinder-session.sh
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab("terminal")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "terminal"
                        ? "bg-pink-500/20 text-pink-300 border border-pink-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    CLI Output
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("git")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "git"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Git Topology
                  </button>
                </div>
              </div>

              {/* Stage Status Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-[11px] font-bold">
                    {currentStepData.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{currentStepData.highlight}</span>
                </div>
              </div>

              {/* Terminal View Content with Smooth Fade Animation */}
              {activeTab === "terminal" ? (
                <div
                  key={`term-${activeStep}`}
                  className="rounded-2xl bg-[#03050f] border border-white/10 p-5 font-mono text-xs text-slate-200 min-h-[220px] flex items-center overflow-x-auto shadow-inner animate-fade-in"
                >
                  <pre className="text-pink-300/90 whitespace-pre-wrap leading-relaxed">
                    {currentStepData.terminalOutput}
                  </pre>
                </div>
              ) : (
                /* Git Branch Visualizer */
                <div
                  key={`git-${activeStep}`}
                  className="rounded-2xl bg-[#03050f] border border-white/10 p-5 font-mono text-xs text-slate-200 min-h-[220px] flex flex-col justify-center space-y-4 shadow-inner animate-fade-in"
                >
                  <div className="text-slate-500 text-[11px]">Active Repository Git Commits:</div>
                  {currentStepData.gitBranches.map((branch, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <GitBranch className="w-4 h-4 text-purple-400 shrink-0" />
                      <div className="flex-1 truncate">
                        <span className="text-cyan-300 font-bold mr-2">{branch.name}</span>
                        <span className="text-slate-300 text-xs">"{branch.commit}"</span>
                      </div>
                      <span className="text-[10px] text-pink-400 font-mono px-2 py-0.5 rounded bg-black/40">
                        {branch.hash}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stage Progression Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-slate-400 font-mono">
                  Pipeline Stage {activeStep + 1} of {steps.length}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleStepClick((activeStep + 1) % steps.length)
                  }
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-all group"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
